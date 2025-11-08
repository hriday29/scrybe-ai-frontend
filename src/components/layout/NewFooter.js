// src/components/layout/NewFooter.js
import React from 'react';
import { Mail, Phone, CheckCircle, Shield } from 'lucide-react';

const NewFooter = ({ onPrivacyOpen, onTermsOpen, onDisclaimerOpen, onRefundOpen }) => {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700">
      {/* Main Footer Content */}
      <div className="w-full px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo192.png" 
                alt="Scrybe AI Logo" 
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                SCRYBE <span className="text-primary-500">AI</span>
              </span>
            </div>
            
            <p className="text-gray-400 leading-relaxed mb-6 dark:text-gray-400">
              AI-powered analysis of Nifty Smallcap 250 stocks with institutional-grade 
              risk management. Built for systematic traders.
            </p>

            {/* Status Indicators */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-300">NSE Connected</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-300">Secure & Encrypted</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-6 dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:text-primary-400">
                  Features
                </button>
              </li>
              <li>
                <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:text-primary-400">
                  Testimonials
                </button>
              </li>
              <li>
                <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:text-primary-400">
                  Get Started
                </button>
              </li>
              <li>
                <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:text-primary-400">
                  Sign In
                </button>
              </li>
              <li>
                <button type="button" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="text-gray-600 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:text-primary-400">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-6 dark:text-gray-100">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@scrybeai.com" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:text-primary-400">
                  <Mail className="w-4 h-4" />
                  support@scrybeai.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:text-primary-400">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-6 dark:text-gray-100">Legal</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={onPrivacyOpen}
                  className="text-gray-600 hover:text-primary-600 transition-colors text-left dark:text-gray-300 dark:hover:text-primary-400">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onTermsOpen}
                  className="text-gray-600 hover:text-primary-600 transition-colors text-left dark:text-gray-300 dark:hover:text-primary-400">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={onDisclaimerOpen}
                  className="text-gray-600 hover:text-primary-600 transition-colors text-left dark:text-gray-300 dark:hover:text-primary-400">
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={onRefundOpen}
                  className="text-gray-600 hover:text-primary-600 transition-colors text-left dark:text-gray-300 dark:hover:text-primary-400">
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm dark:text-gray-400">
            © 2025 Scrybe AI. All rights reserved. | Built for traders, by traders.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
