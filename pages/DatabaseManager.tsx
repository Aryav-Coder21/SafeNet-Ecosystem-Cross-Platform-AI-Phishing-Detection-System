import React, { useState } from 'react';
import { ScanHistoryItem, User, CommunityReport } from '../types';
import { Database, Table, Terminal, RefreshCw, Search, Play, Server, HardDrive, CheckCircle2 } from 'lucide-react';

interface DatabaseManagerProps {
  users: User[];
  scanHistory: ScanHistoryItem[];
  reports: CommunityReport[]; // Pass mock reports if available, or we use internal mock
}

// Mock mock reports if not passed deeply (for demo robustness)
const MOCK_REPORTS: CommunityReport[] = [
  { id: '1', url: 'http://login-paypal-secure-update.com', reportedBy: 'cyber_ninja', timestamp: '2023-10-24T10:30:00Z', type: 'Phishing', status: 'Pending', notes: 'Credential harvester.' },
  { id: '2', url: 'http://free-iphone-15.xyz', reportedBy: 'alert_citizen', timestamp: '2023-10-24T09:15:00Z', type: 'Phishing', status: 'Verified', notes: 'Malware.' },
];

export const DatabaseManager: React.FC<DatabaseManagerProps> = ({ users, scanHistory, reports = MOCK_REPORTS }) => {
  const [activeTable, setActiveTable] = useState<'users' | 'scan_logs' | 'community_reports' | 'sql'>('users');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM users WHERE role = "admin";');
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);
  const [sqlError, setSqlError] = useState('');

  const runQuery = () => {
    setSqlError('');
    setSqlResult(null);

    const lowerQuery = sqlQuery.toLowerCase();
    
    // Very basic mock SQL parser for demonstration
    setTimeout(() => {
        if (lowerQuery.includes('users')) {
            setSqlResult(users);
        } else if (lowerQuery.includes('scan_logs') || lowerQuery.includes('history')) {
            setSqlResult(scanHistory);
        } else if (lowerQuery.includes('community') || lowerQuery.includes('reports')) {
            setSqlResult(reports);
        } else {
            setSqlError("Syntax Error: Table not found or command not supported in demo mode.");
        }
    }, 500);
  };

  const renderTable = () => {
    switch (activeTable) {
        case 'users':
            return (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-900 text-slate-400 text-xs uppercase font-mono">
                            <tr>
                                <th className="p-3 border border-slate-700">username (VARCHAR)</th>
                                <th className="p-3 border border-slate-700">role (ENUM)</th>
                                <th className="p-3 border border-slate-700">email (VARCHAR)</th>
                                <th className="p-3 border border-slate-700">password_hash (VARCHAR)</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono text-sm text-slate-300">
                            {users.map((u, i) => (
                                <tr key={i} className={`hover:bg-slate-700/50 ${i === users.length - 1 ? 'animate-pulse bg-emerald-500/10' : ''}`}>
                                    <td className="p-3 border border-slate-700">{u.username}</td>
                                    <td className="p-3 border border-slate-700">
                                        <span className={`px-2 py-0.5 rounded text-xs ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="p-3 border border-slate-700">{u.email || 'N/A'}</td>
                                    <td className="p-3 border border-slate-700 text-slate-600">
                                        {/* Mock hash simulation */}
                                        $2a$12${Math.random().toString(36).substring(2, 15)}...
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        case 'scan_logs':
            return (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-900 text-slate-400 text-xs uppercase font-mono">
                            <tr>
                                <th className="p-3 border border-slate-700">id (PK)</th>
                                <th className="p-3 border border-slate-700">url (TEXT)</th>
                                <th className="p-3 border border-slate-700">status (ENUM)</th>
                                <th className="p-3 border border-slate-700">confidence (INT)</th>
                                <th className="p-3 border border-slate-700">timestamp (DATETIME)</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono text-sm text-slate-300">
                            {scanHistory.map((s) => (
                                <tr key={s.id} className="hover:bg-slate-700/50">
                                    <td className="p-3 border border-slate-700 text-slate-500">{s.id}</td>
                                    <td className="p-3 border border-slate-700 max-w-xs truncate">{s.url}</td>
                                    <td className="p-3 border border-slate-700">
                                        <span className={`px-2 py-0.5 rounded text-xs ${
                                            s.status === 'SAFE' ? 'text-emerald-400' : 
                                            s.status === 'PHISHING' ? 'text-red-400' : 'text-amber-400'
                                        }`}>{s.status}</span>
                                    </td>
                                    <td className="p-3 border border-slate-700">{s.confidence}</td>
                                    <td className="p-3 border border-slate-700">{new Date(s.timestamp).toISOString().split('T')[0]}</td>
                                </tr>
                            ))}
                            {scanHistory.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-slate-500">No records found</td></tr>}
                        </tbody>
                    </table>
                </div>
            );
         case 'community_reports':
            return (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-900 text-slate-400 text-xs uppercase font-mono">
                            <tr>
                                <th className="p-3 border border-slate-700">id (PK)</th>
                                <th className="p-3 border border-slate-700">url (TEXT)</th>
                                <th className="p-3 border border-slate-700">reported_by (FK)</th>
                                <th className="p-3 border border-slate-700">status (ENUM)</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono text-sm text-slate-300">
                            {reports.map((r) => (
                                <tr key={r.id} className="hover:bg-slate-700/50">
                                    <td className="p-3 border border-slate-700 text-slate-500">{r.id}</td>
                                    <td className="p-3 border border-slate-700 max-w-xs truncate">{r.url}</td>
                                    <td className="p-3 border border-slate-700">{r.reportedBy}</td>
                                    <td className="p-3 border border-slate-700">{r.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        default:
            return null;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in-up flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
             <Database className="w-8 h-8 text-blue-500" />
             Database Manager
          </h2>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-mono mt-1">
             <Server className="w-3 h-3" />
             <span>Connection:</span>
             <span className="text-emerald-500 flex items-center gap-1">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 mysql://localhost:3306/safenet_prod
             </span>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="px-3 py-2 bg-slate-800 text-slate-300 rounded border border-slate-700 flex items-center gap-2 hover:bg-slate-700 transition-colors">
                <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button className="px-3 py-2 bg-slate-800 text-slate-300 rounded border border-slate-700 flex items-center gap-2 hover:bg-slate-700 transition-colors">
                <HardDrive className="w-4 h-4" /> Export SQL Dump
            </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Sidebar Tables List */}
        <div className="w-64 bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden shrink-0">
            <div className="p-4 border-b border-slate-700 bg-slate-900/30">
                <h3 className="text-xs font-bold text-slate-500 uppercase">Schema: safenet_prod</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                <button 
                    onClick={() => setActiveTable('users')}
                    className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 font-mono text-sm transition-colors ${activeTable === 'users' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                >
                    <Table className="w-4 h-4" /> users
                    {users.length > 2 && <span className="ml-auto text-xs bg-emerald-500 text-white px-1.5 rounded-full">{users.length}</span>}
                </button>
                <button 
                    onClick={() => setActiveTable('scan_logs')}
                    className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 font-mono text-sm transition-colors ${activeTable === 'scan_logs' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                >
                    <Table className="w-4 h-4" /> scan_logs
                </button>
                <button 
                    onClick={() => setActiveTable('community_reports')}
                    className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 font-mono text-sm transition-colors ${activeTable === 'community_reports' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                >
                    <Table className="w-4 h-4" /> community_reports
                </button>
                <div className="border-t border-slate-700 my-2 pt-2">
                     <button 
                        onClick={() => setActiveTable('sql')}
                        className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 font-mono text-sm transition-colors ${activeTable === 'sql' ? 'bg-amber-600 text-white' : 'text-amber-500 hover:bg-slate-700'}`}
                    >
                        <Terminal className="w-4 h-4" /> SQL Console
                    </button>
                </div>
            </div>
        </div>

        {/* Main View */}
        <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
            {activeTable === 'sql' ? (
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-slate-700 bg-slate-900">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">SQL Query Editor</label>
                        <div className="relative">
                            <textarea
                                value={sqlQuery}
                                onChange={(e) => setSqlQuery(e.target.value)}
                                className="w-full h-32 bg-black border border-slate-700 rounded p-4 font-mono text-emerald-400 text-sm focus:outline-none focus:border-emerald-500"
                                spellCheck={false}
                            />
                            <button 
                                onClick={runQuery}
                                className="absolute bottom-4 right-4 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 transition-colors"
                            >
                                <Play className="w-3 h-3" /> Run
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 p-4 bg-slate-900/50 overflow-auto font-mono text-sm">
                        {sqlError ? (
                            <div className="text-red-400 flex items-center gap-2">
                                <Search className="w-4 h-4" /> {sqlError}
                            </div>
                        ) : sqlResult ? (
                            <div>
                                <div className="text-emerald-400 mb-2">Query OK, {sqlResult.length} rows affected (0.02 sec)</div>
                                <pre className="text-slate-300 whitespace-pre-wrap">{JSON.stringify(sqlResult, null, 2)}</pre>
                            </div>
                        ) : (
                            <div className="text-slate-500 italic">Waiting for query execution...</div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                             <Table className="w-4 h-4 text-slate-400" />
                             <span className="font-mono text-white font-bold">{activeTable}</span>
                             <span className="text-slate-500 text-sm">
                                 ({activeTable === 'users' ? users.length : activeTable === 'scan_logs' ? scanHistory.length : reports.length} rows)
                             </span>
                        </div>
                        {activeTable === 'users' && (
                             <div className="text-xs text-slate-400 flex items-center gap-1">
                                 <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                 Live Sync Active
                             </div>
                        )}
                    </div>
                    <div className="flex-1 overflow-auto">
                        {renderTable()}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};