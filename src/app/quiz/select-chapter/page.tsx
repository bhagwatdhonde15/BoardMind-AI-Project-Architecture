'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OFFICIAL_SYLLABUS_CHAPTERS, getChaptersForSelection, ChapterInfo } from '@/lib/syllabusData';
import { ArrowRight, BookOpen, AlertTriangle, CheckCircle2, Filter, Layers } from 'lucide-react';

export default function SelectChapterPage() {
  const router = useRouter();
  const [selectedBoard, setSelectedBoard] = useState('Maharashtra HSC');
  const [selectedClass, setSelectedClass] = useState('Class 12');
  const [selectedSubject, setSelectedSubject] = useState('Physics');

  const chapters: ChapterInfo[] = getChaptersForSelection(selectedBoard, selectedClass, selectedSubject);

  const handleSelect = (chapterTitle: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedChapter', chapterTitle);
      localStorage.setItem('selectedBoard', selectedBoard);
      localStorage.setItem('selectedSubject', selectedSubject);
    }
    router.push('/quiz/setup');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold px-3.5 py-1.5 bg-sky-950/80 text-sky-300 border border-sky-500/40 rounded-full shadow-sm">
          Step 3 of 4 — Official Syllabus Chapter Selection
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Select Official Board Chapter</h1>
        <p className="text-xs text-sky-200/70">
          Showing authentic curriculum chapters for {selectedBoard} • {selectedClass} • {selectedSubject}.
        </p>
      </div>

      {/* Board & Subject Quick Filters */}
      <div className="p-4 bg-[#0b1739] border border-[#162a52] rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-sky-400" />
          <span className="font-bold text-sky-200">Curriculum Filters:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
            className="bg-[#060d1f] border border-[#1a3260] text-sky-100 px-3 py-1.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="Maharashtra HSC">Maharashtra HSC</option>
            <option value="CBSE">CBSE</option>
          </select>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-[#060d1f] border border-[#1a3260] text-sky-100 px-3 py-1.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="Class 12">Class 12</option>
            <option value="Class 10">Class 10</option>
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-[#060d1f] border border-[#1a3260] text-sky-100 px-3 py-1.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology</option>
          </select>
        </div>
      </div>

      {/* Real Chapters List */}
      <div className="space-y-3">
        {chapters.map((ch) => {
          const isWeak = ch.title.toLowerCase().includes('capacitance') || ch.title.toLowerCase().includes('optics');

          return (
            <button
              key={ch.id}
              onClick={() => handleSelect(ch.title)}
              className="w-full group p-5 bg-[#0b1739] border border-[#162a52] hover:border-sky-400/60 rounded-2xl text-left transition-all hover:shadow-xl hover:shadow-sky-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-sky-950 text-sky-300 border border-sky-800 rounded-md">
                    Chapter {ch.chapterNumber}
                  </span>
                  <span className="font-bold text-white text-base group-hover:text-sky-300 transition-colors">
                    {ch.title}
                  </span>
                  {isWeak && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-950/80 text-rose-400 border border-rose-800 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Priority Weak Topic
                    </span>
                  )}
                </div>

                <div className="text-xs text-sky-200/60 font-medium">
                  {ch.board} • {ch.subject} {ch.weightageMarks ? `• Board Weightage: ${ch.weightageMarks} Marks` : ''}
                </div>

                {ch.topics && ch.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ch.topics.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-0.5 bg-[#060d1f] border border-[#1a3260] text-sky-200/80 rounded-md font-medium"
                      >
                        {t}
                      </span>
                    ))}
                    {ch.topics.length > 4 && (
                      <span className="text-[10px] text-sky-300/60 self-center font-semibold">
                        +{ch.topics.length - 4} more topics
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 group-hover:translate-x-1 transition-transform shrink-0">
                <span>Select Chapter</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
