
import React, { useState, useEffect } from 'react';
import { LockScreen } from './components/LockScreen';
import { Desktop } from './components/Desktop';
import { BootScreen } from './components/BootScreen';
import { ShutdownDialog } from './components/ShutdownDialog';
import { OSVersion, SystemStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>('booting');
  const [osVersion, setOsVersion] = useState<OSVersion>(OSVersion.SERVER);

  useEffect(() => {
    (window as any).switchOS = (v: OSVersion) => setOsVersion(v);
  }, []);

  const handleBootComplete = () => setStatus('locked');
  const handleUnlock = () => setStatus('desktop');
  const handleLogout = () => setStatus('locked');
  const triggerShutdown = () => setStatus('shutting-down');
  const finalizeShutdown = () => setStatus('off');

  if (status === 'off') {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <button 
          onClick={() => setStatus('booting')}
          className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/20 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black">
      {status === 'booting' && <BootScreen onComplete={handleBootComplete} />}
      
      {status === 'locked' && (
        <LockScreen onUnlock={handleUnlock} version={osVersion} />
      )}
      
      {status === 'desktop' && (
        <Desktop 
          version={osVersion} 
          onLogout={handleLogout} 
          onShutdown={triggerShutdown} 
        />
      )}

      {status === 'shutting-down' && (
        <ShutdownDialog 
          onCancel={() => setStatus('desktop')} 
          onComplete={finalizeShutdown} 
        />
      )}
    </div>
  );
};

export default App;
