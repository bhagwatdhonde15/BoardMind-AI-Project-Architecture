'use client';

import Link from 'next/link';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';
import ConfettiTrigger from '@/components/ui/ConfettiTrigger';

export default function QuizResultPage() {
  const score = 8;
  const maxScore = 10;
  const accuracy = Math.round((score / maxScore) * 100);

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8 animate-fade-in-up">
      <ConfettiTrigger scorePercent={accuracy} />
      {/* Top Banner */}
      <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-8 text-center space-y-4 shadow-md glow-card">
        <div className="w-16 h-16 bg-teal-100 text-[#0F766E] border border-teal-300 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Quiz Session Completed!</h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Topic: Capacitance &amp; Dielectrics (Maharashtra HSC Class 12 Physics)
          </p>
        </div>

        <div className="flex justify-center gap-6 pt-2">
          <div className="p-4 bg-[#FFF7ED] border border-[#fed7aa] rounded-2xl min-w-32">
            <div className="text-[11px] text-slate-500 font-bold uppercase">Total Marks</div>
            <div className="text-3xl font-black text-[#EA580C]">{score} / {maxScore}</div>
          </div>
          <div className="p-4 bg-[#FFF7ED] border border-[#fed7aa] rounded-2xl min-w-32">
            <div className="text-[11px] text-slate-500 font-bold uppercase">Accuracy Rate</div>
            <div className="text-3xl font-black text-[#0F766E]">{accuracy}%</div>
          </div>
        </div>

        {/* AI Recommendation Message */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl text-xs text-slate-700 text-left flex items-start gap-2 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-[#EA580C] mb-0.5">AI Performance Diagnosis:</span>
            Great job on conceptual parallel plate definitions! However, you lost marks on series reciprocal capacitor calculations. We recommend taking a 3-question drill on series combinations.
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/quiz/fix-weakness"
            className="btn-shimmer px-5 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Fix Series Reciprocal Weakness</span>
          </Link>
          <Link
            href="/quiz/adaptive"
            className="px-5 py-2.5 bg-[#FFF7ED] hover:bg-orange-100 text-slate-700 font-bold text-xs rounded-xl border border-[#fed7aa] transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Adaptive Quiz</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
