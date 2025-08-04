import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const TermsPage = ({ onBack }) => {
    const summaryPoints = [
        "Our service provides informational, AI-generated analysis and is NOT financial advice.",
        "You are 100% responsible for all your trading and investment decisions and any resulting profits or losses.",
        "We provide the service 'as-is' without any warranties of accuracy or uptime.",
        "Do not misuse the service or attempt to access our systems unlawfully."
    ];

    return (
        <LegalPageLayout title="Terms & Conditions" lastUpdated="July 31, 2025" onBack={onBack} summaryPoints={summaryPoints}>
            <h2>1. Agreement to Terms</h2>
            <p>By accessing or using Scrybe AI (the "Service"), you agree to be bound by these Terms & Conditions. If you disagree with any part of the terms, then you may not access the Service.</p>

            <h2 className="text-red-600">2. No Financial Advice Disclaimer</h2>
            <p><strong>The content and data provided by Scrybe AI are for informational and educational purposes only. It is not, and should not be construed as, financial advice, investment advice, trading advice, or a recommendation to buy or sell any security.</strong> The AI-generated analysis is based on historical data and models which may not predict future results. You must conduct your own research and consult with a qualified financial professional before making any investment decisions. You alone assume the sole responsibility of evaluating the merits and risks associated with the use of any information provided by the Service.</p>

            <h2>3. Use of the Service</h2>
            <p>You agree not to use the Service for any unlawful purpose. You agree not to misuse the Service, including but not limited to, attempting to gain unauthorized access to our systems, scraping data, or engaging in any activity that disrupts or impairs the functionality of the Service.</p>
            
            <h2>4. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Scrybe AI and its licensors. The Service is protected by copyright, trademark, and other laws.</p>

            <h2>5. Disclaimer of Warranties</h2>
            <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the accuracy, timeliness, reliability, or completeness of the information provided. We do not warrant that the Service will be uninterrupted or error-free.</p>

            <h2>6. Limitation of Liability</h2>
            <p>In no event shall Scrybe AI, nor its directors or employees, be liable for any financial losses or any indirect, incidental, special, or consequential damages resulting from your access to or use of the Service.</p>

            <h2>7. Changes to Terms</h2>
            <p>We reserve the right to modify or replace these Terms at any time. We will provide notice by posting the new Terms & Conditions on this page and updating the "Last Updated" date.</p>

            <h2>8. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us through the "Feedback" widget on our application.</p>
        </LegalPageLayout>
    );
};

export default TermsPage;