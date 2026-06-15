// backend/list-models.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Try different model names
  const modelsToTry = [
    "gemini-pro",
    "gemini-1.0-pro", 
    "gemini-1.5-pro",
    "gemini-1.5-flash"
  ];
  
  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("test");
      console.log(`✅ ${modelName} - WORKING`);
    } catch (error) {
      console.log(`❌ ${modelName} - NOT AVAILABLE`);
    }
  }
}

listModels();