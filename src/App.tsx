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
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

// --- UI Components ---

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl ${className}`}>
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        await new Promise(resolve => setTimeout(resolve, 45)); 
        const end = performance.now();

        setMetrics(prev => ({
          latency: Math.round(end - start),
          colo: ['SJC', 'FRA', 'SIN', 'IAD', 'LHR'][Math.floor(Math.random() * 5)], 
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
        <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[50%] sm:w-[50%] bg-orange-600/10 blur-[100px] sm:blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[70%] h-[50%] sm:w-[50%] bg-cyan-600/10 blur-[100px] sm:blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-1.5 rounded-lg shadow-lg shadow-orange-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Edge<span className="text-orange-500">Stack</span></span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Architecture</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
            <div className="flex flex-col px-4 py-4 space-y-4 text-sm font-medium">
              <a href="#" className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">Documentation</a>
              <a href="#" className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">Architecture</a>
              <a href="#" className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">GitHub</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
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
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 pb-2">
            Full-Stack React on the <br className="hidden sm:block"/> Cloudflare Edge.
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A production-ready starter template combining the power of <strong className="text-slate-200">Vite</strong>, <strong className="text-slate-200">React</strong>, and <strong className="text-slate-200">Tailwind CSS</strong>, served seamlessly alongside a <strong className="text-orange-400">Hono</strong> backend.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 group shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40">
              <Terminal className="w-4 h-4" />
              Initialize Project
            </button>
            <button className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700 backdrop-blur-sm text-white border border-slate-700 px-8 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
              View `wrangler.toml`
            </button>
          </div>
        </div>

        {/* Status Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <Card className="flex items-center gap-4 group hover:border-orange-500/30 hover:bg-slate-800/50 transition-all">
            <div className="p-3 sm:p-4 bg-slate-950 rounded-xl text-orange-400 group-hover:scale-110 transition-transform shadow-inner">
              <Globe className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">Edge Location</p>
              <p className="text-2xl sm:text-3xl font-bold mt-0.5">{metrics.colo}</p>
            </div>
          </Card>
          
          <Card className="flex items-center gap-4 group hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all">
            <div className="p-3 sm:p-4 bg-slate-950 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform shadow-inner">
              <Activity className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">API Latency</p>
              <p className="text-2xl sm:text-3xl font-bold flex items-baseline gap-1 mt-0.5">
                {metrics.latency} <span className="text-sm sm:text-base font-normal text-slate-500">ms</span>
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 group hover:border-purple-500/30 hover:bg-slate-800/50 transition-all sm:col-span-2 lg:col-span-1">
            <div className="p-3 sm:p-4 bg-slate-950 rounded-xl text-purple-400 group-hover:scale-110 transition-transform shadow-inner">
              <Server className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">Runtime Compat</p>
              <p className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mt-0.5">
                Node.js <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
              </p>
            </div>
          </Card>
        </div>

        {/* Technical Architecture Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Architecture Highlights</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:bg-slate-800/60 transition-colors">
                <Code className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-200">Vite + Cloudflare Plugin</h4>
                  <p className="text-sm sm:text-base text-slate-400 mt-1.5 leading-relaxed">Native integration via `@cloudflare/vite-plugin`. Zero complex proxy configurations. Hot Module Replacement (HMR) works perfectly alongside your Worker.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:bg-slate-800/60 transition-colors">
                <Zap className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-200">Hono Edge Router</h4>
                  <p className="text-sm sm:text-base text-slate-400 mt-1.5 leading-relaxed">Lightweight, ultrafast routing framework built explicitly for the Edge. Supports strict TypeScript interfaces for Cloudflare environment variables.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:bg-slate-800/60 transition-colors">
                <Database className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-200">D1 & KV Ready</h4>
                  <p className="text-sm sm:text-base text-slate-400 mt-1.5 leading-relaxed">Pre-configured type definitions for Cloudflare's serverless SQLite (D1) and low-latency key-value store (KV). Smart placement enabled by default.</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="lg:col-span-7 flex flex-col h-full bg-slate-950">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
              <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-400" /> Server Response
              </h3>
              <Badge active>Live Edge Connection</Badge>
            </div>
            <div className="bg-[#0D1117] p-4 sm:p-6 rounded-xl font-mono text-xs sm:text-sm text-emerald-400/90 overflow-x-auto flex-1 border border-slate-800/50 shadow-inner custom-scrollbar">
              <pre className="whitespace-pre-wrap sm:whitespace-pre">
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
            <a href="#" className="mt-5 flex items-center justify-center gap-2 text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors p-2 hover:bg-orange-400/10 rounded-lg">
              View Full API Documentation <ArrowRight className="w-4 h-4" />
            </a>
          </Card>
        </div>
      </main>
    </div>
  );
}
