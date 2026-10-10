'use client';

import { useState } from 'react';
import { Board, ClassLevel, Question, Subject, UserAnswer } from '@/types';
import QuestionViewer from '@/components/quiz/QuestionViewer';
import { createInitialAdaptiveState, updateAdaptiveState, AdaptiveState } from '@/lib/adaptive/engine';
import { FULL_REAL_BOARD_DATASET } from '@/lib/realBoardDataset';
import { Target, AlertCircle, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AdaptiveQuizPage() {
  const [subject, setSubject] = useState<Subject>('Physics');
  const [chapter, setChapter] = useState<string>('Electricity');

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(1);
  const [isLoadingNext, setIsLoadingNext] = useState<boolean>(false);
  const [adaptiveState, setAdaptiveState] = useState<AdaptiveState>(createInitialAdaptiveState());

  const handleStartSession = async () => {
    setIsStarted(true);
    setAdaptiveState(createInitialAdaptiveState());
    setQuestionCount(1);
    await fetchNextAdaptiveQuestion(null, null);
  };

  const fetchNextAdaptiveQuestion = async (lastQ: Question | null, lastAnswer: UserAnswer | null) => {
    setIsLoadingNext(true);
    try {
      const bodyPayload = {
        board: 'CBSE',
        classLevel: 'Class 10',
        subject,
        chapter,
        lastQuestion: lastQ ? lastQ.questionText : '',
        userAnswerText: lastAnswer ? (lastAnswer.selectedOption || lastAnswer.answerText || '') : '',
        wasCorrect: lastAnswer ? lastAnswer.isCorrect : true,
        weakTopics: adaptiveState.weakTopics,
      };

      const res = await fetch('/api/adaptive-next', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json();
      if (data.success && data.question) {
        setCurrentQuestion(data.question);
      } else {
        setCurrentQuestion(FULL_REAL_BOARD_DATASET[questionCount % FULL_REAL_BOARD_DATASET.length]);
      }
    } catch (err) {
      console.error(err);
      setCurrentQuestion(FULL_REAL_BOARD_DATASET[0]);
    } finally {
      setIsLoadingNext(false);
    }
  };

  const handleAnswerSubmit = (answer: UserAnswer) => {
    if (!currentQuestion) return;
    const updatedState = updateAdaptiveState(adaptiveState, currentQuestion, answer);
    setAdaptiveState(updatedState);
  };

  const handleNext = () => {
    setQuestionCount((prev) => prev + 1);
    fetchNextAdaptiveQuestion(currentQuestion, null);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="pb-4 border-b border-[#fed7aa]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2.5">
          <Target className="w-7 h-7 text-[#EA580C]" />
          <span>Adaptive Quiz Engine</span>
        </h1>
        <p className="text-sm text-slate-600 mt-1 font-medium">
          Real-time dynamic question adaptation tailored precisely to your weakness profile.
        </p>
      </div>

      {!isStarted ? (
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md max-w-xl mx-auto glow-card">
          <h2 className="text-lg font-bold text-slate-800">Start Adaptive Learning Loop</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl p-3 text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Chapter / Focus Area</label>
              <input
                type="text"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl p-3 text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
              />
            </div>

            <button
              onClick={handleStartSession}
              className="w-full py-3.5 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Initialize Adaptive Engine
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {currentQuestion ? (
            <QuestionViewer
              question={currentQuestion}
              questionNumber={questionCount}
              totalQuestions={10}
              onAnswerSubmit={handleAnswerSubmit}
              onNext={handleNext}
              isLoadingNext={isLoadingNext}
            />
          ) : (
            <div className="p-8 text-center text-slate-600 bg-white rounded-2xl border border-[#fed7aa] font-medium">
              Generating next diagnostic question...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
