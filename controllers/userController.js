// const loginDetails = require("../models/loginDetails");
// const UserForm = require("../models/UserForm");

// // POST - Save Form
// // exports.createUser = async (req, res) => {
// //   try {
// //     const newUser = new UserForm(req.body);
// //     const savedUser = await newUser.save();

// //     res.status(201).json({
// //       success: true,
// //       message: "User data saved successfully",
// //       data: savedUser
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Error saving data",
// //       error: error.message
// //     });
// //   }
// // };

// // GET - Fetch All Users
// // exports.getUsers = async (req, res) => {
// //   try {
// //     const users = await UserForm.find().sort({ createdAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       count: users.length,
// //       data: users
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Error fetching data",
// //       error: error.message
// //     });
// //   }
// // };



// // exports.loginDetails = async (req, res) => {

// //   try {
// //     const { userName, password } = req.body;
// //     console.log(req.body)

// //     // ✅ Static credentials
// //     const validUsername = "jashwanth";
// //     const validPassword = "12345678";

// //     // ✅ Validation
// //     if (userName === validUsername && password === validPassword) {
// //       return res.status(200).json({
// //         success: true,
// //         message: "Login successful ✅",
// //       });
// //     } else {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Invalid username or password ❌",
// //       });
// //     }

// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: "Server error ❌",
// //       error: error.message,
// //     });
// //   }
// // };
// // exports.getUserById = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const user = await require("../models/UserForm").findById(id);

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User not found"
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: user
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Error fetching user",
// //       error: error.message
// //     });
// //   }
// // };
// // In your userController.js - Add these functions

// // Update Office Use
// // exports.updateOfficeUse = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const officeUseData = req.body;
    
// //     const updatedUser = await UserForm.findByIdAndUpdate(
// //       id,
// //       { 
// //         officeUse: officeUseData,
// //         applicationStatus: officeUseData.applicationStatus,
// //         updatedAt: new Date()
// //       },
// //       { new: true }
// //     );
    
// //     if (!updatedUser) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User not found"
// //       });
// //     }
    
// //     res.status(200).json({
// //       success: true,
// //       message: "Office use data updated successfully",
// //       data: updatedUser
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Error updating office use data",
// //       error: error.message
// //     });
// //   }
// // };

// exports.updateOfficeUse = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const officeUseData = req.body;
    
//     // Set applicationStatus based on interviewOutcome
//     let applicationStatus = 'pending';
//     if (officeUseData.interviewOutcome === 'Successful') {
//       applicationStatus = 'completed';
//     } else if (officeUseData.interviewOutcome === 'Unsuccessful') {
//       applicationStatus = 'rejected';
//     } else if (officeUseData.interviewOutcome === 'On Hold') {
//       applicationStatus = 'on-hold';
//     }
    
//     const updatedUser = await UserForm.findByIdAndUpdate(
//       id,
//       { 
//         officeUse: officeUseData,
//         applicationStatus: applicationStatus
//       },
//       { new: true }
//     );
    
//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       message: "Office use data updated successfully",
//       data: updatedUser
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error updating office use data",
//       error: error.message
//     });
//   }
// };

// // Update Application Status
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { applicationStatus } = req.body;
    
//     const updatedUser = await UserForm.findByIdAndUpdate(
//       id,
//       { applicationStatus },
//       { new: true }
//     );
    
//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       message: "Application status updated successfully",
//       data: updatedUser
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error updating status",
//       error: error.message
//     });
//   }
// };
// exports.createUser = async (req, res) => {
//   try {
//     const { personalDetails, contactDetails } = req.body;
    
//     // Extract fields for duplicate check
//     const niNumber = personalDetails?.nationalInsuranceNumber;
//     const mobile = contactDetails?.mobile;
//     const email = contactDetails?.email;

//     // Check for existing user with same NI number, mobile, or email
//     const existingUser = await UserForm.findOne({
//       $or: [
//         { "personalDetails.nationalInsuranceNumber": niNumber },
//         { "contactDetails.mobile": mobile },
//         { "contactDetails.email": email }
//       ]
//     });

//     if (existingUser) {
//       let duplicateField = "";
//       if (existingUser.personalDetails?.nationalInsuranceNumber === niNumber) {
//         duplicateField = "National Insurance Number";
//       } else if (existingUser.contactDetails?.mobile === mobile) {
//         duplicateField = "Mobile Number";
//       } else if (existingUser.contactDetails?.email === email) {
//         duplicateField = "Email Address";
//       }

//       return res.status(409).json({
//         success: false,
//         message: `An application already exists with this ${duplicateField}. You cannot submit multiple applications.`,
//         duplicateField: duplicateField,
//         existingApplicationId: existingUser._id
//       });
//     }

//     // Create new user if no duplicate found
//     const newUser = new UserForm(req.body);
//     const savedUser = await newUser.save();

//     res.status(201).json({
//       success: true,
//       message: "Application submitted successfully!",
//       data: savedUser,
//       applicationReference: `DEV${savedUser._id.toString().slice(-8)}`
//     });
//   } catch (error) {
//     // Handle duplicate key error from MongoDB
//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: "Duplicate entry detected. An application with this information already exists.",
//         error: error.message
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: "Error saving application data",
//       error: error.message
//     });
//   }
// };

// // GET - Fetch All Users
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await UserForm.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: users.length,
//       data: users
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching data",
//       error: error.message
//     });
//   }
// };

// // Login Details
// exports.loginDetails = async (req, res) => {
//   try {
//     const { userName, password } = req.body;
//     console.log(req.body);

//     const validUsername = "jashwanth";
//     const validPassword = "12345678";

//     if (userName === validUsername && password === validPassword) {
//       return res.status(200).json({
//         success: true,
//         message: "Login successful ✅",
//         token: "dummy-token-" + Date.now(),
//         user: { userName: validUsername, role: "admin" }
//       });
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid username or password ❌",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error ❌",
//       error: error.message,
//     });
//   }
// };

// // GET User by ID
// exports.getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await UserForm.findById(id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: user
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching user",
//       error: error.message
//     });
//   }
// };

// backend/controllers/userController.js
const UserForm = require('../models/UserForm');
const { sendApplicationSubmittedEmail, sendStatusUpdateEmail } = require("../services/emailService");
const jwt = require('jsonwebtoken');

// POST - Save Form with Duplicate Check
exports.createUser = async (req, res) => {
  try {
    console.log('Received request body keys:', Object.keys(req.body));
    console.log('PersonalDetails received:', !!req.body.personalDetails);
    console.log('Passport photo received:', !!req.body.personalDetails?.passportPhoto);
    console.log('Passport photo length:', req.body.personalDetails?.passportPhoto?.length);
    console.log('total object',req.body)
    const { personalDetails, contactDetails } = req.body;
    
    const niNumber = personalDetails?.nationalInsuranceNumber;
    const mobile = contactDetails?.mobile;
    const email = contactDetails?.email;

    const existingUser = await UserForm.findOne({
      $or: [
        { "personalDetails.nationalInsuranceNumber": niNumber },
        { "contactDetails.mobile": mobile },
        { "contactDetails.email": email }
      ]
    });

    if (existingUser) {
      let duplicateField = "";
      if (existingUser.personalDetails?.nationalInsuranceNumber === niNumber) {
        duplicateField = "National Insurance Number";
      } else if (existingUser.contactDetails?.mobile === mobile) {
        duplicateField = "Mobile Number";
      } else if (existingUser.contactDetails?.email === email) {
        duplicateField = "Email Address";
      }

      return res.status(409).json({
        success: false,
        message: `An application already exists with this ${duplicateField}. You cannot submit multiple applications.`,
        duplicateField: duplicateField,
        existingApplicationId: existingUser._id
      });
    }

    const newUser = new UserForm(req.body);
    const savedUser = await newUser.save();
    
    // Send email notification
    try {
      await sendApplicationSubmittedEmail(savedUser);
      await UserForm.findByIdAndUpdate(savedUser._id, { emailSent: true, emailSentAt: new Date() });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      data: savedUser,
      applicationReference: `DEV${savedUser._id.toString().slice(-8)}`
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate entry detected. An application with this information already exists.",
        error: error.message
      });
    }
    console.log("error" ,req)
    res.status(500).json({
      success: false,
      message: "Error saving application data",
      error: error.message
    });
  }
};

// GET - Fetch All Users (excluding deleted)
exports.getUsers = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    let query = { deleted: { $ne: true } };
    
    if (status && status !== 'all') {
      query.applicationStatus = status;
    }
    
    if (search) {
      query.$or = [
        { "personalDetails.forename": { $regex: search, $options: 'i' } },
        { "personalDetails.surname": { $regex: search, $options: 'i' } },
        { "contactDetails.mobile": { $regex: search, $options: 'i' } },
        { "contactDetails.email": { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await UserForm.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await UserForm.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: error.message
    });
  }
};

// GET - All Users for Export
exports.getAllUsersForExport = async (req, res) => {
  try {
    const users = await UserForm.find({ deleted: { $ne: true } }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: error.message
    });
  }
};

// GET User by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserForm.findOne({ _id: id, deleted: { $ne: true } });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message
    });
  }
};

// DELETE - Soft Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedUser = await UserForm.findByIdAndUpdate(
      id,
      { deleted: true, deletedAt: new Date() },
      { new: true }
    );
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
};

// PUT - Update Office Use with Status Sync
exports.updateOfficeUse = async (req, res) => {
  try {
    const { id } = req.params;
    const officeUseData = req.body;
    
    let applicationStatus = 'pending';
    if (officeUseData.interviewOutcome === 'Successful') {
      applicationStatus = 'completed';
    } else if (officeUseData.interviewOutcome === 'Unsuccessful') {
      applicationStatus = 'rejected';
    } else if (officeUseData.interviewOutcome === 'On Hold') {
      applicationStatus = 'on-hold';
    }
    
    const oldUser = await UserForm.findById(id);
    const oldStatus = oldUser?.applicationStatus;
    
    const updatedUser = await UserForm.findByIdAndUpdate(
      id,
      { 
        officeUse: officeUseData,
        applicationStatus: applicationStatus
      },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Send email if status changed
    if (oldStatus !== applicationStatus && applicationStatus !== 'pending') {
      try {
        await sendStatusUpdateEmail(updatedUser, oldStatus, applicationStatus);
      } catch (emailError) {
        console.error('Status update email failed:', emailError);
      }
    }
    
    res.status(200).json({
      success: true,
      message: "Office use data updated successfully",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating office use data",
      error: error.message
    });
  }
};

// PUT - Bulk Update Status
exports.bulkUpdateStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;
    
    const updatedUsers = await UserForm.updateMany(
      { _id: { $in: ids } },
      { applicationStatus: status }
    );
    
    // Send emails for status updates
    const users = await UserForm.find({ _id: { $in: ids } });
    for (const user of users) {
      if (status !== 'pending') {
        try {
          await sendStatusUpdateEmail(user, user.applicationStatus, status);
        } catch (emailError) {
          console.error(`Email failed for ${user._id}:`, emailError);
        }
      }
    }
    
    res.status(200).json({
      success: true,
      message: `${updatedUsers.modifiedCount} users updated successfully`,
      count: updatedUsers.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating users",
      error: error.message
    });
  }
};

// POST - Login
exports.loginDetails = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    const validUsername = "jashwanth";
    const validPassword = "12345678";
    
    if (userName === validUsername && password === validPassword) {
      const token = jwt.sign(
        { userName, role: 'admin' },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '8h' }
      );
      
      return res.status(200).json({
        success: true,
        message: "Login successful ✅",
        token: token,
        user: { userName: validUsername, role: "admin" }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password ❌",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
      error: error.message,
    });
  }
};