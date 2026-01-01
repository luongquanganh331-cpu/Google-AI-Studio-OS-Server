
import React, { useState, useEffect } from 'react';

interface SettingsAppProps {
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
}

type SettingsSection = 'system' | 'bluetooth' | 'network' | 'personalisation' | 'apps' | 'accounts' | 'security' | 'about';

export const SettingsApp: React.FC<SettingsAppProps> = ({ onClose, onFocus, isFocused }) => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('system');
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  const menuItems: { id: SettingsSection; label: string; icon: string; color: string }[] = [
    { id: 'system', label: 'System', icon: 'M12 20h9M12 4h9M3 20h.01M3 4h.01M3 12h.01M12 12h9M3 16h.01M12 16h9M3 8h.01M12 8h9', color: 'text-blue-400' },
    { id: 'bluetooth', label: 'Bluetooth & Devices', icon: 'M7 7l10 10-5 5V2l5 5L7 17', color: 'text-indigo-400' },
    { id: 'network', label: 'Network & Internet', icon: 'M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0', color: 'text-emerald-400' },
    { id: 'personalisation', label: 'Personalisation', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', color: 'text-pink-400' },
    { id: 'apps', label: 'Apps', icon: 'M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zm-11 0h7v7H3z', color: 'text-orange-400' },
    { id: 'accounts', label: 'Accounts', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', color: 'text-purple-400' },
    { id: 'security', label: 'Security & Privacy', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', color: 'text-red-400' },
    { id: 'about', label: 'About Studio OS', icon: 'M12 16h.01M12 8h.01M12 12h.01M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z', color: 'text-slate-400' },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'system':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold">System Introduction</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Performance Profile</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Power Mode</span>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-bold">Best Performance</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Display Scaling</span>
                    <span className="text-xs text-white/40">100% (Recommended)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Neural Acceleration</span>
                    <span className="text-xs text-green-400 font-bold uppercase">Active</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Session Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Uptime</span>
                    <span className="text-xs font-mono">14d 02h 31m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Processes</span>
                    <span className="text-xs font-mono">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Kernel Temp</span>
                    <span className="text-xs font-mono">32°C</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p className="text-xs text-yellow-200/80">System update available. Schedule installation for next restart.</p>
            </div>
          </div>
        );
      case 'bluetooth':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-bold">Bluetooth & Devices</h2>
               <div 
                 onClick={() => setIsBluetoothOn(!isBluetoothOn)}
                 className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${isBluetoothOn ? 'bg-indigo-600' : 'bg-white/10'}`}
               >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isBluetoothOn ? 'right-1' : 'left-1'}`}></div>
               </div>
            </div>

            {isBluetoothOn ? (
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Paired Devices</h3>
                    <button onClick={handleScan} className="text-[10px] font-bold text-indigo-400 uppercase hover:underline disabled:opacity-30" disabled={isScanning}>
                      {isScanning ? 'Scanning...' : 'Add Device'}
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M12 4h9M3 20h.01M3 4h.01M3 12h.01M12 12h9M3 16h.01M12 16h9M3 8h.01M12 8h9"/></svg>
                        <span className="text-sm font-semibold">Studio Keyboard Pro</span>
                      </div>
                      <span className="text-[10px] font-bold text-green-400">Connected</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                        <span className="text-sm font-semibold">Pixel 9 Pro Fold</span>
                      </div>
                      <span className="text-[10px] font-bold text-white/20">Paired</span>
                    </div>
                  </div>
                </div>
                {isScanning && (
                   <div className="flex flex-col items-center py-8 space-y-3 animate-pulse">
                      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Searching for nearby devices...</p>
                   </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-white/20">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M7 7l10 10-5 5V2l5 5L7 17"/></svg>
                 <p className="mt-4 text-xs font-bold uppercase tracking-widest">Bluetooth is Turned Off</p>
              </div>
            )}
          </div>
        );
      case 'apps':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <h2 className="text-2xl font-bold">Installed Applications</h2>
             <div className="space-y-2">
                {[
                  { name: 'Gemini Assistant', size: '1.2 GB', version: 'v3.1.2', color: 'bg-purple-600' },
                  { name: 'Studio Browser', size: '450 MB', version: 'v2.0.0', color: 'bg-blue-600' },
                  { name: 'Terminal Shell', size: '12 MB', version: 'v1.4.0', color: 'bg-slate-800' },
                  { name: 'Server Manager', size: '890 MB', version: 'v2.5.1', color: 'bg-indigo-700' },
                  { name: 'Gallery Pro', size: '220 MB', version: 'v1.0.4', color: 'bg-orange-500' }
                ].map(app => (
                  <div key={app.name} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                     <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${app.color} rounded-xl flex items-center justify-center shadow-lg shadow-black/20`}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        </div>
                        <div>
                           <p className="text-sm font-bold">{app.name}</p>
                           <p className="text-[10px] text-white/40 font-semibold">{app.version} • {app.size}</p>
                        </div>
                     </div>
                     <button className="opacity-0 group-hover:opacity-100 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-[10px] font-bold transition-all border border-red-500/10 hover:bg-red-500/20">Uninstall</button>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'accounts':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
             <h2 className="text-2xl font-bold">Your Account</h2>
             <div className="flex items-center space-x-6 p-6 bg-white/5 border border-white/10 rounded-3xl">
                <img src="https://picsum.photos/seed/user/100" className="w-20 h-20 rounded-full border-2 border-indigo-500/50 p-1" alt="" />
                <div className="space-y-1">
                   <h3 className="text-xl font-bold">anhdaynekkkk</h3>
                   <p className="text-xs text-white/40">admin@studio.google.local</p>
                   <div className="flex space-x-2 pt-2">
                      <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded uppercase">Global Administrator</span>
                      <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded uppercase">Verified Identity</span>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 gap-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 px-2">Account Management</h3>
                <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
                   {['Change Password', 'Security Keys & 2FA', 'Login Activity', 'Subscription Details'].map(action => (
                     <button key={action} className="w-full text-left p-4 hover:bg-white/5 flex items-center justify-between group transition-all">
                        <span className="text-sm font-medium group-hover:text-indigo-400">{action}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                     </button>
                   ))}
                </div>
                <button className="w-full py-4 text-red-500 font-bold text-sm bg-red-500/5 rounded-2xl border border-red-500/10 hover:bg-red-500/10 transition-all mt-4">Sign Out of All Nodes</button>
             </div>
          </div>
        );
      case 'network':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold">Network & Internet</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path></svg>
                </div>
                <div>
                  <p className="font-bold">Studio_HighSpeed_5G</p>
                  <p className="text-xs text-white/40 font-semibold uppercase">Connected • Secured • 1.2 Gbps</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold hover:bg-white/20 transition-all">Disconnect</button>
            </div>
            <div className="grid grid-cols-1 gap-3">
               {['Data Usage', 'Proxy Settings', 'VPN Nodes', 'Ethernet Config', 'Static IP Allocation'].map(item => (
                 <div key={item} className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center hover:bg-white/10 cursor-pointer transition-all">
                    <span className="text-sm font-medium">{item}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40"><polyline points="9 18 15 12 9 6"></polyline></svg>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold">Security & Privacy</h2>
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8 flex items-center space-x-6">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="relative z-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 11 11 13 15 9" /></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold">Google Defender Shield</h4>
                <p className="text-sm text-blue-400/80">Neural threat monitoring is currently monitoring your environment.</p>
                <div className="flex space-x-3 mt-4">
                  <button className="px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold hover:bg-blue-500 transition-all">Full System Scan</button>
                  <button className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold hover:bg-white/20 transition-all">View Logs</button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
               <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Privacy Toggles</h3>
               <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Camera Access', desc: 'Allow apps to use the built-in camera' },
                    { label: 'Microphone Access', desc: 'Allow apps to capture audio' },
                    { label: 'Location Services', desc: 'Allow apps to see where you are' },
                    { label: 'Diagnostic Data', desc: 'Send anonymous performance reports to Google' }
                  ].map(p => (
                    <div key={p.label} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group">
                       <div>
                          <p className="text-sm font-semibold">{p.label}</p>
                          <p className="text-[10px] text-white/40">{p.desc}</p>
                       </div>
                       <div className="w-10 h-5 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case 'personalisation':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold">Personalisation</h2>
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30">Select Visual Preset</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Deep Space', colors: 'from-black to-blue-900' },
                      { name: 'Neon Matrix', colors: 'from-green-900 to-black' },
                      { name: 'Cloud White', colors: 'from-white/10 to-white/5' },
                      { name: 'Studio Core', colors: 'from-indigo-900 via-purple-900 to-black' }
                    ].map((t, i) => (
                      <button key={t.name} className={`aspect-video rounded-xl border-2 transition-all ${i === 3 ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-white/5 hover:border-white/20'} overflow-hidden relative group`}>
                         <div className={`absolute inset-0 bg-gradient-to-br ${t.colors}`}></div>
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Apply</span>
                         </div>
                         <div className="absolute bottom-1 left-2 text-[8px] font-bold text-white/40">{t.name}</div>
                      </button>
                    ))}
                  </div>
               </div>
               <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30">Interface Effects</p>
                  <div className="space-y-3">
                     <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                        <span className="text-sm">Acrylic Glass Bloom</span>
                        <div className="w-10 h-5 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
                           <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                     </div>
                     <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                        <span className="text-sm">Dynamic Animations</span>
                        <div className="w-10 h-5 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
                           <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                     </div>
                     <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                        <span className="text-sm">Taskbar Autohide</span>
                        <div className="w-10 h-5 bg-white/10 rounded-full relative p-1 cursor-pointer">
                           <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center space-x-6">
               <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent group-hover:opacity-40 transition-opacity"></div>
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="relative z-10 animate-pulse"><path d="M50 0L58 42L100 50L58 58L50 100L42 58L0 50L42 42L50 0Z" fill="white" /></svg>
               </div>
               <div>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tighter">Studio Server OS</h1>
                  <p className="text-sm font-bold opacity-40 uppercase tracking-[0.4em]">Enterprise AI Node v2.5</p>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 font-mono text-xs leading-relaxed relative overflow-hidden">
               <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
                  <svg width="300" height="300" viewBox="0 0 100 100" fill="white"><path d="M50 0L58 42L100 50L58 58L50 100L42 58L0 50L42 42L50 0Z" /></svg>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Processor Cluster:</span>
                  <span className="text-indigo-400 font-bold">Google Tensor Neural-Q1 Gen 2</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Total Neural RAM:</span>
                  <span>32.0 GB ECC LPDDR6X</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Hardware Identifier:</span>
                  <span className="uppercase tracking-widest">N-STUDIO-X86-ENT-004502-B</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">OS Architecture:</span>
                  <span>AI-First Native 128-bit Hybrid</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-white/40">Build Version:</span>
                  <span className="bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded">4502.2025.STUDIO_SERVER</span>
               </div>
            </div>

            <div className="flex justify-center space-x-6">
                <button className="px-6 py-2 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all">Check for Updates</button>
                <button className="px-6 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10">License Agreement</button>
            </div>

            <p className="text-center text-[9px] font-bold text-white/10 uppercase tracking-[0.5em] pt-8">
               Designed by Google AI Studio • Made for the Future
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[1000px] h-[720px] glass rounded-[2.5rem] shadow-2xl flex flex-col border border-white/10 overflow-hidden transition-all duration-300 ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      {/* Header Bar */}
      <div className="h-12 bg-white/5 border-b border-white/5 flex items-center justify-between px-6 shrink-0 relative z-10">
        <div className="flex items-center space-x-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-400 animate-pulse"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Global Control Panel</span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-red-500/20 text-red-500 rounded-full transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:rotate-90 transition-transform"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-white/5 flex flex-col p-4 bg-white/5 space-y-1 shrink-0">
          <div className="mb-6 px-4 py-2">
             <h2 className="text-xl font-black tracking-tight">Studio Settings</h2>
             <div className="mt-4 flex items-center space-x-3 p-3 bg-white/5 rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                <img src="https://picsum.photos/seed/user/32" className="w-8 h-8 rounded-full shadow-lg shadow-black/20" alt="" />
                <div className="overflow-hidden">
                   <p className="text-xs font-bold truncate group-hover:text-indigo-400 transition-colors">anhdaynekkkk</p>
                   <p className="text-[9px] text-white/40 truncate font-black uppercase tracking-tighter">Verified Administrator</p>
                </div>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-1 pr-2">
            {menuItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeSection === item.id ? 'bg-indigo-600/20 text-indigo-400 shadow-xl border border-indigo-600/20' : 'hover:bg-white/5 text-white/40'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={activeSection === item.id ? item.color : 'opacity-40'}><path d={item.icon} /></svg>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-12 overflow-y-auto bg-gradient-to-br from-transparent via-white/5 to-transparent">
           {renderContent()}
        </div>
      </div>
    </div>
  );
};
