import Link from 'next/link';
import {
  Brain,
  Target,
  BookOpen,
  FileCheck,
  Zap,
  BookmarkX,
  BarChart3,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function LandingPage() {
  const modules = [
    {
      title: 'Saturday AI Voice Doubt Solver',
      desc: 'Talk naturally like with a friendly teacher. Ask any doubt by voice, get step-by-step explanations, key formulas, and exam tips.',
      href: '/assistant',
      icon: Sparkles,
      badge: 'Voice Companion',
      color: 'text-[#EA580C]',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
    {
      title: 'Adaptive Quiz Engine',
      desc: 'Interactive classroom diagnostic loop that adjusts question difficulty and topic focus based on your exact response accuracy.',
      href: '/quiz/adaptive',
      icon: Target,
      badge: 'Core Engine',
      color: 'text-[#0F766E]',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
    },
    {
      title: 'Fix My Weakness',
      desc: 'Targeted practice drills automatically isolating your subtopics with mastery scores under 60%.',
      href: '/quiz/fix-weakness',
      icon: BookOpen,
      badge: 'Remediation',
      color: 'text-[#EA580C]',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
    {
      title: 'AI Examiner (Descriptive)',
      desc: 'Get constructive step-by-step grading for written answers according to official CBSE/ICSE board marking schemes.',
      href: '/quiz/examiner',
      icon: FileCheck,
      badge: 'Step Marking',
      color: 'text-[#0F766E]',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
    },
    {
      title: 'Board Mock Exam',
      desc: 'Full-length timed examinations simulating standard board paper patterns with camera and screen proctoring when started.',
      href: '/mock-exam',
      icon: Zap,
      badge: 'Timed Simulation',
      color: 'text-[#EA580C]',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
    {
      title: 'My Mistakes Notebook',
      desc: 'Automatic friendly error notebook bookmarking missed questions with detailed solutions and spaced-repetition retry.',
      href: '/mistakes',
      icon: BookmarkX,
      badge: 'Error Review',
      color: 'text-[#0F766E]',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
    },
    {
      title: 'Performance Analytics',
      desc: 'Visual mastery breakdown charts, board readiness percentage, and subject strength distribution.',
      href: '/analytics',
      icon: BarChart3,
      badge: 'Visual Data',
      color: 'text-[#EA580C]',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
  ];

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-4 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#fed7aa] text-[#EA580C] text-xs font-bold shadow-xs animate-float">
          <Brain className="w-4 h-4 text-[#EA580C]" />
          <span>Friendly &amp; Student-Centered AI Learning</span>
          <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" />
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#334155] leading-tight tracking-tight">
          Delightful Learning for{' '}
          <span className="text-[#EA580C]">
            CBSE, ICSE &amp; State Boards
          </span>
        </h1>

        {/* Prominent Quote Card: Warm Cream & Teal */}
        <div className="p-6 sm:p-8 bg-white border-2 border-[#fed7aa] rounded-3xl shadow-lg max-w-3xl mx-auto text-center glow-card relative overflow-hidden card-interactive">
          <div className="absolute top-0 right-0 w-36 h-36 bg-orange-100 rounded-full blur-2xl pointer-events-none" />
          <p className="text-lg sm:text-2xl font-bold text-slate-800 leading-relaxed italic relative z-10">
            &ldquo;BoardMind AI does not just generate questions. It understands what you know, finds what you don&apos;t know and gives you the right next question.&rdquo;
          </p>
          <div className="mt-3 text-xs font-semibold text-[#0F766E]">
            Designed for interactive classrooms &amp; stress-free self-study
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
          Built specifically for Class 9–12 students. Master board pattern MCQs, numericals, and descriptive answers with friendly coaching powered by Groq &amp; Gemini AI.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/onboarding"
            className="btn-shimmer px-7 py-3.5 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 text-sm hover:scale-[1.02]"
          >
            <span>Start Free Student Setup</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="px-7 py-3.5 bg-white hover:bg-orange-50 text-[#0F766E] font-bold rounded-2xl border-2 border-[#0F766E]/30 hover:border-[#0F766E] transition-all text-sm shadow-xs hover:scale-[1.02]"
          >
            Explore Dashboard Demo
          </Link>
        </div>
      </section>

      {/* Trust Stats Bar: Clean Cream & Teal Accent */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-[#fed7aa] rounded-3xl text-center shadow-md card-interactive">
        <div>
          <div className="text-2xl font-black text-[#EA580C]">4 Boards</div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">CBSE, ICSE, UP, Maharashtra</div>
        </div>
        <div>
          <div className="text-2xl font-black text-[#0F766E]">Classes 9–12</div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">Physics, Chem, Maths, Bio</div>
        </div>
        <div>
          <div className="text-2xl font-black text-[#EA580C]">Step Marking</div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">Descriptive AI Examiner</div>
        </div>
        <div>
          <div className="text-2xl font-black text-[#0F766E]">95%+ Target</div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">Readiness Score Index</div>
        </div>
      </section>

      {/* Modules Feature Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-800">Complete Interactive Learning Suite</h2>
          <p className="text-xs text-slate-600 font-medium">Classroom-grade tools engineered for student clarity and exam confidence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.title}
                href={mod.href}
                className="group bg-white border-2 border-[#fed7aa] hover:border-[#EA580C] rounded-3xl p-6 space-y-4 transition-all card-interactive flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 ${mod.bg} border ${mod.border} rounded-2xl ${mod.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 bg-[#FFF7ED] border border-[#fed7aa] text-[#EA580C] rounded-full">
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-[#EA580C] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1.5 font-medium">{mod.desc}</p>
                </div>

                <div className="pt-4 border-t border-orange-100 flex items-center justify-between text-xs font-bold text-[#0F766E]">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#EA580C]" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
