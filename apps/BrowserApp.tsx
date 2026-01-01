
import React, { useState, useRef, useEffect } from 'react';

interface BrowserTab {
  id: string;
  url: string;
  history: string[];
  historyIndex: number;
}

interface BrowserAppProps {
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
}

export const BrowserApp: React.FC<BrowserAppProps> = ({ onClose, onFocus, isFocused }) => {
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: '1', url: 'studio://home', history: ['studio://home'], historyIndex: 0 }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [urlInput, setUrlInput] = useState('studio://home');
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    setUrlInput(activeTab.url);
  }, [activeTabId]);

  const navigateTo = (url: string) => {
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://') && !targetUrl.startsWith('studio://')) {
      if (targetUrl.includes('.') && !targetUrl.includes(' ')) {
        targetUrl = `https://${targetUrl}`;
      } else {
        targetUrl = `https://www.google.com/search?q=${encodeURIComponent(targetUrl)}&igu=1`;
      }
    }
    
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId) {
        const newHistory = t.history.slice(0, t.historyIndex + 1);
        newHistory.push(targetUrl);
        return {
          ...t,
          url: targetUrl,
          history: newHistory,
          historyIndex: newHistory.length - 1
        };
      }
      return t;
    }));
    
    setUrlInput(targetUrl);
    setIsLoading(true);
  };

  const createNewTab = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newTab: BrowserTab = {
      id: newId,
      url: 'studio://home',
      history: ['studio://home'],
      historyIndex: 0
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setUrlInput('studio://home');
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      onClose();
      return;
    }
    const filtered = tabs.filter(t => t.id !== id);
    setTabs(filtered);
    if (activeTabId === id) {
      setActiveTabId(filtered[filtered.length - 1].id);
    }
  };

  const handleBack = () => {
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId && t.historyIndex > 0) {
        const nextIndex = t.historyIndex - 1;
        const prevUrl = t.history[nextIndex];
        setUrlInput(prevUrl);
        return { ...t, url: prevUrl, historyIndex: nextIndex };
      }
      return t;
    }));
  };

  const handleForward = () => {
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId && t.historyIndex < t.history.length - 1) {
        const nextIndex = t.historyIndex + 1;
        const nextUrl = t.history[nextIndex];
        setUrlInput(nextUrl);
        return { ...t, url: nextUrl, historyIndex: nextIndex };
      }
      return t;
    }));
  };

  const handleRefresh = () => {
    setIsLoading(true);
    const temp = activeTab.url;
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, url: '' } : t));
    setTimeout(() => {
      setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, url: temp } : t));
    }, 50);
  };

  const topSites = [
    { name: 'Google', url: 'https://www.google.com/search?igu=1', icon: 'G', color: 'bg-blue-500' },
    { name: 'Wikipedia', url: 'https://en.m.wikipedia.org', icon: 'W', color: 'bg-slate-700' },
    { name: 'YouTube', url: 'https://www.youtube.com/embed', icon: 'Y', color: 'bg-red-600' },
    { name: 'Bing', url: 'https://www.bing.com', icon: 'B', color: 'bg-blue-400' },
    { name: 'GitHub', url: 'https://github.com', icon: 'Git', color: 'bg-slate-900' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com', icon: 'D', color: 'bg-orange-500' },
  ];

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[1000px] h-[750px] glass rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden transition-all duration-300 ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      {/* Browser Tabs Bar */}
      <div className="flex items-center bg-black/40 px-3 pt-2 space-x-1 border-b border-white/5 h-12 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`flex items-center px-4 py-2 rounded-t-xl text-[11px] font-bold min-w-[140px] max-w-[200px] border-t border-x transition-all cursor-pointer relative group ${activeTabId === tab.id ? 'bg-white/10 border-white/10' : 'bg-transparent border-transparent opacity-50 hover:opacity-80'}`}
          >
             <span className="truncate flex-1">
               {tab.url === 'studio://home' ? 'New Tab' : tab.url.replace('https://', '').split('/')[0]}
             </span>
             <button 
               onClick={(e) => closeTab(e, tab.id)}
               className={`ml-2 hover:bg-white/10 p-0.5 rounded transition-opacity ${activeTabId === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>
          </div>
        ))}
        <button 
          onClick={createNewTab}
          className="p-2 hover:bg-white/10 rounded-lg text-white/40 transition-colors shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <div className="flex-1"></div>
        <div className="flex items-center space-x-2 pb-1 pr-1 shrink-0">
           <button onClick={onClose} className="w-8 h-8 hover:bg-red-500/20 rounded-full flex items-center justify-center text-red-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-3 bg-white/5 border-b border-white/5 flex items-center space-x-4">
        <div className="flex space-x-1">
          <button 
            onClick={handleBack}
            disabled={activeTab.historyIndex === 0}
            className="p-2 hover:bg-white/10 rounded-lg text-white/50 disabled:opacity-20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={handleForward}
            disabled={activeTab.historyIndex >= activeTab.history.length - 1}
            className="p-2 hover:bg-white/10 rounded-lg text-white/50 disabled:opacity-20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button 
            onClick={handleRefresh}
            className="p-2 hover:bg-white/10 rounded-lg text-white/50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>
          </button>
          <button 
            onClick={() => navigateTo('studio://home')}
            className="p-2 hover:bg-white/10 rounded-lg text-white/50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </button>
        </div>
        <div className="flex-1 relative group">
           <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
           </div>
           <input 
             className="w-full bg-black/40 border border-white/5 rounded-full py-2 pl-10 pr-10 text-xs outline-none focus:border-blue-500/50 transition-all font-medium text-white/80"
             value={urlInput}
             onChange={e => setUrlInput(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && navigateTo(urlInput)}
             onFocus={e => e.currentTarget.select()}
           />
           {isLoading && (
             <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
           )}
        </div>
      </div>

      {/* Web Content Area */}
      <div className="flex-1 bg-white relative">
          {activeTab.url === 'studio://home' ? (
            <div className="w-full h-full bg-[#121212] flex flex-col items-center justify-center p-8 text-white">
                <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-7xl font-bold mb-6 tracking-tighter bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Studio Browser
                    </h1>
                    <div className="w-[600px] max-w-full relative group">
                        <input 
                           autoFocus
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 pl-14 outline-none text-lg focus:bg-white/10 focus:border-white/20 transition-all shadow-2xl"
                           placeholder="Search Google or enter address"
                           onKeyDown={e => e.key === 'Enter' && navigateTo(e.currentTarget.value)}
                        />
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30">
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 w-[600px] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                  {topSites.map(site => (
                    <button 
                      key={site.name}
                      onClick={() => navigateTo(site.url)}
                      className="flex flex-col items-center group space-y-3"
                    >
                      <div className={`${site.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-all duration-300 relative`}>
                         <span className="text-2xl font-bold text-white">{site.icon}</span>
                         <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity"></div>
                      </div>
                      <span className="text-xs font-semibold opacity-60 group-hover:opacity-100 transition-opacity">{site.name}</span>
                    </button>
                  ))}
                </div>

                <div className="absolute bottom-8 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                   Studio Secure Web Engine • v2.0 AI-Ready
                </div>
            </div>
          ) : activeTab.url === '' ? (
            <div className="absolute inset-0 bg-[#121212] flex flex-col items-center justify-center text-white space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Refreshing...</p>
            </div>
          ) : (
            <>
              <iframe 
                ref={iframeRef}
                src={activeTab.url} 
                className="w-full h-full border-none bg-white"
                onLoad={() => setIsLoading(false)}
                title="Browser View"
                sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-[#121212] flex flex-col items-center justify-center text-white space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Loading secure content...</p>
                </div>
              )}
            </>
          )}
      </div>

      {/* Status Bar */}
      <div className="px-4 py-1.5 bg-black/80 border-t border-white/5 flex items-center justify-between text-[9px] font-bold tracking-widest text-white/40">
         <div className="flex items-center space-x-3">
            <span>SECURE CONNECTION</span>
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
         </div>
         <div className="flex items-center space-x-4">
            <span>STUDIO-RENDER-ENGINE v2.5 MULTI-TAB</span>
            <span>JS QUANTUM READY</span>
         </div>
      </div>
    </div>
  );
};
