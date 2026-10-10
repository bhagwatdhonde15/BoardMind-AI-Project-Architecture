import { NextResponse } from 'next/server';
import { GROQ_API_KEY, GROQ_MODEL } from '@/lib/ai/groq';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  try {
    const { doubt, subject = 'Science', board = 'CBSE', history = [] } = await req.json();

    if (!doubt || typeof doubt !== 'string') {
      return NextResponse.json({ error: 'Please provide a valid doubt or question' }, { status: 400 });
    }

    const systemPrompt = `You are "Saturday" (S.A.T.U.R.D.A.Y - Systematic Autonomous Technology for Universal Response and Dynamic Yield), the official AI Study Mentor, Voice Assistant, and Doubt Solver created for Indian Board Exam students (${board} Class 9-12).

Origin & Character:
- Inspired by the Saturday voice-command AI architecture (thoratpratik2323-hue/sat).
- You speak with genuine warmth, empathy, clarity, and authority like a brilliant Indian teacher sitting side-by-side with the student.
- You listen to spoken voice commands and doubts about Physics, Chemistry, Mathematics, Biology, and Board examinations.
- When answering doubts: first validate and encourage ("That's a great question!", "Let's simplify this step by step"), then give crystal-clear intuitive explanations, provide board marking scheme keywords, and highlight necessary formulas.

Return your response strictly in valid JSON format with this exact structure:
{
  "speechText": "A warm, concise spoken audio response (2-3 natural sentences without LaTeX, symbols, or asterisks so it speaks beautifully via Text-to-Speech).",
  "explanation": "Detailed step-by-step markdown response with clear definitions, derivations, intuitive real-world analogies, and board exam marking breakdown.",
  "keyFormulas": ["List of standard formulas, equations, or laws needed for full marks"],
  "examTip": "1 concise board examiner tip on how CBSE/ICSE/State boards grade this specific topic.",
  "followUpQuestion": "A friendly check question to verify if the student understood."
}`;

    const userPrompt = `Target Board: ${board}
Subject: ${subject}
Conversation Context: ${JSON.stringify(history.slice(-4))}
Student's Doubt / Voice Command: "${doubt}"

Provide a comprehensive, empathetic SAT AI response strictly formatted as the JSON schema requested.`;

    let parsedResult = null;

    // 1. Primary Engine: High-Speed Groq AI with openai/gpt-oss-120b
    if (GROQ_API_KEY) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.5,
          }),
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const raw = groqData.choices[0]?.message?.content || '{}';
          parsedResult = JSON.parse(raw);
        } else {
          const errText = await groqRes.text();
          console.warn('Groq API error in SAT engine, attempting Gemini fallback:', errText);
        }
      } catch (err: any) {
        console.warn('Groq fetch error:', err?.message);
      }
    }

    // 2. Secondary Engine: Google Gemini if available
    const geminiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENAI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      '';

    if (!parsedResult && geminiKey) {
      try {
        const geminiClient = new GoogleGenAI({ apiKey: geminiKey });
        const response = await geminiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            temperature: 0.5,
          },
        });
        const text = response.text || '{}';
        parsedResult = JSON.parse(text);
      } catch (e: any) {
        console.warn('Gemini doubt-solving error:', e?.message);
      }
    }

    // 3. Fallback response if offline
    if (!parsedResult) {
      parsedResult = {
        speechText: `I heard your question about ${doubt.slice(0, 35)}. Let us break this down step-by-step so you feel completely confident for your exam!`,
        explanation: `### Understanding: ${doubt}\n\nIn the **${board}** curriculum, examiners award marks for:\n1. **Accurate Definition & Statement**: Clearly state the law or concept.\n2. **Standard Formula & SI Units**: State variables and their respective units.\n3. **Step-by-Step Derivation / Application**: Show each mathematical step without jumping to the final value directly.`,
        keyFormulas: ['Standard NCERT & Board Textbook Definition with SI Units'],
        examTip: 'Always write the general formula and specify SI units before substituting numerical values.',
        followUpQuestion: 'Would you like to try a quick board exam question on this to test your understanding?'
      };
    }

    // Return unified contract
    return NextResponse.json({
      success: true,
      answer: {
        speechText: parsedResult.speechText || parsedResult.speechResponse || '',
        explanation: parsedResult.explanation || parsedResult.detailedExplanation || '',
        keyFormulas: parsedResult.keyFormulas || [],
        examTip: parsedResult.examTip || '',
        followUpQuestion: parsedResult.followUpQuestion || '',
      },
    });
  } catch (error: any) {
    console.error('Error in ask-doubt SAT route:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process doubt' },
      { status: 500 }
    );
  }
}
