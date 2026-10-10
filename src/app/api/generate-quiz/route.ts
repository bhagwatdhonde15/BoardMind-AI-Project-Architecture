import { NextResponse } from 'next/server';
import { generateWithAI } from '@/lib/ai/service';
import { SYSTEM_PROMPTS, buildQuizGeneratorPrompt } from '@/lib/ai/prompts';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      board = 'Maharashtra HSC',
      classLevel = 'Class 12',
      subject = 'Physics',
      chapter = 'Electrostatics',
      count = 3,
      difficulty = 'MEDIUM',
      questionType,
      studyNotes,
    } = body;

    const userPrompt = buildQuizGeneratorPrompt({
      board,
      classLevel,
      subject,
      chapter,
      count,
      difficulty,
      questionType,
      studyNotes,
    });

    const jsonResult = await generateWithAI(SYSTEM_PROMPTS.QUIZ_GENERATOR, userPrompt);
    const questions = Array.isArray(jsonResult) ? jsonResult : jsonResult.questions || [jsonResult];

    return NextResponse.json({
      success: true,
      questions,
    });
  } catch (error: any) {
    console.error('Quiz Generation API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
