// src/components/layout/NewHeader.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NewHeader = ({ onSignIn, onGetStarted, currentUser, onSignOut }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-soft">
      <nav className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/scrybe-logo.ico" 
              alt="Scrybe AI Logo" 
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold">
              <span className="text-gray-900">SCRYBE</span>
              {' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                AI
              </span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Testimonials
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <>
                <span className="text-gray-700 font-medium">
                  {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={onSignOut}
                  className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onSignIn}
                  className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onGetStarted}
                  className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-100"
            >
              <div className="py-4 space-y-4">
                <a href="#features" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
                  Features
                </a>
                <a href="#testimonials" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
                  Testimonials
                </a>
                <a href="#about" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
                  About
                </a>
                <a href="#contact" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
                  Contact
                </a>
                
                {currentUser ? (
                  <button
                    onClick={onSignOut}
                    className="w-full text-left text-gray-700 hover:text-gray-900 font-medium py-2"
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <button
                      onClick={onSignIn}
                      className="w-full text-left text-gray-700 hover:text-gray-900 font-medium py-2"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={onGetStarted}
                      className="w-full px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default NewHeader;
