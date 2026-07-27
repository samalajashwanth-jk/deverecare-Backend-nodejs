
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