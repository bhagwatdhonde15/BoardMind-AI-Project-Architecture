'use client';

import { useState } from 'react';
import QuestionViewer from '@/components/quiz/QuestionViewer';
import {
  createFixWeaknessAdaptiveState,
  AdaptiveState,
  INITIAL_DEMO_TOPICS,
  getWeakestTopic,
} from '@/lib/adaptive/engine';
import { saveQuizAttemptToSupabase } from '@/lib/supabase/db';
import { Question, UserAnswer } from '@/types';
import {
  BookOpen,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Target,
  Brain,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function FixWeaknessPage() {
  const weakest = getWeakestTopic(INITIAL_DEMO_TOPICS);

  const [selectedTopic, setSelectedTopic] = useState<string>(weakest.topicName);
  const [adaptiveState, setAdaptiveState] = useState<AdaptiveState>(
    createFixWeaknessAdaptiveState(weakest.topicName, weakest.masteryScore)
  );
  const [step, setStep] = useState<'EXPLANATION' | 'DRILL' | 'SUMMARY'>('EXPLANATION');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [isLoadingNext, setIsLoadingNext] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const CAPACITANCE_REMEDIAL_QUESTIONS: Question[] = [
    {
      id: 'cap_q1',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      subject: 'Physics',
      chapter: 'Capacitance & Dielectrics',
      subtopic: 'Capacitance',
      questionType: 'MCQ',
      questionText: 'What happens to the capacitance of a parallel plate capacitor when the distance (d) between its plates is doubled while keeping plate area (A) constant?',
      options: ['Capacitance doubles', 'Capacitance is halved', 'Capacitance increases by 4 times', 'Capacitance remains unchanged'],
      correctAnswer: 'Capacitance is halved',
      explanation: 'Capacitance of a parallel plate capacitor is inversely proportional to plate distance d: C = (ε₀ · A) / d. Doubling d reduces C to C/2.',
      markingScheme: ['Formula C = ε₀A/d: 1/2 Mark', 'Correct inverse relation deduction: 1/2 Mark'],
      difficulty: 'EASY',
      marks: 1,
      estimatedTimeSeconds: 30,
      sourceReference: 'Maharashtra HSC Physics Class 12 Chapter 3, Page 114',
    },
    {
      id: 'cap_q2',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      subject: 'Physics',
      chapter: 'Capacitance & Dielectrics',
      subtopic: 'Capacitance',
      questionType: 'NUMERICAL',
      questionText: 'Two capacitors of capacitance 6 μF and 3 μF are connected in series across a 12V battery. Calculate the equivalent capacitance and total charge stored in the circuit.',
      options: ['Ceq = 2 μF, Q = 24 μC', 'Ceq = 9 μF, Q = 108 μC', 'Ceq = 4.5 μF, Q = 54 μC', 'Ceq = 1.8 μF, Q = 21.6 μC'],
      correctAnswer: 'Ceq = 2 μF, Q = 24 μC',
      explanation: '1/Ceq = 1/6 + 1/3 = 3/6 = 1/2 ⇒ Ceq = 2 μF. Total charge Q = Ceq · V = 2 μF × 12V = 24 μC.',
      markingScheme: ['Formula 1/Ceq = 1/C1 + 1/C2: 1/2 Mark', 'Correct Ceq calculation: 1/2 Mark', 'Charge calculation Q = Ceq*V: 1 Mark'],
      difficulty: 'MEDIUM',
      marks: 2,
      estimatedTimeSeconds: 60,
      sourceReference: 'Maharashtra HSC Physics Class 12 Chapter 3, Page 118',
    },
    {
      id: 'cap_q3',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      subject: 'Physics',
      chapter: 'Capacitance & Dielectrics',
      subtopic: 'Capacitance',
      questionType: 'SHORT_ANSWER',
      questionText: 'Derive the expression for the energy stored in a charged capacitor of capacitance C with potential difference V. State its SI unit.',
      correctAnswer: 'U = 1/2 C V^2 (Joules)',
      explanation: 'Work done in charging the capacitor by small charge dq: dW = V dq = (q/C) dq. Total work W = ∫(0 to Q) (q/C) dq = Q²/(2C) = 1/2 C V². SI unit is Joule (J).',
      markingScheme: ['Infinitesimal work expression dW = V dq: 1 Mark', 'Integration with limits: 1 Mark', 'Final formula 1/2 C V² & SI unit Joules: 1 Mark'],
      difficulty: 'HARD',
      marks: 3,
      estimatedTimeSeconds: 120,
      sourceReference: 'Maharashtra HSC Physics Class 12 Chapter 3, Page 122',
    },
  ];

  const handleStartDrill = () => {
    setCurrentQuestion(CAPACITANCE_REMEDIAL_QUESTIONS[0]);
    setQuestionNumber(1);
    setStep('DRILL');
  };

  const handleAnswerSubmit = (answer: UserAnswer) => {
    // Record
  };

  const handleNext = () => {
    if (questionNumber < CAPACITANCE_REMEDIAL_QUESTIONS.length) {
      setCurrentQuestion(CAPACITANCE_REMEDIAL_QUESTIONS[questionNumber]);
      setQuestionNumber((prev) => prev + 1);
    } else {
      setStep('SUMMARY');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="pb-4 border-b border-[#fed7aa] flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-[#EA580C]" />
            <span>Fix My Weakness Remediation Drill</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Personalized targeted repair for subtopics with mastery scores under 60%.
          </p>
        </div>
      </div>

      {step === 'EXPLANATION' && (
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md glow-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 text-[#EA580C] rounded-2xl border border-orange-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-wider">Identified Weak Area</span>
              <h2 className="text-xl font-bold text-slate-800">{selectedTopic} (Current Mastery: 48%)</h2>
            </div>
          </div>

          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs space-y-2 text-slate-700">
            <span className="font-bold text-[#0F766E] block text-sm">Target Concept Breakdown:</span>
            <p className="leading-relaxed font-medium">
              You lost marks on series vs parallel capacitor formulas. Remember: Capacitors in series add reciprocally <code>(1/Ceq = 1/C1 + 1/C2)</code>, while capacitors in parallel add directly <code>(Ceq = C1 + C2)</code>.
            </p>
          </div>

          <button
            onClick={handleStartDrill}
            className="w-full py-4 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Start 3-Question Practice Drill</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 'DRILL' && currentQuestion && (
        <QuestionViewer
          question={currentQuestion}
          questionNumber={questionNumber}
          totalQuestions={CAPACITANCE_REMEDIAL_QUESTIONS.length}
          onAnswerSubmit={handleAnswerSubmit}
          onNext={handleNext}
        />
      )}

      {step === 'SUMMARY' && (
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-8 space-y-6 shadow-md text-center max-w-xl mx-auto glow-card">
          <div className="w-16 h-16 bg-teal-100 text-[#0F766E] rounded-2xl flex items-center justify-center mx-auto border border-teal-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Weakness Drill Completed!</h2>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Your mastery for Capacitance has updated from <strong>48% to 76%</strong>.
            </p>
          </div>

          <button
            onClick={() => setStep('EXPLANATION')}
            className="w-full py-3.5 bg-[#EA580C] text-white font-bold text-xs rounded-2xl shadow-md"
          >
            Practice Another Topic
          </button>
        </div>
      )}
    </div>
  );
}
