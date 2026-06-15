// const mongoose = require("mongoose");

// const userFormSchema = new mongoose.Schema({
//   personalDetails: {
//     positionApplied: { type: String, required: true },  // Made required
//     passportPhoto: { type: String },  // Store as String (file path or base64) - changed from 'jpg'
//     title: { type: String, required: true },
//     forename: { type: String, required: true },
//     surname: { type: String, required: true },
//     previousNames: { type: String },
//     address: { type: String, required: true },
//     postcode: { type: String, required: true },
//     dateOfBirth: { type: Date, required: true },  // Changed from 'dob' to match your frontend
//      nationalInsuranceNumber: { type: String, unique: true, sparse: true }, // Changed from 'niNumber'
//     languages: { type: [String], default: [] }  // Array of strings
//   },

//   nextOfKinDetails: {
//     name: { type: String, required: true },
//     relationship: { type: String, required: true },
//     address: { type: String, required: true },
//     postcode: { type: String, required: true },
//     telephone: { type: String },  // Optional
//     mobileNum: { type: String, required: true }
//   },

//   contactDetails: {
//     telephone: { type: String },  // Optional
//     mobile: { type: String, unique: true, sparse: true },
//     email: { type: String, unique: true, sparse: true, lowercase: true }
//   },

//   eligibility: {
//     drivingLicence: { type: Boolean, required: true },
//     carAvailable: { type: Boolean, required: true },
//     eligibleToWorkInUK: { type: Boolean, required: true }  // Changed from 'eligibleToWork'
//   },

//   education: [
//     {
//       institution: { type: String, required: true },
//       startDate: { type: Date, required: true },
//       endDate: { type: Date, required: true },
//       qualification: { type: String, required: true }
//     }
//   ],

//   workHistory: [
//     {
//       jobTitle: { type: String, required: true },
//       fromDate: { type: Date, required: true },  // Changed from 'from'
//       toDate: { type: Date, required: true },    // Changed from 'to'
//       duties: { type: String, required: true },
//       reasonForLeaving: { type: String, required: true }
//     }
//   ],

//   availability: {
//     workingHours: {
//       monday: { type: [String], default: [] },    // Changed to array for multiple shifts
//       tuesday: { type: [String], default: [] },
//       wednesday: { type: [String], default: [] },
//       thursday: { type: [String], default: [] },
//       friday: { type: [String], default: [] },
//       saturday: { type: [String], default: [] },
//       sunday: { type: [String], default: [] }
//     },
//     bankHolidays: { type: String, enum: ['Yes', 'No'], required: true }  // Changed to String with enum
//   },

//   clientProcedures: {
//     personalCare: {
//       bathing: { type: String, enum: ['Yes', 'No'], default: '' },
//       stripWash: { type: String, enum: ['Yes', 'No'], default: '' },
//       bathAids: { type: String, enum: ['Yes', 'No'], default: '' },
//       bedBath: { type: String, enum: ['Yes', 'No'], default: '' },
//       dressing: { type: String, enum: ['Yes', 'No'], default: '' },
//       mouthCare: { type: String, enum: ['Yes', 'No'], default: '' },
//       footCare: { type: String, enum: ['Yes', 'No'], default: '' },
//       shaving: { type: String, enum: ['Yes', 'No'], default: '' }
//     },
//     personalCareSupport: {
//       pressureArea: { type: String, enum: ['Yes', 'No'], default: '' },
//       promptingMedication: { type: String, enum: ['Yes', 'No'], default: '' },
//       terminalCare: { type: String, enum: ['Yes', 'No'], default: '' },
//       confidentiality: { type: String, enum: ['Yes', 'No'], default: '' },
//       reportWriting: { type: String, enum: ['Yes', 'No'], default: '' },
//       mealPreparation: { type: String, enum: ['Yes', 'No'], default: '' },
//       feeding: { type: String, enum: ['Yes', 'No'], default: '' }
//     },
//     toileting: {
//       commode: { type: String, enum: ['Yes', 'No'], default: '' },
//       bladderAwareness: { type: String, enum: ['Yes', 'No'], default: '' },
//       bowelAwareness: { type: String, enum: ['Yes', 'No'], default: '' },
//       padsDisposal: { type: String, enum: ['Yes', 'No'], default: '' }
//     },
//     mobility: {
//       transferring: { type: String, enum: ['Yes', 'No'], default: '' },
//       walkingAids: { type: String, enum: ['Yes', 'No'], default: '' },
//       hoists: { type: String, enum: ['Yes', 'No'], default: '' }
//     },
//     practicalTasks: {
//       lightHousework: { type: String, enum: ['Yes', 'No'], default: '' },
//       shopping: { type: String, enum: ['Yes', 'No'], default: '' },
//       laundry: { type: String, enum: ['Yes', 'No'], default: '' }
//     }
//   },

//   clientGroups: {
//     frailElderly: { type: String, enum: ['Yes', 'No'], default: '' },
//     sensoryDisabilities: { type: String, enum: ['Yes', 'No'], default: '' },
//     mentalHealth: { type: String, enum: ['Yes', 'No'], default: '' },
//     physicalDisabilities: { type: String, enum: ['Yes', 'No'], default: '' },
//     learningDisabilities: { type: String, enum: ['Yes', 'No'], default: '' },
//     childrenAndFamilies: { type: String, enum: ['Yes', 'No'], default: '' }
//   },

//   declarations: {
//     healthDeclaration: { type: String, enum: ['Yes', 'No'], required: true },  // Changed to String
//     suitabilityStatement: { type: String, required: true, minlength: 20 },
//     criminalConviction: { type: String, enum: ['Yes', 'No'], required: true }  // Added from rehabilitation
//   },

//   equalOpportunities: {
//     ageGroup: { type: String, required: true },
//     maritalStatus: { type: String, required: true },
//     hasDisability: { type: String, enum: ['Yes', 'No'], required: true },
//     gender: { type: String, required: true },
//     sexualOrientation: { type: String, required: true },
//     ethnicity: { type: String, required: true },
//     religion: { type: String }
//   },

//   references: [
//     {
//       title: { type: String, required: true },
//       name: { type: String, required: true },
//       organisation: { type: String, required: true },
//       position: { type: String, required: true },
//       address: { type: String, required: true },
//       postcode: { type: String, required: true },
//       telephone: { type: String, required: true },
//       email: { type: String, required: true, lowercase: true }
//     }
//   ],

//   finalDeclaration: {
//     signed: { type: String, required: true },
//     printName: { type: String, required: true },
//     date: { type: Date, required: true, default: Date.now }
//   },
//    officeUse: {
//     firstInterviewer: { type: String, default: '' },
//     secondInterviewer: { type: String, default: '' },
//     interviewDate: { type: Date },
//     interviewComments: { type: String, default: '' },
//     interviewOutcome: { type: String, enum: ['', 'Successful', 'Unsuccessful', 'On Hold'], default: '' },
//     department: { type: String, default: '' },
//     trainingFrom: { type: Date },
//     trainingTo: { type: Date }
//   },
  
//   applicationStatus: { 
//     type: String, 
//     enum: ['pending', 'completed', 'on-hold', 'rejected'], 
//     default: 'pending' 
//   }

//   // ========== OFFICE USE ONLY - COMMENT THESE OUT FOR NOW ==========
//   /*
//   officeUse: {
//     firstInterviewer: { type: String },
//     secondInterviewer: { type: String },
//     interviewDate: { type: Date },
//     interviewComments: { type: String },
//     interviewOutcome: { type: String, enum: ['Yes', 'No'] },
//     department: { type: String },
//     trainingFrom: { type: Date },
//     trainingTo: { type: Date }
//   },
  
//   applicationStatus: {
//     type: String,
//     enum: ['pending', 'reviewing', 'shortlisted', 'interviewed', 'accepted', 'rejected'],
//     default: 'pending'
//   },
  
//   submittedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
  
//   reviewedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
  
//   reviewedAt: { type: Date },
  
//   notes: { type: String }
//   */
  
// }, { timestamps: true });
// userFormSchema.index({ 'contactDetails.email': 1 }, { unique: true, sparse: true });
// userFormSchema.index({ 'contactDetails.mobile': 1 }, { unique: true, sparse: true });
// userFormSchema.index({ 'personalDetails.nationalInsuranceNumber': 1 }, { unique: true, sparse: true });

// module.exports = mongoose.model("UserForm", userFormSchema);

// const mongoose = require('mongoose');

// const userFormSchema = new mongoose.Schema({
//   personalDetails: {
//     positionApplied: { type: String, required: true },
//     passportPhoto: { type: String }, // Store base64 or URL
//     passportPhotoData: { type: String }, // Store base64 data
//     title: { type: String, required: true },
//     forename: { type: String, required: true },
//     surname: { type: String, required: true },
//     previousNames: { type: String },
//     address: { type: String, required: true },
//     postcode: { type: String, required: true },
//     dateOfBirth: { type: Date, required: true },
//     nationalInsuranceNumber: { type: String, required: true, unique: true, sparse: true },
//     languages: { type: [String], default: [] }
//   },
//   nextOfKinDetails: {
//     name: { type: String, required: true },
//     relationship: { type: String, required: true },
//     address: { type: String, required: true },
//     postcode: { type: String, required: true },
//     telephone: { type: String },
//     mobileNum: { type: String, required: true }
//   },
//   contactDetails: {
//     telephone: { type: String },
//     mobile: { type: String, required: true, unique: true, sparse: true },
//     email: { type: String, required: true, unique: true, sparse: true, lowercase: true }
//   },
//   eligibility: {
//     drivingLicence: { type: Boolean, required: true },
//     carAvailable: { type: Boolean, required: true },
//     eligibleToWorkInUK: { type: Boolean, required: true }
//   },
//   education: [{
//     institution: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     qualification: { type: String, required: true }
//   }],
//   workHistory: [{
//     jobTitle: { type: String, required: true },
//     fromDate: { type: Date, required: true },
//     toDate: { type: Date, required: true },
//     duties: { type: String, required: true },
//     reasonForLeaving: { type: String, required: true }
//   }],
//   availability: {
//     workingHours: {
//       monday: { type: [String], default: [] },
//       tuesday: { type: [String], default: [] },
//       wednesday: { type: [String], default: [] },
//       thursday: { type: [String], default: [] },
//       friday: { type: [String], default: [] },
//       saturday: { type: [String], default: [] },
//       sunday: { type: [String], default: [] }
//     },
//     bankHolidays: { type: String, enum: ['Yes', 'No'], required: true }
//   },
//   clientProcedures: {
//     personalCare: {
//       bathing: { type: String, enum: ['Yes', 'No'], default: '' },
//       stripWash: { type: String, enum: ['Yes', 'No'], default: '' },
//       bathAids: { type: String, enum: ['Yes', 'No'], default: '' },
//       bedBath: { type: String, enum: ['Yes', 'No'], default: '' },
//       dressing: { type: String, enum: ['Yes', 'No'], default: '' },
//       mouthCare: { type: String, enum: ['Yes', 'No'], default: '' },
//       footCare: { type: String, enum: ['Yes', 'No'], default: '' },
//       shaving: { type: String, enum: ['Yes', 'No'], default: '' }
//     },
//     personalCareSupport: {
//       pressureArea: { type: String, enum: ['Yes', 'No'], default: '' },
//       promptingMedication: { type: String, enum: ['Yes', 'No'], default: '' },
//       terminalCare: { type: String, enum: ['Yes', 'No'], default: '' },
//       confidentiality: { type: String, enum: ['Yes', 'No'], default: '' },
//       reportWriting: { type: String, enum: ['Yes', 'No'], default: '' },
//       mealPreparation: { type: String, enum: ['Yes', 'No'], default: '' },
//       feeding: { type: String, enum: ['Yes', 'No'], default: '' }
//     },
//     toileting: {
//       commode: { type: String, enum: ['Yes', 'No'], default: '' },
//       bladderAwareness: { type: String, enum: ['Yes', 'No'], default: '' },
//       bowelAwareness: { type: String, enum: ['Yes', 'No'], default: '' },
//       padsDisposal: { type: String, enum: ['Yes', 'No'], default: '' }
//     },
//     mobility: {
//       transferring: { type: String, enum: ['Yes', 'No'], default: '' },
//       walkingAids: { type: String, enum: ['Yes', 'No'], default: '' },
//       hoists: { type: String, enum: ['Yes', 'No'], default: '' }
//     },
//     practicalTasks: {
//       lightHousework: { type: String, enum: ['Yes', 'No'], default: '' },
//       shopping: { type: String, enum: ['Yes', 'No'], default: '' },
//       laundry: { type: String, enum: ['Yes', 'No'], default: '' }
//     }
//   },
//   // clientGroups: {
//   //   frailElderly: { type: String, enum: ['Yes', 'No'], default: '' },
//   //   sensoryDisabilities: { type: String, enum: ['Yes', 'No'], default: '' },
//   //   mentalHealth: { type: String, enum: ['Yes', 'No'], default: '' },
//   //   physicalDisabilities: { type: String, enum: ['Yes', 'No'], default: '' },
//   //   learningDisabilities: { type: String, enum: ['Yes', 'No'], default: '' },
//   //   childrenAndFamilies: { type: String, enum: ['Yes', 'No'], default: '' }
//   // },\
//   clientGroups: {
//   frailElderly: { type: String, default: '' },
//   sensoryDisabilities: { type: String, default: '' },
//   mentalHealth: { type: String, default: '' },
//   physicalDisabilities: { type: String, default: '' },
//   learningDisabilities: { type: String, default: '' },
//   childrenAndFamilies: { type: String, default: '' }
// },
//   declarations: {
//     healthDeclaration: { type: String, enum: ['Yes', 'No'], required: true },
//     suitabilityStatement: { type: String, required: true, minlength: 20 },
//     criminalConviction: { type: String, enum: ['Yes', 'No'], required: true }
//   },
//   equalOpportunities: {
//     ageGroup: { type: String, required: true },
//     maritalStatus: { type: String, required: true },
//     hasDisability: { type: String, enum: ['Yes', 'No'], required: true },
//     gender: { type: String, required: true },
//     sexualOrientation: { type: String, required: true },
//     ethnicity: { type: String, required: true },
//     religion: { type: String }
//   },
//   references: [{
//     title: { type: String, required: true },
//     name: { type: String, required: true },
//     organisation: { type: String, required: true },
//     position: { type: String, required: true },
//     address: { type: String, required: true },
//     postcode: { type: String, required: true },
//     telephone: { type: String, required: true },
//     email: { type: String, required: true, lowercase: true }
//   }],
//   finalDeclaration: {
//     signed: { type: String, required: true },
//     printName: { type: String, required: true },
//     date: { type: Date, required: true, default: Date.now }
//   },
//   // Office Use Fields
//   officeUse: {
//     firstInterviewer: { type: String, default: '' },
//     secondInterviewer: { type: String, default: '' },
//     interviewDate: { type: Date },
//     interviewComments: { type: String, default: '' },
//     interviewOutcome: { type: String, enum: ['', 'Successful', 'Unsuccessful', 'On Hold'], default: '' },
//     department: { type: String, default: '' },
//     trainingFrom: { type: Date },
//     trainingTo: { type: Date }
//   },
//   applicationStatus: {
//     type: String,
//     enum: ['pending', 'completed', 'rejected', 'on-hold'],
//     default: 'pending'
//   },
//   emailSent: {
//     type: Boolean,
//     default: false
//   },
//   emailSentAt: {
//     type: Date
//   },
//   deleted: {
//     type: Boolean,
//     default: false
//   },
//   deletedAt: {
//     type: Date
//   }
// }, { timestamps: true });

// Indexes for better performance
// userFormSchema.index({ 'contactDetails.email': 1 });
// userFormSchema.index({ 'personalDetails.nationalInsuranceNumber': 1 });
// userFormSchema.index({ applicationStatus: 1 });
// userFormSchema.index({ createdAt: -1 });
// userFormSchema.index({ deleted: 1 });

// module.exports = mongoose.model('UserForm', userFormSchema);

const mongoose = require('mongoose');

const userFormSchema = new mongoose.Schema({
  personalDetails: {
    positionApplied: { type: String, default: '' },
    passportPhoto: { type: String, default: '' },
    passportPhotoData: { type: String, default: '' },
    title: { type: String, default: '' },
    forename: { type: String, default: '' },
    surname: { type: String, default: '' },
    previousNames: { type: String, default: '' },
    address: { type: String, default: '' },
    postcode: { type: String, default: '' },
    dateOfBirth: { type: Date },
    nationalInsuranceNumber: { type: String, unique: true, sparse: true },
    languages: { type: [String], default: [] }
  },
  nextOfKinDetails: {
    name: { type: String, default: '' },
    relationship: { type: String, default: '' },
    address: { type: String, default: '' },
    postcode: { type: String, default: '' },
    telephone: { type: String, default: '' },
    mobileNum: { type: String, default: '' }
  },
  contactDetails: {
    telephone: { type: String, default: '' },
    mobile: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true, lowercase: true }
  },
  eligibility: {
    drivingLicence: { type: Boolean, default: false },
    carAvailable: { type: Boolean, default: false },
    eligibleToWorkInUK: { type: Boolean, default: false }
  },
  education: [{
    institution: { type: String, default: '' },
    startDate: { type: Date },
    endDate: { type: Date },
    qualification: { type: String, default: '' }
  }],
  workHistory: [{
    jobTitle: { type: String, default: '' },
    fromDate: { type: Date },
    toDate: { type: Date },
    duties: { type: String, default: '' },
    reasonForLeaving: { type: String, default: '' }
  }],
  availability: {
    workingHours: {
      monday: { type: [String], default: [] },
      tuesday: { type: [String], default: [] },
      wednesday: { type: [String], default: [] },
      thursday: { type: [String], default: [] },
      friday: { type: [String], default: [] },
      saturday: { type: [String], default: [] },
      sunday: { type: [String], default: [] }
    },
    bankHolidays: { type: String, default: '' }
  },
  clientProcedures: {
    personalCare: {
      bathing: { type: String, default: '' },
      stripWash: { type: String, default: '' },
      bathAids: { type: String, default: '' },
      bedBath: { type: String, default: '' },
      dressing: { type: String, default: '' },
      mouthCare: { type: String, default: '' },
      footCare: { type: String, default: '' },
      shaving: { type: String, default: '' }
    },
    personalCareSupport: {
      pressureArea: { type: String, default: '' },
      promptingMedication: { type: String, default: '' },
      terminalCare: { type: String, default: '' },
      confidentiality: { type: String, default: '' },
      reportWriting: { type: String, default: '' },
      mealPreparation: { type: String, default: '' },
      feeding: { type: String, default: '' }
    },
    toileting: {
      commode: { type: String, default: '' },
      bladderAwareness: { type: String, default: '' },
      bowelAwareness: { type: String, default: '' },
      padsDisposal: { type: String, default: '' }
    },
    mobility: {
      transferring: { type: String, default: '' },
      walkingAids: { type: String, default: '' },
      hoists: { type: String, default: '' }
    },
    practicalTasks: {
      lightHousework: { type: String, default: '' },
      shopping: { type: String, default: '' },
      laundry: { type: String, default: '' }
    }
  },
  clientGroups: {
    frailElderly: { type: String, default: '' },
    sensoryDisabilities: { type: String, default: '' },
    mentalHealth: { type: String, default: '' },
    physicalDisabilities: { type: String, default: '' },
    learningDisabilities: { type: String, default: '' },
    childrenAndFamilies: { type: String, default: '' }
  },
  declarations: {
    healthDeclaration: { type: String, default: '' },
    suitabilityStatement: { type: String, default: '' },
    criminalConviction: { type: String, default: '' },
     convictionReason: { type: String, default: '' }
  },
  equalOpportunities: {
    ageGroup: { type: String, default: '' },
    maritalStatus: { type: String, default: '' },
    hasDisability: { type: String, default: '' },
    gender: { type: String, default: '' },
    sexualOrientation: { type: String, default: '' },
    ethnicity: { type: String, default: '' },
    religion: { type: String, default: '' }
  },
  references: [{
    title: { type: String, default: '' },
    name: { type: String, default: '' },
    organisation: { type: String, default: '' },
    position: { type: String, default: '' },
    address: { type: String, default: '' },
    postcode: { type: String, default: '' },
    telephone: { type: String, default: '' },
    email: { type: String, default: '' }
  }],
  finalDeclaration: {
    signed: { type: String, default: '' },
    printName: { type: String, default: '' },
    date: { type: Date, default: Date.now }
  },
  officeUse: {
    firstInterviewer: { type: String, default: '' },
    secondInterviewer: { type: String, default: '' },
    interviewDate: { type: Date },
    interviewComments: { type: String, default: '' },
    interviewOutcome: { type: String, default: '' },
    department: { type: String, default: '' },
    trainingFrom: { type: Date },
    trainingTo: { type: Date }
  },
  applicationStatus: { type: String, default: 'pending' },
  emailSent: { type: Boolean, default: false },
  emailSentAt: { type: Date },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date }
}, { timestamps: true });

// Remove unique indexes temporarily to avoid duplicate key errors
// Uncomment these if you want unique constraints
// userFormSchema.index({ 'contactDetails.email': 1 }, { unique: true, sparse: true });
// userFormSchema.index({ 'contactDetails.mobile': 1 }, { unique: true, sparse: true });
// userFormSchema.index({ 'personalDetails.nationalInsuranceNumber': 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('UserForm', userFormSchema);