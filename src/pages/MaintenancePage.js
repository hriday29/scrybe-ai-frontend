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

// 1. Simplified, India-focused logs (Easy to understand)
const TERMINAL_LOGS = [
  "Connecting to NSE & BSE data feeds...",
  "Refreshing real-time NIFTY 50 prices...",
  "Securing user portfolios and watchlists...",
  "Optimizing chart loading speeds...",
  "Verifying UPI payment gateways...",
  "Updating daily market reports...",
  "Running final security checks...",
  "System is 99% ready for launch...",
];

// 2. India-Specific Market Ticker
const MARKET_TICKER = [
  { pair: "NIFTY 50", val: "24,130.50", change: "+0.8%", dir: 1 },
  { pair: "SENSEX", val: "79,890.10", change: "+0.7%", dir: 1 },
  { pair: "BANKNIFTY", val: "51,420.00", change: "-0.2%", dir: -1 },
  { pair: "USD/INR", val: "83.95", change: "+0.05%", dir: 1 },
  { pair: "RELIANCE", val: "2,980.25", change: "+1.1%", dir: 1 },
  { pair: "HDFCBANK", val: "1,650.00", change: "-0.4%", dir: -1 },
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
    }, 1800); // Slightly slower for readability
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-black/50 border border-slate-800 rounded-lg p-4 font-mono text-xs h-32 overflow-hidden flex flex-col relative group">
      <div className="absolute top-2 right-2 flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
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

// --- Main Page Component ---

const MaintenancePage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.current = clientX - left;
    mouseY.current = clientY - top;
    currentTarget.style.setProperty("--mouse-x", `${mouseX.current}px`);
    currentTarget.style.setProperty("--mouse-y", `${mouseY.current}px`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0C15] text-slate-200 font-sans selection:bg-blue-500/30 flex flex-col relative overflow-hidden">
      
      <GridBackground />
      
      {/* Navbar */}
      <div className="w-full border-b border-white/5 bg-black/20 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Public Logo Usage */}
          <img 
            src="/scrybe-logo.ico" 
            alt="Scrybe Logo" 
            className="w-8 h-8 rounded-lg shadow-lg shadow-blue-900/20"
            onError={(e) => { e.target.style.display = 'none'; }} // Hide if missing
          />
          <span className="font-semibold tracking-tight text-white text-lg">Scrybe AI</span>
        </div>
        
        {/* Market Ticker */}
        <div className="hidden md:flex gap-6 text-xs font-mono opacity-60">
          {MARKET_TICKER.map((t, i) => (
            <div key={i} className="flex gap-2">
              <span>{t.pair}</span>
              <span className={t.dir > 0 ? "text-emerald-400" : "text-rose-400"}>{t.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div 
          onMouseMove={handleMouseMove}
          className="group relative max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-slate-900/40 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden"
          style={{ "--mouse-x": "0px", "--mouse-y": "0px" }}
        >
          {/* Spotlight Effect */}
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none inset-0 z-0 bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(59,130,246,0.15),transparent_40%)]" />

          {/* Left Column */}
          <div className="relative p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 text-blue-400 font-mono text-xs">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>SYSTEM STATUS: MAINTENANCE</span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
              >
                Upgrading your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">trading experience</span>.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-lg leading-relaxed mb-8"
              >
                We are currently updating Scrybe AI to provide faster data and better data for you. We will be back shortly.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
               <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-500 uppercase">
                  <Terminal className="w-3 h-3" /> Live Progress
               </div>
               <SystemTerminal />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="relative p-8 md:p-12 bg-white/[0.02] flex flex-col justify-center">
            
            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
               {[
                 { icon: Database, label: "Market Data", status: "Updating", color: "text-amber-400" },
                 { icon: Cpu, label: "Analysis Engine", status: "Optimizing", color: "text-blue-400" },
                 { icon: Lock, label: "Security", status: "Active", color: "text-emerald-400" },
                 { icon: Server, label: "Servers", status: "Healthy", color: "text-emerald-400" }
               ].map((item, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col gap-3 hover:bg-white/5 transition-colors"
                 >
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <div>
                      <div className="text-sm font-medium text-slate-200">{item.label}</div>
                      <div className={`text-xs ${item.color} font-mono mt-1`}>● {item.status}</div>
                    </div>
                 </motion.div>
               ))}
            </div>

            {/* Notification */}
            <div className="space-y-4">
              <h3 className="text-white font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                Notify me when back online
              </h3>
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3"
                  >
                    <div className="bg-emerald-500/20 p-2 rounded-full">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">You're on the list.</div>
                      <div className="text-xs opacity-80">We'll alert you immediately.</div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="relative"
                  >
                    <div className="relative flex items-center">
                      <Command className="absolute left-4 w-4 h-4 text-slate-500" />
                      <input 
                        type="email" 
                        required
                        placeholder="Enter your email..." 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 text-white pl-11 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600 font-mono text-sm"
                      />
                      <button 
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-2"
                      >
                         Notify <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-slate-600 text-sm">
        <p>© 2025 Scrybe AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MaintenancePage;