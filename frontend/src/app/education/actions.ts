"use server"

// app/actions.ts (server-side actions)
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { responseSchemaSteps } from "./responseSchemaSteps"; // Ensure you have the proper schema

// Type for the generated response from the model
interface GeneratedResponse {
  text: string;
}

// Type for model generation result
interface ModelResult {
  response: GeneratedResponse;
}

// Define the type for frontend input
type FrontendInput = string;

// Define the type for the tree node structure
interface TreeNode {
  name: string;
  details?: string;
  links?: string[];
  children?: TreeNode[];
}

// Set up the API key in a more secure way (environment variables)
const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY is not defined in the environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey );

// Safety settings for the AI model
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

// Configuration for the AI model generation
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  safetySettings,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: responseSchemaSteps,
  },
});

// Variables to store previous prompt and generated data
let oldPrompt: FrontendInput | null = null;
let treeData: string | null = null;

/**
 * Generates the tree data based on the frontend input.
 * @param frontendinput - The input query provided by the user.
 * @returns A promise that resolves to the parsed JSON data in the TreeNode structure.
 */
export const generateTreeData = async (frontendinput: string): Promise<TreeNode> => {
  try {
    // Validate the input
    if (!frontendinput) {
      throw new Error("Missing 'frontendinput' in request body");
    }

    // Create the prompt for the AI model
    const prompt = `give me all the steps required to ${frontendinput}`;

    // Check if the prompt is new
    if (oldPrompt !== prompt) {
      // Generate content from the model
      const result = await model.generateContent(prompt);

      // Assuming the response is a string, parse it
      treeData = result.response.text(); // Directly assign the text from the response
      oldPrompt = prompt;
    }

    // Return the parsed JSON data as a TreeNode
    return JSON.parse(treeData!) as TreeNode;
  } catch (error) {
    console.error("Error processing request:", error);
    throw new Error("Internal Server Error");
  }
};
