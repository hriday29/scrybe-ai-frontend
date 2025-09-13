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
      title: "The Core Engine",
      description:
        "At the heart of Scrybe AI is our proprietary 'Scrybe Score' system. The AI performs a deep, multi-layered analysis of every stock and assigns a single, objective score from -100 (a perfect short setup) to +100 (a perfect long setup).",
      links: [
        { text: "Launch the Ranked List", action: () => handleLaunchAndNavigate(1) },
        { text: "Read the Full Strategy", action: onUserGuideOpen },
      ],
    },
    {
      icon: <TargetIcon className="w-7 h-7 text-blue-400" />,
      badge: "bg-gradient-to-br from-blue-500/30 to-blue-700/30",
      title: "Your Tactical Edge",
      description:
        "Track all of the AI's live signals in the 'Trade Cockpit,' your hub for monitoring open positions. Before you act, get the big picture with our comprehensive 'Index Analysis' to understand the overall market trend.",
      links: [
        { text: "See a Live Demo", action: onDemoOpen },
        { text: "Open the Trade Cockpit", action: () => handleLaunchAndNavigate(2) }, // Now correctly links to Open Positions tab
      ],
    },
    {
      icon: <ShieldCheckIcon className="w-7 h-7 text-green-400" />,
      badge: "bg-gradient-to-br from-green-500/30 to-green-700/30",
      title: "Trust & Transparency",
      description:
        "We believe in transparency. Review the AI's full historical 'Track Record' and read our detailed 'Rulebook' to understand the disciplined logic behind every score.",
      links: [
        { text: "View AI Track Record", action: () => handleLaunchAndNavigate(5) },
        { text: "Read the Rulebook", action: () => handleLaunchAndNavigate(6) },
      ],
    },
    {
      icon: <BookOpenIcon className="w-7 h-7 text-slate-300" />,
      badge: "bg-gradient-to-br from-slate-500/30 to-slate-700/30",
      title: "Support & Legal",
      description:
        "Your trust and privacy are paramount. Access our documentation, legal pages, and FAQ for clarity on how Scrybe AI works and how we protect your data.",
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
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Your Complete Analytical Toolkit
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed">
          Scrybe AI is more than a signal generator. It's a full suite of tools designed
          to give you a professional edge.
        </p>
      </div>
      <GenuineMetrics />
      
      {/* Cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-xl ${section.badge} border border-white/10 shadow-inner`}
              >
                {section.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
            </div>

            <p className="text-slate-300 leading-relaxed flex-grow">
              {section.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {section.links.map((link) => (
                <button
                  key={link.text}
                  onClick={link.action}
                  className="px-4 py-2 rounded-full bg-white/10 text-blue-400 font-medium hover:bg-blue-500/20 hover:text-blue-300 transition-colors backdrop-blur-md border border-white/10"
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
