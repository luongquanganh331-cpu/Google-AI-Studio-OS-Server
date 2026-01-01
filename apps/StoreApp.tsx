
import React from 'react';

export const StoreApp: React.FC<{ onClose: () => void, onFocus: () => void, isFocused: boolean }> = ({ onClose, onFocus, isFocused }) => {
  const categories = ['Featured', 'Utilities', 'AI Models', 'Security', 'Enterprise'];
  const apps = [
    { name: 'Gemini Pro 1.5', dev: 'Google DeepMind', price: 'Enterprise', color: 'bg-purple-600' },
    { name: 'Cyber Defender', dev: 'SecurAI Inc', price: 'Free', color: 'bg-blue-600' },
    { name: 'Cloud Drive+', dev: 'Studio Cloud', price: '$9.99/mo', color: 'bg-indigo-600' },
    { name: 'Neural Flow', dev: 'BrainWave', price: 'Free', color: 'bg-teal-600' },
  ];

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[900px] h-[600px] glass rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden transition-all ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
         <h2 className="text-xl font-bold flex items-center space-x-3">
            <span className="p-2 bg-pink-600 rounded-lg">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </span>
            <span>Studio Store</span>
         </h2>
         <button onClick={onClose} className="text-red-500 text-2xl">&times;</button>
      </div>
      <div className="flex flex-1 overflow-hidden">
         <div className="w-48 border-r border-white/5 p-4 space-y-2">
            {categories.map(c => <button key={c} className="w-full text-left px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/5 transition-all text-white/50 hover:text-white">{c}</button>)}
         </div>
         <div className="flex-1 p-8 overflow-y-auto">
            <div className="grid grid-cols-2 gap-6">
               {apps.map(a => (
                 <div key={a.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center space-x-6 hover:border-pink-500/50 transition-all cursor-pointer">
                    <div className={`${a.color} w-20 h-20 rounded-2xl shadow-xl flex items-center justify-center`}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <div>
                       <h4 className="text-lg font-bold">{a.name}</h4>
                       <p className="text-xs text-white/40">{a.dev}</p>
                       <span className="inline-block mt-3 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold">{a.price}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
