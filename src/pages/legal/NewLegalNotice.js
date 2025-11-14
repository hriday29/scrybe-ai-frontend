import React from 'react';
import { motion } from 'framer-motion';
import NewHeader from '../../components/layout/NewHeader';
import NewFooter from '../../components/layout/NewFooter';

const NewLegalNotice = ({ currentUser, onSignIn, onSignOut, onGetStarted, onFaqOpen, onContactOpen, onClose, onPaymentsTermsOpen, onPaymentsPrivacyOpen, onPrivacyOpen, onTermsOpen }) => {
  return (
    <div className="min-h-screen bg-gray-50">
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Legal Notice</h1>
            <p className="text-lg text-gray-600">Which laws, standards and regulations apply to Scrybe AI's payments and data handling.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
              <p className="text-gray-700 leading-relaxed">
                This page lists the main legal frameworks we follow for payment processing and data privacy. It is informational only and not legal advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Applicable laws & standards</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>India:</strong> DPDP Act (Digital Personal Data Protection), Information Technology Act, Payment & Settlement Systems Act, PMLA (Prevention of Money Laundering Act), RBI guidelines, GST rules.</li>
                <li><strong>EU/EEA:</strong> GDPR (data protection), PSD2 (payments), Strong Customer Authentication (SCA) for payment flows.</li>
                <li><strong>USA (California):</strong> CCPA/CPRA (privacy protection), state money transmission laws as applicable; federal AML regulations.</li>
                <li><strong>Payment Standards:</strong> PCI-DSS (card security standards), tokenization, and relevant processor terms (Razorpay, Stripe etc.).</li>
                <li><strong>International AML & Financial Standards:</strong> FATF recommendations, local reporting and record keeping under AML laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What this means for you</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>We process personal data for payment processing, lawful compliance, and to prevent fraud.</li>
                <li>We work with PCI-DSS-compliant processors; Scrybe AI does not store full card numbers.</li>
                <li>We honor rights under DPDP, GDPR and CCPA where applicable; contact privacy@scrybeai.com for requests.</li>
                <li>We will retain payment records as required by law for tax and AML purposes.</li>
                <li>We cooperate with regulatory authorities when legally required to do so.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Next steps & contact</h2>
              <p className="text-gray-700 leading-relaxed">
                For detailed questions about legal compliance, please consult your legal counsel or contact our legal team at legal@scrybeai.com.
              </p>
            </section>
          </div>

          {onClose && (
            <div className="mt-8 text-center">
              <button
                onClick={() => { onClose(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
              >
                Back to Home
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <NewFooter
        onPrivacyOpen={() => { if (onClose) onClose(); if (onPrivacyOpen) onPrivacyOpen(); }}
        onTermsOpen={() => { if (onClose) onClose(); if (onTermsOpen) onTermsOpen(); }}
        onPaymentsTermsOpen={() => { if (onClose) onClose(); if (onPaymentsTermsOpen) onPaymentsTermsOpen(); }}
        onPaymentsPrivacyOpen={() => { if (onClose) onClose(); if (onPaymentsPrivacyOpen) onPaymentsPrivacyOpen(); }}
      />
    </div>
  );
};

export default NewLegalNotice;
