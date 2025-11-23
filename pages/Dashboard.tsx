import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { ScanHistoryItem, ThreatLevel, User } from '../types';
import { AlertOctagon, ShieldCheck, Activity, Users, Settings, Database, RefreshCw } from 'lucide-react';

interface DashboardProps {
  history: ScanHistoryItem[];
  user: User;
}

const mockWeeklyData = [
  { name: 'Mon', safe: 400, threats: 24 },
  { name: 'Tue', safe: 300, threats: 13 },
  { name: 'Wed', safe: 550, threats: 38 },
  { name: 'Thu', safe: 480, threats: 20 },
  { name: 'Fri', safe: 620, threats: 45 },
  { name: 'Sat', safe: 340, threats: 12 },
  { name: 'Sun', safe: 390, threats: 15 },
];

export const Dashboard: React.FC<DashboardProps> = ({ history, user }) => {
  const totalScans = history.length + 1245; // Mocking historic total
  const phishingBlocked = history.filter(h => h.status === ThreatLevel.PHISHING).length + 89;
  const isAdmin = user.role === 'admin';

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            {isAdmin ? 'Command Center' : 'Security Overview'}
          </h2>
          <p className="text-slate-400">
            {isAdmin ? `Welcome back, Administrator. System operational.` : `Welcome back, ${user.username}. Your protection status is active.`}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           Live Data Feed
        </div>
      </div>

      {isAdmin && (
        <div className="mb-8 bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-lg">
               <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Admin Controls Active</h3>
              <p className="text-blue-200 text-sm">You have full read/write access to the Phishing Dataset.</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg border border-slate-600 transition-colors flex items-center gap-2">
               <RefreshCw className="w-4 h-4" />
               Retrain Model
             </button>
             <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors flex items-center gap-2">
               <Settings className="w-4 h-4" />
               System Config
             </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <p className="text-slate-400 font-medium mb-1">{isAdmin ? 'Global Scans' : 'Your Scans'}</p>
            <h3 className="text-3xl font-bold text-white">{totalScans.toLocaleString()}</h3>
            <p className="text-emerald-500 text-sm flex items-center mt-2">
              <span className="bg-emerald-500/10 px-1.5 py-0.5 rounded mr-1">↑ 12%</span> this week
            </p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden group hover:border-red-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertOctagon className="w-24 h-24 text-red-500" />
          </div>
          <div className="relative z-10">
            <p className="text-slate-400 font-medium mb-1">Threats Blocked</p>
            <h3 className="text-3xl font-bold text-white">{phishingBlocked.toLocaleString()}</h3>
            <p className="text-red-400 text-sm flex items-center mt-2">
              <span className="bg-red-500/10 px-1.5 py-0.5 rounded mr-1">↑ 5%</span> detection rate
            </p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-24 h-24 text-blue-500" />
          </div>
          <div className="relative z-10">
            <p className="text-slate-400 font-medium mb-1">Avg. Response Time</p>
            <h3 className="text-3xl font-bold text-white">0.8s</h3>
            <p className="text-blue-400 text-sm flex items-center mt-2">
              Using Spring Boot Cloud
            </p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-24 h-24 text-amber-500" />
          </div>
          <div className="relative z-10">
            <p className="text-slate-400 font-medium mb-1">Community Reports</p>
            <h3 className="text-3xl font-bold text-white">432</h3>
            <p className="text-amber-500 text-sm flex items-center mt-2">
               Active Contributors
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-6">Weekly Scan Volume</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockWeeklyData}>
                <defs>
                  <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Area type="monotone" dataKey="safe" stroke="#10b981" fillOpacity={1} fill="url(#colorSafe)" name="Safe Requests" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-6">Threat Detection Frequency</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockWeeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                />
                <Bar dataKey="threats" fill="#ef4444" name="Phishing Attacks" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Mini Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
            <h3 className="text-lg font-bold text-white">Recent System Activity</h3>
        </div>
        <div className="p-0">
            <table className="w-full text-left">
                <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase">
                    <tr>
                        <th className="px-6 py-4">URL</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Time</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {history.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                                No recent scans performed in this session.
                            </td>
                        </tr>
                    ) : (
                        history.slice(0, 5).map((item) => (
                            <tr key={item.id} className="hover:bg-slate-700/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="truncate max-w-xs text-slate-300">{item.url}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        item.status === ThreatLevel.SAFE ? 'bg-emerald-500/10 text-emerald-500' :
                                        item.status === ThreatLevel.PHISHING ? 'bg-red-500/10 text-red-500' :
                                        'bg-amber-500/10 text-amber-500'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-400 text-sm">
                                    {new Date(item.timestamp).toLocaleTimeString()}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};