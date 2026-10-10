'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Brain,
  Target,
  BookOpen,
  FileCheck,
  Zap,
  BookmarkX,
  BarChart3,
  Menu,
  X,
  Layers,
  Sparkles,
  Maximize,
  Minimize,
} from 'lucide-react';
import { getStudentProfile } from '@/lib/studentProfile';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studentName, setStudentName] = useState('Student');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (e) {
      console.warn('Fullscreen toggle:', e);
    }
  };

  useEffect(() => {
    const profile = getStudentProfile();
    setStudentName(profile.name);

    const onStorage = () => {
      setStudentName(getStudentProfile().name);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const mainLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Saturday AI Tutor', href: '/assistant', icon: Sparkles },
    { name: 'Adaptive Quiz', href: '/quiz/adaptive', icon: Target },
    { name: 'Fix Weakness', href: '/quiz/fix-weakness', icon: BookOpen },
    { name: 'AI Examiner', href: '/quiz/examiner', icon: FileCheck },
    { name: 'Mock Exam', href: '/mock-exam', icon: Zap },
    { name: 'My Mistakes', href: '/mistakes', icon: BookmarkX },
    { name: 'Analytics', href: '/analytics', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#fed7aa] bg-[#FFF7ED]/95 backdrop-blur-md text-[#334155] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Orange #EA580C & Teal #0F766E */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl text-[#EA580C] hover:text-[#c2410c] transition-colors"
          >
            <div className="p-2 bg-orange-100 rounded-xl border border-orange-200 shadow-sm">
              <Brain className="w-5 h-5 text-[#EA580C]" />
            </div>
            <span className="flex items-center tracking-tight text-slate-800">
              BoardMind
              <span className="text-[#0F766E] text-xs font-bold ml-1.5 px-2 py-0.5 bg-teal-50 border border-teal-200 rounded-full shadow-xs">
                AI
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links: Friendly Student-Centered theme */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#EA580C] text-white shadow-md shadow-orange-500/25'
                      : 'text-[#334155] hover:text-[#0F766E] hover:bg-orange-50 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Fullscreen Toggle + Profile + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-[#fed7aa] hover:border-[#EA580C] text-slate-700 hover:text-[#EA580C] transition-all text-xs font-semibold shadow-xs"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span className="hidden md:inline">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span className="hidden md:inline">Fullscreen</span>
                </>
              )}
            </button>

            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#fed7aa] hover:border-[#EA580C] transition-all text-xs font-semibold text-[#334155] shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-teal-100 border border-teal-300 text-[#0F766E] flex items-center justify-center font-bold text-[10px]">
                {studentName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline font-medium text-slate-700">{studentName}</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#fed7aa] text-slate-700 hover:text-[#EA580C]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#fed7aa] bg-[#FFF7ED] px-4 py-3 space-y-1">
          {mainLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                  isActive
                    ? 'bg-[#EA580C] text-white'
                    : 'text-[#334155] hover:bg-orange-100/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
