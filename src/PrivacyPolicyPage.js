import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = ({ onBack }) => {
    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <button onClick={onBack} className="text-blue-600 font-semibold mb-8 sticky top-8">← Back to Main Site</button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-5xl font-bold text-center mb-4">Privacy Policy</h1>
                    <p className="text-center text-gray-500 mb-12">Last Updated: July 31, 2025</p>

                    <div className="prose lg:prose-lg max-w-none text-gray-700">
                        <h2>1. Introduction</h2>
                        <p>Welcome to Scrybe AI ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. By using Scrybe AI, you agree to the collection and use of information in accordance with this policy.</p>

                        <h2>2. Information We Collect</h2>
                        <p>We may collect information about you in a variety of ways. The information we may collect on the Service includes:</p>
                        <ul>
                            <li><strong>Feedback Information:</strong> When you submit feedback, testimonials, or questions through our Feedback Widget, we may collect your name, email address (if provided), and the content of your message.</li>
                            <li><strong>Usage Data:</strong> We may automatically collect standard usage information, such as your IP address, browser type, and the pages of our Service that you visit. This data is used for analytical purposes to improve our Service.</li>
                        </ul>

                        <h2>3. How We Use Your Information</h2>
                        <p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:</p>
                        <ul>
                            <li>Improve our application and user experience.</li>
                            <li>Respond to your feedback, questions, and support requests.</li>
                            <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
                            <li>Potentially display user testimonials on the site, using only the content of the message and a first name, with your explicit permission if an email was provided.</li>
                        </ul>
                        
                        <h2>4. Disclosure of Your Information</h2>
                        <p>We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes.</p>

                        <h2>5. Security of Your Information</h2>
                        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

                        <h2>6. Changes to This Privacy Policy</h2>
                        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

                        <h2>7. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us through the "Feedback" widget on our application.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;