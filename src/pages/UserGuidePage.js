import React from "react";
import { motion } from "framer-motion";

const Section = ({ title, children, id }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="mb-16 scroll-mt-24"
  >
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-lg shadow-lg hover:shadow-blue-500/10 transition">
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">
        {title}
      </h2>
      <div className="prose prose-lg prose-invert max-w-none leading-relaxed">
        {children}
      </div>
    </div>
  </motion.div>
);

const UserGuidePage = ({ onBack }) => {
  const sections = [
    { title: "Welcome to Scrybe AI", id: "welcome" },
    { title: "Quickstart: Your First Analysis", id: "quickstart" },
    { title: "Understanding the Analysis Dashboard", id: "dashboard" },
    { title: "Feature Guide: Market & Index Analysis", id: "market" },
    { title: "Feature Guide: The AI Track Record", id: "track-record" },
    { title: "Our AI's Philosophy", id: "philosophy" },
    { title: "Best Practices", id: "best-practices" },
    { title: "Data & Updates", id: "data" },
    { title: "Glossary of Key Terms", id: "glossary" },
    { title: "Feedback & Contact", id: "contact" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-blue-500/30 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-600/30 blur-3xl animate-pulse" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="sticky top-6 mb-12 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white hover:bg-white/20 backdrop-blur-md shadow-md transition"
        >
          ← Back to Main Site
        </button>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
            User Guide
          </h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Everything you need to know to get the most out of{" "}
            <span className="font-semibold">Scrybe AI</span>.
          </p>
        </motion.div>

        {/* Table of Contents */}
        <div className="mb-20 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white mb-6">Table of Contents</h2>
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-blue-400 hover:text-blue-300 font-medium transition"
                >
                  {i + 1}. {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-20">
          <Section title="1. Welcome to Scrybe AI" id="welcome">
            <p>
              <strong>Scrybe AI</strong> is your personal AI analyst, designed to
              cut through market noise and highlight the highest-probability swing
              trading opportunities. We process institutional-grade analysis on
              top stocks every single day—so you save time and focus only on what
              matters.
            </p>
          </Section>

          <Section title="2. Quickstart: Your First Analysis" id="quickstart">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Open the Stock Analysis Tab:</strong> Your main dashboard
                with ranked stocks.
              </li>
              <li>
                <strong>Select a Stock:</strong> Scroll the list or search directly.
              </li>
              <li>
                <strong>View the Apex Analysis:</strong> Instantly access the AI’s
                full breakdown—Scrybe Score, signal, insights, and risks.
              </li>
            </ol>
          </Section>

          <Section title="3. Understanding the Analysis Dashboard" id="dashboard">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Scrybe Score:</strong> A number from -100 to +100
                summarizing trade strength.
              </li>
              <li>
                <strong>Signal & Confidence:</strong> Clear BUY/SELL/HOLD calls
                with AI-backed confidence.
              </li>
              <li>
                <strong>Analyst Verdict:</strong> A concise, human-style summary.
              </li>
              <li>
                <strong>Risks & Observations:</strong> Highlights of what could
                strengthen or weaken the setup.
              </li>
            </ul>
          </Section>

          <Section title="4. Feature Guide: Market & Index Analysis" id="market">
            <p>
              Beyond individual stocks, Scrybe AI tracks key market indices and
              sector performance. This allows you to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Spot trending sectors and rotations.</li>
              <li>Understand market-wide momentum shifts.</li>
              <li>Align trades with broader conditions for higher accuracy.</li>
            </ul>
          </Section>

          <Section title="5. Feature Guide: The AI Track Record" id="track-record">
            <p>
              Trust is built on results. Scrybe AI keeps a transparent history of
              past predictions, so you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Review past signals and accuracy rates.</li>
              <li>See how confidence levels translated into real setups.</li>
              <li>Build conviction in the AI’s decision-making process.</li>
            </ul>
          </Section>

          <Section title="6. Our AI's Philosophy" id="philosophy">
            <p>
              Scrybe AI doesn’t chase noise—it focuses on patterns that matter.
              Our philosophy is:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Data-driven decisions, no emotions.</li>
              <li>Transparency over black-box predictions.</li>
              <li>Consistency over one-off wins.</li>
            </ul>
          </Section>

          <Section title="7. Best Practices" id="best-practices">
            <ul className="list-disc pl-6 space-y-2">
              <li>Use Scrybe AI as a guide, not a replacement for judgment.</li>
              <li>Check both the confidence score and rationale before acting.</li>
              <li>Combine with proper risk management and position sizing.</li>
            </ul>
          </Section>

          <Section title="8. Data & Updates" id="data">
            <p>
              Data is refreshed daily. Our backend integrates live feeds, market
              indices, and technical data streams—so your analysis is always up to
              date.
            </p>
          </Section>

          <Section title="9. Glossary of Key Terms" id="glossary">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Scrybe Score:</strong> AI’s conviction level (-100 to +100).
              </li>
              <li>
                <strong>Apex Analysis:</strong> Full-stack breakdown of a stock
                setup.
              </li>
              <li>
                <strong>Confidence %:</strong> The probability of success based on
                past patterns.
              </li>
            </ul>
          </Section>

          <Section title="10. Feedback & Contact" id="contact">
            <p>
              We’re always improving. Share your suggestions or report issues
              directly from the app, or email us at{" "}
              <a
                href="mailto:support@scrybe.ai"
                className="text-blue-400 hover:underline"
              >
                support@scrybe.ai
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default UserGuidePage;
