'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Monitor, ShieldCheck, AlertCircle, Maximize, CheckCircle2 } from 'lucide-react';

interface ProctoringSuiteProps {
  onProctoringReady?: () => void;
  autoStart?: boolean;
}

export default function ProctoringSuite({ onProctoringReady, autoStart = true }: ProctoringSuiteProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const screenRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [screenSharing, setScreenSharing] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    if (autoStart) {
      startCamera();
      startScreenShare();
      checkFullscreen();
    }

    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      stopStreams();
    };
  }, [autoStart]);

  const checkFullscreen = () => {
    setIsFullscreen(Boolean(document.fullscreenElement));
  };

  const requestFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (err) {
      console.warn('Fullscreen request bypassed:', err);
    }
  };

  const startCamera = async () => {
    try {
      setPermissionError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, frameRate: 15 },
        audio: false,
      });

      cameraStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setCameraActive(true);
      if (onProctoringReady) onProctoringReady();
    } catch (err: any) {
      console.warn('Webcam proctoring error:', err);
      setPermissionError('Camera permission needed for proctoring verification.');
    }
  };

  const startScreenShare = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });

        screenStreamRef.current = screenStream;
        if (screenRef.current) {
          screenRef.current.srcObject = screenStream;
        }
        setScreenSharing(true);

        screenStream.getVideoTracks()[0].onended = () => {
          setScreenSharing(false);
        };
      }
    } catch (err: any) {
      console.warn('Screen share error:', err);
      setPermissionError('Screen share verification recommended during exam.');
    }
  };

  const stopStreams = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (screenRef.current) {
      screenRef.current.srcObject = null;
    }
    setCameraActive(false);
    setScreenSharing(false);
  };

  return (
    <div className="fixed top-20 right-4 z-40 flex flex-col items-end gap-2">
      {/* Proctoring Card: Friendly student design */}
      <div className="w-52 sm:w-60 bg-white border-2 border-[#fed7aa] rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
        {/* Live Camera Viewfinder */}
        <video
          ref={videoRef}
          muted
          playsInline
          className="w-full h-32 sm:h-36 object-cover bg-slate-900"
        />

        <video ref={screenRef} muted playsInline className="hidden" />

        {/* Top Live Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-0.5 bg-white/90 border border-teal-500 rounded-full text-[10px] font-bold text-[#0F766E] backdrop-blur-md shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>PROCTORING ACTIVE</span>
        </div>

        {/* Bottom Status Panel */}
        <div className="p-3 bg-[#FFF7ED] border-t border-[#fed7aa] space-y-1.5">
          {/* Camera Status */}
          <div className="flex items-center justify-between text-[11px] text-slate-700">
            <span className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#EA580C]" />
              <span className="font-semibold">Camera</span>
            </span>
            <span className={`font-bold text-[10px] ${cameraActive ? 'text-emerald-700' : 'text-amber-700'}`}>
              {cameraActive ? 'Live Streaming' : 'Connecting...'}
            </span>
          </div>

          {/* Screen Share Status */}
          <div className="flex items-center justify-between text-[11px] text-slate-700">
            <span className="flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-[#0F766E]" />
              <span className="font-semibold">Screen Share</span>
            </span>
            {screenSharing ? (
              <span className="font-bold text-[10px] text-emerald-700 flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3" /> Shared
              </span>
            ) : (
              <button
                type="button"
                onClick={startScreenShare}
                className="text-[10px] text-[#EA580C] hover:text-[#c2410c] font-bold underline"
              >
                Enable Screen
              </button>
            )}
          </div>

          {/* Full Screen Mode Status */}
          <div className="flex items-center justify-between text-[11px] text-slate-700 pt-1 border-t border-orange-200">
            <span className="flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5 text-[#EA580C]" />
              <span className="font-semibold">Full Screen</span>
            </span>
            {isFullscreen ? (
              <span className="font-bold text-[10px] text-emerald-700">Locked</span>
            ) : (
              <button
                type="button"
                onClick={requestFullscreen}
                className="text-[10px] text-amber-700 hover:text-amber-800 font-bold underline"
              >
                Lock Fullscreen
              </button>
            )}
          </div>
        </div>
      </div>

      {permissionError && (
        <div className="p-2.5 bg-amber-50 border border-amber-300 text-amber-800 rounded-xl text-[11px] max-w-56 text-right shadow-sm">
          <AlertCircle className="w-3.5 h-3.5 inline mr-1 text-[#EA580C]" />
          {permissionError}
        </div>
      )}
    </div>
  );
}
