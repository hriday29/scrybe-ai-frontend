// src/pages/legal/NewPaymentsTerms.js
import React from 'react';
import { motion } from 'framer-motion';
import NewHeader from '../../components/layout/NewHeader';
import NewFooter from '../../components/layout/NewFooter';

const NewPaymentsTerms = ({ currentUser, onSignIn, onSignOut, onGetStarted, onFaqOpen, onContactOpen, onClose, onRefundOpen, onPaymentsTermsOpen, onPaymentsPrivacyOpen, onLegalNoticeOpen, onPrivacyOpen, onTermsOpen }) => {
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
              Effective Date: December 7, 2025
            </p>
            <p className="text-md text-gray-500">
              Version: 1.3 (Private Beta)
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. PARTIES AND ACCEPTANCE</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>1.1. The Service Provider:</strong> This Platform ("Scrybe AI") is owned, operated, and maintained by <strong>BluOryn Technologies Private Limited</strong>, a company incorporated under the Companies Act, 2013, with its registered office in India (hereinafter "Company", "We", "Us").
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>1.2. Acceptance:</strong> By purchasing a subscription or making any payment, you ("User") agree to be bound by these Payments Terms & Conditions, which supplement our Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. NATURE OF SERVICE (PRIVATE BETA)</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>2.1. Software Access Only:</strong> You acknowledge that your subscription fee is paid solely for access to data analytics and visualization software. The Company is a technology provider, not a SEBI-registered Investment Adviser (IA) or Research Analyst (RA).
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>2.2. No Investment Advice:</strong> The Platform provides algorithmic outputs based on AI/ML models. These outputs do not constitute "Investment Advice," "Buy/Sell Recommendations," or "Research Reports" as defined under SEBI regulations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>2.3. Experimental Nature:</strong> You acknowledge that the Platform is in a Private Beta (Testing) phase. The software may contain bugs, errors, or inaccuracies. You are paying for early access to experimental technology, not a guaranteed service level.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. SUBSCRIPTION AND LICENSE</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>3.1. Grant of Rights:</strong> Upon payment, the Company grants you a limited, non-exclusive, non-transferable, revocable right to access the Platform for your personal use.
              </p>
              <div className="text-gray-700 leading-relaxed mb-3">
                <p className="font-semibold mb-2">3.2. Strictly Personal Use (Revenue Protection):</p>
                <p className="mb-2">You are strictly prohibited from redistributing, broadcasting, sub-licensing, or selling the Platform's analysis, charts, or indicators to any third party.</p>
                <p className="mb-2"><strong>Exception:</strong> Registered Research Analysts (RAs) or Partners may be exempted from this clause only if they execute a separate Commercial Partnership Agreement with the Company.</p>
                <p><strong>Violation Policy:</strong> Any unauthorized redistribution will result in immediate termination without refund and legal action for damages.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. BILLING AND RBI COMPLIANCE</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>4.1. Recurring Mandates:</strong> Subscriptions are billed on a recurring basis. By purchasing, you grant a standing instruction (e-mandate) for automatic debit.
              </p>
              <div className="text-gray-700 leading-relaxed mb-3">
                <p className="font-semibold mb-2">4.2. RBI Guidelines:</p>
                <p className="mb-2">In compliance with Reserve Bank of India (RBI) regulations:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>An Additional Factor of Authentication (AFA) is required to set up the mandate.</li>
                  <li>You will receive a pre-debit notification (via email/SMS) at least 24 hours prior to any deduction.</li>
                  <li>Transactions exceeding regulatory limits (e.g., ₹15,000) may require OTP authentication for renewal.</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>4.3. Price Changes:</strong> We reserve the right to modify subscription fees with at least 30 days' prior notice. Your continued use of the Platform after the fee change constitutes your agreement to the new fees.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>4.4. Chargebacks & Disputes:</strong> You agree to reimburse the Company for any penalty fees incurred due to invalid chargebacks or payment disputes initiated by you without prior resolution with our support team.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>4.5. Payment Failure:</strong> It is your responsibility to ensure your payment method supports e-mandates. Failure to authorize a transaction may result in service suspension.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. CORPORATE AND ENTITY USERS</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>5.1. Representation:</strong> If you subscribe using a business email (e.g., name@company.com), you represent that you have the authority to bind that entity.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>5.2. Joint Liability:</strong> In the event the entity disclaims authorization, the individual user accessing the account shall be personally liable for all fees.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>5.3. Deemed Authorization:</strong> We are entitled to treat activity under a corporate domain as fully authorized by that corporation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. REFUND AND CANCELLATION POLICY</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>6.1. No Refunds:</strong> Due to the digital nature of the service and immediate incurrence of compute/API costs, all sales are final. We do not offer refunds for "change of mind" or model performance.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>6.2. No Cooling-Off Period:</strong> You waive any right to a "cooling-off" period as service delivery (compute allocation) is immediate.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>6.3. Force Majeure:</strong> We do not offer refunds for downtime caused by third-party providers (AWS, Azure, Google Cloud). In the event of a catastrophic failure preventing access for &gt;72 continuous hours, the Company may, at its sole discretion, issue a pro-rata service credit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. TAXES</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>7.1.</strong> Fees are exclusive of taxes.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>7.2. GST:</strong> Where applicable, Goods and Services Tax (GST) at the prevailing rate (currently 18%) will be charged. Compliant tax invoices will be issued upon request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. LIMITATION OF LIABILITY</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>8.1.</strong> To the fullest extent permitted by law, the Company's total financial liability for any claim shall be limited to the amount you have actually paid to us in the preceding 3 months.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>8.2.</strong> Under no circumstances shall the Company be liable for trading losses, lost profits, or indirect damages resulting from your use of the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. DATA PROTECTION & FINANCIAL REGULATIONS</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>9.1. PCI-DSS Compliance:</strong> The Company does not store or process your complete credit/debit card numbers. All financial transactions are processed by third-party Payment Aggregators (e.g., Razorpay, Stripe) who are PCI-DSS Level 1 compliant. The Company only retains transaction metadata (e.g., Transaction ID, Status, Amount) for reconciliation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>9.2. Data Retention (Regulatory Compliance):</strong> Notwithstanding your rights under the Digital Personal Data Protection (DPDP) Act, 2023, you acknowledge that the Company is legally required to retain transaction records, invoices, and payment history for a minimum period of eight (8) years (or such other period as prescribed) to comply with the Income Tax Act, 1961 and Prevention of Money Laundering Act (PMLA).
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>9.3. Purpose Limitation:</strong> Your payment data is collected solely for the purposes of billing, tax compliance, fraud prevention, and user authentication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. GOVERNING LAW</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. CONTACT</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p><strong>Grievance Officer:</strong> In accordance with the Information Technology Act, 2000, you can contact our Grievance Officer at <a href="mailto:grievance@scrybeai.app" className="text-primary-500 hover:underline">grievance@scrybeai.app</a></p>
                <p><strong>Billing Queries:</strong> <a href="mailto:payments@scrybeai.app" className="text-primary-500 hover:underline">payments@scrybeai.app</a></p>
              </div>
            </section>
          </div>

          {/* Back Button */}
          {onClose && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  onClose();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
              >
                Back to Home
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer with callbacks so links from within a legal page can open other legal pages */}
      <NewFooter
        onPrivacyOpen={() => { if (onClose) onClose(); if (onPrivacyOpen) onPrivacyOpen(); }}
        onTermsOpen={() => { if (onClose) onClose(); if (onTermsOpen) onTermsOpen(); }}
        onPaymentsTermsOpen={() => { if (onClose) onClose(); if (onPaymentsTermsOpen) onPaymentsTermsOpen(); }}
        onPaymentsPrivacyOpen={() => { if (onClose) onClose(); if (onPaymentsPrivacyOpen) onPaymentsPrivacyOpen(); }}
        onLegalNoticeOpen={() => { if (onClose) onClose(); if (onLegalNoticeOpen) onLegalNoticeOpen(); }}
      />
    </div>
  );
};

export default NewPaymentsTerms;
