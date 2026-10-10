'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Sparkles } from 'lucide-react';

interface VoiceAssistantProps {
  textToSpeak?: string;
  onVoiceInput?: (transcript: string) => void;
  autoRead?: boolean;
}

export default function VoiceAssistant({
  textToSpeak,
  onVoiceInput,
  autoRead = true,
}: VoiceAssistantProps) {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [voiceSupported, setVoiceSupported] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (autoRead && textToSpeak) {
        speakText(textToSpeak);
      }
    } else {
      setVoiceSupported(false);
    }
  }, [textToSpeak]);

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

  const startListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser version. Use Chrome, Edge, or Safari.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      if (onVoiceInput) {
        onVoiceInput(speechResult);
      }
    };

    recognition.start();
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white border border-[#fed7aa] rounded-2xl text-xs shadow-xs">
      <div className="flex items-center gap-1.5 text-[#EA580C] font-bold mr-1">
        <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
        <span>Voice Coach</span>
      </div>

      <button
        type="button"
        onClick={() => {
          if (isSpeaking) stopSpeaking();
          else if (textToSpeak) speakText(textToSpeak);
        }}
        className={`p-1.5 rounded-lg border transition-colors ${
          isSpeaking
            ? 'bg-amber-100 text-amber-800 border-amber-300'
            : 'bg-orange-50 text-[#EA580C] border-orange-200 hover:bg-orange-100'
        }`}
        title={isSpeaking ? 'Stop voice reading' : 'Read question aloud'}
      >
        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      <button
        type="button"
        onClick={startListening}
        className={`p-1.5 rounded-lg border transition-colors ${
          isListening
            ? 'bg-teal-600 text-white border-teal-500 animate-pulse'
            : 'bg-teal-50 text-[#0F766E] border-teal-200 hover:bg-teal-100'
        }`}
        title="Dictate answer by voice"
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>
    </div>
  );
}
