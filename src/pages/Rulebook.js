// src/pages/Rulebook.js

import React from 'react';
import { ShieldCheckIcon, TargetIcon, ZapIcon, LightbulbIcon, DatabaseIcon, BarChart3Icon, FilterIcon } from 'lucide-react';

const Rulebook = () => {
  const Section = ({ title, children }) => (
    <div className="bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 mb-8">
      <h3 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-3">{title}</h3>
      <div className="text-gray-300 leading-relaxed space-y-4 text-base">{children}</div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fadeIn">
      {/* HEADER */}
      <h2 className="text-4xl font-bold text-white mb-2 text-center">The Scrybe AI Rulebook</h2>
      <p className="text-lg text-gray-400 text-center mb-12">
        Understanding our data-driven analysis engine.
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
          <div className="md:col-span-2 bg-slate-700/50 p-3 rounded-lg">
            <strong className="text-amber-400">-59 to +59:</strong> HOLD (Neutral / Low-Conviction / Contradictory Data)
          </div>
        </div>
      </Section>

      {/* ANALYSIS PROTOCOL */}
      <Section title="The Analysis Protocol: Data Funnel">
        <p>
          The Scrybe Score is the end-product of a disciplined, multi-step daily pipeline that distills thousands of stocks into a few high-quality trade ideas:
        </p>

        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-4">
            <ZapIcon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Market Open Check</h4>
              <p className="text-sm text-gray-400">
                Each trading day begins with verifying whether the NSE is open before starting the pipeline.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <BarChart3Icon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Market Regime Analysis</h4>
              <p className="text-sm text-gray-400">
                NIFTY 50 index trends are analyzed to define the overall regime (Bullish, Bearish, or Neutral). This acts as the foundation for all trades.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <TargetIcon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Sector Analysis</h4>
              <p className="text-sm text-gray-400">
                Top-performing sectors relative to NIFTY 50 are identified. Only stocks in strong sectors are considered.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FilterIcon className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Quantitative Screening</h4>
              <p className="text-sm text-gray-400">
                A regime-adaptive screener filters stocks into Momentum, Pullback, or Mean Reversion setups, with an additional fundamental health check.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <LightbulbIcon className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">AI Deep-Dive Analysis</h4>
              <p className="text-sm text-gray-400">
                Shortlisted stocks undergo "Apex Analysis" by Scrybe (powered by Gemini AI). The output is a trade plan, structured insights, and a proprietary Scrybe Score.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <DatabaseIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Database Storage</h4>
              <p className="text-sm text-gray-400">
                Final results are stored in MongoDB. The frontend API directly reads from this database, ensuring users always see the latest daily snapshot.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* HIGH SCORE */}
      <Section title="Anatomy of a High Scrybe Score">
        <p>
          A top-grade score (e.g., +85) isn't just about price going up. It represents a powerful confluence of factors:
        </p>
        <ul className="list-none mt-4 space-y-2">
          <li className="flex items-center gap-3">
            <span className="text-green-400">✅</span>{" "}
            <strong>Favorable Market:</strong> The overall market regime is bullish.
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✅</span>{" "}
            <strong>Strong Sector:</strong> The stock's sector is outperforming.
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✅</span>{" "}
            <strong>Confirmed Technicals:</strong> The chart pattern is clear and confirmed by indicators.
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-400">✅</span>{" "}
            <strong>No Major Contradictions:</strong> No fundamental red flags or negative catalysts.
          </li>
        </ul>
        <p className="mt-4">
          When all these conditions are met, the AI generates a high Scrybe Score and a high-conviction signal.
        </p>
      </Section>
    </div>
  );
};

export default Rulebook;