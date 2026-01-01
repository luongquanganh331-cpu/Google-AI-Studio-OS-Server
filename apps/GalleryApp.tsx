
import React from 'react';

export const GalleryApp: React.FC<{ onClose: () => void, onFocus: () => void, isFocused: boolean }> = ({ onClose, onFocus, isFocused }) => {
  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[850px] h-[600px] glass rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden transition-all ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      <div className="p-6 flex items-center justify-between border-b border-white/5">
         <h3 className="text-sm font-bold uppercase tracking-widest">Media Gallery</h3>
         <button onClick={onClose} className="text-red-500">&times;</button>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
         <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer hover:border-orange-500 transition-all">
                <img src={`https://picsum.photos/seed/studio${i}/300/300`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
