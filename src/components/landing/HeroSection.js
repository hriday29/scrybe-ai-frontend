// src/components/landing/HeroSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Shield, Sparkles } from 'lucide-react';

const HeroSection = ({ onGetStarted, onWatchDemo }) => {
  return (
    <section
      id="hero"
      className="relative w-full bg-gradient-to-br from-violet-50 via-teal-50/30 to-purple-50/40 overflow-hidden min-h-[calc(100svh-5rem)] flex items-center"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl" />
      </div>

  <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Institutional-Grade AI Analysis
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
              AI-Powered Analysis for{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                Nifty Smallcap 250
              </span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              Scrybe AI analyzes all 250 smallcap stocks daily using our proprietary Scrybe Score system, 
              selecting only the top 10 highest-conviction trades with institutional risk controls.
            </p>

            {/* Key Points */}
            <div className="mt-8 space-y-3">
              {[
                { icon: Brain, text: 'Daily analysis of 250 stocks with AI-powered scoring' },
                { icon: TrendingUp, text: 'Top 10 selection based on technical + fundamental analysis' },
                { icon: Shield, text: 'Professional risk management: 2% max risk per trade' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Start Free Trial
              </button>
              <button
                onClick={onWatchDemo}
                className="px-8 py-4 bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border-2 border-gray-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
              >
                See Live Demo
              </button>
            </div>
          </motion.div>

          {/* Right Column - Scrybe Score Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-soft-2xl p-8 border border-gray-100 dark:border-neutral-700">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                  Scrybe Score System
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-1">
                  AI-powered scoring from -100 to +100
                </p>
                <p className="text-center text-xs text-gray-500 dark:text-gray-500 mb-6">
                  Combining 15+ technical indicators, AI sentiment, and fundamental analysis
                </p>
              </div>

              {/* Score Visualization - Enhanced */}
              <div className="space-y-3 mb-6">
                {/* High Conviction BUY */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-2xl p-5 border-2 border-green-300 dark:border-green-600 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm font-bold text-green-900 dark:text-green-300">🚀 High Conviction BUY</span>
                      <div className="text-[10px] text-green-700 dark:text-green-400 mt-0.5">Score 75 to 100</div>
                    </div>
                    <span className="text-3xl font-extrabold text-green-600 dark:text-green-400">+85</span>
                  </div>
                  <div className="w-full bg-green-200 dark:bg-green-500/30 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-500 h-3 rounded-full shadow-lg" style={{ width: '85%' }} />
                  </div>
                  <p className="text-xs text-green-800 dark:text-green-300 leading-relaxed">
                    Strong technical setup + bullish AI sentiment + solid fundamentals. Ready for entry.
                  </p>
                </div>

                {/* Medium Conviction */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-2xl p-5 border border-blue-300 dark:border-blue-600 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm font-bold text-blue-900 dark:text-blue-300">📈 Medium Conviction</span>
                      <div className="text-[10px] text-blue-700 dark:text-blue-400 mt-0.5">Score 30 to 74</div>
                    </div>
                    <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">+45</span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-500/30 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-3 rounded-full shadow-lg" style={{ width: '65%' }} />
                  </div>
                  <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                    Positive technical signals with moderate momentum. Watch for confirmation.
                  </p>
                </div>

                {/* Neutral/Avoid */}
                <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-5 border border-gray-300 dark:border-gray-600 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">⚪ Neutral - No Position</span>
                      <div className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5">Score -29 to +29</div>
                    </div>
                    <span className="text-3xl font-extrabold text-gray-600 dark:text-gray-200">0</span>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-400 h-3 rounded-full shadow-lg" style={{ width: '50%' }} />
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    No clear directional bias. Conflicting signals or consolidation phase.
                  </p>
                </div>

                {/* High Conviction SHORT - NEW */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/10 rounded-2xl p-5 border-2 border-red-300 dark:border-red-600 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm font-bold text-red-900 dark:text-red-300">📉 High Conviction SHORT</span>
                      <div className="text-[10px] text-red-700 dark:text-red-400 mt-0.5">Score -75 to -100</div>
                    </div>
                    <span className="text-3xl font-extrabold text-red-600 dark:text-red-400">-85</span>
                  </div>
                  <div className="w-full bg-red-200 dark:bg-red-500/30 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-red-600 to-orange-500 h-3 rounded-full shadow-lg" style={{ width: '85%' }} />
                  </div>
                  <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed">
                    Bearish breakdown + negative sentiment. Avoid or consider shorting opportunities.
                  </p>
                </div>
              </div>

              {/* Enhanced Stats with Icons */}
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-3 border border-violet-200 dark:border-violet-700">
                  <div className="text-2xl font-extrabold text-violet-600 dark:text-violet-400">250</div>
                  <div className="text-[10px] font-bold text-violet-900 dark:text-violet-300">Stocks Analyzed</div>
                  <div className="text-[9px] text-violet-700 dark:text-violet-400 mt-0.5">Daily Coverage</div>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-3 border border-teal-200 dark:border-teal-700">
                  <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">Top 10</div>
                  <div className="text-[10px] font-bold text-teal-900 dark:text-teal-300">Selected Daily</div>
                  <div className="text-[9px] text-teal-700 dark:text-teal-400 mt-0.5">Best Opportunities</div>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-3 border border-rose-200 dark:border-rose-700">
                  <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">2%</div>
                  <div className="text-[10px] font-bold text-rose-900 dark:text-rose-300">Max Risk/Trade</div>
                  <div className="text-[9px] text-rose-700 dark:text-rose-400 mt-0.5">Capital Protection</div>
                </div>
              </div>

              {/* What Makes Score High - NEW INFO */}
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 border border-primary-200 dark:border-primary-700">
                <div className="text-xs font-bold text-primary-900 dark:text-primary-300 mb-2">What Drives a High Score?</div>
                <ul className="text-[10px] text-primary-800 dark:text-primary-300 space-y-1 leading-relaxed">
                  <li>✓ RSI breakout above 50 with bullish divergence</li>
                  <li>✓ MACD golden cross + volume confirmation</li>
                  <li>✓ AI sentiment analysis (Reddit, Twitter, News)</li>
                  <li>✓ Strong fundamentals (P/E, ROE, debt ratio)</li>
                  <li>✓ Sector momentum + market regime alignment</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
