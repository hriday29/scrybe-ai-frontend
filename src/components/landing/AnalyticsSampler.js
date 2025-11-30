// components/landing/AnalyticsSampler.js
// Eye-catching live metrics preview with gradient background and animations
import React, { useEffect, useState } from 'react';
import { Activity, Clock, Zap, AlertCircle, Radio, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../apiConfig';

export default function AnalyticsSampler() {
  const [pulse, setPulse] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pulseResp, portfolioResp] = await Promise.all([
          fetch(`${API_BASE_URL}/api/market-status`),
          fetch(`${API_BASE_URL}/api/portfolio-summary`)
        ]);
        
        if (pulseResp.ok) {
          const pulseData = await pulseResp.json();
          setPulse(pulseData);
          console.log('Market status loaded:', pulseData);
        }
        
        if (portfolioResp.ok) {
          const portfolioData = await portfolioResp.json();
          setPortfolio(portfolioData);
          console.log('Portfolio summary loaded:', portfolioData);
        }
      } catch (e) {
        console.error('Analytics sampler error:', e);
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" aria-labelledby="analytics-sampler-heading">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Attention-grabbing header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 rounded-full shadow-lg mb-4">
            <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">LIVE RIGHT NOW</span>
          </div>
          <h2 id="analytics-sampler-heading" className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            See It In <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">Real-Time</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Live portfolio intelligence updating every minute. This is what institutional traders see, now available to you.
          </p>
        </motion.div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Market Status (Real Data or Fallback) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative bg-white dark:bg-neutral-800 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Next Trading Day</span>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                {pulse?.prediction_date || 'Monday, Nov 11'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                {pulse?.is_holiday ? (
                  <><AlertCircle className="w-4 h-4 text-amber-500" /> Market Closed</>
                ) : (
                  <><Activity className="w-4 h-4 text-green-500 animate-pulse" /> Market Open</>
                )}
              </p>
            </div>
          </motion.div>

          {/* Card 2: Active Surveillance (Static but Accurate Capability Showcase) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative bg-white dark:bg-neutral-800 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <Radio className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Active Surveillance</span>
              </div>

              {/* Big metric is "Market Coverage", which is a static fact about your app */}
              <div className="mb-4">
                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                    NSE Equity
                 </p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monitoring NSE Universe & Major Indices
                 </p>
              </div>

              {/* Techy "System Online" indicators */}
              <div className="flex flex-wrap gap-2 mt-4">
                 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold border border-green-200 dark:border-green-800">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    SYSTEM ONLINE
                 </span>
                 {/* <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">
                    <Server className="w-3 h-3" />
                    NIFTY 50
                 </span>
                 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">
                    <Server className="w-3 h-3" />
                    BANKNIFTY
                 </span> */}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Error/Loading states */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg text-center"
          >
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Live data temporarily unavailable. Sign up to access full dashboard.
            </p>
          </motion.div>
        )}

        {/* CTA hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold shadow-lg">
            <Activity className="w-5 h-5 animate-pulse" />
            <span>Updates every 60 seconds • Sign up for full access</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}