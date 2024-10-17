import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import dotenv from 'dotenv';
import {responseschema} from '../schemas/resonseSchemaResource.js'

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.key);

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  safetySettings,
  generationConfig: {
    responseMimeType: "application/json",
    // Define your response schema accordingly
    responseSchema: responseschema,
  }
});

export const getResources = async (req, res) => {
  try {
    const { frontendinput } = req.body;
    if (!frontendinput) {
      return res.status(400).json({ error: "Provide frontend input" });
    }

    const prompt = `Based on the following knowledge and interests: ${frontendinput}, provide relevant groups and materials with links.`;

    let result = await model.generateContent(prompt);
    let resources = result.response.text(); 
    res.json(JSON.parse(resources));
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
