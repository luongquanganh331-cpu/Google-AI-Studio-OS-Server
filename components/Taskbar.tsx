
import React, { useState, useEffect } from 'react';
import { AppID } from '../types';

interface TaskbarProps {
  onToggleLauncher: () => void;
  onToggleControlCenter: () => void;
  activeApps: AppID[];
  pinnedApps: AppID[];
  focusedApp: AppID | null;
  onFocusApp: (id: AppID) => void;
  onOpenApp: (id: AppID) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ 
  onToggleLauncher, 
  onToggleControlCenter, 
  activeApps, 
  pinnedApps,
  focusedApp, 
  onFocusApp,
  onOpenApp
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const appIcons: Record<AppID, { color: string, path: string }> = {
    browser: { color: 'bg-blue-600', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    gemini: { color: 'bg-purple-600', path: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    messages: { color: 'bg-emerald-600', path: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.8A8.38 8.38 0 0 1 21 11.5z' },
    files: { color: 'bg-amber-600', path: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
    notes: { color: 'bg-yellow-500', path: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
    settings: { color: 'bg-slate-600', path: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' },
    terminal: { color: 'bg-slate-800', path: 'M4 17l6-6-6-6M12 19h8' },
    calculator: { color: 'bg-green-600', path: 'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z' },
    camera: { color: 'bg-slate-700', path: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z' },
    gallery: { color: 'bg-indigo-600', path: 'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z M8.5 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z M21 15l-5-5L5 21' },
    store: { color: 'bg-pink-600', path: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z' },
    'server-manager': { color: 'bg-indigo-700', path: 'M4 4h16v16H4V4zm4 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z' },
  };

  // Combine pinned and active apps, maintaining unique IDs
  const allTaskbarApps = Array.from(new Set([...pinnedApps, ...activeApps]));

  return (
    <div className="h-14 w-full glass-dark flex items-center px-4 justify-between z-[200] border-t border-white/5" style={{ background: 'rgba(5, 5, 5, 0.8)' }}>
      {/* Start Button */}
      <button 
        onClick={onToggleLauncher}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <div className="w-5 h-5 rounded-full border-2 border-white/80 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/80"></div>
        </div>
      </button>

      {/* App Icons */}
      <div className="flex-1 flex items-center justify-center space-x-2">
        {allTaskbarApps.map(appId => {
          const isActive = activeApps.includes(appId);
          const isFocused = focusedApp === appId;
          
          return (
            <button 
              key={appId}
              onClick={() => isActive ? onFocusApp(appId) : onOpenApp(appId)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative ${isFocused ? 'bg-white/20 scale-110' : 'hover:bg-white/10'}`}
              title={appId}
            >
              <div className={`${appIcons[appId]?.color} w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-transform ${isActive ? '' : 'opacity-60 grayscale-[0.5]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={appIcons[appId]?.path} />
                </svg>
              </div>
              {/* Active Indicator Dot */}
              {isActive && (
                <div className={`absolute -bottom-1 w-1 h-1 rounded-full transition-all ${isFocused ? 'bg-blue-400 w-4' : 'bg-white/60'}`}></div>
              )}
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div 
        onClick={onToggleControlCenter}
        className="flex items-center space-x-4 h-10 px-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
      >
        <div className="flex items-center space-x-2 opacity-80 text-[10px] font-bold">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line></svg>
        </div>
        <span className="text-xs font-semibold tabular-nums">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </span>
      </div>
    </div>
  );
};
