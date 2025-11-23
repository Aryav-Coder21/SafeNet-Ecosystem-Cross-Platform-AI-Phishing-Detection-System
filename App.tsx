import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Scanner } from './pages/Scanner';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { CommunityReports } from './pages/CommunityReports';
import { Settings } from './pages/Settings';
import { AdminConsole } from './pages/AdminConsole';
import { Downloads } from './pages/Downloads';
import { AiAssistant } from './components/AiAssistant';
import { AnalysisResult, ScanHistoryItem, User, UserRole, Notification } from './types';
import { Bell, User as UserIcon, LogOut, X } from 'lucide-react';

export default function App() {
  // Navigation State
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Data State
  const [user, setUser] = useState<User | null>(null);
  const [usersDb, setUsersDb] = useState<User[]>([]); // In-memory user DB for demo
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [loginError, setLoginError] = useState('');
  
  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'System Update', message: 'SafeNet Backend updated to v2.5', type: 'info', time: '2 mins ago', read: false },
    { id: '2', title: 'Threat Blocked', message: 'High confidence phishing attempt blocked.', type: 'warning', time: '1 hour ago', read: false },
    { id: '3', title: 'Report Verified', message: 'Your community report was verified by Admin.', type: 'success', time: '3 hours ago', read: true }
  ]);

  // Handle User Registration
  const handleSignUp = (newUser: {username: string, password: string, role: UserRole, email: string}) => {
    const userExists = usersDb.some(u => u.username === newUser.username);
    if (userExists) {
        alert("Username already exists!");
        return;
    }
    setUsersDb([...usersDb, newUser]);
    setAuthView('login');
    setLoginError('');
    alert("Account created successfully! Please log in.");
  };

  // Handle Login
  const handleLogin = (username: string, password: string) => {
    // For demo purposes, allow hardcoded admin or any registered user
    const dbUser = usersDb.find(u => u.username === username && u.password === password);
    
    // Fallback for "First time" demo without registration if desired, or strict checking
    if (dbUser) {
        setUser(dbUser);
        setIsLoggedIn(true);
        setCurrentView('dashboard');
    } else if (username === 'admin' && password === 'admin') {
         // Backdoor for demo admin
         setUser({ username: 'Admin', role: 'admin' });
         setIsLoggedIn(true);
         setCurrentView('dashboard');
    } else {
        setLoginError("Invalid credentials. Please sign up or check password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentView('dashboard');
    setAuthView('login');
    setLoginError('');
  };

  const handleAddToHistory = (result: AnalysisResult) => {
    const newItem: ScanHistoryItem = {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
    };
    setScanHistory(prev => [newItem, ...prev]);
    // Add notification
    if (result.status === 'PHISHING') {
        const newNotif: Notification = {
            id: Date.now().toString(),
            title: 'Phishing Detected',
            message: `Malicious URL detected: ${result.url.substring(0, 30)}...`,
            type: 'warning',
            time: 'Just now',
            read: false
        };
        setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const markNotificationsRead = () => {
      setNotifications(prev => prev.map(n => ({...n, read: true})));
  };

  if (!isLoggedIn) {
    if (authView === 'signup') {
        return <SignUp onSignUp={handleSignUp} onNavigateLogin={() => setAuthView('login')} />;
    }
    return <Login onLogin={handleLogin} onNavigateSignUp={() => setAuthView('signup')} error={loginError} />;
  }

  const renderContent = () => {
    if (!user) return null;

    switch (currentView) {
      case 'scanner':
        return <Scanner addToHistory={handleAddToHistory} />;
      case 'dashboard':
        return <Dashboard history={scanHistory} user={user} />;
      case 'reports':
        return <CommunityReports user={user} />;
      case 'settings':
        return <Settings user={user} />;
      case 'downloads':
        return <Downloads />;
      case 'admin-console':
        return user.role === 'admin' ? <AdminConsole scanHistory={scanHistory} /> : <Dashboard history={scanHistory} user={user} />;
      case 'history':
        return (
          <div className="p-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-6">Full Scan History</h2>
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase">
                      <tr>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">URL</th>
                          <th className="px-6 py-4">Confidence</th>
                          <th className="px-6 py-4">Date</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {scanHistory.map(item => (
                       <tr key={item.id} className="hover:bg-slate-700/50">
                          <td className="px-6 py-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                                item.status === 'SAFE' ? 'text-emerald-400 bg-emerald-500/10' : 
                                item.status === 'PHISHING' ? 'text-red-400 bg-red-500/10' : 
                                'text-amber-400 bg-amber-500/10'
                            }`}>{item.status}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-300 font-mono text-sm max-w-md truncate">{item.url}</td>
                          <td className="px-6 py-4 text-slate-400">{item.confidence}%</td>
                          <td className="px-6 py-4 text-slate-400">{new Date(item.timestamp).toLocaleString()}</td>
                       </tr>
                    ))}
                    {scanHistory.length === 0 && (
                        <tr>
                            <td colSpan={4} className="p-8 text-center text-slate-500">No scan history available in this session.</td>
                        </tr>
                    )}
                  </tbody>
               </table>
            </div>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100 font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} onLogout={handleLogout} userRole={user?.role || 'user'} />
      
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="text-sm breadcrumbs text-slate-400 flex items-center gap-2">
                <span>SafeNet Ecosystem</span> 
                <span className="text-slate-600">/</span> 
                <span className="text-white capitalize font-medium">{currentView.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center gap-4 relative">
                <button 
                    onClick={() => {
                        setShowNotifications(!showNotifications);
                        if (!showNotifications) markNotificationsRead();
                    }}
                    className={`p-2 rounded-full relative transition-colors ${showNotifications ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                    <div className="absolute top-12 right-0 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                        <div className="p-3 border-b border-slate-700 flex justify-between items-center">
                            <h3 className="font-bold text-sm text-white">Notifications</h3>
                            <button onClick={() => setShowNotifications(false)} className="text-slate-500 hover:text-white"><X className="w-4 h-4"/></button>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-sm text-slate-500">No notifications</div>
                            ) : (
                                notifications.map(notif => (
                                    <div key={notif.id} className="p-3 hover:bg-slate-700/50 transition-colors border-b border-slate-700/50 last:border-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                                                notif.type === 'warning' ? 'bg-red-500/20 text-red-400' :
                                                notif.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                                                'bg-blue-500/20 text-blue-400'
                                            }`}>{notif.type}</span>
                                            <span className="text-[10px] text-slate-500">{notif.time}</span>
                                        </div>
                                        <h4 className="text-sm font-medium text-slate-200">{notif.title}</h4>
                                        <p className="text-xs text-slate-400 mt-1">{notif.message}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-medium text-white">{user?.username}</div>
                        <div className="text-xs text-slate-500 capitalize">{user?.role} Account</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <UserIcon className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>
        </header>

        {/* Content */}
        <div className="flex-1 bg-slate-900 relative">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            }}></div>
            
            <div className="relative z-10 h-full">
                {renderContent()}
            </div>
        </div>

        {/* AI Assistant Widget */}
        <AiAssistant />
      </main>
    </div>
  );
}