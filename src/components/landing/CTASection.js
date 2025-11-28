// src/components/landing/CTASection.js
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const CTASection = ({ onStartJourney, onSignIn }) => {
  return (
  <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl opacity-20" />
        </div>
      </div>

  <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Start Your AI Trading Journey
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Experience Institutional-Grade
            <br />
            <span className="text-teal-200">Smallcap Analysis</span>
          </h2>
          
          <p className="text-xl text-violet-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get daily AI-powered analysis of NSE stocks with professional risk management and complete transparency
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartJourney}
              className="px-10 py-5 bg-white hover:bg-gray-50 text-primary-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-1"
            >
              Launch Portfolio Dashboard
            </button>
            <button
              onClick={onSignIn}
              className="px-10 py-5 bg-transparent hover:bg-white/10 text-white font-bold text-lg rounded-2xl border-2 border-white transition-all duration-200"
            >
              Sign In
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/90">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">~2000</div>
              <div className="text-sm text-violet-200">Stocks Analyzed Daily</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Top 10</div>
              <div className="text-sm text-violet-200">Selected Trades</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100% AI</div>
              <div className="text-sm text-violet-200">Systematic Process</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
