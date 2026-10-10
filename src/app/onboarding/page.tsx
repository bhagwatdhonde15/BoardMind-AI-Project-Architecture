'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OFFICIAL_BOARDS } from '@/lib/syllabusData';
import { saveStudentProfile } from '@/lib/studentProfile';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedBoard, setSelectedBoard] = useState('CBSE');
  const [selectedClass, setSelectedClass] = useState('Class 12');
  const [targetScore, setTargetScore] = useState(95);

  const handleComplete = () => {
    saveStudentProfile({
      board: selectedBoard,
      classLevel: selectedClass,
      targetScore,
    });
    router.push('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold px-3.5 py-1.5 bg-sky-950/80 text-sky-300 border border-sky-500/40 rounded-full shadow-sm">
          Step 1 of 1 — Official Student Setup
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Configure Your AI Board Coach</h1>
        <p className="text-xs text-sky-200/70">
          Question patterns, step marking, and weakness diagnostics are tailored to your official curriculum.
        </p>
      </div>

      <div className="bg-[#0b1739] border border-[#162a52] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl glow-card">
        {/* Board Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-sky-200 uppercase tracking-wider">
            1. Select Your Education Board
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OFFICIAL_BOARDS.map((board) => {
              const isSelected = selectedBoard === board.name;
              return (
                <button
                  key={board.id}
                  type="button"
                  onClick={() => setSelectedBoard(board.name)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-[#0c2454] border-2 border-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : 'bg-[#060d1f] border-[#1a3260] text-sky-100 hover:border-sky-500/40'
                  }`}
                >
                  <div>
                    <div className="font-extrabold text-sm">{board.name}</div>
                    <div className="text-[11px] text-sky-200/60 mt-1 leading-relaxed">{board.fullName}</div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Class Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-sky-200 uppercase tracking-wider">
            2. Select Your Class Level
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Class 9', 'Class 10', 'Class 11', 'Class 12'].map((cls) => {
              const isSelected = selectedClass === cls;
              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`py-3 px-4 rounded-xl border font-bold text-xs text-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 border-sky-400 text-white shadow-md shadow-sky-500/25'
                      : 'bg-[#060d1f] border-[#1a3260] text-sky-200/80 hover:border-sky-500/40'
                  }`}
                >
                  {cls}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Board Score Goal */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-sky-200 uppercase tracking-wider">
              3. Target Board Exam Score Goal
            </label>
            <span className="font-black text-sky-400 text-base">{targetScore}%</span>
          </div>
          <input
            type="range"
            min="70"
            max="99"
            value={targetScore}
            onChange={(e) => setTargetScore(Number(e.target.value))}
            className="w-full h-2 bg-[#060d1f] rounded-lg appearance-none cursor-pointer accent-sky-400 border border-[#1a3260]"
          />
        </div>

        <button
          onClick={handleComplete}
          className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
        >
          <span>Complete Setup & Launch Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
