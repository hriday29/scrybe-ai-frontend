// src/pages/legal/NewRefundPolicy.js
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import NewHeader from '../../components/layout/NewHeader';
import NewFooter from '../../components/layout/NewFooter';

const NewRefundPolicy = ({ currentUser, onSignIn, onSignOut, onGetStarted, onFaqOpen, onContactOpen, onClose }) => {
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
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <RefreshCw className="h-16 w-16 text-primary-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Refund & Cancellation Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: November 14, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Refund & No Cancellation Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Scrybe AI, we charge only a very nominal and minimal fee for our services to keep them accessible to everyone. Due to the low pricing and digital nature of our offering, <strong>we do not offer any refunds or cancellations once a payment is made</strong>.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>All purchases are final. No refunds will be issued under any circumstances.</li>
                <li>Once a payment is processed, it cannot be cancelled or reversed.</li>
                <li>We encourage you to review all details before making a payment.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact for Queries</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions or concerns about our policy, please contact us before making a payment. We are happy to clarify any details or address your queries:
              </p>
              <div className="mt-4 space-y-2 text-gray-700">
                <p><strong>Email:</strong> support@scrybeai.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Support Hours:</strong> Monday-Friday, 9:00 AM - 6:00 PM IST</p>
              </div>
            </section>
            <div className="bg-primary-50 rounded-2xl p-6 mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Important Note</h3>
              <p className="text-gray-700 leading-relaxed">
                By subscribing to Scrybe AI, you acknowledge and accept this strict no refund and no cancellation policy. This policy is subject to change, and we will notify you of any significant updates.
              </p>
            </div>
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

export default NewRefundPolicy;
