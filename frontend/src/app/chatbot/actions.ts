"use server"
// actions.ts (server-side logic)
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";


const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);


interface SchemaType {
  type: string;
  description: string;
}

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
    responseSchema: {
      type: "string" as any ,
      description: "The generated response from the AI model.",
    },
  },

});

// Action for handling the chat logic
export const getCareerGuidanceResponse = async (userInput: string, chatHistory: string) => {
  try {
    if (!userInput) {
      throw new Error("User input is required");
    }

    // Create the prompt with provided chat history and user input
    const prompt = `
      You are a knowledgeable and supportive AI career advisor. Your goal is to help students navigate their career choices, provide guidance, and assist them in making informed decisions about their future.

      Chat Log:
      ${chatHistory}

      User Input: "${userInput}"

      Instructions:
      - Analyze the user's situation based on the chat history.
      - Provide practical and personalized advice related to the user's career goals and aspirations.
      - Offer information on different career paths, educational requirements, and potential job opportunities.
      - Structure responses in a clear, numbered format when offering steps or advice.
      - Encourage and guide users positively.

      User Question: "${userInput}"
    `;

    // Generate the response from the AI model
    const result = await model.generateContent(prompt.trim());
    const response = result.response.text();

    // Return the generated response
    return { response };
  } catch (error) {
    console.error("Error processing AI request:", error);
    throw new Error("Failed to generate response from AI.");
  }
};
