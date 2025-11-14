// src/pages/legal/NewPaymentsTerms.js
import React from 'react';
import { motion } from 'framer-motion';
import NewHeader from '../../components/layout/NewHeader';
import NewFooter from '../../components/layout/NewFooter';

const NewPaymentsTerms = ({ currentUser, onSignIn, onSignOut, onGetStarted, onFaqOpen, onContactOpen, onClose }) => {
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Payments Terms & Conditions
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: November 15, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Payments Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By making a payment for Scrybe AI's services, you agree to be bound by these Payments Terms & Conditions. These terms supplement our general Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service and Subscription</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are purchasing a subscription for access to Scrybe AI's algorithmic trading analysis platform. The features and services included in your subscription are detailed on our pricing page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Billing and Payment</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Subscriptions are billed in advance on a recurring basis (e.g., monthly, annually).</li>
                <li>You authorize us to charge your selected payment method for the subscription fees.</li>
                <li>It is your responsibility to keep your payment information current.</li>
              </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Auto-Renewal: Subscriptions may auto-renew at the end of each billing period unless canceled prior to renewal. You will be notified of upcoming renewals where reasonably possible.
                </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pricing and Taxes</h2>
              <p className="text-gray-700 leading-relaxed">
                All prices are listed in Indian Rupees (INR) unless otherwise stated. You are responsible for any applicable taxes, including GST, which will be added to your subscription fee.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund and Cancellation Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We adhere to a strict <strong>no-refund and no-cancellation policy</strong> due to the digital nature of our services and our nominal pricing. Please review our full <a href="/legal/refund-policy" className="text-primary-500 hover:underline">Refund Policy</a> for details.
              </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Chargebacks: Initiating a chargeback without contacting customer support may result in account suspension and collection activity. If you believe a charge is incorrect, please contact payments@scrybeai.com so we can investigate.
                </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Failed Payments and Chargebacks</h2>
              <p className="text-gray-700 leading-relaxed">
                If your payment fails, we may suspend your access to the services until payment is successfully processed. Initiating a chargeback without first contacting us to resolve an issue will be considered a breach of these terms and may result in the termination of your account.
              </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Compliance and Anti-Money Laundering: For certain transactions, we may ask for additional information to satisfy legal requirements (KYC/AML). We reserve the right to refuse or freeze transactions that appear to be linked to illegal activities.
                </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Payment Processors</h2>
              <p className="text-gray-700 leading-relaxed">
                We use third-party payment processors (e.g., Razorpay, Stripe) to handle transactions. We do not store your full credit card or debit card information. Your payment is subject to the terms and privacy policies of these third-party processors.
              </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  We use third-party processors that follow strict security standards (including PCI-DSS). Depending on your location, additional local laws or processing terms may apply (e.g., RBI regulations for India).
                </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Compliance with Laws</h2>
                 <p className="text-gray-700 leading-relaxed">
                     You agree to use our payment services in compliance with all applicable laws, including but not limited to the Indian Information Technology Act, 2000, and the Payment and Settlement Systems Act, 2007. You may not use our services for any unlawful activities, including money laundering or funding of illegal activities.
                 </p>
            </section>
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Taxes</h2>
                <p className="text-gray-700 leading-relaxed">
                  You are responsible for any taxes that may apply to your purchase, including applicable Goods and Services Tax (GST) if you are an India-based user, and any other sales, value-added, or withholding taxes required by your local tax authorities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  To the fullest extent permitted by law, Scrybe AI’s financial liability for any payment-related claims will be limited to the amount you have paid to us in the preceding 12 months. This does not exclude liability where prohibited by law.
                </p>
              </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
                 <p className="text-gray-700 leading-relaxed">
                    In no event shall Scrybe AI be liable for any damages whatsoever, including but not limited to any direct, indirect, special, incidental, or consequential damages, arising out of or in connection with your use of or inability to use our payment services.
                 </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These payment terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                For any questions regarding payments, please contact us at:
              </p>
              <div className="mt-4 space-y-2 text-gray-700">
                <p><strong>Email:</strong> payments@scrybeai.com</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>

      <NewFooter />
    </div>
  );
};

export default NewPaymentsTerms;
