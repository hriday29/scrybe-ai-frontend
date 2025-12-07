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
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm border border-primary-200 dark:border-primary-700">
              <Sparkles className="w-4 h-4" />
              Institutional-Grade AI Analysis
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight mb-4">
              AI-Powered Stock Selection for{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                NSE India
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-medium">
              Daily AI analysis of <span className="font-bold text-gray-800 dark:text-gray-200">~2,000 NSE stocks</span> distilled into{' '}
              <span className="font-bold text-primary-600 dark:text-primary-400">Top 10 highest-conviction trades</span>{' '}
              using our proprietary Scrybe Score system and institutional risk management.
            </p>

            {/* Key Points */}
            <div className="mt-8 space-y-4">
              {[
                { 
                  icon: Brain, 
                  text: 'Daily AI analysis of entire NSE universe',
                  subtext: '~2,000 stocks screened with 15+ technical indicators'
                },
                { 
                  icon: TrendingUp, 
                  text: 'Top 10 highest-conviction trades only',
                  subtext: 'Institutional Grade Analysis • Scrybe Score • Market Regime Detection'
                },
                { 
                  icon: Shield, 
                  text: 'Institutional risk management built-in',
                  subtext: '2% max risk per trade • Portfolio diversification'
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm border border-primary-200 dark:border-primary-700">
                    <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <span className="text-base font-semibold text-gray-800 dark:text-gray-200 block">{item.text}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.subtext}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Free Trial
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={onWatchDemo}
                className="group px-8 py-4 bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl border-2 border-gray-200 dark:border-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  See Live Demo
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Real-time NSE data</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Updated daily</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Scrybe Score Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-soft-2xl p-6 border border-gray-100 dark:border-neutral-700">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                  Scrybe Score System
                </h3>
                <p className="text-center text-base text-gray-600 dark:text-gray-400 mb-2">
                  AI-powered scoring: -100 to +100
                </p>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg p-2.5 mb-3 border border-primary-200 dark:border-primary-700">
                  <p className="text-xs text-center text-primary-900 dark:text-primary-300 leading-relaxed">
                    <strong>±60 Threshold:</strong> High-conviction BUY/SHORT signals ready for execution
                  </p>
                </div>
              </div>

              {/* Score Visualization - Balanced 3 levels */}
              <div className="space-y-2.5 mb-4">
                {/* High Conviction BUY */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-xl p-3.5 border-2 border-green-300 dark:border-green-600">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-base font-bold text-green-900 dark:text-green-300">High Conviction BUY</span>
                      <div className="text-xs text-green-700 dark:text-green-400 mt-0.5">Score +60 to +100</div>
                    </div>
                    <span className="text-3xl font-extrabold text-green-600 dark:text-green-400">+85</span>
                  </div>
                  <div className="w-full bg-green-200 dark:bg-green-500/30 rounded-full h-2.5 mb-1.5">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-500 h-2.5 rounded-full shadow-lg" style={{ width: '85%' }} />
                  </div>
                  <p className="text-xs text-green-800 dark:text-green-300 leading-relaxed">
                    Strong technical setup + bullish sentiment + solid fundamentals
                  </p>
                </div>

                {/* Neutral Range */}
                <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-3.5 border border-gray-300 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-base font-bold text-gray-700 dark:text-gray-300">Neutral - Hold</span>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Score -59 to +59</div>
                    </div>
                    <span className="text-3xl font-extrabold text-gray-600 dark:text-gray-200">0</span>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5 mb-1.5">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-400 h-2.5 rounded-full shadow-lg" style={{ width: '50%' }} />
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    No clear directional bias. Wait for stronger signals
                  </p>
                </div>

                {/* High Conviction SHORT */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/10 rounded-xl p-3.5 border-2 border-red-300 dark:border-red-600">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-base font-bold text-red-900 dark:text-red-300">High Conviction SHORT</span>
                      <div className="text-xs text-red-700 dark:text-red-400 mt-0.5">Score -60 to -100</div>
                    </div>
                    <span className="text-3xl font-extrabold text-red-600 dark:text-red-400">-85</span>
                  </div>
                  <div className="w-full bg-red-200 dark:bg-red-500/30 rounded-full h-2.5 mb-1.5">
                    <div className="bg-gradient-to-r from-red-600 to-orange-500 h-2.5 rounded-full shadow-lg" style={{ width: '85%' }} />
                  </div>
                  <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed">
                    Bearish breakdown + negative sentiment. Strong short opportunity
                  </p>
                </div>
              </div>

              {/* Stats - Compact */}
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-3 border border-violet-200 dark:border-violet-700">
                  <div className="text-2xl font-extrabold text-violet-600 dark:text-violet-400">~2000</div>
                  <div className="text-xs font-bold text-violet-900 dark:text-violet-300">Analyzed</div>
                </div>
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-3 border border-teal-200 dark:border-teal-700">
                  <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">Top 10</div>
                  <div className="text-xs font-bold text-teal-900 dark:text-teal-300">Selected</div>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-3 border border-rose-200 dark:border-rose-700">
                  <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">2%</div>
                  <div className="text-xs font-bold text-rose-900 dark:text-rose-300">Max Risk</div>
                </div>
              </div>

              {/* Score Factors - Single line without specific indicators */}
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-2.5 border border-primary-200 dark:border-primary-700">
                <div className="text-xs font-bold text-primary-900 dark:text-primary-300 mb-1">Comprehensive Analysis:</div>
                <div className="text-xs text-primary-800 dark:text-primary-300 leading-relaxed">
                  15+ Technical Indicators • AI Sentiment Analysis • Fundamental Metrics • Market Regime Detection
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
