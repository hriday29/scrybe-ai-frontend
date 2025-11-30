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
    <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-soft-lg hover:shadow-xl transition">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="prose prose-lg max-w-none leading-relaxed text-gray-700">
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
    <div className="relative min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-teal-50/30 to-purple-50/40" />
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-primary-200/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-secondary-200/20 blur-3xl" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,100,100,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,100,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="sticky top-6 mb-12 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-900 hover:bg-gray-50 shadow-soft transition"
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
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            User Guide
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Everything you need to know to get the most out of{" "}
            <span className="font-semibold text-primary-600">Scrybe AI</span>.
          </p>
        </motion.div>

        {/* Table of Contents */}
        <div className="mb-20 rounded-2xl border border-gray-200 bg-white p-8 shadow-soft-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium transition"
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
              <strong> NSE universe</strong> (~2000 stocks). Every trading day, our AI analyzes 
              all stocks in the NSE and applies professional fund manager principles to identify 
              the <strong>top 10 highest-conviction trades</strong>. We cut through market noise 
              with disciplined portfolio management, strict risk controls, and complete transparency.
            </p>
          </Section>

          <Section title="2. Quickstart: Your First Analysis" id="quickstart">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Open the Portfolio Dashboard:</strong> See all analyzed stocks 
                with the top 10 selected for execution.
              </li>
              <li>
                <strong>Browse the Universe:</strong> Use tabs to view Executed trades, 
                High-conviction stocks not selected, or All analyses.
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
                to +100 (strong long) for each analyzed stock.
              </li>
              <li>
                <strong>Portfolio Selection:</strong> Adaptive tier system for NSE universe: Tier 1 (Execute) = Top 10 highest-conviction trades, Tier 2 (Watchlist) = Top 50 opportunities for further review, Tier 3 (Research) = All quality setups analyzed. Each tier passes institutional risk controls adapted to market-cap and sector characteristics.
              </li>
              <li>
                <strong>Selection Reasons:</strong> Complete transparency on why stocks were 
                selected or rejected (sector limits, portfolio capacity, conviction threshold, market-cap tier).
              </li>
              <li>
                <strong>Risk Controls:</strong> Market-cap adaptive position sizing (1% small-cap, 1.5% mid-cap, 2% large-cap), NSE-aware sector concentration limits (Financials max 5, IT max 2, etc.), quality score adjustments, liquidity checks.
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
              <strong> Nifty 50</strong> and sectoral indices. This allows you to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Understand overall market regime (Bullish, Bearish, Neutral).</li>
              <li>Track market-specific momentum and broader market trends.</li>
              <li>Spot trending sectors and sector rotations.</li>
              <li>Align trades with broader market conditions for higher probability setups.</li>
              <li>Identify market leader and laggard sectors.</li>
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
              NSE universe (~2000 daily analyses). Our philosophy is:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Analyze Everything:</strong> Daily comprehensive analysis of all NSE stocks across all market caps and sectors, no cherry-picking or survivorship bias.</li>
              <li><strong>Select the Best:</strong> Adaptive tier system: Execute top 10, Watchlist top 50, Research all quality setups that pass strict risk controls.</li>
              <li><strong>Risk Management First:</strong> Portfolio-level constraints (NSE-aware sector limits, market-cap adaptive position sizing, liquidity checks) protect capital like a professional fund.</li>
              <li><strong>Complete Transparency:</strong> Every decision is visible—you see why 
              stocks are selected or rejected, including tier assignment and quality factors.</li>
              <li><strong>Data-Driven Decisions:</strong> No emotions, no biases, only systematic 
              analysis and quantifiable rules with quality score and liquidity adjustments.</li>
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
              <li>Remember: NSE stocks can be volatile—the AI uses strict risk management for a reason.</li>
            </ul>
          </Section>

          <Section title="8. Data & Updates" id="data">
            <p>
              Analysis is refreshed <strong>once daily after market close</strong> for all stocks 
              in the NSE universe. Our backend integrates:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Live Market Data:</strong> Real-time price feeds and technical indicators.</li>
              <li><strong>Index Tracking:</strong> Nifty 50 and sectoral indices.</li>
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
                <strong>NSE Universe:</strong> The complete universe of stocks traded on the National Stock Exchange that we analyze 
                daily.
              </li>
              <li>
                <strong>Portfolio Dashboard:</strong> Complete view of all analyses with 
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
