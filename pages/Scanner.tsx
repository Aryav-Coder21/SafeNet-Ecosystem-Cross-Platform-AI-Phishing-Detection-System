import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { scanUrl } from '../services/geminiService';
import { AnalysisResult } from '../types';
import { ResultCard } from '../components/ResultCard';

interface ScannerProps {
  addToHistory: (result: AnalysisResult) => void;
}

export const Scanner: React.FC<ScannerProps> = ({ addToHistory }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);

    try {
      const scanResult = await scanUrl(url);
      setResult(scanResult);
      addToHistory(scanResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-10 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">SafeNet URL Scanner</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Enter a suspicious URL below. Our AI engine will analyze lexical features, 
          host reputation, and known patterns to detect zero-day phishing attacks.
        </p>
      </div>

      <form onSubmit={handleScan} className="relative max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-500" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., http://secure-bank-login.com"
            className="block w-full pl-12 pr-32 py-4 bg-slate-800 border border-slate-700 rounded-xl text-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-2xl transition-all"
          />
          <div className="absolute inset-y-2 right-2">
            <button
              type="submit"
              disabled={loading || !url}
              className="h-full px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Scan Now'
              )}
            </button>
          </div>
        </div>
      </form>

      {result && <ResultCard result={result} />}
      
      {!result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 opacity-50">
             {/* Decorative placeholder content */}
             <div className="p-6 border border-dashed border-slate-700 rounded-xl text-center">
                <div className="h-2 w-20 bg-slate-700 mx-auto rounded mb-4"></div>
                <div className="h-2 w-32 bg-slate-800 mx-auto rounded"></div>
             </div>
             <div className="p-6 border border-dashed border-slate-700 rounded-xl text-center">
                <div className="h-2 w-20 bg-slate-700 mx-auto rounded mb-4"></div>
                <div className="h-2 w-32 bg-slate-800 mx-auto rounded"></div>
             </div>
             <div className="p-6 border border-dashed border-slate-700 rounded-xl text-center">
                <div className="h-2 w-20 bg-slate-700 mx-auto rounded mb-4"></div>
                <div className="h-2 w-32 bg-slate-800 mx-auto rounded"></div>
             </div>
        </div>
      )}
    </div>
  );
};
