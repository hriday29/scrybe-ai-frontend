// src/components/layout/NewFooter.js
import React from 'react';
import { Mail, Phone, Instagram, CheckCircle, Shield } from 'lucide-react';

const NewFooter = ({ onPrivacyOpen, onTermsOpen, onDisclaimerOpen, onRefundOpen }) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-white">
                SCRYBE <span className="text-primary-400">AI</span>
              </span>
            </div>
            
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering traders with cutting-edge algorithmic trading solutions for the 
              Indian stock market. Join thousands of successful traders.
            </p>

            {/* Status Indicators */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>NSE & BSE Connected</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>Secure & Encrypted</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="hover:text-primary-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary-400 transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Get Started
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Sign In
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@scrybeai.com" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  support@scrybeai.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-6">
              <p className="text-white font-semibold mb-3">Follow us:</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 rounded-lg flex items-center justify-center transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={onPrivacyOpen}
                  className="hover:text-primary-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onTermsOpen}
                  className="hover:text-primary-400 transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={onDisclaimerOpen}
                  className="hover:text-primary-400 transition-colors text-left"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={onRefundOpen}
                  className="hover:text-primary-400 transition-colors text-left"
                >
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-white font-bold text-xl mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Get the latest updates on trading strategies and market insights.
            </p>
            
            <form className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Scrybe AI. All rights reserved. | Built for traders, by traders.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
