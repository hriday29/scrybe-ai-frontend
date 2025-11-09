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
            className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-white dark:bg-neutral-900 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-700 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Award className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                  Performance Metrics
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Real results from live trading</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                aria-label="Close metrics drawer"
              >
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Hero Metric */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border-2 border-green-200 dark:border-green-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-600 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-green-900 dark:text-green-300">VERIFIED RETURNS</div>
                    <div className="text-xs text-green-700 dark:text-green-400">22 Trading Days • Net of Fees</div>
                  </div>
                </div>
                <div className="text-6xl font-extrabold text-green-600 dark:text-green-400 mb-2">+7.59%</div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Real portfolio performance tracked from October 1st to November 8th, 2025. 
                  All returns are net of brokerage, slippage, and STT.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  icon={Target}
                  value="22%"
                  label="Best Single Trade"
                  description="Highest profit achieved in one position"
                  color="purple"
                  delay={0.1}
                />
                <MetricCard
                  icon={Clock}
                  value="<15s"
                  label="Analysis Speed"
                  description="Per-stock deep analysis time"
                  color="blue"
                  delay={0.15}
                />
                <MetricCard
                  icon={BarChart3}
                  value="250"
                  label="Daily Coverage"
                  description="Stocks analyzed every trading day"
                  color="indigo"
                  delay={0.2}
                />
                <MetricCard
                  icon={Shield}
                  value="2%"
                  label="Risk Per Trade"
                  description="Maximum capital at risk per position"
                  color="amber"
                  delay={0.25}
                />
                <MetricCard
                  icon={Zap}
                  value="7 days"
                  label="Avg Hold Period"
                  description="Typical position duration"
                  color="rose"
                  delay={0.3}
                />
                <MetricCard
                  icon={Award}
                  value="10"
                  label="Max Positions"
                  description="Concentrated high-conviction portfolio"
                  color="green"
                  delay={0.35}
                />
              </div>

              {/* Transparency Note */}
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-700">
                <h3 className="font-bold text-primary-900 dark:text-primary-300 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verified & Transparent
                </h3>
                <p className="text-sm text-primary-800 dark:text-primary-300 leading-relaxed">
                  All metrics are tracked in our live MongoDB database with timestamps, entry/exit prices, 
                  and complete audit trails. We don't cherry-pick winners—every trade is logged and reported.
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-5 border border-gray-200 dark:border-neutral-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-900 dark:text-gray-200">Important:</strong> Past performance 
                  does not guarantee future results. Trading involves risk of loss. These metrics represent 
                  historical backtested results and live paper trading performance. Always conduct your own 
                  research and consider your risk tolerance before trading.
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
      {/* Compact Trigger Banner */}
      <section className="w-full bg-gradient-to-r from-primary-600 via-secondary-600 to-purple-600 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-white flex-wrap justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <div>
                  <div className="text-2xl font-bold">+7.59%</div>
                  <div className="text-xs opacity-90">22 Days Net</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30" />
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <div>
                  <div className="text-2xl font-bold">22%</div>
                  <div className="text-xs opacity-90">Best Trade</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30" />
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <div>
                  <div className="text-2xl font-bold">&lt;15s</div>
                  <div className="text-xs opacity-90">Analysis Time</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(true)}
              className="px-6 py-3 bg-white text-primary-700 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              <Award className="w-5 h-5" />
              View All Metrics
            </button>
          </div>
        </div>
      </section>

      {/* Drawer Component */}
      <TrustMetricsDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
