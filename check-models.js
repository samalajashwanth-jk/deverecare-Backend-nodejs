require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function checkModels() {
  try {
    const models = await groq.models.list();

    console.log("Available Groq models:");

    for (const model of models.data) {
      console.log(`- ${model.id}`);
    }
  } catch (error) {
    console.error("Failed to fetch models:");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

checkModels();
