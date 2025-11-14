// src/pages/legal/NewPaymentsPrivacy.js
import React from 'react';
import { motion } from 'framer-motion';
import NewHeader from '../../components/layout/NewHeader';
import NewFooter from '../../components/layout/NewFooter';

const NewPaymentsPrivacy = ({ currentUser, onSignIn, onSignOut, onGetStarted, onFaqOpen, onContactOpen, onClose }) => {
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
              Payments Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: November 15, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                This Payments Privacy Policy describes how we collect, use, and share your personal information in relation to the payment services we provide. This policy supplements our main Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect for Payments</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To process your payments, we collect the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Name, email address, and phone number.</li>
                <li>Billing address.</li>
                <li>Transaction details (but not your full card number).</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We may also collect data necessary to comply with anti-money laundering (AML) and Know Your Customer (KYC) obligations where required by law, including identity verification documents and records of transactions.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Your full payment card information is collected and processed directly by our third-party payment processors who are PCI-DSS compliant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Payment Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We use this information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Process your subscription payments.</li>
                <li>Prevent fraudulent transactions.</li>
                <li>Comply with legal and financial regulations.</li>
                <li>Send you payment-related communications.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Legal basis for processing: Where applicable, we process personal data to perform the contract with you (processing payments), to comply with legal obligations (e.g., tax reporting, AML), and for our legitimate interest (fraud prevention and platform security).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We share payment information with our payment processing partners to facilitate transactions. We may also share information with legal authorities if required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We and our payment partners implement robust security measures, including encryption and access controls, to protect your payment information.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Payment processors we use are PCI-DSS compliant. We do not store full card numbers on our servers; card details are tokenized and processed by our third-party providers. If you have specific questions about our processors' certifications, contact us.
              </p>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Data Protection Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Depending on your location, you may have the following rights regarding your personal data:
                </p>
                <h3 className="text-xl font-bold text-gray-800 mb-2 mt-4">DPDP Act (India)</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>The right to access, correct, and erase your data.</li>
                    <li>The right to grievance redressal.</li>
                </ul>
                <h3 className="text-xl font-bold text-gray-800 mb-2 mt-4">GDPR (European Economic Area)</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>The right to access, rectification, and erasure.</li>
                    <li>The right to restrict processing and the right to data portability.</li>
                    <li>The right to object to processing.</li>
                </ul>
                <h3 className="text-xl font-bold text-gray-800 mb-2 mt-4">CCPA/CPRA (California)</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>The right to know what personal information is being collected.</li>
                    <li>The right to delete personal information.</li>
                    <li>The right to opt-out of the sale or sharing of personal information.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                    You may exercise these rights by contacting our Data Protection Officer (DPO). We may require verification to fulfill your request. We will respond to the extent required by applicable law.
                </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain payment and transactional data for as long as necessary to provide services to you, comply with our legal obligations (including tax, accounting, or AML requirements), and for legitimate business purposes such as fraud prevention and dispute resolution. Retention periods may vary by jurisdiction and legal requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Breach Notification</h2>
              <p className="text-gray-700 leading-relaxed">
                In the unlikely event of a data breach affecting your payment or personal data, we will promptly investigate and notify you and regulators as required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Additional Compliance Notices</h2>
              <p className="text-gray-700 leading-relaxed">
                India: This Payments Privacy Policy also complies with India’s Digital Personal Data Protection (DPDP) Act, 2023. We are committed to following the applicable sections related to processing and retention of personal data.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                International: We also recognize rights under GDPR (EU/EEA residents) and CCPA/CPRA (California residents). If you are located in these regions, the relevant sections above apply in addition to the DPDP act.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Financial compliance: Payments are subject to local laws such as the Payment and Settlement Systems Act, 2007 (India) and anti-money laundering laws (e.g., Prevention of Money Laundering Act, 2002). We may be required to retain records and share them with regulators as required.
              </p>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed">
                    Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. We will take all steps reasonably necessary to ensure that your data is treated securely.
                </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Payments Privacy Policy, please contact our Data Protection Officer at:
              </p>
              <div className="mt-4 space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@scrybeai.com</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>

      <NewFooter />
    </div>
  );
};

export default NewPaymentsPrivacy;
