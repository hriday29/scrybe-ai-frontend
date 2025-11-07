// src/components/landing/HeroSection.js
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ onGetStarted, onWatchDemo }) => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Trade Smarter with{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Algorithms
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Maximize your trading profits with our advanced algorithmic trading platform. 
              Built for Indian markets with cutting-edge technology and proven strategies.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Join Now
              </button>
              <button
                onClick={onWatchDemo}
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Right Column - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-soft-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Trusted by Traders Nationwide
              </h3>
              <p className="text-center text-gray-600 mb-8">
                Join thousands of successful traders
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Trusted Traders */}
                <div className="bg-blue-50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">4200+</div>
                  <div className="text-sm font-medium text-blue-900">Trusted Traders</div>
                  <div className="flex justify-center gap-1 mt-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  </div>
                </div>

                {/* Total Profits */}
                <div className="bg-green-50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">₹5Cr+</div>
                  <div className="text-sm font-medium text-green-900">Total Profits</div>
                  <div className="text-xs text-green-600 mt-2 font-semibold">
                    ✦ +20% this month
                  </div>
                </div>

                {/* Win Rate */}
                <div className="bg-purple-50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">78%</div>
                  <div className="text-sm font-medium text-purple-900">Win Rate</div>
                </div>

                {/* Support */}
                <div className="bg-orange-50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-sm font-medium text-orange-900">Support</div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-gray-600">NSE Connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-gray-600">BSE Live</span>
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
