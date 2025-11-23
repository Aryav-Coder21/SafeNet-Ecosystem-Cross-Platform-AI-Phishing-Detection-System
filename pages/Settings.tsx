import React, { useState } from 'react';
import { User } from '../types';
import { 
  ToggleLeft, ToggleRight, Shield, Bell, Server, Database, 
  User as UserIcon, Save, Key, Globe, Activity, HardDrive 
} from 'lucide-react';

interface SettingsProps {
  user: User;
}

type SettingsTab = 'profile' | 'notifications' | 'security' | 'api' | 'data';

export const Settings: React.FC<SettingsProps> = ({ user }) => {
  const isAdmin = user.role === 'admin';
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [loading, setLoading] = useState(false);

  // Form States (Simulated)
  const [displayName, setDisplayName] = useState(user.username);
  const [email, setEmail] = useState(`${user.username.replace(/\s+/g, '.').toLowerCase()}@safenet.org`);
  
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        alert("Settings saved successfully!");
    }, 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
        case 'profile':
            return (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <UserIcon className="w-6 h-6 text-blue-500"/> Edit Profile
                    </h3>
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-blue-900/50">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <button className="text-sm bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded transition-colors border border-slate-600">
                                    Change Avatar
                                </button>
                                <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size 800K</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Username</label>
                                <input 
                                    type="text" 
                                    value={displayName} 
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Bio / Role Description</label>
                                <textarea 
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24"
                                    defaultValue={isAdmin ? "System Administrator for SafeNet Enterprise." : "Cybersecurity Analyst and community contributor."}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            );
        
        case 'notifications':
            return (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Bell className="w-6 h-6 text-amber-500"/> Notification Preferences
                    </h3>
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                            <div>
                                <div className="text-white font-medium">Desktop Alerts</div>
                                <div className="text-xs text-slate-400">Get native popups when a scan completes.</div>
                            </div>
                            <ToggleRight className="w-10 h-10 text-blue-500 cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                            <div>
                                <div className="text-white font-medium">Email Summaries</div>
                                <div className="text-xs text-slate-400">Receive weekly reports of blocked threats.</div>
                            </div>
                            <ToggleRight className="w-10 h-10 text-blue-500 cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                            <div>
                                <div className="text-white font-medium">Community Updates</div>
                                <div className="text-xs text-slate-400">Notify me when my reports are verified.</div>
                            </div>
                            <ToggleLeft className="w-10 h-10 text-slate-600 cursor-pointer hover:text-slate-500 transition-colors" />
                        </div>
                    </div>
                </div>
            );

        case 'security':
            return (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-emerald-500"/> Security Settings
                    </h3>
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
                        <div>
                            <h4 className="text-white font-medium mb-4 border-b border-slate-700 pb-2">Change Password</h4>
                            <div className="space-y-4">
                                <input type="password" placeholder="Current Password" className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="password" placeholder="New Password" className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white" />
                                    <input type="password" placeholder="Confirm New Password" className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <h4 className="text-white font-medium mb-4 border-b border-slate-700 pb-2">Two-Factor Authentication</h4>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-300">Secure your account with 2FA.</p>
                                    <p className="text-xs text-slate-500">Currently disabled.</p>
                                </div>
                                <button className="bg-blue-600/20 text-blue-400 border border-blue-600/50 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-all">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 'api':
            return (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Server className="w-6 h-6 text-indigo-500"/> Backend API Configuration
                    </h3>
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-xs text-slate-500 uppercase font-bold">Status</div>
                                <div className="text-emerald-500 font-bold flex items-center justify-center gap-2 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
                                </div>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-xs text-slate-500 uppercase font-bold">Latency</div>
                                <div className="text-white font-bold mt-1 font-mono">24ms</div>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
                                <div className="text-xs text-slate-500 uppercase font-bold">Uptime</div>
                                <div className="text-white font-bold mt-1 font-mono">99.98%</div>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-xs uppercase text-slate-500 font-bold mb-2">API Endpoint URL</label>
                            <div className="flex gap-2">
                                <div className="bg-slate-900 border border-slate-700 rounded-l-lg px-3 py-2 text-slate-400 font-mono text-sm flex items-center">POST</div>
                                <input 
                                    type="text" 
                                    defaultValue="https://api.safenet-core.internal/v2/scan" 
                                    className="flex-1 bg-slate-900 border border-slate-600 rounded-r-lg px-4 py-2 text-emerald-400 font-mono text-sm" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-slate-500 font-bold mb-2">API Key</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input 
                                    type="password" 
                                    defaultValue="sk_live_593849583498594832" 
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-slate-300 font-mono text-sm" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 'data':
            return (
                 <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Database className="w-6 h-6 text-pink-500"/> Training Data Management
                    </h3>
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
                                <HardDrive className="w-8 h-8 text-pink-500" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Primary Dataset (MySQL)</h4>
                                <p className="text-slate-400 text-sm">
                                    The core dataset used to train the Random Forest model. 
                                    Contains lexical features of known phishing and legitimate URLs.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-1 mb-8">
                             <div className="flex justify-between text-sm py-2 border-b border-slate-700">
                                 <span className="text-slate-400">Dataset Name</span>
                                 <span className="text-white font-mono">UCI_Phishing_Extended_2024.arff</span>
                             </div>
                             <div className="flex justify-between text-sm py-2 border-b border-slate-700">
                                 <span className="text-slate-400">Total Records</span>
                                 <span className="text-white font-mono">14,500 Rows</span>
                             </div>
                             <div className="flex justify-between text-sm py-2 border-b border-slate-700">
                                 <span className="text-slate-400">Attributes</span>
                                 <span className="text-white font-mono">32 Features</span>
                             </div>
                             <div className="flex justify-between text-sm py-2 border-b border-slate-700">
                                 <span className="text-slate-400">Last Synced</span>
                                 <span className="text-white font-mono">Oct 24, 2023 14:30 UTC</span>
                             </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                View Raw Data
                            </button>
                            <button className="flex-1 bg-pink-600 hover:bg-pink-500 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                Upload New Dataset
                            </button>
                        </div>
                    </div>
                </div>
            );
        
        default:
            return null;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in-up">
      <h2 className="text-3xl font-bold text-white mb-8">Settings & Configuration</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-2 lg:col-span-1">
            <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full p-3 rounded-lg font-medium flex items-center gap-3 transition-all text-left ${
                    activeTab === 'profile' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
                <UserIcon className="w-5 h-5" /> Profile
            </button>
            <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full p-3 rounded-lg font-medium flex items-center gap-3 transition-all text-left ${
                    activeTab === 'notifications' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
                <Bell className="w-5 h-5" /> Notifications
            </button>
            <button 
                onClick={() => setActiveTab('security')}
                className={`w-full p-3 rounded-lg font-medium flex items-center gap-3 transition-all text-left ${
                    activeTab === 'security' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
                <Shield className="w-5 h-5" /> Security
            </button>
            
            {isAdmin && (
                <>
                    <div className="my-4 border-t border-slate-800 mx-2"></div>
                    <div className="px-3 text-xs font-bold text-slate-500 uppercase mb-1">Admin Area</div>
                    <button 
                        onClick={() => setActiveTab('api')}
                        className={`w-full p-3 rounded-lg font-medium flex items-center gap-3 transition-all text-left ${
                            activeTab === 'api' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                    >
                        <Server className="w-5 h-5" /> Backend API
                    </button>
                    <button 
                        onClick={() => setActiveTab('data')}
                        className={`w-full p-3 rounded-lg font-medium flex items-center gap-3 transition-all text-left ${
                            activeTab === 'data' ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                    >
                        <Database className="w-5 h-5" /> Training Data
                    </button>
                </>
            )}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
             {renderContent()}
             
             {/* Global Save Button */}
             <div className="mt-8 flex justify-end border-t border-slate-800 pt-6">
                <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-wait"
                >
                    <Save className="w-5 h-5" />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};