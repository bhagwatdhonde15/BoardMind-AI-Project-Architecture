'use client';

import { useState, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';

export default function FullscreenController() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPromptBanner, setShowPromptBanner] = useState(false);

  useEffect(() => {
    // Check initial state
    const checkFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', checkFullscreen);
    document.addEventListener('webkitfullscreenchange', checkFullscreen);

    // If not already in fullscreen, try requesting or prompt user upon first interaction
    const requestFs = async () => {
      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
          setShowPromptBanner(false);
        }
      } catch (err) {
        // Modern browsers require a user gesture; show friendly prompt banner if blocked
        setShowPromptBanner(true);
      }
    };

    // Attempt on initial load
    requestFs();

    // Also attach a one-time window click listener to smoothly enter fullscreen on user's first click
    const handleFirstUserInteraction = () => {
      if (!document.fullscreenElement) {
        requestFs();
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });

    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
      document.removeEventListener('webkitfullscreenchange', checkFullscreen);
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await (document.documentElement as any).webkitRequestFullscreen();
        }
        setIsFullscreen(true);
        setShowPromptBanner(false);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  return (
    <>
      {/* Top Banner if browser blocked automatic fullscreen before user gesture */}
      {showPromptBanner && !isFullscreen && (
        <div className="bg-[#EA580C] text-white px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-md transition-all z-50">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Maximize className="w-4 h-4 animate-pulse" />
            <span>Click anywhere or tap button to enjoy BoardMind AI in distraction-free Fullscreen mode.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="px-3 py-1 bg-white text-[#EA580C] hover:bg-orange-50 font-bold rounded-lg text-xs transition-colors shadow-xs"
            >
              Enter Fullscreen
            </button>
            <button
              onClick={() => setShowPromptBanner(false)}
              className="text-white/80 hover:text-white px-1 text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
