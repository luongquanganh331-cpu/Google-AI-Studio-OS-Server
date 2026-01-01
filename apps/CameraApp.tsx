
import React, { useRef, useEffect, useState } from 'react';

export const CameraApp: React.FC<{ onClose: () => void, onFocus: () => void, isFocused: boolean }> = ({ onClose, onFocus, isFocused }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    setupCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[700px] h-[500px] glass rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden transition-all ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      <div className="p-3 bg-black/40 flex justify-between items-center">
         <span className="text-xs font-bold uppercase tracking-widest text-white/60">Live Feed</span>
         <button onClick={onClose} className="text-red-500">&times;</button>
      </div>
      <div className="flex-1 bg-black relative">
         <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-6">
            <button className="w-16 h-16 rounded-full border-4 border-white/40 p-1 hover:border-white transition-all">
               <div className="w-full h-full bg-white rounded-full"></div>
            </button>
         </div>
      </div>
    </div>
  );
};
