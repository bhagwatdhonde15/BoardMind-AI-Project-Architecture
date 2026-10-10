import { Brain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#fed7aa] bg-[#ffedd5] text-[#334155] py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#EA580C] text-white rounded-lg">
            <Brain className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800 text-sm">BoardMind AI</span>
          <span className="text-xs text-[#0F766E] font-medium">— Friendly & Student-Centered AI Coach</span>
        </div>
        <div className="text-xs text-slate-600 font-medium">
          Tailored for School Learning, Interactive Classrooms & Board Exam Excellence (CBSE / ICSE / State Boards).
        </div>
      </div>
    </footer>
  );
}
