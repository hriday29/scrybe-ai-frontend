// src/pages/legal/NewPrivacyPolicy.js
import React from 'react';
import { motion } from 'framer-motion';
import NewHeader from '../../components/layout/NewHeader';
import NewFooter from '../../components/layout/NewFooter';

const NewPrivacyPolicy = ({ currentUser, onSignIn, onSignOut, onGetStarted, onFaqOpen, onContactOpen, onClose }) => {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Effective Date: December 8, 2025
            </p>
            <p className="text-md text-gray-500">
              Version: 1.2 (Private Beta)
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. INTRODUCTION & DATA FIDUCIARY</h2>
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy ("Policy") governs the collection, processing, and storage of personal data by <strong>BluOryn Technologies Private Limited</strong> ("Company," "We," "Us"), the owner and operator of the Scrybe AI platform ("Platform").
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                For the purposes of the Digital Personal Data Protection (DPDP) Act, 2023, the Company acts as the <strong>Data Fiduciary</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. DATA WE COLLECT</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect the following categories of personal data based on your interaction with the Platform:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.1. Identity & KYC Data (SEBI Alignment)</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Why:</strong> To verify identity, prevent fraud, and align with financial regulations (Anti-Money Laundering).
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>What:</strong> Full Name, Email Address, Phone Number.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Optional/Future:</strong> Permanent Account Number (PAN), Aadhaar Number (via DigiLocker or direct upload), and Government-issued ID proofs.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2. Financial & Transaction Data</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Why:</strong> To process subscriptions and comply with tax laws.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>What:</strong> Transaction IDs, Payment Dates, GSTIN (if applicable), and Billing Address.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Note:</strong> We DO NOT store your complete Credit/Debit card numbers. These are processed by PCI-DSS compliant aggregators (e.g., Razorpay, Stripe).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3. Trading & Behavioral Data (AI Training)</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Why:</strong> To provide analytics and train our AI/ML models.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>What:</strong> Your portfolio holdings, watchlists, search queries, feature usage patterns, and trading logs (if you sync a broker account).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.4. Technical Data</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Why:</strong> Security, fraud prevention, and platform optimization.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>What:</strong> IP Address, Device ID, Browser Type, Operating System, and Login locations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. PURPOSE OF PROCESSING</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By using the Platform, you explicitly consent to the processing of your data for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Service Delivery:</strong> To provide access to the Scrybe AI dashboards, indicators, and analysis tools.</li>
                <li><strong>AI Model Improvement:</strong> You acknowledge and agree that your anonymized trading patterns and feature usage data may be used to train, fine-tune, and improve the accuracy of our AI/ML algorithms.</li>
                <li><strong>Security & Fraud Prevention:</strong> To detect bot activity, multiple account abuse, and unauthorized access.</li>
                <li><strong>Legal Compliance:</strong> To comply with orders from SEBI, RBI, Courts, or Law Enforcement Agencies.</li>
                <li><strong>Communication:</strong> To send you transaction receipts, security alerts, and (with your opt-in) product updates.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. COOKIES & TRACKING</h2>
              <p className="text-gray-700 leading-relaxed">
                By using the Platform, you consent to the placement of cookies for analytics, performance optimization, and fraud prevention. We use cookies from third-party partners (e.g., Google Analytics, Meta Pixel) to understand user behavior. You may disable cookies in your browser settings, though this may limit certain functionalities of the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. SHARING & DISCLOSURE</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal data. We disclose data only in the following "Need-to-Know" circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Service Providers:</strong> Cloud infrastructure (AWS/Azure) and Payment Aggregators (Razorpay/Stripe) solely for operational purposes.</li>
                <li><strong>Identity Verification Partners:</strong> Third-party KYC providers (e.g., DigiLocker, CVL KRA) for authenticating your government IDs.</li>
                <li><strong>Legal Requirement:</strong> If required by Indian law, we will share data with government agencies (e.g., Income Tax Dept, FIU-IND) without prior notice to you.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. CROSS-BORDER DATA TRANSFER</h2>
              <p className="text-gray-700 leading-relaxed">
                Where data is transferred outside India for cloud storage or processing (e.g., to AWS servers in other regions), such transfer shall comply with the DPDP Act, 2023 and adequate safeguards shall be applied to ensure the security of your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. DATA RETENTION POLICY</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>General Data:</strong> We retain your account data as long as your account is active.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Financial & KYC Data:</strong> Notwithstanding any request for deletion, we are legally mandated to retain financial transaction records, invoices, and KYC documents for a minimum of eight (8) years to comply with the Prevention of Money Laundering Act (PMLA), 2002 and the Income Tax Act, 1961.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. YOUR RIGHTS</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a Data Principal, you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Right to Access:</strong> You may request a summary of the personal data we hold about you.</li>
                <li><strong>Right to Correction:</strong> You may request updates to inaccurate or incomplete data.</li>
                <li><strong>Right to Erasure (Right to be Forgotten):</strong> You may request the deletion of your data, subject to the mandatory retention periods defined in Clause 7.</li>
                <li><strong>Right to Grievance Redressal:</strong> You have the right to register a complaint regarding our data handling.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. SECURITY MEASURES</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security controls, including encryption in transit (TLS 1.2+), encryption at rest (AES-256), and strict access controls. However, no digital platform is 100% secure. You acknowledge that you provide data at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. GRIEVANCE OFFICER</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023, if you have any concerns regarding your data, you may contact our Grievance Officer:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-700">
                <p><strong>Name:</strong> Hriday Vig</p>
                <p><strong>Designation:</strong> Grievance Officer</p>
                <p><strong>Email:</strong> grievance@scrybeai.com</p>
                <p><strong>Address:</strong><br />
                  BluOryn Technologies Pvt Ltd,<br />
                  28/A 80 Feet Road, Micheal Palya,<br />
                  Indiranagar,<br />
                  Bangalore 560038,<br />
                  Karnataka India
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. CHANGES TO POLICY</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Policy to reflect changes in law or our data practices. Significant changes will be notified via email or a platform alert.
              </p>
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
