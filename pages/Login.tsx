import React, { useState } from 'react';
import { ShieldAlert, Lock, User, ArrowRight, Cpu, UserPlus } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  onNavigateSignUp: () => void;
  error?: string;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onNavigateSignUp, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      onLogin(username, password);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)',
            backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-blue-600/20 rounded-2xl mb-4 backdrop-blur-sm border border-blue-500/30">
            <ShieldAlert className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">SafeNet Ecosystem</h1>
          <p className="text-slate-400">Enterprise-Grade Phishing Detection</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm text-center">
                {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter username"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                   <Cpu className="w-5 h-5 animate-spin" />
                   Authenticating...
                </>
              ) : (
                <>
                  Access Portal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700 text-center">
            <p className="text-slate-400 text-sm mb-4">Don't have an account?</p>
            <button 
                onClick={onNavigateSignUp}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center justify-center gap-1 w-full"
            >
                <UserPlus className="w-4 h-4" />
                Register New User
            </button>
          </div>
        </div>
        
        <p className="text-center text-slate-500 text-xs mt-8">
          Protected by SafeNet Cloud • v2.5.0-stable
        </p>
      </div>
    </div>
  );
};
