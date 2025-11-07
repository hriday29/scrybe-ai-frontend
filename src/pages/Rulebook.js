// src/pages/Rulebook.js

import React from 'react';
import { ShieldCheckIcon, TargetIcon, ZapIcon, LightbulbIcon, DatabaseIcon, BarChart3Icon, FilterIcon } from 'lucide-react';

const Rulebook = () => {
  const Section = ({ title, children }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
      <h3 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-3">{title}</h3>
      <div className="text-gray-300 leading-relaxed space-y-4 text-base">{children}</div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fadeIn">
      {/* HEADER */}
      <h2 className="text-4xl font-bold text-white mb-2 text-center">The Scrybe AI Rulebook</h2>
      <p className="text-lg text-gray-400 text-center mb-12">
        Understanding our institutional-grade portfolio management system for the Nifty Smallcap 250 universe.
      </p>

      {/* CORE CONCEPT */}
      <Section title="The Core Concept: The Scrybe Score">
        <p>
          Instead of just a simple signal, the AI's primary output is the{" "}
          <strong>Scrybe Score</strong>. It's a single number from{" "}
          <strong>-100 (high-conviction short)</strong> to{" "}
          <strong>+100 (high-conviction long)</strong> that represents the holistic quality of a trading setup based on all available data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-center">
          <div className="bg-green-500/10 p-3 rounded-lg">
            <strong className="text-green-300">+60 to +100:</strong> High-Conviction BUY
          </div>
          <div className="bg-red-500/10 p-3 rounded-lg">
            <strong className="text-red-300">-60 to -100:</strong> High-Conviction SELL (Short)
          </div>
          <div className="md:col-span-2 bg-gray-100 p-3 rounded-lg">
            <strong className="text-amber-400">-59 to +59:</strong> HOLD (Neutral / Low-Conviction / Contradictory Data)
          </div>
        </div>
      </Section>

      {/* ANALYSIS PROTOCOL */}
      <Section title="The Analysis Protocol: Data Funnel">
        <p>
          Every trading day, Scrybe AI analyzes the complete <strong>Nifty Smallcap 250 universe</strong> through a 
          disciplined, institutional-grade pipeline. Out of 250 stocks analyzed daily, only the <strong>top 10 
          highest-conviction setups</strong> are selected for execution based on strict risk management rules:
        </p>

        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-4">
            <ZapIcon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Universe Analysis (250 Stocks)</h4>
              <p className="text-sm text-gray-400">
                Each trading day begins with comprehensive analysis of all 250 stocks in the Nifty Smallcap 250 index, 
                ensuring no opportunity is missed in this high-growth segment.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <BarChart3Icon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Market Regime Analysis</h4>
              <p className="text-sm text-gray-400">
                Both Nifty 50 and Nifty Smallcap 250 index trends are analyzed to define the overall market regime 
                (Bullish, Bearish, or Neutral) and smallcap-specific momentum. This acts as the foundation for all trades.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <TargetIcon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Sector Analysis & Rotation Detection</h4>
              <p className="text-sm text-gray-400">
                Top-performing sectors within the smallcap universe are identified. Sector rotation patterns are tracked 
                to identify emerging themes and avoid concentrated exposure.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FilterIcon className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Quantitative Screening</h4>
              <p className="text-sm text-gray-400">
                A regime-adaptive screener filters 250 stocks into Momentum, Pullback, or Mean Reversion setups, 
                with fundamental health checks to ensure quality.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <LightbulbIcon className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">AI Deep-Dive Analysis</h4>
              <p className="text-sm text-gray-400">
                All 250 stocks undergo "Apex Analysis" by Scrybe (powered by advanced AI). Each receives a comprehensive 
                trade plan, structured insights, and a proprietary Scrybe Score from -100 to +100.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheckIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Portfolio Selection (Top 10)</h4>
              <p className="text-sm text-gray-400">
                An institutional-grade Portfolio Manager ranks all signals by conviction and applies strict risk controls: 
                <strong> max 10 concurrent positions</strong>, <strong>40% sector concentration limit</strong>, and 
                <strong>2% max risk per stock</strong>. Only the highest-conviction trades that pass all constraints are executed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <DatabaseIcon className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Complete Transparency</h4>
              <p className="text-sm text-gray-400">
                All 250 analyses are stored and visible to users in the Portfolio Dashboard. You see exactly why each 
                stock was selected or rejected, with clear reasons like "High conviction, sector limit reached" or 
                "Below conviction threshold". No black boxes.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* HIGH SCORE */}
      <Section title="Anatomy of a High Scrybe Score">
        <p>
          A top-grade score (e.g., +85) in the <strong>Nifty Smallcap 250 universe</strong> isn't just about price 
          movement. It represents a powerful confluence of factors specific to emerging growth opportunities:
        </p>
        <ul className="list-none mt-4 space-y-2">
          <li className="flex items-center gap-3">
            <span className="text-green-400">✅</span>{" "}
            <strong>Favorable Market:</strong> Both broad market and smallcap indices show bullish momentum.
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✅</span>{" "}
            <strong>Strong Sector:</strong> The stock's sector is outperforming within the smallcap universe.
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✅</span>{" "}
            <strong>Confirmed Technicals:</strong> Chart patterns show clear momentum with volume confirmation.
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✅</span>{" "}
            <strong>Quality Fundamentals:</strong> Company shows solid business fundamentals despite smallcap classification.
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✅</span>{" "}
            <strong>Portfolio Fit:</strong> Trade passes institutional risk controls (sector limits, position sizing).
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✅</span>{" "}
            <strong>No Major Contradictions:</strong> No red flags or negative catalysts detected.
          </li>
        </ul>
        <p className="mt-4">
          When all these conditions align, the AI generates a high Scrybe Score. The Portfolio Manager then ranks 
          all signals and selects only the <strong>top 10 highest-conviction trades</strong> that fit within our 
          institutional risk framework for execution.
        </p>
      </Section>
    </div>
  );
};

export default Rulebook;
