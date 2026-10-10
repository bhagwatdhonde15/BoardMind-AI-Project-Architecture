import { NextResponse } from 'next/server';
import { generateWithAI } from '@/lib/ai/service';
import { SYSTEM_PROMPTS, buildAdaptivePrompt } from '@/lib/ai/prompts';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      board = 'Maharashtra HSC',
      classLevel = 'Class 12',
      subject = 'Physics',
      chapter = 'Capacitance & Dielectrics',
      lastQuestion,
      userAnswerText,
      wasCorrect,
      weakTopics = ['Capacitance'],
    } = body;

    const userPrompt = buildAdaptivePrompt({
      board,
      classLevel,
      subject,
      chapter,
      lastQuestion: lastQuestion || '',
      userAnswerText: userAnswerText || '',
      wasCorrect: Boolean(wasCorrect),
      weakTopics,
    });

    const question = await generateWithAI(SYSTEM_PROMPTS.ADAPTIVE_ENGINE, userPrompt);

    return NextResponse.json({
      success: true,
      question: question.question || question,
    });
  } catch (error: any) {
    console.error('Adaptive API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate next question' },
      { status: 500 }
    );
  }
}
