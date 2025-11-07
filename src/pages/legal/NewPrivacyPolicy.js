// src/pages/legal/NewPrivacyPolicy.js
import React from 'react';
import { motion } from 'framer-motion';
import NewHeader from '../../components/layout/NewHeader';
import NewFooter from '../../components/layout/NewFooter';

const NewPrivacyPolicy = ({ currentUser, onSignIn, onSignOut, onGetStarted, onClose }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NewHeader
        currentUser={currentUser}
        onSignIn={onSignIn}
        onGetStarted={onGetStarted}
        onSignOut={onSignOut}
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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: November 7, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Personal identification information (Name, email address, phone number)</li>
                <li>Account credentials and authentication data</li>
                <li>Trading preferences and portfolio information</li>
                <li>Payment and billing information</li>
                <li>Communication preferences and correspondence</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide, maintain, and improve our algorithmic trading services</li>
                <li>Process your transactions and manage your account</li>
                <li>Send you technical notices, updates, and security alerts</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Analyze usage patterns and optimize platform performance</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>With your consent or at your direction</li>
                <li>With service providers who perform services on our behalf</li>
                <li>With financial institutions for payment processing</li>
                <li>To comply with legal obligations or respond to legal requests</li>
                <li>To protect the rights and safety of Scrybe AI, our users, or others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Secure authentication and access controls</li>
                <li>24/7 monitoring of our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Close your account at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to provide functionality, analyze usage, and improve our services. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@scrybeai.com</p>
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

export default NewPrivacyPolicy;
