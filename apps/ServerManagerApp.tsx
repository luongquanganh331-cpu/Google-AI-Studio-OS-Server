
import React, { useState } from 'react';

interface ServerManagerAppProps {
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
}

interface User {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

interface DNSRecord {
  id: string;
  host: string;
  type: 'A' | 'CNAME' | 'MX' | 'TXT';
  value: string;
}

export const ServerManagerApp: React.FC<ServerManagerAppProps> = ({ onClose, onFocus, isFocused }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'network' | 'users' | 'storage' | 'security'>('dashboard');
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'anhdaynekkkk', role: 'Global Administrator', status: 'Active' },
    { id: '2', name: 'System_Bot_AI', role: 'Service Account', status: 'Active' },
    { id: '3', name: 'Guest_User_01', role: 'Standard User', status: 'Inactive' },
  ]);

  const [dnsRecords, setDnsRecords] = useState<DNSRecord[]>([
    { id: '1', host: '@', type: 'A', value: '192.168.1.1' },
    { id: '2', host: 'api', type: 'CNAME', value: 'studio-cloud.google.com' },
    { id: '3', host: 'mail', type: 'MX', value: 'mx1.studio.local' },
  ]);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('Standard User');

  const handleAddUser = () => {
    if (!newUserName) return;
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: newUserName,
      role: newUserRole,
      status: 'Active'
    };
    setUsers([...users, newUser]);
    setNewUserName('');
    setIsAddUserModalOpen(false);
  };

  const handleAddDns = () => {
    const record: DNSRecord = {
      id: Math.random().toString(36).substr(2, 5),
      host: 'new-service',
      type: 'A',
      value: '10.0.0.' + Math.floor(Math.random() * 254)
    };
    setDnsRecords([...dnsRecords, record]);
  };

  return (
    <div 
      onClick={onFocus}
      className={`absolute inset-0 m-auto w-[950px] h-[680px] glass rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden transition-all duration-300 ${isFocused ? 'z-50' : 'z-10 opacity-70 scale-95'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 4h16v16H4V4zm4 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"></path></svg>
          </div>
          <div>
            <h3 className="text-sm font-bold">Studio Server Manager</h3>
            <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">Enterprise Core v2.5</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-red-500/20 text-red-500 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 bg-black/20 border-r border-white/5 p-4 flex flex-col space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
            { id: 'network', label: 'Network & DNS', icon: 'M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0' },
            { id: 'users', label: 'Active Directory', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' },
            { id: 'storage', label: 'Storage & Chassis', icon: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
            { id: 'security', label: 'Security Center', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-white/5 text-white/50'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={tab.icon} /></svg>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'network' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">DNS Management</h4>
                 <button onClick={handleAddDns} className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg text-[10px] font-bold hover:bg-white/10 transition-all">Add Record</button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                 <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                       <thead className="bg-white/5 text-white/30 uppercase tracking-tighter font-bold">
                          <tr>
                             <th className="px-6 py-3">Host</th>
                             <th className="px-6 py-3">Type</th>
                             <th className="px-6 py-3">Value</th>
                             <th className="px-6 py-3">TTL</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          {dnsRecords.map(r => (
                            <tr key={r.id} className="hover:bg-white/5">
                               <td className="px-6 py-4 font-mono">{r.host}</td>
                               <td className="px-6 py-4"><span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded-md font-bold">{r.type}</span></td>
                               <td className="px-6 py-4 opacity-70">{r.value}</td>
                               <td className="px-6 py-4 opacity-30 font-mono">3600</td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 <div className="bg-indigo-600/10 border border-indigo-600/20 rounded-2xl p-6 space-y-4">
                    <h5 className="text-xs font-bold uppercase tracking-widest opacity-40">Network Topology</h5>
                    <div className="flex items-center justify-around py-8 relative">
                        <div className="absolute w-full h-[1px] bg-white/5 top-1/2 -z-10"></div>
                        {[
                          { name: 'Gateway', ip: '192.168.1.1', icon: 'M12 2L2 7l10 5 10-5-10-5z' },
                          { name: 'Neural-Node-1', ip: '192.168.1.10', icon: 'M4 4h16v16H4z' },
                          { name: 'AI-Cluster-A', ip: '10.0.0.5', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }
                        ].map(n => (
                          <div key={n.name} className="flex flex-col items-center space-y-2 group">
                             <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500 group-hover:text-indigo-400 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={n.icon} /></svg>
                             </div>
                             <p className="text-[10px] font-bold">{n.name}</p>
                             <p className="text-[8px] opacity-40 font-mono">{n.ip}</p>
                          </div>
                        ))}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Active Directory Objects</h4>
                <button 
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="bg-indigo-600 px-4 py-1.5 rounded-lg text-[10px] font-bold hover:bg-indigo-500 transition-all"
                >
                  Add New User
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {users.map(u => (
                  <div key={u.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:border-indigo-500/50 transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{u.name}</p>
                        <p className="text-[10px] text-white/40 font-bold uppercase">{u.role}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-4">
                       <div>
                         <p className={`text-[10px] font-bold ${u.status === 'Active' ? 'text-green-400' : 'text-white/20'}`}>{u.status}</p>
                         <button 
                           onClick={() => alert(`Password for ${u.name} reset to: AI-Studio-2025!`)}
                           className="text-[10px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                           Reset Password
                         </button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ... Rest of components (Dashboard, Storage, Security) go here, similar to previous version ... */}
        </div>
      </div>

      {isAddUserModalOpen && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-8">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 w-[400px] shadow-2xl space-y-6 animate-in zoom-in duration-200">
             <div className="space-y-2">
               <h3 className="text-xl font-bold">New User Account</h3>
               <p className="text-xs text-white/40">Create a new identity in Active Directory.</p>
             </div>
             
             <div className="space-y-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Username</label>
                 <input 
                   autoFocus
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all text-sm"
                   placeholder="e.g. jdoe_ai"
                   value={newUserName}
                   onChange={e => setNewUserName(e.target.value)}
                 />
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Organizational Unit (Role)</label>
                 <select 
                   className="w-full bg-[#252525] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all text-sm"
                   value={newUserRole}
                   onChange={e => setNewUserRole(e.target.value)}
                 >
                   <option>Standard User</option>
                   <option>Domain Administrator</option>
                   <option>Guest Account</option>
                   <option>Service Principal</option>
                 </select>
               </div>
             </div>

             <div className="flex space-x-3 pt-4">
               <button 
                 onClick={() => setIsAddUserModalOpen(false)}
                 className="flex-1 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-bold"
               >
                 Cancel
               </button>
               <button 
                 onClick={handleAddUser}
                 className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all text-sm font-bold shadow-lg"
               >
                 Create User
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
