
import React, { useEffect, useState } from 'react';

export const BootScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300); // Shorter transition delay
          return 100;
        }
        // Faster increments: 10-35% per tick
        return prev + 10 + Math.random() * 25;
      });
    }, 150); // Faster tick rate (150ms instead of 400ms)
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[1000] flex flex-col items-center justify-center overflow-hidden">
      {/* Glow effect */}
      <div className="absolute w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]"></div>

      {/* Main Logo Content */}
      <div className="flex flex-col items-center space-y-12 animate-in fade-in duration-1000">
        {/* Star Icon */}
        <div className="relative">
           <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20"></div>
           <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0L58 42L100 50L58 58L50 100L42 58L0 50L42 42L50 0Z" fill="#60A5FA" />
           </svg>
        </div>

        {/* Text Brand */}
        <div className="text-center space-y-2">
           <h1 className="text-5xl font-bold tracking-tight flex items-center justify-center">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Google AI Studio</span>
              <span className="text-white/30 ml-3 font-light">OS</span>
           </h1>
           <p className="text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase">Integrated Intelligence</p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-[300px] h-[1px] bg-white/5 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-white/40 shadow-[0_0_10px_white] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
};
