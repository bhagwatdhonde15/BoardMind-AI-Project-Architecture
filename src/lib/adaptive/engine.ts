import { DifficultyLevel, Question, QuestionType, TopicMastery, UserAnswer } from '@/types';

export interface AdaptiveState {
  currentTopic: string;
  currentMastery: number; // 0 - 100 percentage
  currentDifficulty: DifficultyLevel;
  targetQuestionType: QuestionType;
  whySelected: string;
  detectedMistake: string | null;
  conceptExplanation: string | null;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  weakTopics: string[];
  strongTopics: string[];
  attemptHistory: Array<{
    questionId: string;
    isCorrect: boolean;
    mistakeType?: string;
    timeTaken: number;
  }>;
}

export const INITIAL_DEMO_TOPICS: TopicMastery[] = [
  {
    topicName: 'Electrostatics',
    chapter: 'Electrostatics',
    subject: 'Physics',
    masteryScore: 86,
    totalAttempted: 25,
    totalCorrect: 22,
    status: 'STRONG',
    lastEvaluatedAt: new Date().toISOString(),
  },
  {
    topicName: 'Current Electricity',
    chapter: 'Current Electricity',
    subject: 'Physics',
    masteryScore: 73,
    totalAttempted: 20,
    totalCorrect: 15,
    status: 'MODERATE',
    lastEvaluatedAt: new Date().toISOString(),
  },
  {
    topicName: 'Ray Optics',
    chapter: 'Ray Optics',
    subject: 'Physics',
    masteryScore: 56,
    totalAttempted: 18,
    totalCorrect: 10,
    status: 'WEAK',
    lastEvaluatedAt: new Date().toISOString(),
  },
  {
    topicName: 'Capacitance',
    chapter: 'Capacitance & Dielectrics',
    subject: 'Physics',
    masteryScore: 48,
    totalAttempted: 15,
    totalCorrect: 7,
    status: 'WEAK',
    lastEvaluatedAt: new Date().toISOString(),
  },
];

/**
 * Finds the weakest topic from topic list.
 */
export function getWeakestTopic(topics: TopicMastery[] = INITIAL_DEMO_TOPICS): TopicMastery {
  return [...topics].sort((a, b) => a.masteryScore - b.masteryScore)[0] || INITIAL_DEMO_TOPICS[3];
}

/**
 * Concept explanation generator for weak topics.
 */
export function getConceptExplanation(topicName: string): string {
  switch (topicName.toLowerCase()) {
    case 'capacitance':
    case 'capacitance & dielectrics':
      return `Capacitance (C) measures a conductor's ability to store electric charge per unit potential difference: C = Q / V.

Key Board Exam Principles:
1. Parallel Plate Capacitor: C = (ε₀ · A) / d. Inserting a dielectric of constant K increases capacitance by factor K: C' = K · C.
2. Capacitors in Series: Reciprocal sum 1/Ceq = 1/C1 + 1/C2 (Charge Q is equal, Voltage V divides).
3. Capacitors in Parallel: Direct sum Ceq = C1 + C2 (Voltage V is equal, Charge Q divides).
4. Energy Stored: U = ½ C V² = ½ (Q² / C).`;

    case 'ray optics':
      return `Ray Optics focuses on reflection, refraction, and image formation by spherical mirrors and lenses.

Key Principles:
1. Lens Maker's Formula: 1/f = (μ - 1)(1/R1 - 1/R2).
2. Optical Power: P = 1 / f (in meters), unit in Dioptres (D).
3. Refractive Index & Snell's Law: n1 · sin(i) = n2 · sin(r).`;

    default:
      return `Mastering ${topicName} requires grounding in fundamental formulas, standard SI units, and step-by-step mathematical substitution.`;
  }
}

/**
 * Creates initial adaptive state for a Fix My Weakness session.
 */
export function createFixWeaknessAdaptiveState(topicName: string = 'Capacitance', initialMastery: number = 48): AdaptiveState {
  return {
    currentTopic: topicName,
    currentMastery: initialMastery,
    currentDifficulty: 'EASY',
    targetQuestionType: 'MCQ',
    whySelected: `Selected an EASY conceptual question to diagnose fundamental understanding of ${topicName}.`,
    detectedMistake: null,
    conceptExplanation: getConceptExplanation(topicName),
    consecutiveCorrect: 0,
    consecutiveIncorrect: 0,
    weakTopics: ['Capacitance', 'Ray Optics'],
    strongTopics: ['Electrostatics'],
    attemptHistory: [],
  };
}

export function createInitialAdaptiveState(): AdaptiveState {
  return createFixWeaknessAdaptiveState('Capacitance', 48);
}

/**
 * Updates adaptive state after user submits an answer during the Fix My Weakness loop.
 */
export function evaluateAdaptiveStep(
  state: AdaptiveState,
  question: Question,
  userAnswer: UserAnswer
): AdaptiveState {
  const isCorrect = Boolean(userAnswer.isCorrect);

  let newMastery = state.currentMastery;
  let newDifficulty: DifficultyLevel = state.currentDifficulty;
  let newQuestionType: QuestionType = state.targetQuestionType;
  let newWhySelected = '';
  let newDetectedMistake: string | null = null;
  let nextConsecutiveCorrect = isCorrect ? state.consecutiveCorrect + 1 : 0;
  let nextConsecutiveIncorrect = !isCorrect ? state.consecutiveIncorrect + 1 : 0;

  if (isCorrect) {
    if (state.currentDifficulty === 'EASY') {
      newMastery = Math.min(100, state.currentMastery + 10);
      newDifficulty = 'MEDIUM';
      newQuestionType = 'NUMERICAL';
      newWhySelected = 'Correct on basic concept! Increased difficulty to MEDIUM Numerical to test calculation skills.';
    } else if (state.currentDifficulty === 'MEDIUM') {
      newMastery = Math.min(100, state.currentMastery + 13);
      newDifficulty = 'HARD';
      newQuestionType = 'APPLICATION_BASED';
      newWhySelected = 'Numerical solved correctly! Advanced to HARD Application question.';
    } else {
      newMastery = Math.min(100, state.currentMastery + 10);
      newDifficulty = 'BOARD_STANDARD';
      newWhySelected = 'Excellent performance! You have reached Board Standard proficiency level.';
    }
  } else {
    if (question.questionType === 'NUMERICAL' || question.questionText.toLowerCase().includes('calculate')) {
      newDetectedMistake = 'Numerical / Application calculation weakness detected (Formula substitution error).';
      newQuestionType = 'NUMERICAL';
      newWhySelected = 'Numerical calculation weakness detected. Selected a targeted numerical drill to reinforce formula application.';
    } else if (question.options) {
      newDetectedMistake = 'Conceptual misunderstanding detected (Confused series vs parallel properties).';
      newQuestionType = 'MCQ';
      newWhySelected = 'Conceptual gap detected. Selected a targeted conceptual question to clarify core definitions.';
    } else {
      newDetectedMistake = 'Step derivation error detected.';
      newQuestionType = 'SHORT_ANSWER';
      newWhySelected = 'Selected a step-marking question to practice proper exam answer structure.';
    }

    if (state.currentDifficulty === 'BOARD_STANDARD' || state.currentDifficulty === 'HARD') {
      newDifficulty = 'MEDIUM';
    } else {
      newDifficulty = 'EASY';
    }

    newMastery = Math.max(0, state.currentMastery - 5);
  }

  return {
    ...state,
    currentMastery: newMastery,
    currentDifficulty: newDifficulty,
    targetQuestionType: newQuestionType,
    whySelected: newWhySelected,
    detectedMistake: newDetectedMistake,
    consecutiveCorrect: nextConsecutiveCorrect,
    consecutiveIncorrect: nextConsecutiveIncorrect,
    attemptHistory: [
      ...state.attemptHistory,
      {
        questionId: question.id,
        isCorrect,
        mistakeType: newDetectedMistake || undefined,
        timeTaken: userAnswer.timeTakenSeconds || 30,
      },
    ],
  };
}

export function updateAdaptiveState(
  state: AdaptiveState,
  question: Question,
  userAnswer: UserAnswer
): AdaptiveState {
  return evaluateAdaptiveStep(state, question, userAnswer);
}
