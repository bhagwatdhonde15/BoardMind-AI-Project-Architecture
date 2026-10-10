import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

export const ai = new GoogleGenAI({
  apiKey: apiKey,
});

export const MODEL_NAME = 'gemini-2.5-flash';
