import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const PrivacyPolicyPage = ({ onBack }) => {
    const summaryPoints = [
        "We only collect information you voluntarily provide through feedback or testimonials.",
        "We also collect anonymous usage data to help us improve the app.",
        "We will never sell your personal information to third parties.",
        "You can contact us via the Feedback widget with any privacy questions."
    ];

    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="July 31, 2025" onBack={onBack} summaryPoints={summaryPoints}>
            <h2>1. Introduction</h2>
            <p>Welcome to Scrybe AI ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways, including:</p>
            <ul>
                <li><strong>Feedback Information:</strong> When you submit feedback, testimonials, or questions, we may collect your name, email address (if provided), and the content of your message. This is used solely to communicate with you about your submission.</li>
                <li><strong>Usage Data:</strong> We may automatically collect anonymous, standard usage information, such as your IP address and browser type, for analytical purposes to improve our Service's performance and stability.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Operate and maintain the Service.</li>
                <li>Improve our application and user experience.</li>
                <li>Respond to your feedback and support requests.</li>
                <li>Monitor and analyze usage and trends to enhance security and performance.</li>
            </ul>
            
            <h2>4. Disclosure of Your Information</h2>
            <p>We do not share, sell, rent, or trade your personal information with third parties for their marketing or commercial purposes. We may share data with third-party service providers only as necessary to provide and improve our own Service (e.g., our cloud hosting provider).</p>
            
            <h2>5. Data Security</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the information you provide, no security measures are perfect or impenetrable.</p>

            <h2>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us through the "Feedback" widget on our application.</p>
        </LegalPageLayout>
    );
};

export default PrivacyPolicyPage;