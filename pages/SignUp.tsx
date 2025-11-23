import React, { useState } from 'react';
import { ShieldAlert, UserPlus, ArrowLeft, Mail, Lock, User, Briefcase } from 'lucide-react';
import { UserRole } from '../types';

interface SignUpProps {
  onSignUp: (user: {username: string, password: string, role: UserRole, email: string}) => void;
  onNavigateLogin: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSignUp, onNavigateLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as UserRole
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        onSignUp({
            username: formData.username,
            password: formData.password,
            role: formData.role,
            email: formData.email
        });
        setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)',
            backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="w-full max-w-lg p-8 relative z-10">
        <button 
            onClick={onNavigateLogin}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" /> Back to Login
        </button>

        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400">Join the SafeNet ecosystem</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
                {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Username</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        required
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.username}
                        onChange={e => setFormData({...formData, username: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="email"
                        required
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Confirm</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.confirmPassword}
                            onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Account Type</label>
                <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <select
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value as UserRole})}
                    >
                        <option value="user">Standard User</option>
                        <option value="admin">Administrator (Demo)</option>
                    </select>
                </div>
                <p className="text-xs text-slate-500 mt-1">*Select Admin to see Model Training features.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                'Creating Account...'
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
