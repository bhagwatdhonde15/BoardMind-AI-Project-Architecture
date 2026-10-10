'use client';

import { useState } from 'react';
import { REAL_MISTAKE_LOGS } from '@/lib/realBoardDataset';
import { BookmarkX, AlertTriangle, Sparkles, RefreshCw, Filter, ShieldAlert } from 'lucide-react';

export default function MistakesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const mistakesList = REAL_MISTAKE_LOGS;

  const categories = [
    'ALL',
    'Concept mistake',
    'Formula mistake',
    'Calculation mistake',
    'Unit mistake',
    'Application mistake',
    'Misreading mistake',
  ];

  const filteredMistakes = selectedCategory === 'ALL'
    ? mistakesList
    : mistakesList.filter((m) => m.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 animate-fade-in-up">
      {/* Header */}
      <div className="pb-4 border-b border-[#fed7aa] flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2.5">
            <BookmarkX className="w-7 h-7 text-[#EA580C]" />
            <span>My Mistakes Error Notebook</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Categorized error analysis tracking formula, unit, calculation, and concept slip-ups.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#EA580C]" /> Filter by Error Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#EA580C] border-[#EA580C] text-white shadow-xs'
                  : 'bg-white border-[#fed7aa] text-slate-700 hover:bg-orange-50 hover:border-[#EA580C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mistakes Cards List */}
      <div className="space-y-4">
        {filteredMistakes.map((m) => (
          <div
            key={m.id}
            className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 space-y-4 shadow-sm text-xs hover:border-[#EA580C] transition-all glow-card card-interactive"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#0F766E] text-sm">
                  {m.subject} • {m.topic}
                </span>
                <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-full font-bold">
                  {m.category}
                </span>
              </div>

              {m.isRepeated && (
                <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 rounded-full font-bold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#EA580C]" />
                  Repeated Mistake ({m.repeatCount}x)
                </span>
              )}
            </div>

            <p className="text-sm font-bold text-slate-800 leading-relaxed">{m.questionText}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#FFF7ED] rounded-2xl border border-[#fed7aa]">
              <div>
                <span className="text-[11px] font-bold text-rose-700 uppercase">Your Submitted Answer:</span>
                <div className="text-rose-900 font-semibold mt-0.5">{m.userAnswer}</div>
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase">Correct Board Answer:</span>
                <div className="text-emerald-900 font-semibold mt-0.5">{m.correctAnswer}</div>
              </div>
            </div>

            <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-2xl text-slate-700 leading-relaxed font-medium">
              <strong className="text-[#0F766E]">Explanation: </strong>
              {m.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
