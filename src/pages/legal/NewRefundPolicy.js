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
              Last updated: November 7, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Subscription Cancellation</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may cancel your Scrybe AI subscription at any time through your account settings or by contacting our support team. Cancellation terms:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Cancellations take effect at the end of the current billing period</li>
                <li>You will continue to have access until the paid period ends</li>
                <li>No charges will be applied for subsequent billing periods</li>
                <li>You can reactivate your subscription at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Refund Eligibility</h2>
              <div className="bg-success-50 border-l-4 border-success-500 p-6 rounded-lg mb-4">
                <p className="text-gray-900 font-semibold mb-2">7-Day Money-Back Guarantee</p>
                <p className="text-gray-700 leading-relaxed">
                  We offer a 7-day money-back guarantee for new subscribers. If you're not satisfied with our service within the first 7 days of your initial subscription, you may request a full refund.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Refund eligibility criteria:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Request must be made within 7 days of initial subscription</li>
                <li>Applies only to first-time subscribers</li>
                <li>Does not apply to subscription renewals</li>
                <li>Account must not have been used for fraudulent activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Non-Refundable Situations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Refunds will NOT be provided in the following situations:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>After the 7-day money-back guarantee period has expired</li>
                <li>For subscription renewals (only initial subscriptions are eligible)</li>
                <li>If account has been suspended or terminated for violating our Terms of Service</li>
                <li>For trading losses or poor investment performance</li>
                <li>Due to market volatility or unfavorable market conditions</li>
                <li>If you simply changed your mind after the guarantee period</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How to Request a Refund</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To request a refund within the 7-day guarantee period:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
                <li>
                  <strong>Contact Support:</strong> Email support@scrybeai.com with subject "Refund Request"
                </li>
                <li>
                  <strong>Provide Information:</strong> Include your account email, subscription date, and reason for refund
                </li>
                <li>
                  <strong>Verification:</strong> Our team will verify your eligibility within 2 business days
                </li>
                <li>
                  <strong>Processing:</strong> Approved refunds are processed within 5-7 business days
                </li>
                <li>
                  <strong>Confirmation:</strong> You will receive an email confirmation once the refund is processed
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Processing Time</h2>
              <p className="text-gray-700 leading-relaxed">
                Once approved, refunds are typically processed as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Credit/Debit Cards:</strong> 5-7 business days</li>
                <li><strong>UPI/Net Banking:</strong> 3-5 business days</li>
                <li><strong>Digital Wallets:</strong> 2-3 business days</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Note: Actual refund time may vary depending on your payment provider and bank processing times.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Partial Refunds</h2>
              <p className="text-gray-700 leading-relaxed">
                Partial refunds are not provided. Our 7-day guarantee offers a full refund only. For subscription periods beyond 7 days, you may cancel to avoid future charges, but no partial refunds will be issued for unused time in the current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Technical Issues</h2>
              <p className="text-gray-700 leading-relaxed">
                If you experience technical issues that prevent you from using our platform:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Contact our support team immediately at support@scrybeai.com</li>
                <li>We will work to resolve the issue promptly</li>
                <li>If we cannot resolve the issue within 48 hours, you may be eligible for a prorated refund</li>
                <li>Document the issue with screenshots or error messages when possible</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Subscription Upgrades and Downgrades</h2>
              <p className="text-gray-700 leading-relaxed">
                If you upgrade or downgrade your subscription:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Upgrades:</strong> You will be charged the prorated difference immediately</li>
                <li><strong>Downgrades:</strong> Changes take effect at the end of the current billing period</li>
                <li>No refunds are provided for downgrades</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Promotional Offers and Discounts</h2>
              <p className="text-gray-700 leading-relaxed">
                Subscriptions purchased with promotional discounts or special offers are still eligible for the 7-day money-back guarantee. However, if you cancel and later re-subscribe, promotional pricing will not be reapplied.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about refunds or cancellations, please contact us:
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
                By subscribing to Scrybe AI, you acknowledge that you have read and understood this Refund & Cancellation Policy. This policy is subject to change, and we will notify you of any significant updates.
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
