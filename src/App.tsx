import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Zap, 
  Globe, 
  Code, 
  CheckCircle2, 
  Terminal, 
  Database,
  ArrowRight
} from 'lucide-react';

// --- UI Components ---

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
    active 
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
      : 'bg-slate-800 text-slate-300 border-slate-700'
  }`}>
    {children}
  </span>
);

// --- Main Application ---

export default function App() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'online' | 'error'>('loading');
  const [metrics, setMetrics] = useState({
    latency: 0,
    colo: 'Loading...',
    requests: 0,
  });

  // Simulate connecting to the Hono Edge Backend
  useEffect(() => {
    const fetchEdgeStatus = async () => {
      setApiStatus('loading');
      const start = performance.now();
      
      try {
        // In a real environment, this fetches from the Hono API:
        // const res = await fetch('/api/health');
        // const data = await res.json();
        
        // Simulating the Cloudflare Worker response latency
        await new Promise(resolve => setTimeout(resolve, 45)); 
        const end = performance.now();

        setMetrics(prev => ({
          latency: Math.round(end - start),
          colo: ['SJC', 'FRA', 'SIN', 'IAD', 'LHR'][Math.floor(Math.random() * 5)], // Random CF colo
          requests: prev.requests + 1,
        }));
        setApiStatus('online');
      } catch (error) {
        setApiStatus('error');
      }
    };

    fetchEdgeStatus();
    const interval = setInterval(fetchEdgeStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-orange-500/30">
      
      {/* Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-1.5 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Edge<span className="text-orange-500">Stack</span></span>
          </div>
          <div className="flex items-center space-x-4 text-sm font-medium">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Architecture</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge active={apiStatus === 'online'}>
            {apiStatus === 'online' ? (
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Edge API Online
              </span>
            ) : (
              'Connecting to Edge...'
            )}
          </Badge>
          <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Full-Stack React on the <br/> Cloudflare Edge.
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            A production-ready starter template combining the power of <strong className="text-slate-200">Vite</strong>, <strong className="text-slate-200">React</strong>, and <strong className="text-slate-200">Tailwind CSS</strong>, served seamlessly alongside a <strong className="text-orange-400">Hono</strong> backend on Cloudflare Workers.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 group shadow-lg shadow-orange-500/20">
              <Terminal className="w-4 h-4" />
              Initialize Project
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2">
              View `wrangler.toml`
            </button>
          </div>
        </div>

        {/* Status Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="flex items-center gap-4 group hover:border-orange-500/30 transition-colors">
            <div className="p-3 bg-slate-800 rounded-xl text-orange-400 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Edge Location</p>
              <p className="text-2xl font-bold">{metrics.colo}</p>
            </div>
          </Card>
          
          <Card className="flex items-center gap-4 group hover:border-cyan-500/30 transition-colors">
            <div className="p-3 bg-slate-800 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">API Latency (TTFB)</p>
              <p className="text-2xl font-bold flex items-baseline gap-1">
                {metrics.latency} <span className="text-sm font-normal text-slate-500">ms</span>
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 group hover:border-purple-500/30 transition-colors">
            <div className="p-3 bg-slate-800 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Runtime Compat</p>
              <p className="text-2xl font-bold flex items-center gap-2">
                Node.js <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </p>
            </div>
          </Card>
        </div>

        {/* Technical Architecture Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Architecture Highlights</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <Code className="w-6 h-6 text-orange-400 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-200">Vite + Cloudflare Plugin</h4>
                  <p className="text-sm text-slate-400 mt-1">Native integration via `@cloudflare/vite-plugin`. Zero complex proxy configurations. Hot Module Replacement (HMR) works perfectly alongside your Worker.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <Zap className="w-6 h-6 text-yellow-400 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-200">Hono Edge Router</h4>
                  <p className="text-sm text-slate-400 mt-1">Lightweight, ultrafast routing framework built explicitly for the Edge. Supports strict TypeScript interfaces for Cloudflare environment variables.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <Database className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-200">D1 & KV Ready</h4>
                  <p className="text-sm text-slate-400 mt-1">Pre-configured type definitions for Cloudflare's serverless SQLite (D1) and low-latency key-value store (KV). Smart placement enabled by default.</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
              <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Server Response
              </h3>
              <Badge active>Live</Badge>
            </div>
            <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-emerald-400 overflow-x-auto flex-1 border border-slate-800">
              <pre>
                {`{
  "status": "operational",
  "region": "${metrics.colo}",
  "timestamp": "${new Date().toISOString()}",
  "node_compat_test": "RWRnZSBBY3RpdmU=",
  "latency_metrics": {
    "ttfb": "${metrics.latency}ms",
    "smart_placement": true
  },
  "frameworks": [
    "Hono",
    "React",
    "Vite",
    "TailwindCSS"
  ]
}`}
              </pre>
            </div>
            <a href="#" className="mt-4 flex items-center justify-center gap-2 text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors">
              View Full API Documentation <ArrowRight className="w-4 h-4" />
            </a>
          </Card>
        </div>
      </main>
    </div>
  );
}