'use client';

import { useState, useEffect } from 'react';
import { getStudentProfile, saveStudentProfile } from '@/lib/studentProfile';
import { OFFICIAL_BOARDS } from '@/lib/syllabusData';
import { User, ShieldCheck, Award, Flame, Save, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState(() => getStudentProfile());
  const [name, setName] = useState(profile.name);
  const [board, setBoard] = useState(profile.board);
  const [classLevel, setClassLevel] = useState(profile.classLevel);
  const [targetScore, setTargetScore] = useState(profile.targetScore);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const loaded = getStudentProfile();
    setProfile(loaded);
    setName(loaded.name);
    setBoard(loaded.board);
    setClassLevel(loaded.classLevel);
    setTargetScore(loaded.targetScore);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveStudentProfile({
      name,
      board,
      classLevel,
      targetScore,
    });
    setProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-[#fed7aa] flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2.5">
            <User className="w-7 h-7 text-[#EA580C]" />
            <span>Student Profile</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">Manage target board exam settings and preferences.</p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border-2 border-[#fed7aa] rounded-2xl space-y-1 text-center shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase">Target Score</span>
          <div className="text-3xl font-black text-[#EA580C]">{targetScore}%</div>
        </div>

        <div className="p-5 bg-white border-2 border-[#fed7aa] rounded-2xl space-y-1 text-center shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase">Streak Active</span>
          <div className="text-3xl font-black text-[#0F766E] flex items-center justify-center gap-1.5">
            <Flame className="w-5 h-5 text-[#EA580C] fill-[#EA580C]" />
            <span>{profile.streakDays} Days</span>
          </div>
        </div>

        <div className="p-5 bg-white border-2 border-[#fed7aa] rounded-2xl space-y-1 text-center shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase">Readiness Score</span>
          <div className="text-3xl font-black text-emerald-600">{profile.overallProgress}%</div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md glow-card">
        <h2 className="text-lg font-bold text-slate-800">Board Exam Settings</h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Student Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl p-3 text-slate-800 font-semibold focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Target Board</label>
              <select
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl p-3 text-slate-800 font-semibold focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
              >
                {OFFICIAL_BOARDS.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Target Class Level</label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl p-3 text-slate-800 font-semibold focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
              >
                <option value="Class 10">Class 10 (Secondary School)</option>
                <option value="Class 12">Class 12 (Higher Secondary)</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 9">Class 9</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Target Board Exam Percentage: <span className="text-[#EA580C] font-black">{targetScore}%</span>
            </label>
            <input
              type="range"
              min="60"
              max="100"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-full accent-[#EA580C]"
            />
          </div>

          {/* Connected Google Account Information */}
          <div className="p-4 bg-[#FFF7ED] border border-[#fed7aa] rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl border border-[#fed7aa] shadow-xs">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <div>
                <div className="font-bold text-slate-800 text-xs">Google Account Connection</div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {profile.email || 'student@gmail.com'}
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-teal-50 text-[#0F766E] border border-teal-200 text-[11px] font-bold rounded-full">
              Connected
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#fed7aa]">
            <span className="text-[11px] text-slate-500 font-medium">
              Changes sync across the dashboard and quiz engines instantly.
            </span>
            <button
              type="submit"
              className="px-6 py-3 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-teal-50 border border-teal-200 text-[#0F766E] rounded-xl flex items-center gap-2 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
              <span>Settings updated successfully!</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
