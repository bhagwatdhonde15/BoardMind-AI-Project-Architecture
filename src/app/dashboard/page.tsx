'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import WeaknessRadarChart from '@/components/dashboard/WeaknessRadarChart';
import { fetchDashboardData, DashboardData, DEMO_SUPABASE_DATA } from '@/lib/supabase/db';
import { getStudentProfile } from '@/lib/studentProfile';
import {
  BarChart3,
  Target,
  BookOpen,
  FileCheck,
  Zap,
  Flame,
  Award,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Database,
} from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(DEMO_SUPABASE_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      const dbData = await fetchDashboardData();
      const profile = getStudentProfile();
      setData({
        ...dbData,
        studentName: profile.name,
        board: profile.board,
        classLevel: profile.classLevel,
        overallProgress: profile.overallProgress,
        streakDays: profile.streakDays,
      });
      setIsLoading(false);
    }
    loadData();
  }, []);

  const radarData = data.topicPerformances.map((tp) => ({
    subject: tp.topicName,
    mastery: tp.masteryScore,
    fullMark: 100,
  }));

  const weakTopics = data.topicPerformances.filter((tp) => tp.status === 'WEAK');

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Student Welcome Header Card: Warm White & Cream with Orange/Teal Highlights */}
      <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md relative overflow-hidden card-interactive">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-orange-50 text-[#EA580C] border border-orange-200 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-xs">
              <Database className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>{data.board} • {data.classLevel}</span>
            </span>
            <span className="px-3 py-1 bg-teal-50 text-[#0F766E] border border-teal-200 text-xs font-bold rounded-full flex items-center gap-1 shadow-xs">
              <Flame className="w-3.5 h-3.5 text-[#EA580C] fill-[#EA580C]" />
              <span>{data.streakDays} Day Streak</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, {data.studentName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
            Live diagnostic performance and syllabus mastery for {data.board} {data.classLevel}.
          </p>
        </div>

        {/* Board Readiness Metric Gauge */}
        <div className="bg-[#FFF7ED] border border-[#fed7aa] rounded-2xl p-5 text-center shrink-0 w-full md:w-auto shadow-xs relative z-10">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Overall Progress / Readiness
          </div>
          <div className="text-3xl font-black text-[#EA580C] mt-1 tracking-tight">
            {data.overallProgress}%
          </div>
          <div className="w-48 bg-orange-100 rounded-full h-3 mt-2.5 overflow-hidden mx-auto border border-orange-200">
            <div
              className="bg-gradient-to-r from-[#EA580C] to-[#f97316] h-3 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${data.overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Saturday AI Voice Doubt Solver Quick Banner */}
      <Link
        href="/assistant"
        className="card-interactive bg-white border-2 border-[#0F766E]/40 hover:border-[#0F766E] p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm group block"
      >
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E] shrink-0 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-[#0F766E]" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-extrabold text-slate-800 text-base">Saturday AI Voice Doubt Solver</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-100 text-[#EA580C] border border-orange-200 rounded-full">
                Interactive Companion
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Stuck on a tricky question? Tap to talk with Saturday AI in natural voice or text anytime!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] shrink-0 px-4 py-2 bg-orange-50 border border-orange-200 rounded-xl group-hover:bg-[#EA580C] group-hover:text-white transition-all">
          <span>Start Voice Session</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Quick Access Action Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/quiz/adaptive"
          className="p-5 bg-white border-2 border-[#fed7aa] hover:border-[#EA580C] rounded-2xl text-center space-y-2 transition-all card-interactive shadow-xs"
        >
          <div className="w-10 h-10 mx-auto rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center border border-orange-200">
            <Target className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm text-slate-800">Adaptive Quiz</div>
          <div className="text-[11px] text-slate-500 font-medium">Tailored difficulty engine</div>
        </Link>

        <Link
          href="/quiz/fix-weakness"
          className="p-5 bg-white border-2 border-[#fed7aa] hover:border-[#0F766E] rounded-2xl text-center space-y-2 transition-all card-interactive shadow-xs"
        >
          <div className="w-10 h-10 mx-auto rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm text-slate-800">Fix Weakness</div>
          <div className="text-[11px] text-slate-500 font-medium">Target subtopics &lt;60%</div>
        </Link>

        <Link
          href="/quiz/examiner"
          className="p-5 bg-white border-2 border-[#fed7aa] hover:border-[#EA580C] rounded-2xl text-center space-y-2 transition-all card-interactive shadow-xs"
        >
          <div className="w-10 h-10 mx-auto rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center border border-orange-200">
            <FileCheck className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm text-slate-800">AI Examiner</div>
          <div className="text-[11px] text-slate-500 font-medium">Descriptive step marking</div>
        </Link>

        <Link
          href="/mock-exam"
          className="p-5 bg-white border-2 border-[#fed7aa] hover:border-[#0F766E] rounded-2xl text-center space-y-2 transition-all card-interactive shadow-xs"
        >
          <div className="w-10 h-10 mx-auto rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-200">
            <Zap className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm text-slate-800">Mock Exam</div>
          <div className="text-[11px] text-slate-500 font-medium">Full timed simulation</div>
        </Link>
      </div>

      {/* Two Column Section: Radar Chart & Weak Topics List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#0F766E]" />
              <span>Topic Mastery Radar</span>
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">Class 12 Physics</span>
          </div>
          <WeaknessRadarChart data={radarData} />
        </div>

        {/* Priority Weakness Remediation List */}
        <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#EA580C]" />
                <span>Priority Remediation Needed</span>
              </h2>
              <span className="text-xs font-bold text-[#EA580C] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                {weakTopics.length} Focus Areas
              </span>
            </div>

            <div className="space-y-3">
              {weakTopics.map((topic) => (
                <div
                  key={topic.topicName}
                  className="p-3.5 bg-[#FFF7ED] rounded-2xl border border-[#fed7aa] flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-800 text-xs">{topic.topicName}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      Mastery: <span className="font-bold text-[#EA580C]">{topic.masteryScore}%</span> • Correct: {topic.totalCorrect}/{topic.totalAttempted}
                    </div>
                  </div>
                  <Link
                    href="/quiz/fix-weakness"
                    className="px-3 py-1.5 bg-[#EA580C] hover:bg-[#c2410c] text-white text-[11px] font-bold rounded-xl shadow-xs transition-colors"
                  >
                    Drill Now
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-slate-700 mt-4 flex items-center gap-3">
            <Award className="w-5 h-5 text-[#0F766E] shrink-0" />
            <span>
              Consistent 10-minute daily drills will boost your overall board score readiness past 95%!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
