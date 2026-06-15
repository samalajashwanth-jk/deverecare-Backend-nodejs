const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const { 
  createUser, 
  getUsers, 
  getUserById, 
  loginDetails,
  updateOfficeUse,
  deleteUser,
  bulkUpdateStatus,
  getAllUsersForExport
} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const { parseResumeWithAI } = require('../services/aiService');
const { calculateMatchScore } = require('../services/aiService');

router.get('/match-score/:id', authMiddleware, async (req, res) => {
  try {
    const user = await UserForm.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const matchResult = await calculateMatchScore({
      workHistory: user.workHistory,
      clientProcedures: user.clientProcedures,
      education: user.education
    });
    
    res.json({ success: true, ...matchResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

const { parseFilledFormPDF } = require('../services/aiService');

router.post('/parse-filled-form', upload.single('pdfFile'), async (req, res) => {
  console.log('📄 Filled Form PDF upload received');
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(dataBuffer);
    
    const extractedData = await parseFilledFormPDF(pdfData.text);
    
    fs.unlinkSync(req.file.path);
    
    res.json({ 
      success: true, 
      data: extractedData,
      message: 'Form data extracted successfully'
    });
    
  } catch (error) {
    console.error('Parse error:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, error: error.message });
  }
});
// Parse function
// const parseResumeText = (text) => {
//   const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
//   const phoneMatch = text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/);
  
//   const lines = text.split('\n').filter(l => l.trim().length > 0 && l.trim().length < 50);
//   const commonWords = ['RESUME', 'CV', 'CURRICULUM', 'VITAE', 'PROFILE', 'SUMMARY', 'OBJECTIVE'];
//   let name = '';
  
//   for (let line of lines) {
//     let isCommon = false;
//     const upperLine = line.toUpperCase();
//     for (let word of commonWords) {
//       if (upperLine.includes(word)) {
//         isCommon = true;
//         break;
//       }
//     }
//     if (!isCommon && line.length > 2 && line.length < 40 && /[a-zA-Z]/.test(line)) {
//       name = line.trim();
//       break;
//     }
//   }
  
//   const nameParts = name.split(' ');
//   const forename = nameParts[0] || '';
//   const surname = nameParts.slice(1).join(' ') || '';
  
//   return {
//     forename: forename,
//     surname: surname,
//     email: emailMatch ? emailMatch[0] : '',
//     mobile: phoneMatch ? phoneMatch[0] : '',
//     address: '',
//     languages: ['English']
//   };
// };
router.post('/parse-resume-full', upload.single('resume'), async (req, res) => {
  console.log('🤖 AI Full Resume parse endpoint hit');
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(dataBuffer);
    
    console.log('PDF text extracted, length:', pdfData.text.length);
    
    const parsedData = await parseResumeWithAI(pdfData.text);
    
    if (!parsedData) {
      throw new Error('AI parsing failed');
    }
    
    console.log('AI Parsed - Education:', parsedData.education?.length);
    console.log('AI Parsed - Work History:', parsedData.workHistory?.length);
    
    fs.unlinkSync(req.file.path);
    
    res.json({ 
      success: true, 
      data: parsedData,
      message: 'Resume parsed successfully'
    });
    
  } catch (error) {
    console.error('AI Parse error:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
// ==================== PARSE RESUME ROUTE ====================
// router.post('/parse-resume', upload.single('resume'), async (req, res) => {
//   console.log('🔥 Parse resume endpoint hit');
  
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, error: 'No file uploaded' });
//     }
    
//     console.log('File received:', req.file.path);
    
//     const dataBuffer = fs.readFileSync(req.file.path);
//     const pdfData = await pdf(dataBuffer);
    
//     const parsedData = parseResumeText(pdfData.text);
//     console.log('Parsed data:', parsedData);
    
//     fs.unlinkSync(req.file.path);
    
//     res.json({ success: true, data: parsedData, message: 'Resume parsed successfully' });
    
//   } catch (error) {
//     console.error('Parse error:', error);
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
//     res.status(500).json({ success: false, error: error.message });
//   }
// });
// router.post('/parse-resume-ai', upload.single('resume'), async (req, res) => {
//   console.log('🤖 AI Resume parse endpoint hit');
  
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, error: 'No file uploaded' });
//     }
    
//     console.log('File received:', req.file.path);
    
//     // Extract text from PDF
//     const dataBuffer = fs.readFileSync(req.file.path);
//     const pdfData = await pdf(dataBuffer);
    
//     console.log('PDF text extracted, length:', pdfData.text.length);
    
//     // Parse with AI
//     const parsedData = await parseResumeWithAI(pdfData.text);
    
//     if (!parsedData) {
//       throw new Error('AI parsing failed');
//     }
    
//     console.log('AI Parsed data:', parsedData);
    
//     // Clean up
//     fs.unlinkSync(req.file.path);
    
//     res.json({ 
//       success: true, 
//       data: parsedData,
//       message: 'Resume parsed successfully with AI'
//     });
    
//   } catch (error) {
//     console.error('AI Parse error:', error);
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
//     res.status(500).json({ 
//       success: false, 
//       error: error.message,
//       message: 'Failed to parse resume'
//     });
//   }
// });

// ==================== EXISTING ROUTES ====================
router.post("/users", createUser);
router.get("/users", authMiddleware, getUsers);
router.get("/users/export/all", authMiddleware, getAllUsersForExport);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id/office-use", authMiddleware, updateOfficeUse);
router.delete("/users/:id", authMiddleware, deleteUser);
router.put("/users/bulk/status", authMiddleware, bulkUpdateStatus);
router.post("/login", loginDetails);

module.exports = router;