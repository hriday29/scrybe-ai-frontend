// src/pages/PrivacyPolicyPage.js

import React from "react";
import LegalPageLayout from "../components/layout/LegalPageLayout"; // Corrected path
import { Lock, Database, Users } from "lucide-react";

const PrivacyPolicyPage = ({ onBack }) => {
    // ... component code remains the same
    const summaryPoints = [
    "We collect only voluntary feedback and anonymized usage data.",
    "Beta testing may involve temporary diagnostic data collection.",
    "We never sell your personal information.",
    "You can request data access or deletion anytime.",
    "Contact us easily through the Feedback widget.",
  ];

  const Section = ({ number, title, children, icon, accent }) => (
    <div
      className={`p-6 rounded-2xl bg-white border ${
        accent || "border-gray-200"
      } shadow-soft-lg space-y-3`}
    >
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
        {icon}
        <span>
          {number}. {title}
        </span>
      </h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="July 31, 2025"
      onBack={onBack}
      summaryPoints={summaryPoints}
    >
      <div className="space-y-6">
        <Section number={1} title="Introduction" icon={<Lock className="w-5 h-5 text-blue-400" />}>
          <p>
            At <strong>Scrybe AI</strong>, we respect your privacy. This policy
            explains what data we collect, why, and how it’s used.
          </p>
        </Section>

        <Section
          number={2}
          title="Beta Software Notice"
          icon={<Database className="w-5 h-5 text-amber-400" />}
          accent="border-amber-500/40"
        >
          <p className="text-amber-700 dark:text-amber-300 font-medium">
            While in beta, we may collect extra diagnostic and performance data
            to improve stability and fix issues.
          </p>
        </Section>

        <Section number={3} title="Information We Collect" icon={<Users className="w-5 h-5 text-purple-400" />}>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Feedback:</strong> Info you provide voluntarily (e.g.,
              name, email, comments).
            </li>
            <li>
              <strong>Usage Data:</strong> Anonymous details like IP address,
              browser type, and interactions.
            </li>
            <li>
              <strong>Beta Data:</strong> Error logs, crash reports, performance
              metrics (anonymized).
            </li>
          </ul>
        </Section>

        <Section number={4} title="How We Use Data">
          <ul className="list-disc list-inside space-y-1">
            <li>Improve app performance and reliability</li>
            <li>Respond to feedback and support queries</li>
            <li>Enhance security and prevent abuse</li>
            <li>Fix bugs and optimize features during beta</li>
          </ul>
        </Section>

        <Section number={5} title="Data Sharing">
          <p>
            We never sell your data. Limited info may be shared with trusted
            providers (e.g., hosting, analytics) to operate the Service.
          </p>
        </Section>

        <Section number={6} title="Retention & Security">
          <p>
            Feedback may be retained for up to 2 years. Diagnostic data may be
            stored longer for analytics. We apply technical and administrative
            safeguards but cannot guarantee absolute security.
          </p>
        </Section>

        <Section number={7} title="Your Rights">
          <p>
            You may request access, correction, or deletion of your data at any
            time by contacting us via the Feedback widget.
          </p>
        </Section>

        <Section number={8} title="Children’s Privacy">
          <p>
            Our Service is not intended for users under 18. We do not knowingly
            collect children’s data. If discovered, it will be deleted promptly.
          </p>
        </Section>

        <Section number={9} title="Policy Updates">
          <p>
            We may update this Privacy Policy during beta. Updates will appear
            with the “Last Updated” date above.
          </p>
        </Section>

        <Section number={10} title="Contact Us">
          <p>
            Questions? Use the <strong>Feedback widget</strong> in the app to
            reach us directly.
          </p>
        </Section>
      </div>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;