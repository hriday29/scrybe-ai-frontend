// src/components/landing/CTASection.js
import React from 'react';
import { motion } from 'framer-motion';

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

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Transform
            <br />
            <span className="text-yellow-300">Your Trading?</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful traders who trust Scrybe AI for their algorithmic trading needs
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartJourney}
              className="px-10 py-5 bg-white hover:bg-gray-50 text-primary-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-1"
            >
              Start Your Journey Today
            </button>
            <button
              onClick={onSignIn}
              className="px-10 py-5 bg-transparent hover:bg-white/10 text-white font-bold text-lg rounded-2xl border-2 border-white transition-all duration-200"
            >
              Sign In to Account
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
