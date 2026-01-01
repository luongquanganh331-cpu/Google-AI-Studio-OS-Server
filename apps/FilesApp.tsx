
import React, { useState } from 'react';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
  icon?: string;
}

export const FilesApp: React.FC<{ onClose: () => void, onFocus: () => void, isFocused: boolean }> = ({ onClose, onFocus, isFocused }) => {
  const [path, setPath] = useState(['This PC', 'Local Disk (C:)', 'Users', 'anhdaynekkkk']);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const folders: FileItem[] = [
    { name: 'Documents', type: 'folder', modified: '2025-01-20' },
    { name: 'Downloads', type: 'folder', modified: '2025-02-01' },
    { name: 'Neural Models', type: 'folder', modified: '2024-12-15' },
    { name: 'Pictures', type: 'folder', modified: '2025-01-05' },
    { name: 'System_Config.yaml', type: 'file', size: '12 KB', modified: '2025-02-12' },
    { name: 'Studio_Core_v2.iso', type: 'file', size: '4.2 GB', modified: '2025-01-28' },
    { name: 'Gemini_Prompt_Logs.txt', type: 'file', size: '156 KB', modified: 'Today' },
    { name: 'Enterprise_License.pdf', type: 'file', size: '2 MB', modified: 'Yesterday' },
  ];

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[900px] h-[650px] glass rounded-[2.5rem] shadow-2xl flex flex-col border border-white/10 overflow-hidden transition-all duration-300 ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      <div className="h-12 bg-white/5 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-amber-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Studio File Explorer</span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-red-500/20 text-red-500 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
      </div>

      <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 space-x-4">
        <div className="flex space-x-1">
          <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/40"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
          <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/40"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
          <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/40"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"></polyline></svg></button>
        </div>
        <div className="flex-1 bg-black/40 border border-white/10 rounded-lg h-8 flex items-center px-3 space-x-2 overflow-hidden">
          {path.map((p, i) => (
            <React.Fragment key={p}>
              <span className="text-[11px] font-bold text-white/60 hover:text-white cursor-pointer whitespace-nowrap">{p}</span>
              {i < path.length - 1 && <span className="text-white/20 text-[10px] tracking-widest">/</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="w-48 bg-black/40 border border-white/10 rounded-lg h-8 flex items-center px-3">
          <svg className="text-white/20 mr-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input className="bg-transparent border-none outline-none text-[11px] w-full" placeholder="Search Folder" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r border-white/5 flex flex-col p-4 space-y-6 bg-white/5 shrink-0">
          <div className="space-y-1">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-white/20 px-2 mb-2">Favorites</h5>
            {['Desktop', 'Downloads', 'Documents', 'Pictures'].map(fav => (
              <button key={fav} className="w-full text-left px-3 py-1.5 rounded-xl text-[11px] font-bold hover:bg-white/10 text-white/50 hover:text-white transition-all flex items-center space-x-2">
                <svg className="opacity-40" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                <span>{fav}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-white/20 px-2 mb-2">This PC</h5>
            <div className="px-3 space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-white/40">Local Disk (C:)</span>
                  <span className="text-white/20">42GB / 256GB</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[18%]"></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-white/40">Studio Cloud</span>
                  <span className="text-emerald-400">UNLIMITED</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[5%] animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-6 gap-6">
            {folders.map(item => (
              <button 
                key={item.name}
                onClick={() => setSelectedFile(item.name)}
                onDoubleClick={() => item.type === 'folder' && setPath([...path, item.name])}
                className={`flex flex-col items-center group space-y-2 p-3 rounded-2xl transition-all border ${selectedFile === item.name ? 'bg-blue-500/10 border-blue-500/40 shadow-xl' : 'border-transparent hover:bg-white/5'}`}
              >
                <div className="relative">
                  {item.type === 'folder' ? (
                    <svg className="w-12 h-12 text-amber-500 drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
                  ) : (
                    <svg className="w-12 h-12 text-blue-400/80 drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                  )}
                  {item.size === 'UNLIMITED' && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black"></div>}
                </div>
                <span className="text-[11px] font-bold text-center break-all line-clamp-2 px-1 text-white/80 group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-8 bg-black/40 border-t border-white/5 flex items-center px-4 justify-between text-[10px] font-bold text-white/30 tracking-widest uppercase">
        <div className="flex space-x-4">
          <span>{folders.length} Items</span>
          {selectedFile && <span className="text-blue-400">1 Item Selected</span>}
        </div>
        <span>Neural Storage v4.5 Active</span>
      </div>
    </div>
  );
};
