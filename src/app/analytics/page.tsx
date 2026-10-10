'use client';

import WeaknessRadarChart from '@/components/dashboard/WeaknessRadarChart';
import { REAL_STUDENT_PROFILE, REAL_SUBJECT_MASTERY, REAL_DIFFICULTY_STATS } from '@/lib/realBoardDataset';
import { BarChart3, TrendingUp, ShieldCheck, Zap, Award } from 'lucide-react';

export default function AnalyticsPage() {
  const radarData = [
    { subject: 'Physics', mastery: 68, fullMark: 100 },
    { subject: 'Chemistry', mastery: 74, fullMark: 100 },
    { subject: 'Mathematics', mastery: 82, fullMark: 100 },
    { subject: 'Biology', mastery: 88, fullMark: 100 },
    { subject: 'Social Science', mastery: 70, fullMark: 100 },
  ];

  const difficultyStats = REAL_DIFFICULTY_STATS;

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 animate-fade-in-up">
      {/* Header */}
      <div className="pb-4 border-b border-[#fed7aa] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-[#EA580C]" />
            <span>Performance Analytics</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Deep diagnostic insights into subject mastery, difficulty progression, and board readiness.
          </p>
        </div>

        <div className="p-4 bg-white border-2 border-[#fed7aa] rounded-2xl text-center self-start sm:self-auto shadow-xs glow-card card-interactive">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Board Readiness Score</div>
          <div className="text-3xl font-black text-[#EA580C] mt-0.5">{REAL_STUDENT_PROFILE.overallProgress}%</div>
        </div>
      </div>

      {/* Main Grid: Subject Mastery Bars + Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Accuracy List */}
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm card-interactive">
          <h2 className="text-base font-bold text-slate-800">Subject Mastery Breakdown</h2>

          <div className="space-y-4">
            {REAL_SUBJECT_MASTERY.map((sub) => (
              <div key={sub.id} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">{sub.name}</span>
                  <span className="font-extrabold text-[#0F766E]">{sub.mastery}%</span>
                </div>
                <div className="w-full bg-[#FFF7ED] rounded-full h-3 overflow-hidden border border-[#fed7aa]">
                  <div
                    className="bg-gradient-to-r from-[#EA580C] to-[#f97316] h-3 rounded-full transition-all duration-500 shadow-xs"
                    style={{ width: `${sub.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-800">Mastery Radar</h2>
          <WeaknessRadarChart data={radarData} />
        </div>
      </div>

      {/* Difficulty Breakdown Grid */}
      <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-slate-800">Accuracy by Question Difficulty Level</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {difficultyStats.map((stat) => (
            <div
              key={stat.level}
              className="p-5 bg-[#FFF7ED] rounded-2xl border border-[#fed7aa] space-y-2 text-center"
            >
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {stat.level}
              </div>
              <div className="text-3xl font-black text-[#EA580C]">
                {stat.accuracy}%
              </div>
              <div className="text-[11px] text-slate-600 font-medium">{stat.count} Questions Solved</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
