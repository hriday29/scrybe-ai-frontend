// src/pages/legal/NewDisclaimer.js
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import NewHeader from '../../components/layout/NewHeader';
import NewFooter from '../../components/layout/NewFooter';

const NewDisclaimer = ({ currentUser, onSignIn, onSignOut, onGetStarted, onClose }) => {
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
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-warning-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Risk Disclaimer
            </h1>
            <p className="text-lg text-gray-600">
              Important information about trading risks
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12 space-y-8">
            <div className="bg-warning-50 border-2 border-warning-500 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="h-6 w-6 text-warning-500 mr-2" />
                Critical Risk Warning
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Trading in stocks, derivatives, and other securities involves substantial risk of loss and is not suitable for all investors. You should carefully consider your financial situation, investment objectives, and risk tolerance before engaging in any trading activity.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Not Financial Advice</h2>
              <p className="text-gray-700 leading-relaxed">
                Scrybe AI provides algorithmic analysis and recommendations based on technical and fundamental data. <strong>This information is for educational and informational purposes only and does not constitute financial, investment, trading, or legal advice.</strong> You should not rely solely on our recommendations when making trading decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Past Performance</h2>
              <p className="text-gray-700 leading-relaxed">
                Past performance of any trading strategy, stock, or portfolio is not indicative of future results. Historical returns, backtested results, and simulated performance do not guarantee similar outcomes in live trading. Market conditions change continuously, and previously successful strategies may fail in different environments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Risk of Loss</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Trading involves significant risks, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Market Risk:</strong> Stock prices can fluctuate dramatically due to market conditions</li>
                <li><strong>Volatility Risk:</strong> High volatility can lead to rapid and substantial losses</li>
                <li><strong>Liquidity Risk:</strong> Inability to exit positions at desired prices</li>
                <li><strong>Leverage Risk:</strong> Magnified losses when using margin or derivatives</li>
                <li><strong>Systemic Risk:</strong> Market-wide events affecting all securities</li>
                <li><strong>Technical Risk:</strong> Platform outages or technical failures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. AI and Algorithm Limitations</h2>
              <p className="text-gray-700 leading-relaxed">
                Our AI-powered algorithms analyze vast amounts of data, but they are not infallible. Algorithms can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Make incorrect predictions based on changing market dynamics</li>
                <li>Be affected by data quality issues or anomalies</li>
                <li>Fail to account for unprecedented market events</li>
                <li>Not adapt quickly enough to rapid market changes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. No Guarantees</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Profitability or positive returns from our recommendations</li>
                <li>Accuracy or completeness of market data and analysis</li>
                <li>Uninterrupted or error-free platform availability</li>
                <li>Specific investment outcomes or performance levels</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Independent Decision Making</h2>
              <p className="text-gray-700 leading-relaxed">
                You are solely responsible for all trading decisions made using your account. <strong>We strongly recommend:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Conducting your own research and due diligence</li>
                <li>Consulting with qualified financial advisors</li>
                <li>Understanding the risks of each trade before execution</li>
                <li>Using appropriate position sizing and risk management</li>
                <li>Only trading with capital you can afford to lose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Regulatory Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                Scrybe AI is not a registered investment advisor, broker-dealer, or financial institution. Users are responsible for ensuring their trading activities comply with all applicable laws and regulations, including SEBI guidelines in India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                We integrate with third-party services for data feeds, brokerage connectivity, and payment processing. We are not responsible for the accuracy, reliability, or availability of these third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Acknowledgment</h2>
              <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  By using Scrybe AI, you acknowledge that you have read, understood, and accepted this disclaimer. You agree that you are using our platform at your own risk and that you will not hold Scrybe AI, its owners, employees, or affiliates liable for any trading losses or damages.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about this disclaimer, contact us at:
              </p>
              <div className="mt-4 space-y-2 text-gray-700">
                <p><strong>Email:</strong> support@scrybeai.com</p>
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

export default NewDisclaimer;
