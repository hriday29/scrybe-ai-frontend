// src/components/landing/TestimonialsSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Shield, Eye } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Focus on India\'s Growth Story',
    description: 'Nifty Smallcap 250 represents emerging Indian businesses with high growth potential—companies at the sweet spot before they become largecaps.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
  },
  {
    icon: Shield,
    title: 'Professional Risk Management',
    description: 'Unlike retail traders, our system enforces institutional-grade risk controls: strict position limits, sector diversification, and maximum 2% risk per trade.',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
  },
  {
    icon: Eye,
    title: 'Complete Transparency',
    description: 'No black-box promises. View all 250 daily analyses, see why each stock was selected or rejected, and access honest historical performance in the AI Track Record.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gradient-soft">
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
            Why{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Scrybe AI?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Institutional-grade analysis meets systematic discipline for smallcap trading
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-8 shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 border-2 ${benefit.borderColor}`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon className={`w-7 h-7 ${benefit.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* What You Get - Quick List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-soft-xl border border-gray-100"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            What You Get with Scrybe AI
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Daily analysis of all 250 Nifty Smallcap stocks',
              'Proprietary Scrybe Score for each stock (-100 to +100)',
              'Top 10 highest-conviction trade selections',
              'Real-time market regime detection (Uptrend/Downtrend/Sideways)',
              'Technical analysis: Momentum, Volatility, Price Action',
              'Institutional risk controls: Max 10 positions, 2% risk/trade',
              'Portfolio management with sector diversification limits',
              'Complete transparency: View all analyses and selection reasons',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
