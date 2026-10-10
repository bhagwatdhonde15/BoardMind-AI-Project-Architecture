'use client';

import { useState, useRef, useEffect } from 'react';
import VoiceOrb from '@/components/assistant/VoiceOrb';
import {
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function FloatingAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [doubtText, setDoubtText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const [messages, setMessages] = useState<Array<{ sender: 'student' | 'saturday'; text: string; speech?: string }>>([
    {
      sender: 'saturday',
      text: "Hi! I'm Saturday, your AI Doubt Solver. Have a question about this chapter? Tap the mic or type here!",
      speech: "Hi! I'm Saturday. How can I help with your studies?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Speech Recognition initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setSpeechSupported(false);
        return;
      }

      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onerror = () => setIsListening(false);
      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        if (text) {
          submitDoubt(text);
        }
      };

      recognitionRef.current = rec;
    }
  }, []);

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

  const toggleMic = () => {
    if (!speechSupported) {
      alert('Speech Recognition is not supported on this browser version.');
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const submitDoubt = async (queryText: string) => {
    const q = queryText.trim();
    if (!q || isLoading) return;

    setDoubtText('');
    setMessages((prev) => [...prev, { sender: 'student', text: q }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doubt: q,
          subject: 'General Science',
          board: 'CBSE',
        }),
      });

      const data = await res.json();
      if (data.success && data.answer) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'saturday',
            text: data.answer.explanation,
            speech: data.answer.speechText,
          },
        ]);
        if (data.answer.speechText) {
          speakText(data.answer.speechText);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'saturday',
            text: "I couldn't process that right now, but feel free to retry or ask another question!",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'saturday',
          text: "Network error occurred while contacting Saturday AI. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Pill / Orb */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-[#EA580C] to-[#f97316] hover:from-[#c2410c] hover:to-[#ea580c] text-white rounded-full shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 border-2 border-orange-300"
        >
          <VoiceOrb size="sm" isListening={false} isSpeaking={false} />
          <div className="text-left">
            <div className="text-xs font-bold leading-tight flex items-center gap-1">
              <span>Saturday AI</span>
              <Sparkles className="w-3 h-3 text-amber-200" />
            </div>
            <div className="text-[10px] text-orange-100 font-medium">Ask Doubt 24/7</div>
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] bg-white border-2 border-[#fed7aa] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#FFF7ED] via-orange-50 to-[#FFF7ED] border-b border-[#fed7aa] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <VoiceOrb size="sm" isListening={isListening} isSpeaking={isSpeaking} />
              <div>
                <div className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                  <span>Saturday AI</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-teal-50 text-[#0F766E] border border-teal-200 rounded-full">
                    Voice Online
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {isListening ? 'Listening to voice...' : isSpeaking ? 'Saturday is explaining...' : 'Friendly Study Companion'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Link
                href="/assistant"
                className="p-1.5 hover:bg-orange-100 text-slate-600 hover:text-[#EA580C] rounded-lg transition-colors"
                title="Open Fullscreen Studio"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  if (isSpeaking) window.speechSynthesis.cancel();
                  if (isListening) recognitionRef.current?.stop();
                  setIsOpen(false);
                }}
                className="p-1.5 hover:bg-orange-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FFF7ED]/30">
            {messages.map((m, idx) => {
              const isSat = m.sender === 'saturday';
              return (
                <div
                  key={idx}
                  className={`flex ${isSat ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isSat
                        ? 'bg-white text-slate-800 border border-[#fed7aa] shadow-xs'
                        : 'bg-[#EA580C] text-white shadow-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-white text-[#0F766E] border border-[#fed7aa] rounded-2xl text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping" />
                  <span>Saturday is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-[#fed7aa] flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMic}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-teal-600 text-white border-teal-500 animate-pulse'
                  : 'bg-orange-50 text-[#EA580C] border-orange-200 hover:bg-orange-100'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder="Ask any doubt (or tap mic)..."
              value={doubtText}
              onChange={(e) => setDoubtText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitDoubt(doubtText);
              }}
              className="flex-1 bg-[#FFF7ED] border border-[#fed7aa] rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
            />

            <button
              type="button"
              onClick={() => submitDoubt(doubtText)}
              disabled={isLoading || !doubtText.trim()}
              className="p-2.5 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white disabled:opacity-50 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
