// src/pages/Rulebook.js

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, TargetIcon, ZapIcon, LightbulbIcon, DatabaseIcon, BarChart3Icon, FilterIcon, TrendingUp } from 'lucide-react';

const Rulebook = () => {
  const Section = ({ title, children, delay = 0 }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-xl p-6 md:p-8 mb-8 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-5 pb-4 flex items-center gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        {title}
      </h3>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 text-base">{children}</div>
    </motion.div>
  );

  const ScoreRange = ({ range, label, color, bgColor }) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`${bgColor} p-4 rounded-xl border-2 ${color} shadow-md`}
    >
      <strong className={color.replace('border-', 'text-')}>{range}:</strong> {label}
    </motion.div>
  );

  const ProcessStep = ({ icon: Icon, title, description, color = "blue" }) => {
    const colorClasses = {
      blue: "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
      cyan: "text-cyan-500 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20",
      purple: "text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
      pink: "text-pink-500 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20",
      amber: "text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20",
      green: "text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
      emerald: "text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
    };
    
    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-start gap-4"
      >
        <div className={`p-3 rounded-xl ${colorClasses[color]} flex-shrink-0 mt-1`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 pb-12">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              The Scrybe AI Rulebook
            </h1>
          </div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
            Understanding our institutional-grade portfolio management system for the NSE universe.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-blue-900 dark:text-blue-100">
              Complete transparency into our analysis protocol and scoring methodology
            </span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* CORE CONCEPT */}
      <Section title="The Core Concept: The Scrybe Score" delay={0.1}>
        <p>
          Instead of just a simple signal, the AI's primary output is the{" "}
          <strong className="text-blue-600 dark:text-blue-400">Scrybe Score</strong>. It's a single number from{" "}
          <strong className="text-red-600 dark:text-red-400">-100 (high-conviction short)</strong> to{" "}
          <strong className="text-green-600 dark:text-green-400">+100 (high-conviction long)</strong> that represents the holistic quality of a trading setup based on all available data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <ScoreRange 
            range="+60 to +100"
            label="High-Conviction BUY"
            color="border-green-400 dark:border-green-600"
            bgColor="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20"
          />
          <ScoreRange 
            range="-60 to -100"
            label="High-Conviction SELL (Short)"
            color="border-red-400 dark:border-red-600"
            bgColor="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20"
          />
        </div>
        
        <div className="mt-4">
          <ScoreRange 
            range="-59 to +59"
            label="HOLD (Neutral / Low-Conviction / Contradictory Data)"
            color="border-amber-400 dark:border-amber-600"
            bgColor="bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20"
          />
        </div>
      </Section>

      {/* ANALYSIS PROTOCOL */}
      <Section title="The Analysis Protocol: Data Funnel" delay={0.2}>
        <p className="mb-6">
          Every trading day, Scrybe AI analyzes the complete <strong>NSE universe</strong> through a 
          disciplined, institutional-grade pipeline. Out of all stocks analyzed daily, only the <strong>top 10 
          highest-conviction setups</strong> are selected for execution based on strict risk management rules:
        </p>

        <div className="space-y-5 mt-6">
          <ProcessStep 
            icon={ZapIcon}
            title="Universe Analysis (NSE Stocks)"
            description="Each trading day begins with comprehensive analysis of all stocks in the NSE, ensuring no opportunity is missed in the Indian equity market."
            color="blue"
          />

          <ProcessStep 
            icon={BarChart3Icon}
            title="Market Regime Analysis"
            description="Nifty 50 and sector index trends are analyzed to define the overall market regime (Bullish, Bearish, or Neutral) and market momentum. This acts as the foundation for all trades."
            color="cyan"
          />

          <ProcessStep 
            icon={TargetIcon}
            title="Sector Analysis & Rotation Detection"
            description="Top-performing sectors are identified. Sector rotation patterns are tracked to identify emerging themes and avoid concentrated exposure."
            color="purple"
          />

          <ProcessStep 
            icon={FilterIcon}
            title="Quantitative Screening"
            description="A regime-adaptive screener filters all NSE stocks into Momentum, Pullback, or Mean Reversion setups, with fundamental health checks to ensure quality."
            color="pink"
          />

          <ProcessStep 
            icon={LightbulbIcon}
            title="AI Deep-Dive Analysis"
            description="All analyzed stocks undergo 'Apex Analysis' by Scrybe (powered by advanced AI). Each receives a comprehensive trade plan, structured insights, and a proprietary Scrybe Score from -100 to +100."
            color="amber"
          />

          <ProcessStep 
            icon={ShieldCheckIcon}
            title="Portfolio Selection (Adaptive Tiers)"
            description="Portfolio Manager ranks all signals by conviction and applies strict risk controls. For the NSE universe (~1,900 daily analyses): Tier 1 (Execute) = Top 10 positions, Tier 2 (Watchlist) = Top 50 opportunities, Tier 3 (Research) = All quality setups. Risk constraints: Market-cap adaptive position sizing (1% small-cap, 1.5% mid-cap, 2% large-cap), single-stock risk limits, liquidity checks, quality score adjustments. This ensures diversification while maintaining capital protection."
            color="green"
          />

          <ProcessStep 
            icon={DatabaseIcon}
            title="Complete Transparency"
            description="All analyses are stored and visible to users in the Portfolio Dashboard. You see exactly why each stock was selected or rejected, with clear reasons like 'Top conviction', 'Portfolio full', or 'Below threshold'. No black boxes."
            color="emerald"
          />
        </div>
      </Section>

      {/* HIGH SCORE */}
      <Section title="Anatomy of a High Scrybe Score" delay={0.3}>
        <p className="mb-4">
          A top-grade score (e.g., +85) in the <strong>NSE universe</strong> isn't just about price 
          movement. It represents a powerful confluence of factors specific to emerging growth opportunities:
        </p>
        <ul className="list-none mt-6 space-y-3">
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
          >
            <span className="text-green-500 text-xl">✅</span>
            <span><strong>Favorable Market:</strong> Both broad market and sector indices show bullish momentum.</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
          >
            <span className="text-green-500 text-xl">✅</span>
            <span><strong>Strong Sector:</strong> The stock's sector is outperforming within the NSE universe.</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
          >
            <span className="text-green-500 text-xl">✅</span>
            <span><strong>Confirmed Technicals:</strong> Chart patterns show clear momentum with volume confirmation.</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
          >
            <span className="text-green-500 text-xl">✅</span>
            <span><strong>Quality Fundamentals:</strong> Company shows solid business fundamentals and financial health.</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
          >
            <span className="text-green-500 text-xl">✅</span>
            <span><strong>Portfolio Fit:</strong> Trade passes institutional risk controls (single-stock limits, position sizing).</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
          >
            <span className="text-green-500 text-xl">✅</span>
            <span><strong>No Major Contradictions:</strong> No red flags or negative catalysts detected.</span>
          </motion.li>
        </ul>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg"
        >
          When all these conditions align, the AI generates a high Scrybe Score. The Portfolio Manager then ranks 
          all signals and selects only the <strong>top 10 highest-conviction trades</strong> that fit within our 
          institutional risk framework for execution.
        </motion.p>
      </Section>
      </div>
    </div>
  );
};

export default Rulebook;
