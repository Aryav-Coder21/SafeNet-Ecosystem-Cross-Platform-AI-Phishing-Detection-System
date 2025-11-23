import React, { useState } from 'react';
import { CommunityReport, User } from '../types';
import { AlertTriangle, Check, X, ExternalLink, Filter, PlusCircle } from 'lucide-react';

interface CommunityReportsProps {
  user: User;
}

const MOCK_REPORTS: CommunityReport[] = [
  { id: '1', url: 'http://login-paypal-secure-update.com', reportedBy: 'cyber_ninja', timestamp: '2023-10-24T10:30:00Z', type: 'Phishing', status: 'Pending', notes: 'Looks like a classic credential harvester.' },
  { id: '2', url: 'http://free-iphone-15-giveaway.xyz', reportedBy: 'alert_citizen', timestamp: '2023-10-24T09:15:00Z', type: 'Phishing', status: 'Verified', notes: 'Redirects to malware download.' },
  { id: '3', url: 'http://my-bank-verification.net', reportedBy: 'anon_user_22', timestamp: '2023-10-23T18:45:00Z', type: 'Phishing', status: 'Rejected', notes: 'False positive, domain is parked.' },
  { id: '4', url: 'http://company-internal-portal.com.evil.com', reportedBy: 'sec_analyst', timestamp: '2023-10-23T14:20:00Z', type: 'Phishing', status: 'Pending', notes: 'Subdomain takeover attempt.' },
];

export const CommunityReports: React.FC<CommunityReportsProps> = ({ user }) => {
  const [reports, setReports] = useState<CommunityReport[]>(MOCK_REPORTS);
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState<'Phishing' | 'Malware'>('Phishing');
  const [showForm, setShowForm] = useState(false);

  const isAdmin = user.role === 'admin';

  const handleAction = (id: string, action: 'Verified' | 'Rejected') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: CommunityReport = {
      id: Math.random().toString(36).substr(2, 9),
      url: newUrl,
      reportedBy: user.username,
      timestamp: new Date().toISOString(),
      type: newType,
      status: 'Pending',
      notes: 'User submitted report via Web Portal'
    };
    setReports([newReport, ...reports]);
    setNewUrl('');
    setShowForm(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Community Intelligence</h2>
          <p className="text-slate-400">Crowdsourced threat reporting and verification.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Report Suspicious URL
        </button>
      </div>

      {/* Report Form */}
      {showForm && (
        <div className="mb-8 bg-slate-800 border border-slate-700 p-6 rounded-xl animate-in slide-in-from-top-4">
          <h3 className="text-lg font-bold text-white mb-4">Submit New Threat</h3>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="http://suspicious-link.com" 
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select 
              value={newType}
              onChange={(e) => setNewType(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Phishing">Phishing</option>
              <option value="Malware">Malware</option>
            </select>
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium">
              Submit Report
            </button>
          </form>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="text-2xl font-bold text-white">{reports.filter(r => r.status === 'Pending').length}</div>
          <div className="text-xs text-slate-400 uppercase font-bold">Pending Review</div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="text-2xl font-bold text-emerald-500">{reports.filter(r => r.status === 'Verified').length}</div>
          <div className="text-xs text-slate-400 uppercase font-bold">Verified Threats</div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
           <div className="text-2xl font-bold text-white">{reports.length}</div>
           <div className="text-xs text-slate-400 uppercase font-bold">Total Reports</div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center gap-2 bg-slate-900/30">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-bold text-slate-300 uppercase">Recent Submissions</span>
        </div>
        <div className="divide-y divide-slate-700">
          {reports.map((report) => (
            <div key={report.id} className="p-4 hover:bg-slate-700/30 transition-colors flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="shrink-0 pt-1 md:pt-0">
                <div className={`p-2 rounded-full ${
                  report.type === 'Phishing' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'
                }`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-mono text-sm text-white truncate">{report.url}</h4>
                  <a href="#" className="text-slate-500 hover:text-blue-400"><ExternalLink className="w-3 h-3" /></a>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>By: <span className="text-slate-300">{report.reportedBy}</span></span>
                  <span>•</span>
                  <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    report.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' :
                    report.status === 'Rejected' ? 'bg-slate-600/50 text-slate-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>{report.status}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{report.notes}</p>
              </div>
              
              {isAdmin && report.status === 'Pending' && (
                <div className="flex gap-2 shrink-0">
                   <button 
                     onClick={() => handleAction(report.id, 'Verified')}
                     className="p-2 bg-emerald-600/20 text-emerald-500 hover:bg-emerald-600 hover:text-white rounded transition-colors" title="Verify Threat"
                   >
                     <Check className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => handleAction(report.id, 'Rejected')}
                     className="p-2 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded transition-colors" title="Reject Report"
                   >
                     <X className="w-4 h-4" />
                   </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};