// src/pages/legal/NewTermsOfService.js
import React from 'react';
import { motion } from 'framer-motion';
import NewHeader from '../../components/layout/NewHeader';
import NewFooter from '../../components/layout/NewFooter';

const NewTermsOfService = ({ currentUser, onSignIn, onSignOut, onGetStarted, onFaqOpen, onContactOpen, onClose }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NewHeader
        currentUser={currentUser}
        onSignIn={onSignIn}
        onGetStarted={onGetStarted}
        onSignOut={onSignOut}
        onFaqOpen={onFaqOpen}
        onContactOpen={onContactOpen}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: November 7, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8 border border-gray-200 dark:border-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Scrybe AI's platform, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Scrybe AI provides algorithmic trading analysis and recommendations for the Indian stock market. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>AI-powered stock analysis and recommendations</li>
                <li>Real-time market data and insights</li>
                <li>Portfolio optimization tools</li>
                <li>Risk management analysis</li>
                <li>Technical and fundamental analysis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not share your account with others</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not reverse engineer or attempt to access our algorithms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">4. Trading Risks and Disclaimers</h2>
              <div className="bg-warning-50 dark:bg-warning-900/20 border-l-4 border-warning-500 dark:border-warning-600 p-6 rounded-lg mb-4">
                <p className="text-gray-900 dark:text-gray-100 font-semibold mb-2">⚠️ Important Trading Disclaimer</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Trading in securities involves substantial risk. Past performance is not indicative of future results. You should carefully consider your financial situation and risk tolerance before making any trading decisions.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Our recommendations are for informational purposes only</li>
                <li>We do not guarantee profits or prevent losses</li>
                <li>You are solely responsible for your trading decisions</li>
                <li>Consult with a qualified financial advisor before trading</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Subscription and Payments</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Subscription terms:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Subscriptions are billed on a recurring basis</li>
                <li>You may cancel your subscription at any time</li>
                <li>Refunds are subject to our Refund Policy</li>
                <li>We reserve the right to modify pricing with notice</li>
                <li>Failed payments may result in service suspension</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content, algorithms, software, and materials on our platform are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Scrybe AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or trading losses arising from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your account if you violate these terms or engage in fraudulent, abusive, or illegal activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may modify these terms at any time. We will notify you of significant changes via email or through our platform. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms of Service, contact us at:
              </p>
              <div className="mt-4 space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@scrybeai.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
              </div>
            </section>
          </div>

          {/* Back Button */}
          {onClose && (
            <div className="mt-8 text-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
              >
                Back to Home
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <NewFooter />
    </div>
  );
};

export default NewTermsOfService;
