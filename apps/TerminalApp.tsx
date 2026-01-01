
import React, { useState, useRef, useEffect } from 'react';

interface TerminalAppProps {
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onClose, onFocus, isFocused }) => {
  const [history, setHistory] = useState<string[]>([
    'Google AI Studio Server Core [Version 2.0.4502]',
    '(c) 2024 Google Corporation. All rights reserved.',
    '',
    'Type "help" for a list of commands.'
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    switch (cmd) {
      case 'help': response = 'Available commands: help, clear, version, whoami, ls, neofetch, netstat, sc query, get-aduser'; break;
      case 'version': response = 'Google AI Studio Server v2.0-AI (LTSC Enterprise Build 4502)'; break;
      case 'whoami': response = 'anhdaynekkkk (Global Administrator)'; break;
      case 'ls': response = 'C:\\Users\\anhdaynekkkk\\Desktop>\n  Gemini-Setup.dmg\n  OS_Services.conf\n  Server_Config.yaml\n  Scripts/'; break;
      case 'clear': setHistory([]); setInput(''); return;
      case 'neofetch': response = 'OS: Studio Server Core\nHost: NeuralCore-Enterprise-01\nUptime: 14 days, 2 hours\nPackages: 1202 (studio-pkg)\nShell: studio-sh v1.2\nCPU: Google Tensor Q1 (16) @ 3.4GHz\nMemory: 4.2GB / 32GB\nNetwork: 10Gbps Fiber-to-Neural'; break;
      case 'netstat': response = 'Active Connections:\n  TCP  127.0.0.1:8080   LISTENING\n  TCP  192.168.1.10:443  ESTABLISHED (Gemini Bridge)\n  UDP  0.0.0.0:53       LISTENING (DNS Server)'; break;
      case 'sc query': response = 'SERVICE_NAME: ad-ds    STATE: 4 RUNNING\nSERVICE_NAME: dns      STATE: 4 RUNNING\nSERVICE_NAME: iis      STATE: 4 RUNNING\nSERVICE_NAME: sql-24   STATE: 1 STOPPED'; break;
      case 'get-aduser': response = 'DistinguishedName: CN=anhdaynekkkk,OU=Admins,DC=studio,DC=local\nEnabled: True\nPasswordLastSet: 2024-12-01'; break;
      default: response = `Command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, `> ${input}`, response]);
    setInput('');
  };

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[750px] h-[500px] bg-black/90 glass rounded-2xl shadow-2xl flex flex-col border border-white/10 overflow-hidden ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10" onMouseDown={onFocus}>
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:brightness-125" onClick={onClose}></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs font-bold text-white/40 ml-4 font-mono">PS C:\\Users\\anhdaynekkkk></span>
        </div>
      </div>
      <div className="flex-1 p-4 font-mono text-sm overflow-y-auto" ref={scrollRef}>
        {history.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap">{line}</div>
        ))}
        <div className="flex">
          <span className="text-emerald-400 mr-2 font-bold">{'>'}</span>
          <input 
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white font-mono"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCommand()}
          />
        </div>
      </div>
    </div>
  );
};
