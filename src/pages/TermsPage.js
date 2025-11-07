import React from "react";
import LegalPageLayout from "../components/layout/LegalPageLayout";
import { AlertTriangle, Shield, FileText } from "lucide-react";

const TermsPage = ({ onBack }) => {
  const summaryPoints = [
    "⚠ Beta software: expect bugs, downtime, and possible data loss.",
    "Scrybe AI provides AI-generated analysis — not financial advice.",
    "You are fully responsible for all trading and investment decisions.",
    "The service is provided 'as-is' with no guarantees.",
    "Misuse, unlawful access, or abuse of the system is prohibited.",
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
      title="Terms & Conditions"
      lastUpdated="July 31, 2025"
      onBack={onBack}
      summaryPoints={summaryPoints}
    >
      <div className="space-y-6">
        <Section number={1} title="Agreement to Terms" icon={<FileText className="w-5 h-5 text-blue-400" />}>
          <p>
            By using Scrybe AI (the “Service”), you agree to these Terms &
            Conditions. If you disagree with any part, do not use the Service.
          </p>
        </Section>

        <Section
          number={2}
          title="Beta Software Notice"
          icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
          accent="border-amber-500/40"
        >
          <p className="text-amber-300 font-medium">
            This application is in beta. Limitations include:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Bugs, errors, or incomplete features</li>
            <li>Service interruptions without notice</li>
            <li>Potential data loss</li>
            <li>Features may change or be removed</li>
            <li>Performance may be slower or unstable</li>
          </ul>
        </Section>

        <Section
          number={3}
          title="No Financial Advice"
          icon={<Shield className="w-5 h-5 text-red-400" />}
          accent="border-red-500/40"
        >
          <p>
            <strong>
              All content is for informational purposes only — not financial
              advice.
            </strong>{" "}
            AI-generated insights are not investment recommendations. Always do
            your own research and consult a licensed professional.
          </p>
        </Section>

        <Section number={4} title="User Eligibility">
          <p>You must be at least 18 years old to use this Service.</p>
        </Section>

        <Section number={5} title="Acceptable Use">
          <ul className="list-disc list-inside space-y-1">
            <li>No unlawful activity or data misuse</li>
            <li>No unauthorized access or scraping</li>
            <li>No reverse engineering</li>
            <li>No automated trading without human oversight</li>
          </ul>
        </Section>

        <Section number={6} title="Data & Privacy">
          <p>
            Use of the Service is governed by our Privacy Policy. During beta,
            additional diagnostic data may be collected.
          </p>
        </Section>

        <Section number={7} title="Limitation of Liability" accent="border-red-500/40">
          <p>
            Scrybe AI and its affiliates are not liable for any trading losses,
            data loss, indirect damages, or business disruptions.
          </p>
        </Section>

        <Section number={8} title="Termination">
          <p>
            Access may be suspended or terminated without notice during beta for
            violations or technical reasons.
          </p>
        </Section>

        <Section number={9} title="Governing Law">
          <p>These Terms are governed by the laws of India.</p>
        </Section>

        <Section number={10} title="Contact">
          <p>
            Questions? Reach us via the <strong>Feedback widget</strong> in the
            app.
          </p>
        </Section>
      </div>
    </LegalPageLayout>
  );
};

export default TermsPage;
