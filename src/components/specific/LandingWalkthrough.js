import React from "react";
import { motion } from "framer-motion";
import GenuineMetrics from "./GenuineMetrics";
import MetricsShowcase from "./MetricsShowcase";
import StrategyStepper from "./StrategyStepper";

// Inline icons for portability
const BrainCircuitIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 5V3M5 12H3M19 12h2M12 21v-2M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
    <path d="M17.6 14.8A5 5 0 0 0 15 7.2"/>
    <path d="M6.4 14.8A5 5 0 0 1 9 7.2"/>
    <path d="M12 15v2.5M12 9V6.5"/>
    <path d="M17.6 14.8l1.5 1.5M6.4 14.8l-1.5 1.5M17.6 9.2l1.5-1.5M6.4 9.2 4.9 7.7"/>
  </svg>
);
const TargetIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);
const ShieldCheckIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
const BookOpenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const LandingWalkthrough = ({
  handleLaunchAndNavigate,
  onUserGuideOpen,
  onFaqOpen,
  onPrivacyOpen,
  onTermsOpen,
  onDemoOpen,
}) => {
  const sections = [
    {
      icon: <BrainCircuitIcon className="w-7 h-7 text-purple-400" />,
      badge: "bg-gradient-to-br from-purple-500/30 to-purple-700/30",
      title: "Institutional-Grade Analysis",
      description:
        "Every trading day, Scrybe AI analyzes all 250 stocks in the Nifty Smallcap 250 universe. Using our proprietary 'Scrybe Score' system (-100 to +100), the AI evaluates each stock's technical setup, fundamentals, and market context to identify the best opportunities in India's emerging growth segment.",
      links: [
        { text: "Launch the Portfolio Dashboard", action: () => handleLaunchAndNavigate(2) },
        { text: "Read the Full Strategy", action: onUserGuideOpen },
      ],
    },
    {
      icon: <TargetIcon className="w-7 h-7 text-blue-400" />,
      badge: "bg-gradient-to-br from-blue-500/30 to-blue-700/30",
      title: "Top 10 Selection Process",
      description:
        "Out of 250 daily analyses, only the top 10 highest-conviction trades that pass institutional risk controls are selected for execution. Our Portfolio Manager enforces strict rules: max 10 positions, 40% sector concentration limit, and 2% max risk per stock—just like professional fund managers.",
      links: [
        { text: "See a Live Demo", action: onDemoOpen },
        { text: "View Open Positions", action: () => handleLaunchAndNavigate(3) },
      ],
    },
    {
      icon: <ShieldCheckIcon className="w-7 h-7 text-green-400" />,
      badge: "bg-gradient-to-br from-green-500/30 to-green-700/30",
      title: "Complete Transparency",
      description:
        "Unlike black-box systems, we show you everything. Browse all 250 analyses in the Portfolio Dashboard with clear selection reasons for each stock: 'Top conviction signal', 'High conviction, sector limit reached', 'Portfolio full', etc. See the AI Track Record for honest historical performance.",
      links: [
        { text: "View AI Track Record", action: () => handleLaunchAndNavigate(5) },
        { text: "Read the Rulebook", action: () => handleLaunchAndNavigate(6) },
      ],
    },
    {
      icon: <BookOpenIcon className="w-7 h-7 text-slate-300" />,
      badge: "bg-gradient-to-br from-slate-500/30 to-slate-700/30",
      title: "Support & Resources",
      description:
        "Understand exactly how the AI works, why risk controls exist, and how to use the platform effectively. Access comprehensive documentation, FAQs, and legal information. Your trust and privacy are paramount.",
      links: [
        { text: "Frequently Asked Questions", action: onFaqOpen },
        { text: "Privacy Policy", action: onPrivacyOpen },
        { text: "Terms & Conditions", action: onTermsOpen },
      ],
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto my-20 px-6">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Institutional-Grade Analysis for Nifty Smallcap 250
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-slate-400 leading-relaxed">
          Scrybe AI analyzes all 250 smallcap stocks daily and selects the top 10 highest-conviction 
          trades using professional fund manager principles. Complete transparency, strict risk controls, 
          and systematic discipline.
        </p>
      </div>
      <GenuineMetrics />
      
      {/* Cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            className="bg-white dark:bg-neutral-900 backdrop-blur-none border border-gray-200 dark:border-neutral-700 rounded-3xl p-8 shadow-xl flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-xl ${section.badge} border border-gray-200 shadow-inner`}
              >
                {section.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{section.title}</h3>
            </div>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed flex-grow">
              {section.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {section.links.map((link) => (
                <button
                  key={link.text}
                  onClick={link.action}
                  className="px-4 py-2 rounded-full bg-gray-100 text-blue-600 font-medium hover:bg-gray-200 hover:text-blue-700 transition-colors border border-gray-200 dark:bg-white/10 dark:text-blue-400 dark:hover:bg-blue-500/20 dark:hover:text-blue-300 backdrop-blur-md dark:border-gray-200"
                >
                  {link.text}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <MetricsShowcase />
      <StrategyStepper />
    </section>
  );
};

export default LandingWalkthrough;
