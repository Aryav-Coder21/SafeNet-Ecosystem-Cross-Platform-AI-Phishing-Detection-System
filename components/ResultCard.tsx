import React from 'react';
import { AnalysisResult, ThreatLevel } from '../types';
import { CheckCircle, AlertTriangle, XCircle, Activity, Globe, MapPin, Server } from 'lucide-react';

interface ResultCardProps {
  result: AnalysisResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const isSafe = result.status === ThreatLevel.SAFE;
  const isSuspicious = result.status === ThreatLevel.SUSPICIOUS;
  
  let colorClass = 'text-red-500';
  let bgClass = 'bg-red-500/10 border-red-500/20';
  let Icon = XCircle;

  if (isSafe) {
    colorClass = 'text-emerald-500';
    bgClass = 'bg-emerald-500/10 border-emerald-500/20';
    Icon = CheckCircle;
  } else if (isSuspicious) {
    colorClass = 'text-amber-500';
    bgClass = 'bg-amber-500/10 border-amber-500/20';
    Icon = AlertTriangle;
  }

  return (
    <div className="mt-8 animate-fade-in-up">
      <div className={`rounded-xl border ${bgClass} p-6 mb-6`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${isSafe ? 'bg-emerald-500/20' : isSuspicious ? 'bg-amber-500/20' : 'bg-red-500/20'}`}>
              <Icon className={`w-8 h-8 ${colorClass}`} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${colorClass}`}>{result.status}</h2>
              <p className="text-slate-400 mt-1">
                Analysis completed with <span className="font-mono text-slate-200">{result.confidence}%</span> confidence.
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Threat Level</span>
            <div className={`text-xl font-bold mt-1 ${colorClass}`}>{result.threatLevelLabel}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Target URL</span>
            </div>
            <p className="font-mono text-sm break-all text-slate-200 truncate" title={result.url}>{result.url}</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Server className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Server IP</span>
            </div>
            <p className="font-mono text-sm text-slate-200">{result.ipAddress}</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Location</span>
            </div>
            <p className="font-mono text-sm text-slate-200">{result.serverLocation}</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-slate-200">Technical Analysis Report</h3>
          </div>
        </div>
        <div className="p-6">
          <ul className="space-y-3">
            {result.reasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
