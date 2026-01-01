
import React, { useState, useEffect } from 'react';
import { OSVersion } from '../types';

interface LockScreenProps {
  onUnlock: () => void;
  version: OSVersion;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, version }) => {
  const [time, setTime] = useState(new Date());
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('vi-VN', options).toUpperCase();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onUnlock();
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#3a206b] via-[#211d3d] to-[#0a0a0a]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="flex flex-col items-center z-10 space-y-8">
        <div className="text-center">
          <h1 className="text-[120px] font-bold tracking-tighter leading-none opacity-90 drop-shadow-2xl">
            {formatTime(time)}
          </h1>
          <p className="text-xl font-medium tracking-widest text-blue-200 opacity-80 mt-2">
            {formatDate(time)}
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white/20 p-1 group-hover:border-white/40 transition-all duration-300">
              <img 
                src="https://picsum.photos/seed/user/200" 
                className="w-full h-full rounded-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all"
                alt="User"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 text-black shadow-lg">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight">anhdaynekkkk</h2>
            <p className="text-sm text-gray-400 mt-1">No password required</p>
          </div>

          <div className="relative mt-4">
            <div className="flex items-center glass rounded-full px-6 py-3 w-80 shadow-2xl border-white/10">
              <input 
                autoFocus
                type="password"
                placeholder="Studio Access Code"
                className="bg-transparent border-none outline-none w-full text-center text-white placeholder-gray-500 font-medium"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                onClick={onUnlock}
                className="bg-blue-600 hover:bg-blue-500 rounded-full p-2 transition-colors ml-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center opacity-40">
        <p className="text-xs font-bold tracking-[0.2em]">GOOGLE AI STUDIO • {version}</p>
      </div>
    </div>
  );
};
