// components/landing/TrustMetricsShowcase.js
// Showcase real performance metrics and system capabilities
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Target, Clock, Shield, Award, X, BarChart3 } from 'lucide-react';

const MetricCard = ({ icon: Icon, value, label, description, color, delay }) => {
  const colorClasses = {
    green: 'from-green-500 to-emerald-600 border-green-300 dark:border-green-700',
    blue: 'from-blue-500 to-cyan-600 border-blue-300 dark:border-blue-700',
    purple: 'from-purple-500 to-violet-600 border-purple-300 dark:border-purple-700',
    amber: 'from-amber-500 to-orange-600 border-amber-300 dark:border-amber-700',
    indigo: 'from-indigo-500 to-blue-600 border-indigo-300 dark:border-indigo-700',
    rose: 'from-rose-500 to-pink-600 border-rose-300 dark:border-rose-700'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity blur-xl" 
           style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
      <div className="relative bg-white dark:bg-neutral-800 border-2 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} mb-4`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          {value}
        </div>
        <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

const TrustMetricsDrawer = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[700px] bg-white dark:bg-neutral-900 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-secondary-600 p-6 flex items-center justify-between z-10 shadow-lg">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  Backtesting Performance
                </h2>
                <p className="text-sm text-white/90 mt-1">September 2025 • Real Market Conditions</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close metrics drawer"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Hero Metric */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 rounded-3xl p-8 border-2 border-green-300 dark:border-green-700 shadow-xl"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-lg">
                      <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-green-900 dark:text-green-300 tracking-wider">BACKTESTING PERIOD</div>
                      <div className="text-sm font-semibold text-green-700 dark:text-green-400 mt-1">Sep 01 - Sep 30, 2025</div>
                    </div>
                  </div>
                </div>
                <div className="text-7xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">+7.59%</div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Simulated portfolio performance with realistic execution costs including brokerage, slippage, and STT. 
                  <span className="block mt-2 font-semibold text-green-700 dark:text-green-400">
                    All trades executed based on AI analysis during live market conditions.
                  </span>
                </p>
              </motion.div>

              {/* System Performance Metrics */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  System Capabilities
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    icon={Clock}
                    value="<15s"
                    label="Analysis Speed"
                    description="Per-stock deep analysis time"
                    color="blue"
                    delay={0.1}
                  />
                  <MetricCard
                    icon={BarChart3}
                    value="250"
                    label="Daily Coverage"
                    description="NSE Smallcap 250 stocks analyzed daily"
                    color="indigo"
                    delay={0.15}
                  />
                  <MetricCard
                    icon={Clock}
                    value="7 days"
                    label="Avg Holding Period"
                    description="Typical position duration"
                    color="rose"
                    delay={0.2}
                  />
                  <MetricCard
                    icon={Target}
                    value="2%"
                    label="Risk Per Trade"
                    description="Maximum capital at risk per position"
                    color="amber"
                    delay={0.25}
                  />
                </div>
              </div>

              {/* Market Regime Trading */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  Trend-Following Strategy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* BUY Signals */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-green-600 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">BUY</div>
                        <div className="text-xs text-green-700 dark:text-green-500 font-semibold">Bullish Regime</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Long positions when market shows bullish momentum, strong technicals, and positive sentiment
                    </p>
                  </motion.div>

                  {/* SHORT Signals */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-red-300 dark:border-red-700"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-red-600 rounded-xl rotate-180">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">SHORT</div>
                        <div className="text-xs text-red-700 dark:text-red-500 font-semibold">Bearish Regime</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Short positions when market shows bearish momentum, weak technicals, and negative sentiment
                    </p>
                  </motion.div>
                </div>
                
                {/* Trend Following Note */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 border border-primary-200 dark:border-primary-700"
                >
                  <p className="text-sm text-primary-900 dark:text-primary-300">
                    <span className="font-bold">Trend-Following Philosophy:</span> We never go against the market regime. 
                    Our AI adapts signals based on real-time market context to align with prevailing trends.
                  </p>
                </motion.div>
              </div>

              {/* Transparency Note */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border-2 border-blue-300 dark:border-blue-700">
                <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2 text-lg">
                  <Shield className="w-6 h-6" />
                  Verified & Transparent
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                  All backtest trades are logged in our MongoDB database with exact timestamps, entry/exit prices, 
                  and complete audit trails. We use realistic slippage models and actual brokerage costs—no cherry-picking.
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-gray-100 dark:bg-neutral-800 rounded-2xl p-6 border-2 border-gray-300 dark:border-neutral-700">
                <p className="text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-900 dark:text-gray-200 text-sm">Important Disclaimer:</strong><br/>
                  Past performance does not guarantee future results. These are backtesting results from September 2025 
                  under simulated conditions with realistic costs. Trading involves substantial risk of loss. 
                  Always conduct your own research and consider your risk tolerance before trading.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function TrustMetricsShowcase() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Enhanced Metrics Banner */}
      <section className="w-full bg-gradient-to-br from-primary-600 via-secondary-600 to-purple-600 py-8 md:py-12 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/30">
              <Award className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white tracking-wide">BACKTESTING RESULTS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              Proven Performance
            </h2>
            <p className="text-white/90 text-sm md:text-base">
              September 2025 • Real Market Conditions • Verified Results
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Main Return Metric - Larger */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-1 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-gray-600 tracking-wider">RETURNS</div>
              </div>
              <div className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                +7.59%
              </div>
              <div className="text-xs text-gray-600 font-medium">Sep 2025 Net Returns</div>
            </motion.div>

            {/* Analysis Speed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-gray-600 tracking-wider">SPEED</div>
              </div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">
                &lt;15s
              </div>
              <div className="text-xs text-gray-600 font-medium">Analysis Per Stock</div>
            </motion.div>

            {/* Daily Coverage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-gray-600 tracking-wider">COVERAGE</div>
              </div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">
                250
              </div>
              <div className="text-xs text-gray-600 font-medium">Stocks Daily Analysis</div>
            </motion.div>

            {/* Holding Period */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-rose-600 to-pink-600 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-gray-600 tracking-wider">HOLDING</div>
              </div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">
                7 days
              </div>
              <div className="text-xs text-gray-600 font-medium">Avg Position Duration</div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-700 font-bold text-lg rounded-full hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-white/50"
            >
              <Award className="w-6 h-6" />
              View Detailed Performance
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Drawer Component */}
      <TrustMetricsDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
