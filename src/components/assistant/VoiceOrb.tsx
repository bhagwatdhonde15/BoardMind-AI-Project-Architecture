'use client';

interface VoiceOrbProps {
  isListening: boolean;
  isSpeaking: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function VoiceOrb({
  isListening,
  isSpeaking,
  onClick,
  size = 'md',
}: VoiceOrbProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
  };

  const orbSize = sizeClasses[size];

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center cursor-pointer select-none group transition-transform active:scale-95 ${orbSize}`}
    >
      {/* Outer Atmospheric Aura */}
      <div
        className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 pointer-events-none ${
          isSpeaking
            ? 'bg-orange-400/40 animate-pulse scale-125'
            : isListening
            ? 'bg-teal-400/40 animate-pulse scale-120'
            : 'bg-orange-300/30 group-hover:bg-orange-400/40'
        }`}
      />

      {/* Rotating Outer Ring */}
      <div
        className={`absolute inset-[-4px] rounded-full border border-dashed transition-all duration-1000 ${
          isSpeaking
            ? 'border-[#EA580C] animate-spin'
            : isListening
            ? 'border-[#0F766E] animate-spin'
            : 'border-orange-300 animate-[spin_12s_linear_infinite]'
        }`}
        style={{ animationDuration: isSpeaking || isListening ? '3s' : '12s' }}
      />

      {/* Counter-Rotating Middle Ring */}
      <div
        className={`absolute inset-[3px] rounded-full border transition-all duration-700 ${
          isSpeaking
            ? 'border-orange-400 animate-[spin_4s_linear_infinite_reverse]'
            : isListening
            ? 'border-teal-400 animate-[spin_4s_linear_infinite_reverse]'
            : 'border-teal-300 animate-[spin_8s_linear_infinite_reverse]'
        }`}
      />

      {/* Glowing Inner Core Orb */}
      <div
        className={`w-full h-full rounded-full shadow-xl flex items-center justify-center transition-all duration-500 relative overflow-hidden ${
          isSpeaking
            ? 'bg-gradient-to-tr from-[#EA580C] via-[#f97316] to-amber-300 shadow-[0_0_35px_rgba(234,88,12,0.6)] scale-105'
            : isListening
            ? 'bg-gradient-to-tr from-[#0F766E] via-teal-500 to-emerald-300 shadow-[0_0_35px_rgba(15,118,110,0.6)] scale-105'
            : 'bg-gradient-to-tr from-[#EA580C] via-[#f97316] to-[#0F766E] shadow-[0_0_20px_rgba(234,88,12,0.3)] group-hover:scale-105'
        }`}
      >
        {/* Core Light Reflection */}
        <div className="absolute top-1 left-2 w-1/3 h-1/3 rounded-full bg-white/50 blur-[2px]" />

        {/* Dynamic Center Visualizer Bars */}
        <div className="flex items-center gap-1 z-10">
          <span
            className={`w-1 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'bg-white animate-[wave-bar_0.6s_ease-in-out_infinite] h-6'
                : isListening
                ? 'bg-white animate-[wave-bar_0.4s_ease-in-out_infinite] h-6'
                : 'bg-orange-100 h-3'
            }`}
          />
          <span
            className={`w-1 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'bg-white animate-[wave-bar_0.8s_ease-in-out_0.2s_infinite] h-8'
                : isListening
                ? 'bg-white animate-[wave-bar_0.5s_ease-in-out_0.1s_infinite] h-8'
                : 'bg-orange-100 h-4'
            }`}
          />
          <span
            className={`w-1.5 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'bg-white animate-[wave-bar_0.5s_ease-in-out_0.4s_infinite] h-7'
                : isListening
                ? 'bg-white animate-[wave-bar_0.6s_ease-in-out_0.2s_infinite] h-7'
                : 'bg-white h-5'
            }`}
          />
          <span
            className={`w-1 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'bg-white animate-[wave-bar_0.7s_ease-in-out_0.1s_infinite] h-8'
                : isListening
                ? 'bg-white animate-[wave-bar_0.5s_ease-in-out_0.3s_infinite] h-8'
                : 'bg-orange-100 h-4'
            }`}
          />
          <span
            className={`w-1 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'bg-white animate-[wave-bar_0.6s_ease-in-out_0.3s_infinite] h-6'
                : isListening
                ? 'bg-white animate-[wave-bar_0.4s_ease-in-out_0.2s_infinite] h-6'
                : 'bg-orange-100 h-3'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
