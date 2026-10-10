'use client';

import { useState } from 'react';
import { Board, ClassLevel, Question, QuestionType, Subject, UserAnswer } from '@/types';
import QuestionViewer from '@/components/quiz/QuestionViewer';
import { Sparkles, BookOpen, Layers, CheckCircle2, RotateCcw } from 'lucide-react';

export default function QuizGeneratorPage() {
  const [board, setBoard] = useState<Board>('CBSE');
  const [classLevel, setClassLevel] = useState<ClassLevel>('Class 10');
  const [subject, setSubject] = useState<Subject>('Physics');
  const [chapter, setChapter] = useState<string>('Electricity');
  const [count, setCount] = useState<number>(3);
  const [studyNotes, setStudyNotes] = useState<string>('');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStatusMessage('');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setIsQuizCompleted(false);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ board, classLevel, subject, chapter, count, studyNotes }),
      });

      const data = await res.json();
      if (data.success && data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        if (data.isMock) {
          setStatusMessage(data.message || 'Demo mode activated. Questions ready!');
        }
      } else {
        setStatusMessage('Could not generate questions. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatusMessage('Error contacting AI server.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSubmit = (answerRecord: UserAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [answerRecord.questionId]: answerRecord,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const totalScore = Object.values(answers).reduce((acc, curr) => acc + (curr.marksObtained || 0), 0);
  const totalPossible = questions.reduce((acc, q) => acc + q.marks, 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-indigo-400" />
          <span>AI Quiz Generator</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Select syllabus criteria or paste chapter notes to generate board-aligned questions instantly.
        </p>
      </div>

      {questions.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-xl">
          <h2 className="text-lg font-semibold text-white">Configure Exam Generator</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Board</label>
              <select
                value={board}
                onChange={(e) => setBoard(e.target.value as Board)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Class Level</label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
                <option value="Social Science">Social Science</option>
                <option value="English">English</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Number of Questions</label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value={3}>3 Questions</option>
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Chapter Name</label>
            <input
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="e.g. Electricity, Chemical Reactions, Quadratic Equations"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Optional Study Notes / Material Upload (Text context)
            </label>
            <textarea
              value={studyNotes}
              onChange={(e) => setStudyNotes(e.target.value)}
              rows={3}
              placeholder="Paste custom study notes or textbook summary here to generate targeted questions..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {statusMessage && (
            <p className="text-xs text-amber-400 bg-amber-950/50 border border-amber-800/60 p-3 rounded-lg">
              {statusMessage}
            </p>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-sm rounded-lg shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Generating Board Questions...' : 'Generate Quiz Now'}</span>
          </button>
        </div>
      )}

      {/* Quiz Execution View */}
      {questions.length > 0 && !isQuizCompleted && (
        <div className="space-y-4">
          <QuestionViewer
            question={questions[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            onAnswerSubmit={handleAnswerSubmit}
            onNext={handleNextQuestion}
          />
        </div>
      )}

      {/* Quiz Completion Summary */}
      {isQuizCompleted && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-6 shadow-xl max-w-xl mx-auto">
          <div className="w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Quiz Completed!</h2>
            <p className="text-sm text-slate-400 mt-1">Great job practicing board exam questions.</p>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg inline-block text-center">
            <div className="text-xs text-slate-400">Total Marks</div>
            <div className="text-3xl font-extrabold text-indigo-400">
              {totalScore} / {totalPossible}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setQuestions([])}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg border border-slate-700 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Generate New Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
