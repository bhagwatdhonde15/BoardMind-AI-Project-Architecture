'use client';

import { useState } from 'react';
import { Question, UserAnswer } from '@/types';
import VoiceAssistant from '@/components/quiz/VoiceAssistant';
import ProctoringSuite from '@/components/proctoring/ProctoringSuite';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface QuestionViewerProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (answer: UserAnswer) => void;
  onNext?: () => void;
  isLoadingNext?: boolean;
  enableProctoring?: boolean;
}

export default function QuestionViewer({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  onNext,
  isLoadingNext = false,
  enableProctoring = false,
}: QuestionViewerProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedAnswer, setSubmittedAnswer] = useState<UserAnswer | null>(null);

  const isMcq = question.questionType === 'MCQ' || question.questionType === 'ASSERTION_REASON';

  const handleVoiceInput = (speechText: string) => {
    if (isMcq) {
      const matchedOpt = question.options?.find((opt) =>
        opt.toLowerCase().includes(speechText.toLowerCase()) || speechText.toLowerCase().includes(opt.toLowerCase())
      );
      if (matchedOpt) {
        setSelectedOption(matchedOpt);
      }
    } else {
      setDescriptiveAnswer((prev) => (prev ? `${prev} ${speechText}` : speechText));
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    let isCorrect = false;
    let marksObtained = 0;

    if (isMcq) {
      if (!selectedOption) return;
      isCorrect = selectedOption.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
      marksObtained = isCorrect ? question.marks : 0;
    } else {
      if (!descriptiveAnswer.trim()) return;
      isCorrect = descriptiveAnswer.length > 20;
      marksObtained = isCorrect ? Math.round(question.marks * 0.8) : 0;
    }

    const answerRecord: UserAnswer = {
      questionId: question.id,
      selectedOption: selectedOption || undefined,
      answerText: descriptiveAnswer || undefined,
      isCorrect,
      marksObtained,
      maxMarks: question.marks,
      timeTakenSeconds: 30,
      feedback: question.explanation,
    };

    setIsSubmitted(true);
    setSubmittedAnswer(answerRecord);
    onAnswerSubmit(answerRecord);
  };

  return (
    <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-8 shadow-md text-slate-800 max-w-3xl mx-auto relative glow-card animate-fade-in-up">
      {/* Auto Camera Proctoring & Screen Share Overlay */}
      {enableProctoring && <ProctoringSuite autoStart={true} />}

      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#fed7aa]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 bg-orange-50 text-[#EA580C] border border-orange-200 rounded-xl shadow-xs">
            Q{questionNumber} of {totalQuestions}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 bg-[#FFF7ED] text-[#0F766E] rounded-xl border border-teal-200">
            {question.subtopic || question.chapter}
          </span>
        </div>

        {/* Integrated Voice Assistant Controls */}
        <VoiceAssistant
          textToSpeak={`${question.questionText}. ${isMcq && question.options ? 'Options are: ' + question.options.join(', ') : ''}`}
          onVoiceInput={handleVoiceInput}
          autoRead={true}
        />
      </div>

      {/* Question Text */}
      <div className="mb-6 space-y-2.5">
        <p className="text-base sm:text-lg font-bold leading-relaxed text-slate-800">
          {question.questionText}
        </p>

        {question.sourceReference && (
          <div className="text-[11px] text-[#0F766E] flex items-center gap-1.5 font-semibold pt-1">
            <BookOpen className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Source Reference: {question.sourceReference}</span>
          </div>
        )}
      </div>

      {/* MCQ Options or Descriptive Textbox */}
      {isMcq && question.options ? (
        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();

            let optionStyle = 'border-[#fed7aa] bg-[#FFF7ED]/50 hover:bg-orange-50 hover:border-[#EA580C] text-slate-700 hover:translate-x-1';

            if (isSubmitted) {
              if (isCorrectOption) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
              } else if (isSelected && !isCorrectOption) {
                optionStyle = 'border-rose-400 bg-rose-50 text-rose-800 font-bold';
              }
            } else if (isSelected) {
              optionStyle = 'border-2 border-[#EA580C] bg-orange-100/60 text-[#EA580C] font-bold shadow-xs translate-x-1';
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left px-4.5 py-3.5 rounded-2xl border text-sm flex items-center justify-between transition-all duration-200 ${optionStyle}`}
              >
                <span>{option}</span>
                {isSubmitted && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isSubmitted && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mb-6">
          <textarea
            disabled={isSubmitted}
            value={descriptiveAnswer}
            onChange={(e) => setDescriptiveAnswer(e.target.value)}
            placeholder="Type your step-by-step solution here (or dictate using the Voice Coach)..."
            rows={5}
            className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-2xl p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
          />
        </div>
      )}

      {/* Explanation Box on Submit */}
      {isSubmitted && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-[#EA580C]">
            <Sparkles className="w-4 h-4 text-[#EA580C]" />
            <span>Explanation &amp; Board Marking Breakdown:</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-medium">{question.explanation}</p>
        </div>
      )}

      {/* Submit / Next Action Bar */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#fed7aa]">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={isMcq ? !selectedOption : !descriptiveAnswer.trim()}
            className="px-6 py-3 bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold rounded-2xl shadow-md shadow-orange-500/25 transition-all disabled:opacity-50"
          >
            Submit Answer
          </button>
        ) : onNext ? (
          <button
            onClick={onNext}
            disabled={isLoadingNext}
            className="px-6 py-3 bg-[#0F766E] hover:bg-[#115e59] text-white text-xs font-bold rounded-2xl shadow-md shadow-teal-500/25 transition-all flex items-center gap-2"
          >
            <span>{isLoadingNext ? 'Generating...' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
