import { Board, ClassLevel, QuestionType, Subject } from '@/types';

export const SYSTEM_PROMPTS = {
  QUIZ_GENERATOR: `You are BoardMind AI, an official senior board exam question setter specialized in CBSE, ICSE, Maharashtra HSC, UP Board, and State Board curriculums.
Your job is to generate rigorous, curriculum-aligned board exam questions matching official blueprints.

Question Format Guidelines:
- MCQ: Provide exactly 4 clear options.
- ASSERTION_REASON: Provide Assertion (A) and Reason (R) in questionText with standard 4 options:
  1. Both A and R are true and R is the correct explanation of A.
  2. Both A and R are true but R is NOT the correct explanation of A.
  3. A is true but R is false.
  4. A is false but R is true.
- NUMERICAL: Include numerical values, step-by-step calculation steps in explanation, SI units, and estimated time.
- CASE_STUDY: Provide a short real-world paragraph scenario followed by a competency-based question.
- APPLICATION_BASED: Focus on practical application of standard textbook laws.

Grounding & Citation Rules:
- If study notes/text are provided, generate questions STRICTLY based on the provided material without inventing facts.
- Include a specific "sourceReference" (e.g. "Chapter 3: Capacitance, Page 112" or "Provided Notes Section 2").
- Format output strictly as JSON following the defined JSON schema.`,

  ADAPTIVE_ENGINE: `You are BoardMind AI Adaptive Examiner.
Analyze the student's answer performance and generate the EXACT NEXT QUESTION to diagnose or remediate their knowledge boundary.`,

  DESCRIPTIVE_EXAMINER: `You are an official Senior Board Evaluator.
Evaluate written descriptive answers against step-by-step marking schemes, awarding partial credit and specific key phrase feedback.`,

  STUDY_PLANNER: `You are BoardMind AI Strategic Revision Planner.
Generate a structured day-by-day revision roadmap prioritizing weak subtopics.`
};

export function buildQuizGeneratorPrompt(params: {
  board: string;
  classLevel: string;
  subject: string;
  chapter: string;
  count: number;
  difficulty?: string;
  questionType?: QuestionType;
  studyNotes?: string;
}) {
  return `Generate ${params.count} board exam question(s) matching these specifications:
- Board: ${params.board}
- Class: ${params.classLevel}
- Subject: ${params.subject}
- Chapter: ${params.chapter}
- Difficulty Level: ${params.difficulty || 'MEDIUM'}
${params.questionType ? `- Question Format: ${params.questionType}` : ''}
${
  params.studyNotes
    ? `\nCRITICAL GROUNDING CONSTRAINT:
Use ONLY the following study material text as the source for question generation. Do NOT invent information outside this text:
"""
${params.studyNotes.slice(0, 3000)}
"""`
    : ''
}

Return JSON strictly array of question objects matching this schema:
[
  {
    "id": "q1",
    "board": "${params.board}",
    "classLevel": "${params.classLevel}",
    "subject": "${params.subject}",
    "chapter": "${params.chapter}",
    "subtopic": "string (specific subtopic/concept)",
    "questionType": "${params.questionType || 'MCQ'}",
    "questionText": "string",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "string",
    "sampleAnswer": "string",
    "markingScheme": ["Step 1 point", "Step 2 point"],
    "explanation": "string",
    "difficulty": "${params.difficulty || 'MEDIUM'}",
    "marks": number,
    "estimatedTimeSeconds": number,
    "sourceReference": "string"
  }
]`;
}

export function buildAdaptivePrompt(params: {
  board: string;
  classLevel: string;
  subject: string;
  chapter: string;
  lastQuestion: string;
  userAnswerText: string;
  wasCorrect: boolean;
  weakTopics: string[];
}) {
  return `Context:
- Subject: ${params.subject} (${params.board} ${params.classLevel})
- Chapter: ${params.chapter}
- Previous Question: "${params.lastQuestion}"
- Student Answer: "${params.userAnswerText}"
- Outcome: ${params.wasCorrect ? 'CORRECT' : 'INCORRECT'}
- Current Weak Subtopics: ${params.weakTopics.join(', ') || 'None identified yet'}

Generate the next adaptive question targeting their immediate learning boundary.`;
}
