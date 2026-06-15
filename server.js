// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();
// const resetCollection = async () => {
//   try {
//     await mongoose.connection.db.dropCollection('userforms');
//     console.log('Collection dropped successfully');
//   } catch (err) {
//     console.log('Collection may not exist yet');
//   }
// };
//  resetCollection()

// //  temporarily for testing 
// // app.get('/test-email', async (req, res) => {
// //   const { sendApplicationSubmittedEmail } = require('./services/emailService');
  
// //   const testApplicant = {
// //     personalDetails: {
// //       forename: 'Test',
// //       surname: 'User',
// //       positionApplied: 'Care Assistant'
// //     },
// //     contactDetails: {
// //       email: 'jashwanthkumar.sjk@gmail.com'  // Change to a test email
// //     },
// //     createdAt: new Date(),
// //     _id: 'test123'
// //   };
  
// //   const result = await sendApplicationSubmittedEmail(testApplicant);
// //   res.json({ success: result });
// // });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api", require("./routes/userRoutes"));

// // Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Get local IP
const getLocalIpAddress = () => {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
};

// CORS
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization','Cache-Control', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'DeVere Care API Server',
    status: 'running',
    endpoints: {
      users: '/api/users',
      login: '/api/login',
      test: '/api/test'
    }
  });
});

// API Routes - NO /* here
app.use("/api", require("./routes/userRoutes"));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString()
  });
});

// 404 handler - NO /* here
app.use((req, res) => {
  res.status(404).json({ 
    error: `Route not found: ${req.originalUrl}`,
    message: 'Available endpoints: /api/users, /api/login, /api/test'
  });
});

const PORT = process.env.PORT || 5000;
const LOCAL_IP = getLocalIpAddress();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📍 Network: http://${LOCAL_IP}:${PORT}`);
  console.log(`📍 Test: http://localhost:${PORT}/api/test\n`);
});
// ==============================================================
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// const getLocalIpAddress = () => {
//   const { networkInterfaces } = require('os');
//   const nets = networkInterfaces();
//   for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//       if (net.family === 'IPv4' && !net.internal) {
//         return net.address;
//       }
//     }
//   }
//   return 'localhost';
// };

// app.use(cors({
//   origin: '*',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// // Routes
// app.use("/api", require("./routes/userRoutes"));

// // Test route
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
// });

// // 404 handler
// app.use('/api', (req, res) => {
//   res.status(404).json({ error: `API endpoint not found: ${req.originalUrl}` });
// });

// const PORT = process.env.PORT || 5000;
// const LOCAL_IP = getLocalIpAddress();

// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   console.log(`📍 http://localhost:${PORT}`);
//   console.log(`📍 http://${LOCAL_IP}:${PORT}`);
// });
// ================================================================================================
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose"); // ✅ Add this import
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ Function to get local IP address
// const getLocalIpAddress = () => {
//   const { networkInterfaces } = require('os');
//   const nets = networkInterfaces();
  
//   for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//       // Skip internal and non-IPv4 addresses
//       if (net.family === 'IPv4' && !net.internal) {
//         return net.address;
//       }
//     }
//   }
//   return 'localhost';
// };

// // ✅ Optional: Reset collection (comment out after first run)
// // const resetCollection = async () => {
// //   try {
// //     await mongoose.connection.db.dropCollection('userforms');
// //     console.log('Collection dropped successfully');
// //   } catch (err) {
// //     console.log('Collection may not exist yet');
// //   }
// // };
// // resetCollection();

// //  temporarily for testing 
// // app.get('/test-email', async (req, res) => {
// //   const { sendApplicationSubmittedEmail } = require('./services/emailService');
// //   
// //   const testApplicant = {
// //     personalDetails: {
// //       forename: 'Test',
// //       surname: 'User',
// //       positionApplied: 'Care Assistant'
// //     },
// //     contactDetails: {
// //       email: 'jashwanthkumar.sjk@gmail.com'
// //     },
// //     createdAt: new Date(),
// //     _id: 'test123'
// //   };
// //   
// //   const result = await sendApplicationSubmittedEmail(testApplicant);
// //   res.json({ success: result });
// // });

// // ✅ Updated CORS - Allow all origins for local testing
// app.use(cors({
//   origin: '*', // Allows any origin (for local network testing)
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // ✅ Increase payload limit for large form submissions with photos
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// // Routes
// app.use("/api", require("./routes/userRoutes"));

// // ✅ Serve static files for uploads (if you have photo uploads)
// app.use('/uploads', express.static('uploads'));

// // Server
// const PORT = process.env.PORT || 5000;
// const LOCAL_IP = getLocalIpAddress();

// // ✅ Listen on all network interfaces (0.0.0.0) to allow network access
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on:`);
//   console.log(`   📍 Local: http://localhost:${PORT}`);
//   console.log(`   📍 Network: http://${LOCAL_IP}:${PORT}`);
//   console.log(`   📍 API Test: http://${LOCAL_IP}:${PORT}/api/users`);
// });