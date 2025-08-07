import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const TermsPage = ({ onBack }) => {
    const summaryPoints = [
        "This is BETA software - expect bugs, downtime, and potential data loss.",
        "Our service provides informational, AI-generated analysis and is NOT financial advice.",
        "You are 100% responsible for all your trading and investment decisions and any resulting profits or losses.",
        "We provide the service 'as-is' without any warranties of accuracy or uptime.",
        "Do not misuse the service or attempt to access our systems unlawfully."
    ];

    return (
        <LegalPageLayout title="Terms & Conditions" lastUpdated="July 31, 2025" onBack={onBack} summaryPoints={summaryPoints}>
            <h2>1. Agreement to Terms</h2>
            <p>By accessing or using Scrybe AI (the "Service"), you agree to be bound by these Terms & Conditions. If you disagree with any part of the terms, then you may not access the Service.</p>

            <h2 className="text-amber-600">2. Beta Software Notice</h2>
            <p><strong>IMPORTANT: This application is currently in beta testing.</strong> This means:</p>
            <ul>
                <li>The Service may contain bugs, errors, or incomplete features</li>
                <li>Service availability is not guaranteed and may be interrupted without notice</li>
                <li>Data loss may occur, and we recommend not relying on the Service for critical decisions</li>
                <li>Features may change or be removed without prior notice</li>
                <li>Performance may be slower or less reliable than a production system</li>
            </ul>
            <p>By using this beta version, you acknowledge these limitations and agree to provide feedback to help us improve the Service.</p>

            <h2 className="text-red-600">3. No Financial Advice Disclaimer</h2>
            <p><strong>The content and data provided by Scrybe AI are for informational and educational purposes only. It is not, and should not be construed as, financial advice, investment advice, trading advice, or a recommendation to buy or sell any security.</strong> The AI-generated analysis is based on historical data and models which may not predict future results. You must conduct your own research and consult with a qualified financial professional before making any investment decisions. You alone assume the sole responsibility of evaluating the merits and risks associated with the use of any information provided by the Service.</p>

            <h2>4. User Eligibility</h2>
            <p>You must be at least 18 years old to use this Service. By using the Service, you represent and warrant that you meet this age requirement and have the legal capacity to enter into this agreement.</p>

            <h2>5. Account and Access</h2>
            <p>During the beta phase, access may be limited, restricted, or terminated at our discretion without notice. We may suspend or terminate your access for violation of these terms, technical issues, or for any reason related to the beta testing process.</p>

            <h2>6. Use of the Service</h2>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul>
                <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
                <li>Attempt to gain unauthorized access to our systems, servers, or networks</li>
                <li>Scrape, harvest, or collect data from the Service using automated tools</li>
                <li>Reverse engineer, decompile, or attempt to extract source code</li>
                <li>Share your access credentials with others</li>
                <li>Use the Service to make automated trading decisions without human oversight</li>
                <li>Engage in any activity that disrupts or impairs the functionality of the Service</li>
            </ul>
            
            <h2>7. Data and Privacy</h2>
            <p>Your use of the Service is also governed by our Privacy Policy. During the beta phase, we may collect additional diagnostic and usage data to improve the Service. All data practices are described in our Privacy Policy.</p>

            <h2>8. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Scrybe AI and its licensors. The Service is protected by copyright, trademark, and other laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>

            <h2>9. Beta Feedback and Suggestions</h2>
            <p>We welcome and encourage feedback during the beta phase. Any feedback, suggestions, or ideas you provide become our property and may be used to improve the Service without compensation or attribution to you.</p>

            <h2>10. Disclaimer of Warranties</h2>
            <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis, especially during the beta phase. We make no warranties, expressed or implied, regarding:</p>
            <ul>
                <li>The accuracy, timeliness, reliability, or completeness of information</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security or data protection</li>
                <li>Fitness for any particular purpose</li>
                <li>Compatibility with your systems or devices</li>
            </ul>

            <h2 className="text-red-600">11. Limitation of Liability</h2>
            <p><strong>MAXIMUM LIABILITY LIMITATION:</strong> In no event shall Scrybe AI, nor its directors, employees, or affiliates, be liable for any:</p>
            <ul>
                <li>Financial losses or trading losses of any kind</li>
                <li>Indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages resulting from Service interruptions, errors, or data loss</li>
                <li>Damages exceeding $100 USD in total</li>
            </ul>
            <p>This limitation applies regardless of the cause of action and even if we have been advised of the possibility of such damages.</p>

            <h2>12. Indemnification</h2>
            <p>You agree to indemnify and hold harmless Scrybe AI from any claims, damages, or expenses arising from your use of the Service, violation of these Terms, or infringement of any rights of another party.</p>

            <h2>13. Termination</h2>
            <p>We may terminate or suspend your access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties. The beta phase may end at any time without notice.</p>

            <h2>14. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of [Your Jurisdiction].</p>

            <h2>15. Changes to Terms</h2>
            <p>We reserve the right to modify or replace these Terms at any time, especially during the beta phase as we refine our Service. We will provide notice by posting the new Terms & Conditions on this page and updating the "Last Updated" date. Continued use after changes constitutes acceptance of the new Terms.</p>

            <h2>16. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us through the "Feedback" widget on our application.</p>
        </LegalPageLayout>
    );
};

export default TermsPage;