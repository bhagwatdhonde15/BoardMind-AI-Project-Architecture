'use client';

import { useState, useEffect } from 'react';
import { FULL_REAL_BOARD_DATASET } from '@/lib/realBoardDataset';
import QuestionViewer from '@/components/quiz/QuestionViewer';
import { saveQuizAttemptToSupabase } from '@/lib/supabase/db';
import { Clock, Zap, Bookmark, CheckCircle2, RotateCcw, Award, Layers, Sparkles, ShieldCheck } from 'lucide-react';
import { Question, UserAnswer } from '@/types';
import { triggerConfettiBurst } from '@/components/ui/ConfettiTrigger';

export default function MockExamPage() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<'A' | 'B' | 'C'>('A');
  const [timeLeft, setTimeLeft] = useState<number>(2700); // 45 minutes

  const questions: Question[] = [
    FULL_REAL_BOARD_DATASET[0], // MCQ
    FULL_REAL_BOARD_DATASET[1], // Numerical
    FULL_REAL_BOARD_DATASET[2], // Short Answer
    {
      ...FULL_REAL_BOARD_DATASET[3],
      id: 'board_exam_q4',
      questionType: 'CASE_STUDY',
      questionText: 'Case Study: A student constructs a parallel plate capacitor using aluminium foil and wax paper dielectric. Describe how inserting the dielectric affects electric field and capacitance.',
    },
  ];

  useEffect(() => {
    let timer: any;
    if (isStarted && !isSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleFinalSubmit();
    }
    return () => clearInterval(timer);
  }, [isStarted, isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartExam = async () => {
    setIsStarted(true);
    try {
      if (typeof document !== 'undefined' && document.documentElement.requestFullscreen && !document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request bypassed:', err);
    }
  };

  const handleAnswerSubmit = (answer: UserAnswer) => {
    setAnswers((prev) => ({ ...prev, [answer.questionId]: answer }));
  };

  const toggleMarkForReview = (qId: string) => {
    setMarkedForReview((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitted(true);
    try {
      if (typeof document !== 'undefined' && document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (err) {
      // Ignore fullscreen exit error
    }
    triggerConfettiBurst();
    const totalScore = Object.values(answers).reduce((acc, curr) => acc + (curr.marksObtained || 0), 0);
    const maxPossible = questions.reduce((acc, q) => acc + q.marks, 0);

    await saveQuizAttemptToSupabase({
      quizTitle: 'Class 12 Physics Full Board Examination',
      subject: 'Physics',
      score: totalScore,
      maxScore: maxPossible,
      answers: Object.values(answers),
      topicName: 'Physics Full Mock',
    });
  };

  const currentQ = questions[currentIndex];
  const totalScore = Object.values(answers).reduce((acc, curr) => acc + (curr.marksObtained || 0), 0);
  const maxPossible = questions.reduce((acc, q) => acc + q.marks, 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="pb-4 border-b border-[#fed7aa] flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2.5">
            <Zap className="w-7 h-7 text-[#EA580C]" />
            <span>Board Mock Exam Simulator</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Official timed test environment for Class 12 Physics.
          </p>
        </div>
      </div>

      {!isStarted ? (
        /* Intro Card */
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md max-w-2xl mx-auto text-center glow-card">
          <div className="w-16 h-16 bg-orange-100 text-[#EA580C] rounded-2xl flex items-center justify-center mx-auto border border-orange-200">
            <Zap className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">Ready to Start Timed Mock Exam?</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              4 Questions • 45 Minutes • Section A (MCQs) &amp; Section B (Numericals &amp; Case Study).
            </p>
          </div>

          {/* Explicit Student Notice */}
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-left space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0F766E]">
              <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
              <span>Camera &amp; Screen Privacy Guard:</span>
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">
              Camera feed and screen sharing will activate <strong>only after you click &apos;Start Timed Mock Exam&apos;</strong> below. No camera or screen recording takes place beforehand.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-3.5 bg-[#FFF7ED] rounded-xl border border-[#fed7aa]">
              <div className="text-[11px] text-slate-500 font-bold uppercase">Time Limit</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">45 Minutes</div>
            </div>
            <div className="p-3.5 bg-[#FFF7ED] rounded-xl border border-[#fed7aa]">
              <div className="text-[11px] text-slate-500 font-bold uppercase">Full Screen</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">Lock Activated</div>
            </div>
          </div>

          <button
            onClick={handleStartExam}
            className="btn-shimmer w-full py-4 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-sm rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Start Timed Mock Exam</span>
          </button>
        </div>
      ) : !isSubmitted ? (
        /* Active Exam View */
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white border-2 border-[#fed7aa] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Section:</span>
              {(['A', 'B', 'C'] as const).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                    activeSection === sec
                      ? 'bg-[#EA580C] text-white border-[#EA580C]'
                      : 'bg-[#FFF7ED] text-slate-700 border-[#fed7aa] hover:border-[#EA580C]'
                  }`}
                >
                  Section {sec}
                </button>
              ))}
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-orange-50 border border-orange-200 text-[#EA580C] rounded-xl font-mono text-sm font-bold">
              <Clock className="w-4 h-4 text-[#EA580C]" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleFinalSubmit}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
            >
              Submit Exam
            </button>
          </div>

          {/* Question Viewer */}
          <QuestionViewer
            question={currentQ}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            onAnswerSubmit={handleAnswerSubmit}
            enableProctoring={true}
          />

          {/* Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border-2 border-[#fed7aa] rounded-2xl shadow-xs">
            <div className="flex items-center gap-2">
              {questions.map((q, idx) => {
                const isAnswered = Boolean(answers[q.id]);
                const isReview = Boolean(markedForReview[q.id]);
                const isCurrent = idx === currentIndex;

                let pillStyle = 'bg-[#FFF7ED] border-[#fed7aa] text-slate-700';
                if (isCurrent) pillStyle = 'ring-2 ring-[#EA580C] border-[#EA580C] text-[#EA580C] font-bold';
                else if (isReview) pillStyle = 'bg-amber-100 border-amber-300 text-amber-800 font-bold';
                else if (isAnswered) pillStyle = 'bg-teal-100 border-teal-300 text-[#0F766E] font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-9 h-9 rounded-xl border text-xs font-bold flex items-center justify-center transition-all ${pillStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleMarkForReview(currentQ.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                  markedForReview[currentQ.id]
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-[#FFF7ED] text-slate-700 border-[#fed7aa] hover:border-[#EA580C]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="px-3.5 py-2 bg-[#FFF7ED] border border-[#fed7aa] rounded-xl text-xs font-bold text-slate-700 disabled:opacity-40"
              >
                Previous
              </button>

              <button
                disabled={currentIndex === questions.length - 1}
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="px-3.5 py-2 bg-[#0F766E] text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-8 space-y-6 shadow-md max-w-2xl mx-auto text-center glow-card">
          <div className="w-16 h-16 bg-teal-100 text-[#0F766E] rounded-2xl flex items-center justify-center mx-auto border border-teal-200">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">Exam Submitted Successfully!</h2>
            <p className="text-xs text-slate-600 mt-1 font-medium">Camera and screen sharing have ended.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#FFF7ED] rounded-2xl border border-[#fed7aa]">
              <div className="text-xs text-slate-500 font-bold">Marks Scored</div>
              <div className="text-3xl font-black text-[#EA580C] mt-1">{totalScore} / {maxPossible}</div>
            </div>
            <div className="p-4 bg-[#FFF7ED] rounded-2xl border border-[#fed7aa]">
              <div className="text-xs text-slate-500 font-bold">Percentage</div>
              <div className="text-3xl font-black text-[#0F766E] mt-1">
                {Math.round((totalScore / maxPossible) * 100)}%
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsStarted(false);
              setIsSubmitted(false);
              setAnswers({});
              setTimeLeft(2700);
              setCurrentIndex(0);
            }}
            className="w-full py-3.5 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs rounded-2xl shadow-md transition-colors"
          >
            Retake Mock Exam
          </button>
        </div>
      )}
    </div>
  );
}
