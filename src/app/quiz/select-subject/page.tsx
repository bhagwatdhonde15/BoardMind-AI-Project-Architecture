'use client';

import { useRouter } from 'next/navigation';
import { OFFICIAL_SUBJECTS_CLASS_12 } from '@/lib/syllabusData';
import { ArrowRight, BookOpen, Zap, FlaskConical, Calculator, Dna, Globe } from 'lucide-react';

export default function SelectSubjectPage() {
  const router = useRouter();

  const getIcon = (subjectId: string) => {
    switch (subjectId) {
      case 'physics': return Zap;
      case 'chemistry': return FlaskConical;
      case 'mathematics': return Calculator;
      case 'biology': return Dna;
      default: return BookOpen;
    }
  };

  const handleSelect = (subjectName: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedSubject', subjectName);
    }
    router.push('/quiz/select-chapter');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold px-3.5 py-1.5 bg-sky-950/80 text-sky-300 border border-sky-500/40 rounded-full shadow-sm">
          Step 2 of 4 — Subject Selection
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Choose Your Subject</h1>
        <p className="text-xs text-sky-200/70">Select the subject you wish to test or diagnose.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {OFFICIAL_SUBJECTS_CLASS_12.map((sub) => {
          const Icon = getIcon(sub.id);
          return (
            <button
              key={sub.id}
              onClick={() => handleSelect(sub.name)}
              className="group p-5 bg-[#0b1739] border border-[#162a52] hover:border-sky-400/60 rounded-2xl text-left transition-all hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-400 flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="font-extrabold text-lg text-white group-hover:text-sky-300 transition-colors">
                  {sub.name}
                </h2>
                <div className="text-xs text-sky-200/60 mt-1">{sub.chaptersCount} Official Chapters</div>
              </div>

              <div className="pt-3 border-t border-[#142852] flex items-center justify-between text-xs font-semibold text-sky-400">
                <span>Select Subject</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
