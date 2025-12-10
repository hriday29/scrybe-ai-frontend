// src/pages/legal/NewTermsOfService.js
import React from 'react';
import { motion } from 'framer-motion';
import NewHeader from '../../components/layout/NewHeader';
import NewFooter from '../../components/layout/NewFooter';

const NewTermsOfService = ({ currentUser, onSignIn, onSignOut, onGetStarted, onFaqOpen, onContactOpen, onClose }) => {
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
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Effective Date: December 8, 2025
            </p>
            <p className="text-md text-gray-500">
              Version: 1.3 (Private Beta)
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. PREAMBLE</h2>
              <p className="text-gray-700 leading-relaxed">
                This Terms of Service ("Agreement") is a binding legal contract between you ("User") and <strong>BluOryn Technologies Private Limited</strong> ("Company"), the owner and operator of the Scrybe AI platform ("Platform").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. PRIVATE BETA NOTICE & RISK WARNING</h2>
              <div className="bg-warning-50 border-l-4 border-warning-500 p-6 rounded-lg mb-4">
                <p className="text-gray-900 font-semibold mb-2">⚠️ WARNING</p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  This Platform is in a "Private Beta" phase. It uses experimental Artificial Intelligence (AI) and Machine Learning (ML) algorithms.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Not Financial Advice:</strong> The Platform provides data analysis, NOT investment advice. You acknowledge that the Company does not owe you any fiduciary duty, and no relationship akin to that of an investment adviser, broker, agent, or portfolio manager is established by your use of the Platform.</li>
                <li><strong>High Risk:</strong> Trading in securities involves high risk. You acknowledge that AI models can hallucinate, produce errors, or fail to adapt to market volatility.</li>
                <li><strong>User Responsibility:</strong> You are solely responsible for your trading decisions. The Company accepts NO liability for any financial losses incurred.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. NON-CIRCUMVENTION & NON-DISCLOSURE (NCND)</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>3.1. Confidentiality:</strong> As a Beta tester, you acknowledge that the Platform's interface, proprietary indicators (including specific algorithmic combinations and UI layouts), and model outputs are confidential trade secrets of the Company.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>3.2. No Disclosure:</strong> You agree NOT to publish, post, or share screenshots, video recordings, or specific data outputs on public forums or social media without prior written consent.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>3.3. No Reverse Engineering:</strong> You shall not attempt to reverse engineer, decompile, or clone the algorithms used by the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. INTELLECTUAL PROPERTY & OWNERSHIP</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>4.1. Company Ownership:</strong> All algorithms, scoring systems, data structures, UI layouts, and analytical outputs are the exclusive intellectual property of the Company.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>4.2. Limited License:</strong> You receive a revocable, non-transferable, non-exclusive right to access the outputs for your personal use. No ownership rights are transferred to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. ACCEPTABLE USE</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>5.1. Personal Use Only:</strong> The Service is strictly for your personal usage (managing your own trading account). It does not permit commercial redistribution.
              </p>
              <div className="text-gray-700 leading-relaxed mb-3">
                <p className="font-semibold mb-2">5.2. No Reselling:</p>
                <p className="mb-2">You may not act as a "Sub-Advisor" by redistributing the Company's analysis to third parties for a fee or for free.</p>
                <p><strong>Exception:</strong> Users who have signed a separate "Authorized Partner Agreement" or "Research Analyst Integration Agreement" may redistribute content strictly in accordance with that separate agreement.</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>5.3. Influencer Restriction:</strong> Social media influencers must execute a separate "Promoter Agreement." Promoting this Platform without such an agreement is a violation of these Terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>5.4. Minors Prohibited:</strong> The Platform is not intended for individuals below 18 years of age. By accessing the Platform, you represent that you are at least 18 years old.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. SECURITY & PROHIBITED ACTIVITIES (ANTI-ABUSE)</h2>
              <div className="text-gray-700 leading-relaxed mb-4">
                <p className="font-semibold mb-2">6.1. Prohibited Technical Attacks:</p>
                <p className="mb-2">You agree NOT to engage in any of the following activities:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Scraping:</strong> Accessing the Platform via automated means (bots, spiders, scrapers, scripts) to extract data, "monitor" availability, or bypass the user interface.</li>
                  <li><strong>Denial of Service (DoS):</strong> Flooding the Platform with requests, probing, scanning, or testing the vulnerability of the system or network (Penetration Testing) without express written permission.</li>
                  <li><strong>Injection & Hacking:</strong> Attempting to inject malicious code (SQL injection, XSS), viruses, trojans, or malware into the Platform.</li>
                  <li><strong>Credential Abuse:</strong> Using stolen credentials, brute-force methods, or "credential stuffing" to access accounts.</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>6.2. Bot Traffic:</strong> The Company reserves the right to block any IP address or user agent that exhibits "non-human" behavior patterns.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>6.3. Violation Consequence:</strong> Breach of this Clause 6 is a criminal offense under the Information Technology Act, 2000. We will report such breaches to law enforcement authorities and claim damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. TERMINATION</h2>
              <p className="text-gray-700 leading-relaxed">
                The Company may suspend or terminate your access at any time for breach of these Terms, suspected misuse, regulatory risk, or maintenance reasons, with or without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. DISCLAIMER OF WARRANTIES</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." THE COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>NO PROFIT GUARANTEE:</strong> WE DO NOT GUARANTEE THAT THE ALGORITHMS, SIGNALS, INDICATORS, OR RESEARCH OUTPUTS WILL BE PROFITABLE, ACCURATE, OR ERROR-FREE. PAST PERFORMANCE OF ANY MODEL IS NOT INDICATIVE OF FUTURE RESULTS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. FORCE MAJEURE</h2>
              <p className="text-gray-700 leading-relaxed">
                The Company shall not be liable for any failure or delay due to events beyond reasonable control including natural disasters, pandemics, cyberattacks, exchange outages, cloud provider failures (AWS/Azure), or government restrictions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. INDEMNIFICATION</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                You agree to indemnify and hold BluOryn Technologies Pvt Ltd harmless from any claims, damages, or regulatory penalties arising out of:
              </p>
              <ul className="list-none space-y-1 text-gray-700 ml-4">
                <li>(a) Your misuse of the Platform;</li>
                <li>(b) Your violation of SEBI regulations (e.g., providing unregistered advice using our tool);</li>
                <li>(c) Your breach of the NCND obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. SANCTIONS & EXPORT CONTROL</h2>
              <p className="text-gray-700 leading-relaxed">
                You represent and warrant that you are not located in, under the control of, or a national or resident of any country to which India, the United Nations, or the United States has embargoed goods or services (e.g., Iran, North Korea). You agree not to use the Platform for any purpose prohibited by applicable export control laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. GOVERNING LAW & JURISDICTION</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>12.1. Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of India.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>12.2. Jurisdiction:</strong> Any disputes arising from these Terms or the Platform shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>12.3. Class Action Waiver:</strong> By participating in the Private Beta, you waive any right to bring claims, class actions, or damages arising from the use, performance, availability, or accuracy of the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. GENERAL PROVISIONS</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>13.1. Severability:</strong> If any provision of this Agreement is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>13.2. Entire Agreement:</strong> This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements or understandings.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>13.3. Waiver:</strong> No waiver of any term shall be deemed a further or continuing waiver of such term.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>13.4. Amendments:</strong> We may update these terms at any time. Continued use of the service constitutes acceptance of the new terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>13.5. Notices:</strong> Legal notices should be sent to <a href="mailto:legal@scrybeai.com" className="text-primary-500 hover:underline">legal@scrybeai.com</a>.
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

export default NewTermsOfService;
