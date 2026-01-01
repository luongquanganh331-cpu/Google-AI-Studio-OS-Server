
import React, { useState, useRef, useEffect } from 'react';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  time: string;
  unread?: number;
}

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export const MessagesApp: React.FC<{ onClose: () => void, onFocus: () => void, isFocused: boolean }> = ({ onClose, onFocus, isFocused }) => {
  const [contacts] = useState<Contact[]>([
    { id: '1', name: 'System Admin Beta', avatar: 'https://picsum.photos/seed/admin/40', status: 'online', lastMessage: 'The server node is stable.', time: '10:42 AM' },
    { id: '2', name: 'Google AI Support', avatar: 'https://picsum.photos/seed/support/40', status: 'online', lastMessage: 'Do you need help with the LTSC build?', time: 'Yesterday', unread: 2 },
    { id: '3', name: 'Neural-Dev-01', avatar: 'https://picsum.photos/seed/dev/40', status: 'away', lastMessage: 'Check the new kernel logs.', time: 'Monday' },
  ]);

  const [activeContactId, setActiveContactId] = useState('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      { id: 'm1', sender: 'them', text: 'Welcome to the Studio Messaging bridge.', time: '10:00 AM' },
      { id: 'm2', sender: 'me', text: 'Thanks! Everything looks sharp.', time: '10:05 AM' },
      { id: 'm3', sender: 'them', text: 'The server node is stable.', time: '10:42 AM' },
    ],
    '2': [
      { id: 'm4', sender: 'them', text: 'Hello, how can we assist you with Studio OS today?', time: 'Yesterday' },
    ]
  });

  const [inputText, setInputText] = useState('');
  const activeContact = contacts.find(c => c.id === activeContactId)!;
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [activeContactId, messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage]
    }));
    setInputText('');
  };

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[850px] h-[600px] glass rounded-[2.5rem] shadow-2xl flex flex-col border border-white/10 overflow-hidden transition-all duration-300 ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      <div className="h-12 bg-white/5 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.8A8.38 8.38 0 0 1 21 11.5z"/></svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Studio Messages</span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-red-500/20 text-red-500 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-72 border-r border-white/5 flex flex-col bg-white/5">
          <div className="p-4">
            <div className="relative">
              <input 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:border-emerald-500/50 transition-all"
                placeholder="Search conversations..."
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map(c => (
              <button 
                key={c.id}
                onClick={() => setActiveContactId(c.id)}
                className={`w-full flex items-center space-x-3 p-4 transition-all border-l-4 ${activeContactId === c.id ? 'bg-emerald-500/10 border-emerald-500' : 'hover:bg-white/5 border-transparent'}`}
              >
                <div className="relative">
                  <img src={c.avatar} className="w-10 h-10 rounded-full bg-white/10" alt="" />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${c.status === 'online' ? 'bg-green-500' : c.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold truncate">{c.name}</span>
                    <span className="text-[9px] font-bold text-white/20">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-white/40 truncate">{c.lastMessage}</p>
                </div>
                {c.unread && <div className="bg-emerald-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">{c.unread}</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center space-x-3">
              <img src={activeContact.avatar} className="w-8 h-8 rounded-full" alt="" />
              <div>
                <h4 className="text-sm font-bold">{activeContact.name}</h4>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter">{activeContact.status}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-white/5 rounded-full text-white/40"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></button>
              <button className="p-2 hover:bg-white/5 rounded-full text-white/40"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={chatRef}>
            {(messages[activeContactId] || []).map(m => (
              <div key={m.id} className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-lg ${m.sender === 'me' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none'}`}>
                  {m.text}
                </div>
                <span className="text-[9px] font-bold text-white/20 mt-1 uppercase">{m.time}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-black/20 border-t border-white/5">
            <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-2xl px-4 overflow-hidden focus-within:border-emerald-500/50 transition-all">
              <button className="text-white/20 hover:text-white/40"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></button>
              <input 
                className="flex-1 bg-transparent py-4 text-sm outline-none placeholder-white/20"
                placeholder="Type a message..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className={`p-2 rounded-xl transition-all ${inputText.trim() ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'text-white/10 cursor-default'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
