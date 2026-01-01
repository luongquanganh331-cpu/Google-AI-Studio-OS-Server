
import React from 'react';

interface ControlCenterProps {
  onLogout: () => void;
  onShutdown: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ onLogout, onShutdown }) => {
  return (
    <div className="w-[360px] glass rounded-[2.5rem] p-6 shadow-2xl space-y-6 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="https://picsum.photos/seed/user/40" className="w-10 h-10 rounded-full border border-white/20" alt="" />
          <div>
            <h3 className="text-sm font-bold">anhdaynekkkk</h3>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight">System Admin</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {/* Logout Button */}
          <button 
            onClick={onLogout}
            title="Logout"
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
          {/* Power Button */}
          <button 
            onClick={onShutdown}
            title="Shut Down"
            className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
          </button>
        </div>
      </div>

      {/* Grid Controls */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-600 rounded-2xl p-4 flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase opacity-80">Network</p>
            <p className="text-xs font-semibold">Studio_5G</p>
          </div>
        </div>
        <div className="bg-blue-600 rounded-2xl p-4 flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20"></path><path d="M12 7l5 5-5 5"></path><path d="M5 12h14"></path></svg>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase opacity-80">Bluetooth</p>
            <p className="text-xs font-semibold">Connected</p>
          </div>
        </div>
      </div>

      {/* ... Rest of Controls (DND, Sliders, etc.) ... */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-full">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
          </div>
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden relative">
             <div className="absolute left-0 top-0 h-full w-[70%] bg-blue-500"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between opacity-50 text-[9px] font-bold tracking-widest pt-4 border-t border-white/5">
         <div className="flex items-center space-x-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line></svg>
           <span>QUANTUM BATTERY 99%</span>
         </div>
         <span>NEURAL CORE ONLINE</span>
      </div>
    </div>
  );
};
