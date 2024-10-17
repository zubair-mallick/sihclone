import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import dotenv from 'dotenv';
import { responseSchemaSteps } from '../schemas/responseSchemaSteps.js';
import { rateLimiter } from '../middleware/requestLimiter.js';

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
    responseSchema: responseSchemaSteps,
  }
});

let requestCount = 0;
const requestLimit = 5;
const resetInterval = 60000; // 60 seconds (1 minute)
let requestResetTimeout;
let oldprompt = null;
let treeData = null;

const resetRequestCount = () => {
  requestCount = 0;
  console.log("Request count reset");
};

export const generateTreeData = async (req, res) => {
  try {
    const { frontendinput } = req.body;

    if (!frontendinput) {
      return res.status(400).json({ error: "Missing 'frontendinput' in request body" });
    }

    if (!requestResetTimeout) {
      requestResetTimeout = setTimeout(() => {
        resetRequestCount();
        requestResetTimeout = null;
      }, resetInterval);
    }

    if (requestCount >= requestLimit) {
      return res.status(429).json({ error: "Too Many Requests - please try again later." });
    }

    const prompt = `give me all the steps required to ${frontendinput}`;

    if ((oldprompt !== prompt || requestCount === 0) && requestCount < requestLimit) {
      let result = await model.generateContent(prompt);
      treeData = await result.response.text(); // await the result properly
      requestCount++;
      oldprompt = prompt;
    }

    console.log({ oldprompt, prompt, requestCount });

    res.json(JSON.parse(treeData));
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
