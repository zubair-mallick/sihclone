"use server"

import { careerGuidanceSchema } from "@/types/CareerGuidanceSchema";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { responseSchemaCounselling } from "./responseSchemaCounselling";

// Set up Google Generative AI instance
const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY is not defined in the environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey);

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
    responseSchema:responseSchemaCounselling
  },
});

export const getCareerGuide = async (frontendInput: string) => {
  try {
    if (!frontendInput) {
      throw new Error("No input found");
    }

    const prompt = `Based on the following input: ${frontendInput}, provide detailed career guidance including relevant exams, scholarships, prerequisites, and programs.`;


    const res= await model.generateContent(prompt);

    const guidence = await res.response.text()

    return JSON.parse(guidence)

   // Return the validated data
  } catch (error) {
    console.error("Error processing AI request:", error);
    throw new Error("Failed to generate response from AI.");
  }
};
