
import React, { useState } from 'react';
import { Taskbar } from './Taskbar';
import { Launcher } from './Launcher';
import { ControlCenter } from './ControlCenter';
import { OSVersion, AppID } from '../types';
import { GeminiApp } from '../apps/GeminiApp';
import { TerminalApp } from '../apps/TerminalApp';
import { BrowserApp } from '../apps/BrowserApp';
import { ServerManagerApp } from '../apps/ServerManagerApp';
import { NotesApp } from '../apps/NotesApp';
import { CalculatorApp } from '../apps/CalculatorApp';
import { StoreApp } from '../apps/StoreApp';
import { CameraApp } from '../apps/CameraApp';
import { GalleryApp } from '../apps/GalleryApp';
import { SettingsApp } from '../apps/SettingsApp';
import { MessagesApp } from '../apps/MessagesApp';
import { FilesApp } from '../apps/FilesApp';

interface DesktopProps {
  version: OSVersion;
  onLogout: () => void;
  onShutdown: () => void;
}

export const Desktop: React.FC<DesktopProps> = ({ version, onLogout, onShutdown }) => {
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [activeApps, setActiveApps] = useState<AppID[]>([]);
  const [focusedApp, setFocusedApp] = useState<AppID | null>(null);
  const [pinnedApps] = useState<AppID[]>(['server-manager', 'browser', 'gemini', 'terminal', 'store', 'settings', 'messages', 'files']);

  const toggleLauncher = () => setIsLauncherOpen(!isLauncherOpen);
  const toggleControlCenter = () => setIsControlCenterOpen(!isControlCenterOpen);

  const openApp = (id: AppID) => {
    if (!activeApps.includes(id)) {
      setActiveApps([...activeApps, id]);
    }
    setFocusedApp(id);
    setIsLauncherOpen(false);
  };

  const closeApp = (id: AppID) => {
    setActiveApps(activeApps.filter(appId => appId !== id));
    if (focusedApp === id) {
      setFocusedApp(activeApps.length > 1 ? activeApps[activeApps.length - 2] : null);
    }
  };

  const renderApp = (id: AppID) => {
    const isFocused = focusedApp === id;
    const commonProps = { 
      onClose: () => closeApp(id),
      onFocus: () => setFocusedApp(id),
      isFocused
    };

    switch (id) {
      case 'gemini': return <GeminiApp key={id} {...commonProps} />;
      case 'terminal': return <TerminalApp key={id} {...commonProps} />;
      case 'browser': return <BrowserApp key={id} {...commonProps} />;
      case 'server-manager': return <ServerManagerApp key={id} {...commonProps} />;
      case 'notes': return <NotesApp key={id} {...commonProps} />;
      case 'calculator': return <CalculatorApp key={id} {...commonProps} />;
      case 'store': return <StoreApp key={id} {...commonProps} />;
      case 'camera': return <CameraApp key={id} {...commonProps} />;
      case 'gallery': return <GalleryApp key={id} {...commonProps} />;
      case 'settings': return <SettingsApp key={id} {...commonProps} />;
      case 'messages': return <MessagesApp key={id} {...commonProps} />;
      case 'files': return <FilesApp key={id} {...commonProps} />;
      default: return (
        <div key={id} className={`absolute inset-0 m-auto w-[600px] h-[400px] glass rounded-2xl shadow-2xl flex flex-col border border-white/10 ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95 transition-all'}`}>
            <div className="flex items-center justify-between p-4 border-b border-white/5" onMouseDown={() => setFocusedApp(id)}>
                <span className="font-semibold capitalize">{id}</span>
                <button onClick={() => closeApp(id)} className="text-red-500 hover:bg-red-500/10 p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div className="flex-1 flex items-center justify-center text-gray-400">
               Coming Soon in {version}
            </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full w-full bg-black relative flex flex-col overflow-hidden">
      <div className="flex-1 relative p-4">
        {activeApps.map(renderApp)}
      </div>

      {isLauncherOpen && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center" onClick={toggleLauncher}>
          <div onClick={e => e.stopPropagation()}>
            <Launcher onOpenApp={openApp} version={version} />
          </div>
        </div>
      )}

      {isControlCenterOpen && (
        <div className="absolute inset-0 z-[100]" onClick={toggleControlCenter}>
          <div className="absolute bottom-16 right-4" onClick={e => e.stopPropagation()}>
            <ControlCenter onLogout={onLogout} onShutdown={onShutdown} />
          </div>
        </div>
      )}

      {(version !== OSVersion.STANDARD) && (
        <div className="absolute top-4 left-4 pointer-events-none opacity-40 text-xs font-mono uppercase tracking-widest z-0">
          {version} - Confidential Build
        </div>
      )}

      <Taskbar 
        onToggleLauncher={toggleLauncher} 
        onToggleControlCenter={toggleControlCenter} 
        activeApps={activeApps} 
        pinnedApps={pinnedApps}
        focusedApp={focusedApp}
        onFocusApp={setFocusedApp}
        onOpenApp={openApp}
      />
    </div>
  );
};
