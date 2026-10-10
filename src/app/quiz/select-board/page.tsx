'use client';

import { useRouter } from 'next/navigation';
import { OFFICIAL_BOARDS } from '@/lib/syllabusData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SelectBoardPage() {
  const router = useRouter();

  const handleSelect = (boardName: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedBoard', boardName);
    }
    router.push('/quiz/select-subject');
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold px-3.5 py-1.5 bg-orange-50 text-[#EA580C] border border-orange-200 rounded-full shadow-xs">
          Step 1 of 4 — Official Board Selection
        </span>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Select Your Examination Board</h1>
        <p className="text-xs text-slate-600 font-medium">
          Official board blueprints and marking guidelines are tailored directly to your syllabus.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OFFICIAL_BOARDS.map((board) => (
          <button
            key={board.id}
            onClick={() => handleSelect(board.name)}
            className="group p-6 bg-white border-2 border-[#fed7aa] hover:border-[#EA580C] rounded-3xl text-left transition-all hover:shadow-lg hover:-translate-y-1 space-y-3 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 bg-[#FFF7ED] text-[#EA580C] border border-orange-200 rounded-full uppercase tracking-wider">
                {board.badge}
              </span>
              <h2 className="text-xl font-extrabold text-slate-800 mt-2.5 group-hover:text-[#EA580C] transition-colors">
                {board.name}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">{board.fullName}</p>
            </div>

            <div className="pt-3 border-t border-orange-100 flex items-center justify-between text-xs font-bold text-[#0F766E]">
              <span>Select Board</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#EA580C]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
