import React from 'react';
import { motion } from 'framer-motion';
import logo from '../Assets/logo.svg';

// CHANGE 1: Add 'onLaunchAppClick' and 'onBetaInfoClick' to the props
const LandingHeader = ({ onLaunchAppClick, onBetaInfoClick }) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Scrybe AI Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-white">Scrybe AI</span>
          </div>
          <nav className="flex items-center space-x-4 text-sm">
            {/* The Beta Info button now uses the function passed in props */}
            <button
              onClick={onBetaInfoClick}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Beta Info
            </button>
            {/* CHANGE 2: The Launch App button is now a real button that uses the onClick function */}
            <button
              onClick={onLaunchAppClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg"
            >
              Launch App
            </button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default LandingHeader;