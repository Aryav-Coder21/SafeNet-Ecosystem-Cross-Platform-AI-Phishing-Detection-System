import React, { useState } from 'react';
import { Smartphone, Monitor, Apple, QrCode, CheckCircle, Shield, Globe, Download as DownloadIcon, Loader2 } from 'lucide-react';

export const Downloads: React.FC = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (platform: string, filename: string) => {
    setDownloading(platform);
    
    // Simulate server preparation delay
    setTimeout(() => {
        // Create a dummy file to download
        const dummyContent = `SafeNet Installer for ${platform}\nVersion: 2.5.0\n\nThis is a simulated installer file for the project demonstration.\nIn a real deployment, this would be the compiled binary.`;
        const blob = new Blob([dummyContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setDownloading(null);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Protect Every Device</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          SafeNet uses a centralized Java Spring Boot cloud architecture. 
          Install our lightweight clients on your Desktop and Mobile devices to get real-time protection 
          powered by our heavy-lifting AI backend.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Desktop Client Card */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Monitor className="w-32 h-32 text-blue-500" />
          </div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                <Monitor className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">SafeNet for Desktop</h3>
            <p className="text-slate-400 mb-6">
                Native JavaFX Application. Monitors your clipboard and scans bulk files.
                Runs on Windows, macOS, and Linux.
            </p>

            <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Clipboard Monitoring
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Bulk URL Scanner (.txt support)
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Real-time Desktop Notifications
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button 
                    onClick={() => handleDownload('Windows', 'SafeNet_Setup_x64.exe')}
                    disabled={downloading === 'Windows'}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                    {downloading === 'Windows' ? <Loader2 className="w-5 h-5 animate-spin"/> : <DownloadIcon className="w-5 h-5"/>}
                    {downloading === 'Windows' ? 'Starting Download...' : 'Download for Windows (.exe)'}
                </button>
                <div className="flex gap-3">
                    <button 
                        onClick={() => handleDownload('MacOS', 'SafeNet_Installer.dmg')}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-all"
                    >
                        <Apple className="w-4 h-4" /> macOS
                    </button>
                    <button 
                         onClick={() => handleDownload('Linux', 'SafeNet_Linux.tar.gz')}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-all"
                    >
                        <Globe className="w-4 h-4" /> Linux
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Mobile App Card */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Smartphone className="w-32 h-32 text-emerald-500" />
          </div>
          
          <div className="relative z-10">
             <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">SafeNet Mobile</h3>
            <p className="text-slate-400 mb-6">
                Native Android Application. Integrates with "Share" menu and QR Code scanner.
                Protect your phone on the go.
            </p>

            <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Deep Integration (Share to Scan)
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> QR Code Safety Check
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Low Battery Usage (Cloud API)
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
                <button 
                    onClick={() => handleDownload('Android APK', 'SafeNet_Mobile_v1.0.apk')}
                    disabled={downloading === 'Android APK'}
                    className="flex-1 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                    {downloading === 'Android APK' ? <Loader2 className="w-5 h-5 animate-spin"/> : <DownloadIcon className="w-5 h-5"/>}
                    {downloading === 'Android APK' ? 'Downloading...' : 'Download APK (v1.0)'}
                </button>
                
                {/* Mock QR Code */}
                <div className="bg-white p-2 rounded-lg shrink-0 group-hover:scale-105 transition-transform cursor-pointer" title="Scan to Install">
                    <QrCode className="w-16 h-16 text-slate-900" />
                </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center sm:text-left">
                Scan QR to install directly on device.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 flex items-start gap-4">
        <Shield className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
        <div>
            <h4 className="text-lg font-bold text-white">Installation Verification</h4>
            <p className="text-slate-300 text-sm mt-1">
                The download buttons above are fully functional for this demo. They will generate and download a dummy 
                installer file to your system to demonstrate the distribution workflow of the SafeNet Ecosystem.
            </p>
        </div>
      </div>
    </div>
  );
};