// // backend/services/emailService.js
// const nodemailer = require('nodemailer');

// // Configure email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or your email service
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// const sendApplicationSubmittedEmail = async (applicant) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: applicant.contactDetails.email,
//     subject: 'Application Received - DeVere Care',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
//           <h1 style="margin: 0;">DeVere Care</h1>
//           <p style="margin: 10px 0 0;">Application Received</p>
//         </div>
//         <div style="padding: 30px; background: #f8fafc;">
//           <h2 style="color: #1e293b;">Dear ${applicant.personalDetails.forename} ${applicant.personalDetails.surname},</h2>
//           <p>Thank you for submitting your application to DeVere Care.</p>
//           <p>We have received your application for the position of <strong>${applicant.personalDetails.positionApplied}</strong>.</p>
//           <p>Our recruitment team will review your application and contact you within 3-5 working days.</p>
//           <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
//             <h3 style="margin-top: 0;">Application Summary</h3>
//             <p><strong>Reference Number:</strong> DEV${applicant._id.toString().slice(-8)}</p>
//             <p><strong>Position Applied:</strong> ${applicant.personalDetails.positionApplied}</p>
//             <p><strong>Submission Date:</strong> ${new Date(applicant.createdAt).toLocaleDateString()}</p>
//           </div>
//           <p>If you have any questions, please contact our HR department.</p>
//           <p>Best regards,<br><strong>DeVere Care Recruitment Team</strong></p>
//         </div>
//         <div style="text-align: center; padding: 20px; color: #64748b; font-size: 12px;">
//           <p>DeVere Care - Compassionate Care, Professional Service</p>
//         </div>
//       </div>
//     `
//   };
  
//   await transporter.sendMail(mailOptions);
// };

// const sendStatusUpdateEmail = async (applicant, oldStatus, newStatus) => {
//   const statusMessages = {
//     completed: {
//       subject: 'Application Update - Application Approved!',
//       message: 'Congratulations! Your application has been approved. Our team will contact you shortly with next steps.',
//       color: '#10b981'
//     },
//     rejected: {
//       subject: 'Application Update - Application Status',
//       message: 'Thank you for your interest. After careful consideration, we regret to inform you that your application was not successful at this time.',
//       color: '#ef4444'
//     },
//     'on-hold': {
//       subject: 'Application Update - Application On Hold',
//       message: 'Your application is currently on hold. We will update you once a decision is made.',
//       color: '#f59e0b'
//     }
//   };
  
//   const statusInfo = statusMessages[newStatus] || statusMessages.pending;
  
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: applicant.contactDetails.email,
//     subject: statusInfo.subject,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
//           <h1 style="margin: 0;">DeVere Care</h1>
//           <p style="margin: 10px 0 0;">Application Status Update</p>
//         </div>
//         <div style="padding: 30px; background: #f8fafc;">
//           <h2 style="color: #1e293b;">Dear ${applicant.personalDetails.forename},</h2>
//           <div style="background: ${statusInfo.color}20; border-left: 4px solid ${statusInfo.color}; padding: 20px; margin: 20px 0; border-radius: 8px;">
//             <p style="margin: 0; color: ${statusInfo.color}; font-weight: bold;">Application Status: ${newStatus.toUpperCase()}</p>
//           </div>
//           <p>${statusInfo.message}</p>
//           <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
//             <h3 style="margin-top: 0;">Application Details</h3>
//             <p><strong>Reference Number:</strong> DEV${applicant._id.toString().slice(-8)}</p>
//             <p><strong>Position:</strong> ${applicant.personalDetails.positionApplied}</p>
//           </div>
//           <p>If you have any questions, please contact our HR department.</p>
//           <p>Best regards,<br><strong>DeVere Care Recruitment Team</strong></p>
//         </div>
//       </div>
//     `
//   };
  
//   await transporter.sendMail(mailOptions);
// };

// module.exports = { sendApplicationSubmittedEmail, sendStatusUpdateEmail };

// backend/services/emailService.js
const nodemailer = require('nodemailer');

// Configure email transporter with your Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // samalajashwanthjk@gmail.com
    pass: process.env.EMAIL_PASS   // Your app password
  }
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendApplicationSubmittedEmail = async (applicant) => {
  const mailOptions = {
    from: `"DeVere Care Recruitment" <${process.env.EMAIL_USER}>`,
    to: applicant.contactDetails.email,
    subject: 'DEMO-MAIL (UNDER UAT TESTING) Application Received - DeVere Care ',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0;">DeVere Care</h1>
          <p style="margin: 10px 0 0;">Application Received</p>
        </div>
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b;">Dear ${applicant.personalDetails.forename} ${applicant.personalDetails.surname},</h2>
          <p>Thank you for submitting your application to DeVere Care.</p>
          <p>We have received your application for the position of <strong>${applicant.personalDetails.positionApplied}</strong>.</p>
          <p>Our recruitment team will review your application and contact you within 3-5 working days.</p>
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Application Summary</h3>
            <p><strong>Reference Number:</strong> DEV${applicant._id.toString().slice(-8)}</p>
            <p><strong>Position Applied:</strong> ${applicant.personalDetails.positionApplied}</p>
            <p><strong>Submission Date:</strong> ${new Date(applicant.createdAt).toLocaleDateString()}</p>
          </div>
          <p>If you have any questions, please contact our HR department.</p>
          <p>Best regards,<br><strong>DeVere Care Recruitment Team</strong></p>
        </div>
        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 12px;">
          <p>DeVere Care - Compassionate Care, Professional Service</p>
          <p style="font-size: 10px;">This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const sendStatusUpdateEmail = async (applicant, oldStatus, newStatus) => {
  const statusMessages = {
    completed: {
      subject: 'Application Update - Application Approved! 🎉',
      message: 'Congratulations! Your application has been approved. Our team will contact you shortly with next steps.',
      color: '#10b981',
      button: 'Contact HR'
    },
    rejected: {
      subject: 'Application Update - Application Status',
      message: 'Thank you for your interest. After careful consideration, we regret to inform you that your application was not successful at this time.',
      color: '#ef4444',
      button: 'View Other Positions'
    },
    'on-hold': {
      subject: 'Application Update - Application On Hold',
      message: 'Your application is currently on hold. We will update you once a decision is made.',
      color: '#f59e0b',
      button: 'Check Status'
    }
  };
  
  const statusInfo = statusMessages[newStatus] || {
    subject: 'Application Status Update',
    message: 'Your application status has been updated. Please log in to view details.',
    color: '#667eea',
    button: 'View Details'
  };
  
  const mailOptions = {
    from: `"DeVere Care Recruitment" <${process.env.EMAIL_USER}>`,
    to: applicant.contactDetails.email,
    subject: statusInfo.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0;">DeVere Care</h1>
          <p style="margin: 10px 0 0;">Application Status Update</p>
        </div>
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b;">Dear ${applicant.personalDetails.forename},</h2>
          <div style="background: ${statusInfo.color}20; border-left: 4px solid ${statusInfo.color}; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p style="margin: 0; color: ${statusInfo.color}; font-weight: bold;">Application Status: ${newStatus.toUpperCase()}</p>
          </div>
          <p>${statusInfo.message}</p>
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Application Details</h3>
            <p><strong>Reference Number:</strong> DEV${applicant._id.toString().slice(-8)}</p>
            <p><strong>Position:</strong> ${applicant.personalDetails.positionApplied}</p>
            <p><strong>Status Updated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <div style="text-align: center; margin-top: 25px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/applicant/${applicant._id}" 
               style="background: ${statusInfo.color}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
              ${statusInfo.button}
            </a>
          </div>
          <p style="margin-top: 20px;">If you have any questions, please contact our HR department.</p>
          <p>Best regards,<br><strong>DeVere Care Recruitment Team</strong></p>
        </div>
        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 12px;">
          <p>DeVere Care - Compassionate Care, Professional Service</p>
          <p style="font-size: 10px;">This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Status update email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Status update email failed:', error);
    return false;
  }
};

module.exports = { sendApplicationSubmittedEmail, sendStatusUpdateEmail };