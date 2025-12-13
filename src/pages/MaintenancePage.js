import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Server, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  Command, 
  Terminal,
  Cpu,
  Zap,
  Lock
} from 'lucide-react';

// --- Configuration & Data ---

// 1. Simplified system logs
const TERMINAL_LOGS = [
  "Connecting core data pipelines...",
  "Optimizing signal generation logic...",
  "Securing user portfolios...",
  "Improving chart rendering performance...",
  "Verifying system integrity checks...",
  "Refreshing internal analytics models...",
  "Running final stability tests...",
  "System ready for relaunch."
];

// 2. Confidence indicators (non-liability, static)
const CONFIDENCE_ITEMS = [
  "AI-driven signal engine",
  "Risk-first trade design",
  "No manual intervention",
  "Latency-optimized systems",
  "Capital protection focused"
];

// --- Sub-Components ---

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden perspective-1000 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute top-[-10%] left-[20%] w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" 
    />
    <motion.div 
      animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      className="absolute bottom-[-10%] right-[20%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" 
    />
  </div>
);

const SystemTerminal = () => {
  const [logs, setLogs] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < TERMINAL_LOGS.length) {
        setLogs(prev => [...prev, { id: Date.now(), text: TERMINAL_LOGS[currentIndex] }]);
        currentIndex++;
      } else {
        currentIndex = 0;
        setLogs([]);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-black/50 border border-slate-800 rounded-lg p-4 font-mono text-xs h-32 overflow-hidden flex flex-col relative">
      <div className="absolute top-2 right-2 flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {logs.map((log) => (
          <motion.div 
            key={log.id} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-slate-300 flex items-center gap-2"
          >
            <span className="text-blue-500">➜</span>
            {log.text}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

// --- Main Page ---

const MaintenancePage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0C15] text-slate-200 flex flex-col relative overflow-hidden">
      <GridBackground />

      {/* Navbar */}
      <div className="w-full border-b border-white/5 bg-black/20 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/scrybe-logo.ico" 
            alt="Scrybe Logo" 
            className="w-8 h-8 rounded-lg"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="font-semibold text-white text-lg">Scrybe AI</span>
        </div>

        {/* Confidence Indicators */}
        <div className="hidden md:flex gap-3 text-xs font-mono text-slate-400">
          {CONFIDENCE_ITEMS.map((item, i) => (
            <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-slate-900/40 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden">

          {/* Left */}
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 text-blue-400 font-mono text-xs">
                <Activity className="w-4 h-4 animate-pulse" />
                SYSTEM STATUS: MAINTENANCE
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Upgrading your trading experience
              </h1>
              <p className="text-slate-400 text-lg mb-8">
                We are performing system upgrades to improve speed, reliability, and signal quality. We will be back shortly.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-500 uppercase">
                <Terminal className="w-3 h-3" /> Live Progress
              </div>
              <SystemTerminal />
            </div>
          </div>

          {/* Right */}
          <div className="p-8 md:p-12 bg-white/[0.02] flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: Database, label: "Market Data", status: "Updating", color: "text-amber-400" },
                { icon: Cpu, label: "Analysis Engine", status: "Optimizing", color: "text-blue-400" },
                { icon: Lock, label: "Security", status: "Active", color: "text-emerald-400" },
                { icon: Server, label: "Servers", status: "Healthy", color: "text-emerald-400" }
              ].map((item, i) => (
                <div key={i} className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col gap-3">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <div>
                    <div className="text-sm font-medium text-slate-200">{item.label}</div>
                    <div className={`text-xs ${item.color} font-mono mt-1`}>● {item.status}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                Notify me when back online
              </h3>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">You're on the list</div>
                      <div className="text-xs opacity-80">We will notify you once we are live</div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form onSubmit={handleSubmit} className="relative">
                    <Command className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 text-white pl-11 pr-28 py-4 rounded-xl font-mono text-sm"
                    />
                    <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg text-sm">
                      Notify
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-slate-600 text-sm">
        © 2025 Scrybe AI. All rights reserved.
      </footer>
    </div>
  );
};

export default MaintenancePage;