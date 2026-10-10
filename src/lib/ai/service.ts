import { GoogleGenAI } from '@google/genai';
import { callGroqAI, GROQ_API_KEY } from './groq';

/**
 * Universal AI Caller that supports both Google Gemini API and Groq API.
 * Automatically checks for any Google Gemini API key:
 * - GEMINI_API_KEY
 * - GOOGLE_API_KEY
 * - GOOGLE_GENAI_API_KEY
 * - NEXT_PUBLIC_GEMINI_API_KEY
 *
 * If provided, uses Google Gemini (gemini-2.5-flash).
 * If not provided or fails, falls back seamlessly to Groq API (openai/gpt-oss-120b).
 */
export async function generateWithAI(systemPrompt: string, userPrompt: string): Promise<any> {
  const geminiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    '';

  // 1. Try Google Gemini API if key is present
  if (geminiKey) {
    try {
      const geminiClient = new GoogleGenAI({ apiKey: geminiKey });
      const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const raw = response.text || '{}';
      return JSON.parse(raw);
    } catch (geminiError: any) {
      console.warn('Gemini API attempt error, falling back to Groq:', geminiError?.message);
    }
  }

  // 2. Use Groq API (openai/gpt-oss-120b)
  if (GROQ_API_KEY) {
    return await callGroqAI(systemPrompt, userPrompt);
  }

  throw new Error('No AI API key found. Please provide either GEMINI_API_KEY or GROQ_API_KEY in .env.local.');
}
