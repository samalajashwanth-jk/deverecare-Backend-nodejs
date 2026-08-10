// // backend/services/aiService.js
// const Groq = require('groq-sdk');
// require('dotenv').config();

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// const parseResumeWithAI = async (resumeText) => {
// //      const prompt = `
// //     This is a FILLED APPLICATION FORM, not a resume.
// //     Extract ALL the data exactly as it appears.
    
// //     The form contains sections:
// //     - Personal Details (Title, Forename, Surname, Address, Postcode, DOB, Mobile, Email, NI Number)
// //     - Next of Kin (Name, Relationship, Address, Postcode, Mobile)
// //     - Working Hours (Monday-Sunday shifts like "morning", "afternoon", "evening", "night")
// //     - Client Procedures (Yes/No answers for bathing, dressing, etc.)
// //     - Client Groups (Yes/No answers)
// //     - References (First and Second reference details)
// //     - Declaration (Signed, Print Name, Date)
    
// //     Extract EVERYTHING. For checkboxes, look for marked items (✓, x, or filled).
    
// //     Return EXACT JSON structure matching the form.
    
// //     Form text:
// //     ${pdfText}
// //   `;
//   const prompt = `
//     You are an expert resume parser for a CARE WORKER application form.
//     Extract EVERY piece of information from this resume and return ONLY valid JSON.
    
//     IMPORTANT RULES:
//     - If information is NOT found in resume, use DEFAULT values (empty string "" for text, false for boolean, [] for arrays)
//     - For work history: Extract ALL jobs (max 10), preserve chronological order
//     - For education: Extract ALL qualifications (max 5)
//     - For dates: Convert to YYYY-MM-DD format (use 01 for day if only month/year given)
//     - For Yes/No fields: infer from resume context (e.g., "driving licence" in resume = true)
//     - For working hours: Infer from resume (e.g., "available weekends" = Saturday/Sunday shifts)
//     - For client procedures: Infer from experience mentioned (e.g., "personal care" = Yes)
//     - For email: Identify the email and fill the field.
//     - for mobile number : find for contact details and fill the field
    
//     Return EXACTLY this JSON structure (no extra fields, no markdown, no explanation):
    
//     {
//       "personalDetails": {
//         "title": "",
//         "forename": "",
//         "surname": "",
//         "previousNames": "",
//         "address": "",
//         "postcode": "",
//         "dateOfBirth": "",
//         "telephone": "",
//         "mobile": "",
//         "email": "",
//         "nationalInsuranceNumber": "",
//         "positionApplied": "Care Assistant",
//         "languages": ["English"]
//       },
//       "eligibility": {
//         "drivingLicence": false,
//         "carAvailable": false,
//         "eligibleToWorkInUK": true
//       },
//       "education": [
//         {
//           "institution": "",
//           "startDate": "",
//           "endDate": "",
//           "qualification": ""
//         }
//       ],
//       "workHistory": [
//         {
//           "jobTitle": "",
//           "fromDate": "",
//           "toDate": "",
//           "duties": "",
//           "reasonForLeaving": ""
//         }
//       ],
//       "healthDeclaration": "No",
//       "suitabilityStatement": "",
//       "availability": {
//         "workingHours": {
//           "monday": [],
//           "tuesday": [],
//           "wednesday": [],
//           "thursday": [],
//           "friday": [],
//           "saturday": [],
//           "sunday": []
//         },
//         "bankHolidays": "No"
//       },
//       "clientProcedures": {
//         "personalCare": {
//           "bathing": "",
//           "stripWash": "",
//           "bathAids": "",
//           "bedBath": "",
//           "dressing": "",
//           "mouthCare": "",
//           "footCare": "",
//           "shaving": ""
//         },
//         "personalCareSupport": {
//           "pressureArea": "",
//           "promptingMedication": "",
//           "terminalCare": "",
//           "confidentiality": "",
//           "reportWriting": "",
//           "mealPreparation": "",
//           "feeding": ""
//         },
//         "toileting": {
//           "commode": "",
//           "bladderAwareness": "",
//           "bowelAwareness": "",
//           "padsDisposal": ""
//         },
//         "mobility": {
//           "transferring": "",
//           "walkingAids": "",
//           "hoists": ""
//         },
//         "practicalTasks": {
//           "lightHousework": "",
//           "shopping": "",
//           "laundry": ""
//         }
//       },
//       "clientGroups": {
//         "frailElderly": "",
//         "sensoryDisabilities": "",
//         "mentalHealth": "",
//         "physicalDisabilities": "",
//         "learningDisabilities": "",
//         "childrenAndFamilies": ""
//       },
//       "equalOpportunities": {
//         "ageGroup": "",
//         "maritalStatus": "",
//         "hasDisability": "",
//         "gender": "",
//         "sexualOrientation": "",
//         "ethnicity": "",
//         "religion": ""
//       },
//       "references": [
//         {
//           "title": "",
//           "name": "",
//           "organisation": "",
//           "position": "",
//           "address": "",
//           "postcode": "",
//           "telephone": "",
//           "email": ""
//         },
//         {
//           "title": "",
//           "name": "",
//           "organisation": "",
//           "position": "",
//           "address": "",
//           "postcode": "",
//           "telephone": "",
//           "email": ""
//         }
//       ],
//       "declaration": {
//         "signed": "",
//         "printName": "",
//         "date": ""
//       },
//       "criminalConviction": "No"
//     }
    
//     Resume text:
//     ${resumeText.substring(0, 12000)}
//   `;
  
//   try {
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "llama-3.3-70b-versatile",
//       temperature: 0.1,
//       max_tokens: 8000
//     });
    
//     let response = chatCompletion.choices[0]?.message?.content;
//     response = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
//     return JSON.parse(response);
//   } catch (error) {
//     console.error("AI parsing error:", error);
//     return null;
//   }
// };

// module.exports = { parseResumeWithAI };
// backend/services/aiService.js
// backend/services/aiService.js
const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const parseFilledFormPDF = async (pdfText) => {
  const prompt = `
    You are parsing a COMPLETELY FILLED application form. Extract EVERY field value exactly as it appears.
    
    CRITICAL RULES FOR DATES:
    - ALL dates MUST be in YYYY-MM-DD format (example: 2024-03-15)
    - HTML date inputs ONLY accept this exact format
    - Convert any date format you find to YYYY-MM-DD
    
    Date conversion examples:
    - "15/03/1990" → "1990-03-15"
    - "March 15, 1990" → "1990-03-15"
    - "15th March 1990" → "1990-03-15"
    - "03/15/1990" → "1990-03-15"
    - "Mar 2024" → "2024-03-01"
    - "2024" → "2024-01-01"
    - "2020-2024" (for education) → start: "2020-01-01", end: "2024-12-31"
    
    The form contains these exact sections with values:
    
    1. PERSONAL DETAILS:
    - title: (Mr/Mrs/Ms/Dr)
    - forename: (first name)
    - surname: (last name)
    - previousNames: (if any)
    - address: (full address)
    - postcode: (postal code)
    - dateOfBirth: (YYYY-MM-DD format)
    - telephone: (phone number)
    - mobile: (mobile number)
    - email: (email address)
    - nationalInsuranceNumber: (NI number)
    - positionApplied: (job position)
    - languages: (comma separated or array)
    
    2. NEXT OF KIN DETAILS:
    - name: (full name)
    - relationship: (spouse/parent/etc)
    - address: (full address)
    - postcode: (postal code)
    - mobile: (phone number)
    
    3. ELIGIBILITY (Yes/No):
    - drivingLicence
    - carAvailable
    - eligibleToWorkInUK
    
    4. EDUCATION (multiple entries possible):
    Each entry has: institution, startDate (YYYY-MM-DD), endDate (YYYY-MM-DD), qualification
    
    5. WORK HISTORY (multiple entries possible):
    Each entry has: jobTitle, fromDate (YYYY-MM-DD), toDate (YYYY-MM-DD), duties, reasonForLeaving
    
    6. WORKING HOURS:
    For each day (monday to sunday), shifts selected: "morning", "lunch", "afternoon", "evening", "night"
    bankHolidays: "Yes" or "No"
    
    7. CLIENT PROCEDURES (All Yes/No):
    personalCare: { bathing, stripWash, bathAids, bedBath, dressing, mouthCare, footCare, shaving }
    personalCareSupport: { pressureArea, promptingMedication, terminalCare, confidentiality, reportWriting, mealPreparation, feeding }
    toileting: { commode, bladderAwareness, bowelAwareness, padsDisposal }
    mobility: { transferring, walkingAids, hoists }
    practicalTasks: { lightHousework, shopping, laundry }
    
    8. CLIENT GROUPS (All Yes/No):
    frailElderly, sensoryDisabilities, mentalHealth, physicalDisabilities, learningDisabilities, childrenAndFamilies
    
    9. EQUAL OPPORTUNITIES:
    ageGroup, maritalStatus, hasDisability, gender, sexualOrientation, ethnicity, religion
    
    10. REFERENCES (Two references):
    Each has: title, name, organisation, position, address, postcode, telephone, email
    
    11. DECLARATION:
    signed, printName, date (YYYY-MM-DD)
    criminalConviction: "Yes" or "No"
    
    Return ONLY valid JSON with this exact structure. Use empty string "" for missing text fields, false for missing booleans, [] for missing arrays.
    
    PDF Text Content:
    ${pdfText.substring(0, 15000)}
  `;
  
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.05,
      max_tokens: 8000
    });
    
    let response = chatCompletion.choices[0]?.message?.content;
    response = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(response);
  } catch (error) {
    console.error("AI parsing error:", error);
    return null;
  }
};

module.exports = { parseFilledFormPDF };