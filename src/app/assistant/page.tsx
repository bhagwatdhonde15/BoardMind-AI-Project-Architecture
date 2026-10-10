'use client';

import { useState, useEffect, useRef } from 'react';
import VoiceOrb from '@/components/assistant/VoiceOrb';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Award,
  Zap,
  CheckCircle2,
  Bookmark,
  MessageSquare,
} from 'lucide-react';

interface AssistantMessage {
  id: string;
  sender: 'student' | 'saturday';
  text: string;
  speechText?: string;
  keyFormulas?: string[];
  examTip?: string;
  followUpQuestion?: string;
  timestamp: string;
}

export default function AssistantPage() {
  const [doubtInput, setDoubtInput] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('Physics');
  const [selectedBoard, setSelectedBoard] = useState<string>('CBSE');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wakeWordDetected, setWakeWordDetected] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'saturday',
      text: "Hello! I am Saturday, your friendly AI Board Exam Study Companion & Doubt Solver. Whether you're stuck on a derivation, confused about a formula, or need a concept explained step-by-step, I'm right here with you. Tap the Orb or speak anytime!",
      speechText: "Hello! I'm Saturday, your AI Study Companion. How can I help you ace your board exam today?",
      examTip: "Feel free to say 'Hey Saturday' or type any question from Physics, Chemistry, Math, or Biology.",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setSpeechSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        let transcript = event.results[0][0].transcript;
        if (transcript) {
          const lower = transcript.toLowerCase();
          if (
            lower.includes('hey saturday') ||
            lower.includes('saturday') ||
            lower.includes('hey assistant') ||
            lower.includes('jarvis')
          ) {
            setWakeWordDetected(true);
            setTimeout(() => setWakeWordDetected(false), 2500);
            transcript = transcript
              .replace(/hey saturday/gi, '')
              .replace(/saturday/gi, '')
              .replace(/hey assistant/gi, '')
              .replace(/jarvis/gi, '')
              .trim();
          }

          if (transcript.length > 2) {
            handleSubmitDoubt(transcript);
          }
        }
      };

      recognitionRef.current = recognition;
    }
  }, [selectedSubject, selectedBoard]);

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleMicListening = () => {
    if (!speechSupported) {
      alert('Speech Recognition is not supported on this browser version. Use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (isSpeaking) {
        stopSpeaking();
      }
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn('Mic start error:', err);
      }
    }
  };

  const handleSubmitDoubt = async (queryText?: string) => {
    const textToSend = (queryText || doubtInput).trim();
    if (!textToSend || isLoading) return;

    const studentMsg: AssistantMessage = {
      id: `student_${Date.now()}`,
      sender: 'student',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, studentMsg]);
    setDoubtInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doubt: textToSend,
          subject: selectedSubject,
          board: selectedBoard,
        }),
      });

      const data = await res.json();

      if (data.success && data.answer) {
        const saturdayMsg: AssistantMessage = {
          id: `sat_${Date.now()}`,
          sender: 'saturday',
          text: data.answer.explanation,
          speechText: data.answer.speechText,
          keyFormulas: data.answer.keyFormulas || [],
          examTip: data.answer.examTip || '',
          followUpQuestion: data.answer.followUpQuestion || '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, saturdayMsg]);

        if (data.answer.speechText) {
          speakText(data.answer.speechText);
        }
      } else {
        const fallbackMsg: AssistantMessage = {
          id: `sat_err_${Date.now()}`,
          sender: 'saturday',
          text: "I couldn't fetch the explanation right now. Please try asking again or rephrasing your doubt.",
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }
    } catch (err) {
      const errorMsg: AssistantMessage = {
        id: `sat_err_${Date.now()}`,
        sender: 'saturday',
        text: "Network error occurred while contacting Saturday AI. Please check your connection and try again.",
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2 animate-fade-in-up">
      {/* Studio Header */}
      <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden card-interactive">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-100 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5 text-center md:text-left z-10">
          <VoiceOrb
            size="md"
            isListening={isListening}
            isSpeaking={isSpeaking}
            onClick={toggleMicListening}
          />

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-orange-50 text-[#EA580C] border border-orange-200 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Saturday AI • Classroom Voice Companion</span>
              </span>
              {wakeWordDetected && (
                <span className="px-2.5 py-0.5 bg-teal-50 text-[#0F766E] border border-teal-200 text-[10px] font-bold rounded-full animate-bounce">
                  Wake Word &lsquo;Hey Saturday&rsquo; Detected!
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Saturday AI Doubt Solver Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
              Talk freely using natural voice or text. Get step-by-step breakdowns, formulas, and examiner tips for {selectedBoard} {selectedSubject}.
            </p>
          </div>
        </div>

        {/* Board & Subject Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10 w-full md:w-auto">
          <div className="w-full sm:w-auto">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-[#FFF7ED] border border-[#fed7aa] text-xs text-slate-800 rounded-xl px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Board
            </label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full bg-[#FFF7ED] border border-[#fed7aa] text-xs text-slate-800 rounded-xl px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
            >
              <option value="CBSE">CBSE Board</option>
              <option value="ICSE">ICSE / ISC</option>
              <option value="Maharashtra HSC">Maharashtra HSC</option>
              <option value="UP Board">UP Board</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="bg-white border-2 border-[#fed7aa] rounded-3xl p-4 sm:p-6 shadow-md min-h-[440px] max-h-[600px] flex flex-col justify-between overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="overflow-y-auto space-y-4 pr-2 flex-1 pb-4">
          {messages.map((msg) => {
            const isSaturday = msg.sender === 'saturday';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isSaturday ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[80%] rounded-2xl p-4.5 text-xs sm:text-sm leading-relaxed ${
                    isSaturday
                      ? 'bg-[#FFF7ED] text-slate-800 border-2 border-[#fed7aa] shadow-xs'
                      : 'bg-[#EA580C] text-white shadow-xs font-medium'
                  }`}
                >
                  {/* Sender Banner */}
                  <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-orange-200/60">
                    <span className="font-bold text-xs flex items-center gap-1.5 text-slate-800">
                      {isSaturday ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                          <span className="text-[#EA580C]">Saturday AI</span>
                        </>
                      ) : (
                        <span className="text-white">You</span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{msg.timestamp}</span>
                  </div>

                  {/* Body Text */}
                  <p className="whitespace-pre-line text-slate-800 font-medium">{msg.text}</p>

                  {/* Key Formulas Section */}
                  {msg.keyFormulas && msg.keyFormulas.length > 0 && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-[#fed7aa]">
                      <div className="text-[11px] font-bold text-[#EA580C] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Bookmark className="w-3.5 h-3.5 text-[#EA580C]" />
                        <span>Key Formulas &amp; Equations</span>
                      </div>
                      <div className="space-y-1">
                        {msg.keyFormulas.map((f, i) => (
                          <div
                            key={i}
                            className="font-mono text-xs text-[#0F766E] font-bold bg-[#FFF7ED] p-1.5 rounded-lg border border-orange-100"
                          >
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Examiner Tip */}
                  {msg.examTip && (
                    <div className="mt-2.5 p-3 bg-teal-50 border border-teal-200 text-[#0F766E] rounded-xl text-xs font-medium flex items-start gap-2">
                      <Award className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Board Examiner Tip: </span>
                        <span>{msg.examTip}</span>
                      </div>
                    </div>
                  )}

                  {/* Audio Replay Button */}
                  {isSaturday && msg.speechText && (
                    <div className="mt-3 pt-2 border-t border-orange-200/60 flex items-center justify-between">
                      <button
                        onClick={() => speakText(msg.speechText!)}
                        className="inline-flex items-center gap-1 text-[11px] text-[#EA580C] hover:text-[#c2410c] font-bold transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen Again</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 p-4 bg-[#FFF7ED] border border-[#fed7aa] rounded-2xl w-fit text-xs text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-ping" />
              <span className="font-semibold text-slate-800">
                Saturday AI is preparing your step-by-step solution...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Control Console */}
        <div className="pt-4 border-t border-[#fed7aa] space-y-3">
          <div className="flex items-center gap-2">
            {/* Mic Toggle Button */}
            <button
              onClick={toggleMicListening}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-teal-600 text-white border-teal-500 animate-pulse shadow-md shadow-teal-500/30'
                  : 'bg-orange-50 text-[#EA580C] border-orange-200 hover:bg-orange-100 hover:border-[#EA580C]'
              }`}
              title="Speak your doubt (or say 'Hey Saturday')"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Stop Audio Button if Saturday is talking */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="p-3.5 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200 transition-colors shrink-0"
                title="Stop Saturday speech"
              >
                <VolumeX className="w-5 h-5" />
              </button>
            )}

            {/* Doubt Input Box */}
            <input
              type="text"
              placeholder="Ask anything, e.g., 'Explain Gauss law and flux through a cylinder' or 'Hey Saturday'..."
              value={doubtInput}
              onChange={(e) => setDoubtInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmitDoubt();
              }}
              className="flex-1 bg-[#FFF7ED] border border-[#fed7aa] text-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSubmitDoubt()}
              disabled={isLoading || !doubtInput.trim()}
              className="p-3.5 rounded-2xl bg-[#EA580C] hover:bg-[#c2410c] text-white disabled:opacity-50 transition-all shadow-md shadow-orange-500/25 shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Try speaking: <strong className="text-[#EA580C]">&ldquo;Hey Saturday, what is Lenz&apos;s law?&rdquo;</strong></span>
            </span>
            <span className="hidden sm:inline text-[#0F766E] font-bold">
              Groq LLaMA 3.3 70B &bull; High-Speed Tutor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
