import React from 'react';
import { ShieldAlert, LayoutDashboard, Globe, History, Settings, FileText, LogOut, TerminalSquare, Download } from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  onLogout: () => void;
  userRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout, userRole }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scanner', label: 'URL Scanner', icon: Globe },
    { id: 'history', label: 'Scan History', icon: History },
    { id: 'reports', label: 'Community Reports', icon: FileText },
    { id: 'downloads', label: 'Install Clients', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (userRole === 'admin') {
      menuItems.splice(5, 0, { id: 'admin-console', label: 'Admin Console', icon: TerminalSquare });
  }

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">SafeNet</h1>
          <p className="text-xs text-slate-400">Enterprise Security</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 space-y-4">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <p className="text-xs font-semibold text-slate-400 uppercase mb-2">System Status</p>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-slate-300">Backend Online</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm text-slate-300">Model v2.4 Loaded</span>
          </div>
        </div>
        
        <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
        >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};