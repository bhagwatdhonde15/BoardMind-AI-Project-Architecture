'use client';

import { useState } from 'react';
import { FileCheck, Sparkles, Award, CheckCircle2, AlertCircle, ArrowRight, HelpCircle, BookOpen } from 'lucide-react';

interface EvaluationResult {
  scoreObtained: number;
  maxScore: number;
  conceptAccuracy: string;
  keywordsFound: string[];
  keywordsMissing: string[];
  formulaCheck: string;
  reasoningCheck: string;
  unitsCheck: string;
  structureCheck: string;
  whatDoneCorrectly: string[];
  whatIsMissing: string[];
  howToImproveToFullScore: string;
}

export default function AIExaminerPage() {
  const [questionText, setQuestionText] = useState<string>(
    'Derive the expression for the capacitance of a parallel plate capacitor with a dielectric slab of thickness t inserted between its plates.'
  );
  const [maxMarks, setMaxMarks] = useState<number>(5);
  const [sampleAnswer, setSampleAnswer] = useState<string>(
    'C = (ε₀ · A) / (d - t + t/K). Electric field in air E₀ = Q/(ε₀A), field in dielectric E = E₀/K. Potential difference V = E₀(d - t) + E·t = E₀[d - t + t/K]. Capacitance C = Q/V = (ε₀A)/(d - t + t/K).'
  );
  const [studentAnswer, setStudentAnswer] = useState<string>(
    'Capacitance increases when dielectric slab is inserted. Electric field in air is E0 = Q/eps0*A. Inside dielectric field is E0/K. Potential V = E0(d - t) + E*t. Therefore C = Q/V = eps0*A / (d - t + t/K).'
  );

  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  const handleEvaluate = async () => {
    if (!studentAnswer.trim()) return;
    setIsEvaluating(true);

    try {
      const res = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionText, sampleAnswer, studentAnswer, maxMarks }),
      });

      const data = await res.json();
      if (data.success && data.evaluation) {
        setEvaluation(data.evaluation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="pb-4 border-b border-[#fed7aa] flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2.5">
            <FileCheck className="w-7 h-7 text-[#EA580C]" />
            <span>AI Examiner (Descriptive Answer Evaluation)</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Official step-by-step grading engine evaluating keywords, formula derivation, reasoning, and SI units.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Input Form */}
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm glow-card">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Question Formulation</label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={3}
              className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl p-3 text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Student Written Answer</label>
            <textarea
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              rows={7}
              placeholder="Paste or write your answer here..."
              className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl p-3 text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
            />
          </div>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="w-full py-3.5 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isEvaluating ? 'Grading Answer...' : 'Evaluate Answer Steps'}</span>
          </button>
        </div>

        {/* Right Evaluation Result */}
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm flex flex-col justify-between">
          {evaluation ? (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#fed7aa]">
                <span className="font-bold text-slate-800 text-sm">Official Marks Awarded</span>
                <span className="text-2xl font-black text-[#EA580C]">
                  {evaluation.scoreObtained} / {evaluation.maxScore}
                </span>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-slate-800">
                <strong className="text-[#0F766E] block mb-1">Concept Evaluation:</strong>
                {evaluation.conceptAccuracy}
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-700 block">Keywords Checked:</span>
                <div className="flex flex-wrap gap-1.5">
                  {evaluation.keywordsFound.map((k) => (
                    <span key={k} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold">
                      ✓ {k}
                    </span>
                  ))}
                  {evaluation.keywordsMissing.map((k) => (
                    <span key={k} className="px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-full font-bold">
                      ✗ {k}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-slate-800">
                <strong className="text-[#EA580C] block mb-1">How to reach 100% Score:</strong>
                {evaluation.howToImproveToFullScore}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
              <FileCheck className="w-12 h-12 text-[#fed7aa]" />
              <p className="text-xs text-slate-500 font-medium">
                Submit an answer on the left to view step marking, keywords breakdown, and tips to achieve full marks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
