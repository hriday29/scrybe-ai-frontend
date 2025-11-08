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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                Scrybe Score System
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                AI-powered scoring from -100 to +100
              </p>

              {/* Score Visualization */}
              <div className="space-y-4 mb-8">
                {/* High Conviction BUY */}
                <div className="bg-green-50 dark:bg-green-500/10 rounded-2xl p-5 border-2 border-green-200 dark:border-green-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-green-900 dark:text-green-300">High Conviction BUY</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">+85</span>
                  </div>
                  <div className="w-full bg-green-100 dark:bg-green-500/20 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-2">Strong technical + fundamental alignment</p>
                </div>

                {/* Medium Conviction */}
                <div className="bg-blue-50 dark:bg-blue-500/10 rounded-2xl p-5 border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-900 dark:text-blue-300">Medium Conviction</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">+45</span>
                  </div>
                  <div className="w-full bg-blue-100 dark:bg-blue-500/20 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }} />
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Positive signals, moderate strength</p>
                </div>

                {/* Neutral/Avoid */}
                <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Neutral - No Position</span>
                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-200">0</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gray-400 dark:bg-gray-500 h-2.5 rounded-full" style={{ width: '50%' }} />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">No clear directional bias</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-violet-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-violet-600">250</div>
                  <div className="text-xs font-medium text-violet-900">Stocks Analyzed</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-teal-600">Top 10</div>
                  <div className="text-xs font-medium text-teal-900">Selected Daily</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-purple-600">2%</div>
                  <div className="text-xs font-medium text-purple-900">Max Risk/Trade</div>
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
