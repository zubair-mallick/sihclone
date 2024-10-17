"use server"

import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { responseschema } from "./responseSchemaResource";
// adjust path as needed


const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY is not defined in the environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey); // Ensure you use NEXT_PUBLIC prefix for env variables on the frontend

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
      // Define your response schema accordingly
      responseSchema: responseschema,
    }
  });

export const getResources = async (frontendinput: string): Promise<any> =>{
    try {
 if(!frontendinput){
    throw new Error("Input cannot be empty");
 }
 const prompt = `Based on the following knowledge and interests: ${frontendinput}, provide relevant groups and materials with links.`;

 const  result =await model.generateContent(prompt)
 const resources = await result.response.text();

 return JSON.parse(resources)

        
    } catch (error) {
        console.error("Error processing request:", error);
        throw new Error("Internal Server Error");
    }

}