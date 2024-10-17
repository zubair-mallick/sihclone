import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import dotenv from 'dotenv';
import { responseSchemaCareerGuidance } from '../schemas/responseSchemaCareerGuidance.js';

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
    responseSchema: responseSchemaCareerGuidance,
  }
});

export const getCareerGuidance = async (req, res) => {
  try {
    const { frontendinput } = req.body;
    if (!frontendinput) {
      res.status(401).json({ error: "Please provide input." });
      return;
    }

    const prompt = `Based on the following input: ${frontendinput}, provide detailed career guidance including relevant exams, scholarships, prerequisites, and programs.`;

    const result = await model.generateContent(prompt);
    const careerGuidance = result.response.text(); // Await the result properly
    res.json(JSON.parse(careerGuidance));
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
