// src/components/landing/FeaturesSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, BarChart3, Zap, Target, Brain } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze market patterns and predict optimal trade setups.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Target,
    title: 'Precision Trading',
    description: 'Smart entry and exit points calculated using technical indicators and market sentiment analysis.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Institutional-grade risk controls with automatic stop-loss and position sizing recommendations.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Live market data integration with NSE and BSE for up-to-the-second trading decisions.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: TrendingUp,
    title: 'Portfolio Optimization',
    description: 'Diversified stock selection with sector-wise allocation and rebalancing strategies.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Execute trades in milliseconds with our optimized infrastructure and API integrations.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Modern Traders
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Everything you need to trade smarter, safer, and more profitably in the Indian stock market.
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
