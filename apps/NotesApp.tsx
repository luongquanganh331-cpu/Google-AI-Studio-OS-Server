
import React, { useState } from 'react';

interface NotesAppProps {
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
}

export const NotesApp: React.FC<NotesAppProps> = ({ onClose, onFocus, isFocused }) => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Server Upgrade Plans', content: 'Upgrade SQL Server to 2024 next week. Backup all AD objects first.', date: 'Dec 15' },
    { id: 2, title: 'Gemini Prompt Idea', content: 'Try system instruction: You are a strict system admin.', date: 'Dec 14' }
  ]);
  const [selectedNote, setSelectedNote] = useState(notes[0]);

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[800px] h-[550px] glass rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden transition-all duration-300 ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
          </div>
          <h3 className="text-sm font-bold">Studio Notes</h3>
        </div>
        <button onClick={onClose} className="text-red-500 hover:bg-red-500/20 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-white/5 overflow-y-auto">
          {notes.map(n => (
            <button 
              key={n.id}
              onClick={() => setSelectedNote(n)}
              className={`w-full text-left p-4 border-b border-white/5 transition-colors ${selectedNote.id === n.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <h4 className="text-sm font-bold truncate">{n.title}</h4>
              <p className="text-[10px] text-white/40 mt-1">{n.date}</p>
            </button>
          ))}
          <button className="w-full p-4 text-center text-xs font-bold text-yellow-500 hover:bg-white/5">+ New Note</button>
        </div>
        <div className="flex-1 p-8">
           <input 
             className="w-full bg-transparent text-2xl font-bold outline-none mb-4"
             value={selectedNote.title}
             onChange={(e) => setSelectedNote({...selectedNote, title: e.target.value})}
           />
           <textarea 
             className="w-full h-full bg-transparent outline-none resize-none text-white/70 leading-relaxed"
             value={selectedNote.content}
             onChange={(e) => setSelectedNote({...selectedNote, content: e.target.value})}
           />
        </div>
      </div>
    </div>
  );
};
