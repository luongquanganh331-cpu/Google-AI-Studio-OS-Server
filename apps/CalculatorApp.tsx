
import React, { useState } from 'react';

export const CalculatorApp: React.FC<{ onClose: () => void, onFocus: () => void, isFocused: boolean }> = ({ onClose, onFocus, isFocused }) => {
  const [display, setDisplay] = useState('0');

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', 'C', '=', '+'
  ];

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[300px] h-[450px] glass rounded-3xl shadow-2xl flex flex-col border border-white/10 transition-all ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between">
         <span className="text-xs font-bold uppercase tracking-widest text-white/40">Calculator</span>
         <button onClick={onClose} className="text-red-500">×</button>
      </div>
      <div className="flex-1 p-6 flex flex-col space-y-4">
        <div className="bg-black/40 rounded-2xl p-4 text-right text-3xl font-mono overflow-hidden">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map(btn => (
            <button 
              key={btn}
              onClick={() => {
                if (btn === 'C') setDisplay('0');
                else if (btn === '=') {
                  try { setDisplay(eval(display).toString()); } catch { setDisplay('Error'); }
                } else {
                  setDisplay(display === '0' ? btn : display + btn);
                }
              }}
              className={`p-4 rounded-xl text-lg font-bold transition-all ${btn === '=' ? 'bg-blue-600' : 'bg-white/5 hover:bg-white/10'}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
