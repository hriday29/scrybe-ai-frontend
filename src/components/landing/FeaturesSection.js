// src/components/landing/FeaturesSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Shield, BarChart3, Target, Activity } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Scrybe Score AI Engine',
    description: 'Proprietary AI scoring system (-100 to +100) evaluates technical setup, fundamentals, and market context for each stock daily.',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
  },
  {
    icon: Activity,
    title: 'Market Regime Detection',
    description: 'Real-time identification of market conditions (Uptrend, Downtrend, Sideways) with volatility analysis to adapt trading strategies dynamically.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    icon: Shield,
    title: 'Institutional Risk Controls',
    description: 'Professional portfolio management: Max 10 positions, 2% max risk per trade, conviction-driven diversification—just like institutional fund managers.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: BarChart3,
    title: 'Technical Analysis Suite',
    description: 'Comprehensive analysis of momentum indicators, price action patterns, volatility metrics, and market breadth to identify high-probability setups.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Target,
    title: 'Top 10 Daily Selection',
    description: 'From all analyzed stocks, only the top 10 highest-conviction trades that pass all risk controls are selected for execution each day.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: TrendingUp,
    title: 'Complete Transparency',
    description: 'View all ~2000 NSE stock analyses with clear selection reasons. Access AI Track Record for honest historical performance—no black-box promises.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            AI-Powered Features for{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Smallcap Trading
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Institutional-grade analysis and risk management designed for the NSE universe.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-soft-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
