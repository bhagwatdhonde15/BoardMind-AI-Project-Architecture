export type Board = 'CBSE' | 'ICSE' | 'Maharashtra HSC' | 'UP Board' | 'State Board' | 'Other';
export type ClassLevel = 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12';
export type Subject = 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'Social Science' | 'English';

export type QuestionType =
  | 'MCQ'
  | 'ASSERTION_REASON'
  | 'NUMERICAL'
  | 'SHORT_ANSWER'
  | 'LONG_ANSWER'
  | 'CASE_STUDY'
  | 'APPLICATION_BASED';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'BOARD_STANDARD';

export interface Question {
  id: string;
  board: Board | string;
  classLevel: ClassLevel | string;
  subject: Subject | string;
  chapter: string;
  subtopic: string; // Topic name
  questionType: QuestionType;
  questionText: string;
  options?: string[]; // For MCQs & Assertion-Reason
  correctAnswer: string;
  sampleAnswer?: string; // For descriptive questions
  markingScheme?: string[]; // Key points for board grading
  explanation: string;
  difficulty: DifficultyLevel;
  marks: number;
  estimatedTimeSeconds?: number;
  sourceReference?: string; // Source chapter, page or study material citation
}

export interface UserAnswer {
  questionId: string;
  selectedOption?: string;
  answerText?: string;
  isCorrect?: boolean;
  marksObtained?: number;
  maxMarks: number;
  timeTakenSeconds: number;
  feedback?: string;
  mistakeTag?: string;
}

export interface TopicMastery {
  topicName: string;
  chapter: string;
  subject: Subject | string;
  masteryScore: number; // 0 to 100
  totalAttempted: number;
  totalCorrect: number;
  status: 'STRONG' | 'MODERATE' | 'WEAK';
  lastEvaluatedAt: string;
}

export interface QuizSession {
  id: string;
  title: string;
  mode: 'GENERATOR' | 'ADAPTIVE' | 'FIX_WEAKNESS' | 'MOCK_EXAM';
  board: Board | string;
  classLevel: ClassLevel | string;
  subject: Subject | string;
  chapter: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, UserAnswer>;
  score: number;
  totalPossibleScore: number;
  isCompleted: boolean;
  createdAt: string;
}

export interface DescriptiveEvaluation {
  scoreObtained: number;
  maxScore: number;
  feedback: string;
  keyPointsCovered: string[];
  keyPointsMissing: string[];
  mistakeAnalysis: string;
  improvementTips: string[];
}

export interface StudyPlanDay {
  dayNumber: number;
  title: string;
  targetTopics: string[];
  estimatedHours: number;
  recommendedTask: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}
