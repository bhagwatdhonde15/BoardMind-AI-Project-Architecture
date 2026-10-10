import { NextResponse } from 'next/server';
import { generateWithAI } from '@/lib/ai/service';
import { SYSTEM_PROMPTS } from '@/lib/ai/prompts';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questionText, sampleAnswer, studentAnswer, maxMarks = 5, markingScheme = [] } = body;

    const evalPrompt = `Evaluate this student's board exam written descriptive answer:

Question (${maxMarks} Marks): "${questionText}"
Official Sample Answer: "${sampleAnswer || 'N/A'}"
Official Marking Scheme Points: ${JSON.stringify(markingScheme)}

Student Written Answer: "${studentAnswer}"

Evaluate strictly against board evaluation criteria:
1. Concept Accuracy
2. Important Keywords (Found vs Missing)
3. Formula Derivation / Substitution
4. Logical Reasoning
5. Completeness
6. SI Units & Labels
7. Answer Structure

Return JSON matching this exact schema:
{
  "scoreObtained": number,
  "maxScore": number,
  "conceptAccuracy": "string",
  "keywordsFound": ["string"],
  "keywordsMissing": ["string"],
  "formulaCheck": "string",
  "reasoningCheck": "string",
  "unitsCheck": "string",
  "structureCheck": "string",
  "whatDoneCorrectly": ["string"],
  "whatIsMissing": ["string"],
  "howToImproveToFullScore": "string (Detailed step-by-step guidance on how to reach full score)"
}`;

    const evaluation = await generateWithAI(SYSTEM_PROMPTS.DESCRIPTIVE_EXAMINER, evalPrompt);

    return NextResponse.json({
      success: true,
      evaluation,
    });
  } catch (error: any) {
    console.error('Answer Evaluation Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to evaluate answer' },
      { status: 500 }
    );
  }
}
