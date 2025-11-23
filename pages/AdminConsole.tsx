import React, { useState, useEffect } from 'react';
import { ScanHistoryItem, ThreatLevel } from '../types';
import { Cpu, Save, Download, Mail, CheckCircle, Play, FileText, Database, AlertCircle } from 'lucide-react';

interface AdminConsoleProps {
  scanHistory: ScanHistoryItem[];
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({ scanHistory }) => {
  // Training State
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [modelVersion, setModelVersion] = useState("v2.4.1");
  const [lastTrained, setLastTrained] = useState("Oct 24, 2023");

  // Reporting State
  const [reportGenerating, setReportGenerating] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  const startTraining = () => {
    setIsTraining(true);
    setProgress(0);
    setLogs(["Initializing Weka Environment...", "Loading Dataset (UCI Phishing)..."]);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
            setIsTraining(false);
            setModelVersion("v2.5.0-beta");
            setLastTrained(new Date().toLocaleDateString());
            setLogs(prev => [...prev, "Training Complete. Model Saved.", "Reloading API Context... Done."]);
        }, 1000);
      }
      
      setProgress(currentProgress);
      
      // Simulate logs based on progress
      if (currentProgress > 20 && currentProgress < 30) setLogs(prev => [...prev, "Preprocessing Features: URL_Length, HTTPS_Token..."]);
      if (currentProgress > 45 && currentProgress < 55) setLogs(prev => [...prev, "Building Random Forest Trees (100 iterations)..."]);
      if (currentProgress > 70 && currentProgress < 80) setLogs(prev => [...prev, "Validating Accuracy: 98.4%..."]);

    }, 800);
  };

  const handleExportSafeSites = () => {
    setReportGenerating(true);
    const safeSites = scanHistory.filter(item => item.status === ThreatLevel.SAFE);
    
    // Simulate generation delay
    setTimeout(() => {
        // Create CSV content
        const csvContent = "data:text/csv;charset=utf-8," 
            + "ID,URL,Confidence,Date\n"
            + safeSites.map(s => `${s.id},${s.url},${s.confidence}%,${s.timestamp}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "safe_sites_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setReportGenerating(false);
    }, 1500);
  };

  const handleEmailReport = () => {
    setReportGenerating(true);
    setTimeout(() => {
        setReportGenerating(false);
        setReportSent(true);
        setTimeout(() => setReportSent(false), 3000);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in-up space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Admin Console</h2>
        <p className="text-slate-400">Manage Machine Learning models and generate system reports.</p>
      </div>

      {/* Model Training Section */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Cpu className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Model Retraining Hub</h3>
                    <p className="text-xs text-slate-400">Current Version: <span className="text-mono text-emerald-400">{modelVersion}</span></p>
                </div>
            </div>
            <div className="text-right text-xs text-slate-500">
                Last Trained: {lastTrained}
            </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <p className="text-sm text-slate-300">
                    Initiate a retraining sequence using the latest dataset entries. 
                    This process uses the Random Forest algorithm via Weka API.
                </p>
                
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                         <span className="text-xs font-bold text-slate-500 uppercase">Training Dataset</span>
                         <span className="text-xs text-emerald-500 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Ready</span>
                    </div>
                    <div className="flex items-center gap-3 text-white mb-1">
                        <Database className="w-5 h-5 text-blue-400" />
                        <span className="font-mono text-sm">UCI_Phishing_Extended.arff</span>
                    </div>
                    <div className="text-xs text-slate-500 ml-8">14,500 Instances • 32 Attributes</div>
                </div>

                <button 
                    onClick={startTraining}
                    disabled={isTraining}
                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                        isTraining 
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-600/20'
                    }`}
                >
                    {isTraining ? <Cpu className="w-5 h-5 animate-spin"/> : <Play className="w-5 h-5" />}
                    {isTraining ? 'Training in Progress...' : 'Start Retraining Sequence'}
                </button>
            </div>

            {/* Terminal / Logs */}
            <div className="bg-black/50 rounded-lg border border-slate-700 p-4 font-mono text-xs h-64 overflow-y-auto flex flex-col">
                <div className="text-slate-500 mb-2 border-b border-slate-800 pb-2">System Logs output...</div>
                <div className="flex-1 space-y-1">
                    {logs.map((log, idx) => (
                        <div key={idx} className="text-emerald-500/80">
                            <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                            {log}
                        </div>
                    ))}
                    {isTraining && (
                        <div className="text-blue-400 animate-pulse">_ Processing...</div>
                    )}
                </div>
                {isTraining && (
                    <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-emerald-500" />
                <h3 className="text-lg font-bold text-white">Safe Sites Report</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
                Extract a CSV report of all URLs classified as "SAFE" within the current session. 
                Useful for whitelisting.
            </p>
            <button 
                onClick={handleExportSafeSites}
                disabled={reportGenerating}
                className="w-full border border-slate-600 hover:bg-slate-700 text-slate-200 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
                {reportGenerating ? <Cpu className="w-4 h-4 animate-spin"/> : <Download className="w-4 h-4" />}
                Download CSV
            </button>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-amber-500" />
                <h3 className="text-lg font-bold text-white">Email Daily Summary</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
                Send a summary of blocked threats and community reports to the administrator email on file.
            </p>
            <button 
                onClick={handleEmailReport}
                disabled={reportGenerating}
                className="w-full border border-slate-600 hover:bg-slate-700 text-slate-200 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors relative"
            >
                {reportSent ? (
                    <span className="text-emerald-400 flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Sent!</span>
                ) : (
                    <>
                        <Mail className="w-4 h-4" /> Send to Admin
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};
