import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GOOGLE_GENAI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

export const GEN_AI = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    // config: {
    //   temperature: 0.5,
    //   maxOutputTokens: 1000,
    //   topP: 1,
    //   topK: 40,
    //   stopSequences: ["\n"],
    // },
  });

  return response.text;
};
