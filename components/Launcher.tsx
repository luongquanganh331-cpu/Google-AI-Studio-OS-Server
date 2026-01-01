
import React, { useState } from 'react';
import { AppID, OSVersion } from '../types';

interface LauncherProps {
  onOpenApp: (id: AppID) => void;
  version: OSVersion;
}

export const Launcher: React.FC<LauncherProps> = ({ onOpenApp, version }) => {
  const [search, setSearch] = useState('');

  const apps: { id: AppID, name: string, color: string, path: string }[] = [
    { id: 'server-manager', name: 'Server Manager', color: 'bg-indigo-700', path: 'M4 4h16v16H4V4zm4 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z' },
    { id: 'browser', name: 'Browser', color: 'bg-blue-600', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { id: 'gemini', name: 'Gemini AI', color: 'bg-purple-600', path: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { id: 'messages', name: 'Messages', color: 'bg-emerald-600', path: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.8A8.38 8.38 0 0 1 21 11.5z' },
    { id: 'files', name: 'Files', color: 'bg-amber-600', path: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
    { id: 'notes', name: 'Notes', color: 'bg-yellow-500', path: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
    { id: 'settings', name: 'Settings', color: 'bg-slate-600', path: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' },
    { id: 'store', name: 'App Store', color: 'bg-pink-600', path: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z' },
    { id: 'terminal', name: 'Terminal', color: 'bg-slate-800', path: 'M4 17l6-6-6-6M12 19h8' },
    { id: 'calculator', name: 'Calculator', color: 'bg-green-600', path: 'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z' },
    { id: 'camera', name: 'Camera', color: 'bg-slate-700', path: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z' },
    { id: 'gallery', name: 'Gallery', color: 'bg-orange-500', path: 'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z M8.5 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z' },
  ];

  const recentFiles = [
    { name: 'Server_Config.yaml', time: 'Active Now', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', color: 'text-indigo-400' },
    { name: 'Gemini-Setup.dmg', time: 'Edited 10:51 AM', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', color: 'text-blue-400' },
    { name: 'OS_Services.conf', time: 'Edited 11:35 AM', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', color: 'text-blue-400' },
  ];

  return (
    <div className="w-[850px] max-h-[90vh] glass rounded-[2.5rem] p-8 flex flex-col space-y-8 animate-in fade-in zoom-in duration-300 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <input 
          autoFocus
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-white/20 transition-all text-lg placeholder-white/30"
          placeholder="Search services, apps, and users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {['Server Manager', 'Browser', 'Gemini AI', 'App Store', 'Terminal'].map((tag, i) => (
          <button key={tag} className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 whitespace-nowrap hover:bg-white/10 transition-colors">
            <span className="text-xs font-semibold opacity-70">{tag}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-white/40 font-bold tracking-widest text-[10px] uppercase">
          <span>Server Status & Activity</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {recentFiles.map(file => (
            <div key={file.name} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col space-y-3 hover:bg-white/10 transition-all cursor-pointer group">
              <div className={`w-8 h-8 ${file.color}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={file.icon} /></svg>
              </div>
              <div>
                <p className="text-sm font-semibold truncate group-hover:text-blue-400 transition-colors">{file.name}</p>
                <p className="text-[10px] opacity-40 font-medium">{file.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-y-10 gap-x-4 pt-4 overflow-y-auto pr-2">
        {apps.filter(app => app.name.toLowerCase().includes(search.toLowerCase())).map(app => (
          <button 
            key={app.id}
            onClick={() => onOpenApp(app.id)}
            className="flex flex-col items-center space-y-3 group"
          >
            <div className={`${app.color} w-14 h-14 rounded-[1.2rem] flex items-center justify-center shadow-xl group-hover:scale-110 group-active:scale-95 transition-all duration-300 relative`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={app.path} />
              </svg>
            </div>
            <span className="text-[11px] font-medium opacity-80 text-center">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
