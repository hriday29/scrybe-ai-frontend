import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const PrivacyPolicyPage = ({ onBack }) => {
    const summaryPoints = [
        "We only collect information you voluntarily provide through feedback or testimonials.",
        "We also collect anonymous usage data to help us improve the app.",
        "Beta testing may involve additional data collection for debugging purposes.",
        "We will never sell your personal information to third parties.",
        "You can contact us via the Feedback widget with any privacy questions."
    ];

    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="July 31, 2025" onBack={onBack} summaryPoints={summaryPoints}>
            <h2>1. Introduction</h2>
            <p>Welcome to Scrybe AI ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>
            
            <p><strong>Beta Software Notice:</strong> This application is currently in beta testing. During this phase, we may collect additional diagnostic and performance data to identify and fix issues. All data collection practices described in this policy apply to our beta version.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways, including:</p>
            <ul>
                <li><strong>Feedback Information:</strong> When you submit feedback, testimonials, or questions, we may collect your name, email address (if provided), and the content of your message. This is used solely to communicate with you about your submission.</li>
                <li><strong>Usage Data:</strong> We may automatically collect anonymous, standard usage information, such as your IP address and browser type, for analytical purposes to improve our Service's performance and stability.</li>
                <li><strong>Beta Testing Data:</strong> During our beta phase, we may collect additional technical data including error logs, crash reports, and performance metrics to help us identify and resolve issues. This data is anonymized and used solely for improving the application.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Operate and maintain the Service.</li>
                <li>Improve our application and user experience.</li>
                <li>Respond to your feedback and support requests.</li>
                <li>Monitor and analyze usage and trends to enhance security and performance.</li>
                <li>Debug issues and optimize performance during our beta testing phase.</li>
            </ul>
            
            <h2>4. Disclosure of Your Information</h2>
            <p>We do not share, sell, rent, or trade your personal information with third parties for their marketing or commercial purposes. We may share data with third-party service providers only as necessary to provide and improve our own Service (e.g., our cloud hosting provider, analytics services, or crash reporting tools).</p>
            
            <h2>5. Data Retention</h2>
            <p>We retain your information only as long as necessary to fulfill the purposes outlined in this Privacy Policy. Feedback and support communications are typically retained for up to 2 years. Anonymous usage and diagnostic data may be retained indefinitely for analytical purposes.</p>
            
            <h2>6. Data Security</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the information you provide, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against interception or misuse.</p>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including the right to access, update, or delete your data. To exercise these rights, please contact us through the Feedback widget.</p>

            <h2>8. Children's Privacy</h2>
            <p>Our Service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.</p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time, especially during the beta phase as we refine our Service. We will notify users of any material changes by updating the "Last Updated" date at the top of this policy. Your continued use of the Service after such changes constitutes acceptance of the updated policy.</p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us through the "Feedback" widget on our application.</p>
        </LegalPageLayout>
    );
};

export default PrivacyPolicyPage;