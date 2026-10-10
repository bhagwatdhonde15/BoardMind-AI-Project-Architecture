'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Target, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function QuizSetupPage() {
  const router = useRouter();
  const [questionCount, setQuestionCount] = useState(5);
  const [questionType, setQuestionType] = useState('ALL');
  const [mode, setMode] = useState('ADAPTIVE');

  const handleStart = () => {
    if (mode === 'ADAPTIVE') {
      router.push('/quiz/adaptive');
    } else {
      router.push('/quiz/generator');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold px-3.5 py-1.5 bg-orange-50 text-[#EA580C] border border-orange-200 rounded-full shadow-xs">
          Step 4 of 4 — Quiz Configuration
        </span>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Configure Quiz Parameters</h1>
        <p className="text-xs text-slate-600 font-medium">
          Target Chapter: Capacitance &amp; Dielectrics (Maharashtra HSC Class 12 Physics)
        </p>
      </div>

      <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md glow-card">
        {/* Mode Selector */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Quiz Engine Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('ADAPTIVE')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                mode === 'ADAPTIVE'
                  ? 'bg-orange-50 border-2 border-[#EA580C] text-slate-800 shadow-xs'
                  : 'bg-[#FFF7ED] border-[#fed7aa] text-slate-700 hover:border-[#EA580C]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-[#EA580C]">
                <Target className="w-4 h-4 text-[#EA580C]" />
                <span>Adaptive Engine</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                Dynamically selects questions based on real-time accuracy and weak topics.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setMode('STANDARD')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                mode === 'STANDARD'
                  ? 'bg-teal-50 border-2 border-[#0F766E] text-slate-800 shadow-xs'
                  : 'bg-[#FFF7ED] border-[#fed7aa] text-slate-700 hover:border-[#0F766E]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-[#0F766E]">
                <Clock className="w-4 h-4 text-[#0F766E]" />
                <span>Standard Practice</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                Sequential exam question set with fixed mark weighting.
              </p>
            </button>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full py-4 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>Launch Quiz Session</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
