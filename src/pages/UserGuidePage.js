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
              <strong>Scrybe AI</strong> is your institutional-grade AI analyst for the 
              <strong> Nifty Smallcap 250</strong> universe. Every trading day, our AI analyzes 
              all 250 smallcap stocks and applies professional fund manager principles to identify 
              the <strong>top 10 highest-conviction trades</strong>. We cut through market noise 
              with disciplined portfolio management, strict risk controls, and complete transparency.
            </p>
          </Section>

          <Section title="2. Quickstart: Your First Analysis" id="quickstart">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Open the Portfolio Dashboard:</strong> See all 250 analyzed stocks 
                with the top 10 selected for execution.
              </li>
              <li>
                <strong>Browse the Universe:</strong> Use tabs to view Executed trades, 
                High-conviction stocks not selected, or All 250 analyses.
              </li>
              <li>
                <strong>Click Any Stock:</strong> View complete Apex Analysis with Scrybe Score, 
                signal confidence, and selection reasoning.
              </li>
              <li>
                <strong>Understand Selection Reasons:</strong> See exactly why stocks were 
                selected ("Top conviction") or rejected ("Sector limit reached", "Portfolio full").
              </li>
            </ol>
          </Section>

          <Section title="3. Understanding the Analysis Dashboard" id="dashboard">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Scrybe Score:</strong> A conviction metric from -100 (strong short) 
                to +100 (strong long) for each of the 250 analyzed stocks.
              </li>
              <li>
                <strong>Portfolio Selection:</strong> Only top 10 highest-conviction trades 
                that pass institutional risk controls are executed.
              </li>
              <li>
                <strong>Selection Reasons:</strong> Complete transparency on why stocks were 
                selected or rejected (sector limits, portfolio capacity, conviction threshold).
              </li>
              <li>
                <strong>Risk Controls:</strong> Max 10 concurrent positions, 40% sector 
                concentration limit, 2% max risk per stock.
              </li>
              <li>
                <strong>Analyst Verdict:</strong> AI-generated human-readable summary of 
                the trade setup and key considerations.
              </li>
            </ul>
          </Section>

          <Section title="4. Feature Guide: Market & Index Analysis" id="market">
            <p>
              Beyond individual stocks, Scrybe AI tracks key market indices including 
              <strong> Nifty 50, Nifty Smallcap 250</strong>, and sectoral indices. This allows you to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Understand overall market regime (Bullish, Bearish, Neutral).</li>
              <li>Track smallcap-specific momentum versus broader market.</li>
              <li>Spot trending sectors within the smallcap universe and sector rotations.</li>
              <li>Align trades with broader market conditions for higher probability setups.</li>
              <li>Identify when smallcaps are outperforming or underperforming large caps.</li>
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
              Scrybe AI follows institutional fund manager principles applied to the 
              Nifty Smallcap 250 universe. Our philosophy is:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Analyze Everything:</strong> Daily analysis of all 250 smallcap stocks, 
              no cherry-picking or survivorship bias.</li>
              <li><strong>Select the Best:</strong> Only top 10 highest-conviction trades that 
              pass strict risk controls are executed.</li>
              <li><strong>Risk Management First:</strong> Portfolio-level constraints (sector limits, 
              position sizing) protect capital like a professional fund.</li>
              <li><strong>Complete Transparency:</strong> Every decision is visible—you see why 
              stocks are selected or rejected.</li>
              <li><strong>Data-Driven Decisions:</strong> No emotions, no biases, only systematic 
              analysis and quantifiable rules.</li>
              <li><strong>Consistency Over Luck:</strong> Focus on repeatable process, not one-off wins.</li>
            </ul>
          </Section>

          <Section title="7. Best Practices" id="best-practices">
            <ul className="list-disc pl-6 space-y-2">
              <li>Use Scrybe AI as your research analyst, not as automated trading advice.</li>
              <li>Focus on the top 10 executing trades—these passed all institutional risk controls.</li>
              <li>Understand rejection reasons—if "Sector limit reached", that sector is already at 40% exposure.</li>
              <li>Check both Scrybe Score AND the detailed analysis before making decisions.</li>
              <li>Respect the Portfolio Dashboard's risk limits—they exist to protect capital.</li>
              <li>Monitor the "High conviction not selected" tab to understand portfolio constraints in action.</li>
              <li>Always apply your own risk management and position sizing appropriate to your capital.</li>
              <li>Remember: Smallcaps are volatile—the AI uses tight stops for a reason.</li>
            </ul>
          </Section>

          <Section title="8. Data & Updates" id="data">
            <p>
              Analysis is refreshed <strong>once daily after market close</strong> for all 250 stocks 
              in the Nifty Smallcap 250 universe. Our backend integrates:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Live Market Data:</strong> Real-time price feeds and technical indicators.</li>
              <li><strong>Index Tracking:</strong> Nifty 50, Nifty Smallcap 250, and sectoral indices.</li>
              <li><strong>Fundamental Data:</strong> Company fundamentals for quality assessment.</li>
              <li><strong>News & Events:</strong> Market-moving news and corporate announcements.</li>
              <li><strong>Historical Performance:</strong> Complete track record of past signals.</li>
            </ul>
            <p className="mt-4">
              The Portfolio Manager runs immediately after analysis completes, applying risk controls 
              and selecting the top 10 trades. All data is stored in MongoDB for full transparency.
            </p>
          </Section>

          <Section title="9. Glossary of Key Terms" id="glossary">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Scrybe Score:</strong> AI's conviction level from -100 (strong short) 
                to +100 (strong long) for each stock.
              </li>
              <li>
                <strong>Nifty Smallcap 250:</strong> The complete universe of 250 stocks we analyze 
                daily, representing India's emerging growth segment.
              </li>
              <li>
                <strong>Portfolio Dashboard:</strong> Complete view of all 250 analyses with 
                top 10 selections and rejection reasons.
              </li>
              <li>
                <strong>Top 10 Selection:</strong> Highest-conviction trades that pass all 
                institutional risk controls (sector limits, position sizing).
              </li>
              <li>
                <strong>Selection Reason:</strong> Transparent explanation for why each stock 
                was selected or rejected by the Portfolio Manager.
              </li>
              <li>
                <strong>Sector Concentration:</strong> Maximum 40% of portfolio can be in any 
                single sector to ensure diversification.
              </li>
              <li>
                <strong>Apex Analysis:</strong> Full-stack AI-driven breakdown of a stock's 
                technical, fundamental, and sentiment factors.
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
