import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingAssistantWidget from '@/components/assistant/FloatingAssistantWidget';
import FullscreenController from '@/components/layout/FullscreenController';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BoardMind AI — Friendly & Student-Centered AI Board Exam Coach',
  description: 'Interactive classroom and competition-grade AI coaching platform for CBSE, ICSE, and State Board exams with adaptive quiz engine and descriptive grading.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FFF7ED] text-[#334155] relative selection:bg-[#EA580C] selection:text-white">
        {/* Automatic Fullscreen Manager & User Interaction Controller */}
        <FullscreenController />

        {/* Soft, friendly ambient warm glows */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(234,88,12,0.08),transparent)] blur-3xl" />
          <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(15,118,110,0.06),transparent)] blur-3xl" />
          <div className="absolute bottom-10 -right-48 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.08),transparent)] blur-3xl" />
        </div>
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <FloatingAssistantWidget />
        <Footer />
      </body>
    </html>
  );
}
