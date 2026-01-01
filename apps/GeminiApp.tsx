
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Message } from '../types';

interface GeminiAppProps {
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
}

export const GeminiApp: React.FC<GeminiAppProps> = ({ onClose, onFocus, isFocused }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I am Gemini, your AI Studio assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage].map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
        })),
        config: {
            systemInstruction: "You are the primary OS assistant for Google AI Studio OS. You are helpful, sleek, and highly knowledgeable about technology and the OS environment."
        }
      });

      const modelContent = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'model', content: modelContent }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Error connecting to Gemini. Please check your system link." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[900px] h-[650px] glass rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden transition-all duration-300 ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      {/* App Header */}
      <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div>
            <h3 className="text-sm font-bold">Gemini Assistant</h3>
            <p className="text-[10px] opacity-40 font-bold uppercase">v3.1 Flash Preview</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
            <button onClick={onClose} className="p-2 hover:bg-red-500/20 text-red-500 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-gray-200'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 flex items-center space-x-1">
               <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
               <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white/5">
        <div className="relative flex items-center bg-black/40 border border-white/10 rounded-2xl px-4 overflow-hidden focus-within:border-blue-500 transition-all">
          <input 
            className="flex-1 bg-transparent py-4 text-sm outline-none placeholder-white/20"
            placeholder="Ask anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            className="p-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-50"
            disabled={!input.trim() || isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
          </button>
        </div>
        <p className="text-center text-[9px] text-white/20 font-bold uppercase tracking-widest mt-4">
          Powered by Gemini 3 Flash • Quantum Neural Core v2.0
        </p>
      </div>
    </div>
  );
};
