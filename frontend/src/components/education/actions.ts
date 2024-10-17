"use server"

import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
// adjust path as needed
import {responseSchemaCareerRecommendations} from './responseSchemaSuggestor'

const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY is not defined in the environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  safetySettings,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: responseSchemaCareerRecommendations,
  },
});

// Action for getting career recommendations
export const getCareerRecommendations = async (frontendinput: string): Promise<any> => {
  try {
    if (!frontendinput) {
      throw new Error("Frontend input is required");
    }

    const prompt = `Based on the following knowledge and interests: ${frontendinput}, recommend suitable career options and explain why each career is a good fit.`;

    const result = await model.generateContent(prompt);
    const careerRecommendations = await result.response.text(); // Await correctly

    return JSON.parse(careerRecommendations);
  } catch (error) {
    console.error("Error processing request:", error);
    throw new Error("Internal Server Error");
  }
};
