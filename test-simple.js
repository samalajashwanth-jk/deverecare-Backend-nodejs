// backend/test-groq.js
const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function test() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Say 'API is working'" }],
      model: "llama-3.3-70b-versatile",
    });
    console.log("✅ SUCCESS!", chatCompletion.choices[0]?.message?.content);
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

test();