
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ShutdownDialogProps {
  onCancel: () => void;
  onComplete: () => void;
}

export const ShutdownDialog: React.FC<ShutdownDialogProps> = ({ onCancel, onComplete }) => {
  const [step, setStep] = useState<'reason' | 'ai-response' | 'closing'>('reason');
  const [customReason, setCustomReason] = useState('');
  const [aiText, setAiText] = useState('');

  const reasons = [
    { id: 'maint', label: 'Scheduled Maintenance', icon: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' },
    { id: 'shift', label: 'End of Operations', icon: 'M12 8v4l3 3' },
    { id: 'save', label: 'Conserve Neural Energy', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
    { id: 'other', label: 'Other Reason...', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5z' },
  ];

  const handleReasonSelect = async (id: string) => {
    if (id === 'other') {
      setStep('ai-response');
      return;
    }
    setStep('closing');
    setTimeout(onComplete, 2000);
  };

  const submitCustomReason = async () => {
    if (!customReason.trim()) return;
    setAiText('Processing request...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user of this AI OS is shutting down for the following reason: "${customReason}". Provide a very short (max 15 words), helpful, and "natural" closing statement from the OS, acknowledging the reason.`,
      });
      setAiText(response.text || "Goodbye. System shutting down.");
    } catch (e) {
      setAiText("Understood. Saving current state. Goodbye.");
    }

    setTimeout(() => {
      setStep('closing');
      setTimeout(onComplete, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-md glass rounded-[2.5rem] p-10 border-white/5 shadow-2xl space-y-8 text-center animate-in zoom-in duration-300">
        
        {step === 'reason' && (
          <>
            <div className="space-y-2">
               <h2 className="text-2xl font-bold">System Power Down</h2>
               <p className="text-white/40 text-sm font-medium">Please select a reason for session termination.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {reasons.map(r => (
                <button 
                  key={r.id}
                  onClick={() => handleReasonSelect(r.id)}
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-left group"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:text-blue-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={r.icon} /></svg>
                  </div>
                  <span className="text-sm font-semibold">{r.label}</span>
                </button>
              ))}
            </div>

            <button onClick={onCancel} className="text-xs font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">Abort Shutdown</button>
          </>
        )}

        {step === 'ai-response' && (
          <div className="space-y-6">
             <div className="space-y-2">
                <h3 className="text-lg font-bold">Additional Context Required</h3>
                <p className="text-xs text-white/40">Describe your reason for termination.</p>
             </div>
             
             {!aiText ? (
               <div className="space-y-4">
                  <textarea 
                    autoFocus
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-blue-500/50 min-h-[100px] transition-all"
                    placeholder="Enter reason..."
                    value={customReason}
                    onChange={e => setCustomReason(e.target.value)}
                  />
                  <button 
                    onClick={submitCustomReason}
                    className="w-full bg-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                  >
                    Confirm & Shutdown
                  </button>
               </div>
             ) : (
               <div className="p-6 bg-white/5 rounded-3xl border border-white/5 animate-pulse">
                  <p className="text-sm italic text-blue-200">"{aiText}"</p>
               </div>
             )}
          </div>
        )}

        {step === 'closing' && (
          <div className="py-12 flex flex-col items-center space-y-6">
             <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
             <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/40">System terminating...</p>
          </div>
        )}
      </div>
    </div>
  );
};
