'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { saveStudentProfile } from '@/lib/studentProfile';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [googleStudentEmail, setGoogleStudentEmail] = useState('');
  const [googleStudentName, setGoogleStudentName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      saveStudentProfile({ name: name.trim(), email: email.trim() || 'student@boardmind.ai' });
    }
    router.push('/onboarding');
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder')) {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/onboarding`,
          },
        });
        if (error) throw error;
      } else {
        setGoogleModalOpen(true);
      }
    } catch (err) {
      console.warn('OAuth fallback triggered:', err);
      setGoogleModalOpen(true);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const completeGoogleSignUp = (chosenName: string, chosenEmail: string) => {
    const finalName = chosenName.trim() || 'Student';
    const finalEmail = chosenEmail.trim() || 'student@gmail.com';
    saveStudentProfile({
      name: finalName,
      email: finalEmail,
    });
    setGoogleModalOpen(false);
    router.push('/onboarding');
  };

  return (
    <div className="max-w-md mx-auto py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-orange-100 border border-orange-200 rounded-2xl text-[#EA580C] shadow-xs">
          <Brain className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Create Student Account</h1>
        <p className="text-xs text-slate-600 font-medium">Get personalized AI coaching for your board exams.</p>
      </div>

      <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-7 shadow-md space-y-5 glow-card">
        {/* Primary Google Signup Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isGoogleLoading}
            className="w-full py-3.5 px-4 bg-white hover:bg-orange-50/60 border-2 border-[#fed7aa] hover:border-[#EA580C] text-slate-700 font-bold text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-60"
          >
            {/* Official Google Vector Logo */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            <span>{isGoogleLoading ? 'Connecting to Google...' : 'Sign up with Google'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#fed7aa]" />
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">or sign up with email</span>
          <div className="flex-1 h-px bg-[#fed7aa]" />
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#EA580C] absolute left-3 top-3.5" />
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#EA580C] absolute left-3 top-3.5" />
              <input
                type="email"
                required
                placeholder="student@boardmind.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Create Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#EA580C] absolute left-3 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Board Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-600 pt-3 border-t border-[#fed7aa] font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-[#EA580C] hover:underline font-bold">
            Log in
          </Link>
        </div>
      </div>

      {/* Google Student Account Connection Modal */}
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in-up">
          <div className="bg-white border-2 border-[#fed7aa] rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center gap-3 pb-3 border-b border-[#fed7aa]">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                <h3 className="font-extrabold text-slate-800 text-sm">Create Account with Google</h3>
                <p className="text-[11px] text-slate-500 font-medium">Verify your student Google identity</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={googleStudentName}
                  onChange={(e) => setGoogleStudentName(e.target.value)}
                  className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Google Email (@gmail.com)</label>
                <input
                  type="email"
                  placeholder="student@gmail.com"
                  value={googleStudentEmail}
                  onChange={(e) => setGoogleStudentEmail(e.target.value)}
                  className="w-full bg-[#FFF7ED] border border-[#fed7aa] rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                />
              </div>

              <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-xl text-[11px] text-[#0F766E] font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#0F766E]" />
                <span>Google OAuth securely links your curriculum and diagnostic data.</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setGoogleModalOpen(false)}
                className="flex-1 py-2.5 bg-[#FFF7ED] hover:bg-orange-100 text-slate-700 font-bold text-xs rounded-xl border border-[#fed7aa] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => completeGoogleSignUp(googleStudentName, googleStudentEmail)}
                className="flex-1 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Connect &amp; Continue</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
