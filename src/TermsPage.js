import React from 'react';
import { motion } from 'framer-motion';

const TermsPage = ({ onBack }) => {
    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <button onClick={onBack} className="text-blue-600 font-semibold mb-8 sticky top-8">← Back to Main Site</button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-5xl font-bold text-center mb-4">Terms & Conditions</h1>
                    <p className="text-center text-gray-500 mb-12">Last Updated: July 31, 2025</p>

                    <div className="prose lg:prose-lg max-w-none text-gray-700">
                        <h2>1. Agreement to Terms</h2>
                        <p>By accessing or using Scrybe AI (the "Service"), you agree to be bound by these Terms & Conditions. If you disagree with any part of the terms, then you may not access the Service.</p>

                        <h2 className="text-red-600">2. No Financial Advice</h2>
                        <p><strong>The information provided by Scrybe AI is for informational and educational purposes only. It is not, and should not be construed as, financial advice, investment advice, trading advice, or any other sort of advice.</strong> You should not make any decision, financial, investment, trading or otherwise, based on any of the information presented by this Service without undertaking independent due diligence and consultation with a professional financial advisor.</p>

                        <h2>3. Use of the Service</h2>
                        <p>You agree not to use the Service for any unlawful purpose or in any way that might harm, damage, or disparage any other party. You agree not to misuse the Service, including but not limited to, attempting to gain unauthorized access to our systems or engaging in any activity that disrupts, diminishes the quality of, interferes with the performance of, or impairs the functionality of the Service.</p>
                        
                        <h2>4. Intellectual Property</h2>
                        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Scrybe AI and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.</p>

                        <h2>5. Disclaimer of Warranties</h2>
                        <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the accuracy, reliability, or completeness of the information provided. We do not warrant that the Service will be uninterrupted, error-free, or secure.</p>

                        <h2>6. Limitation of Liability</h2>
                        <p>In no event shall Scrybe AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                        <h2>7. Changes to Terms</h2>
                        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms & Conditions on this page and updating the "Last Updated" date.</p>

                        <h2>8. Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us through the "Feedback" widget on our application.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsPage;