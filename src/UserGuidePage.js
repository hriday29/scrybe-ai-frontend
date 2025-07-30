import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children, id }) => (
    <div id={id} className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3">{title}</h2>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">{children}</div>
    </div>
);

const UserGuidePage = ({ onBack }) => {
    
    const sections = [
        { title: "Welcome to Scrybe AI", id: "welcome" },
        { title: "Quickstart: Your First Analysis", id: "quickstart" },
        { title: "The Main Dashboard: A Deep Dive", id: "dashboard" },
        { title: "Feature Guide: On The Radar", id: "radar" },
        { title: "Feature Guide: Market & Index Analysis", id: "market" },
        { title: "Feature Guide: The AI Track Record", id: "track-record" },
        { title: "Our AI's Philosophy", id: "philosophy" },
        { title: "Best Practices: How to Use Scrybe AI", id: "best-practices" },
        { title: "Data & Updates", id: "data" },
        { title: "Glossary of Key Terms", id: "glossary" },
        { title: "Frequently Asked Questions (FAQ)", id: "faq" },
        { title: "Feedback & Contact", id: "contact" },
    ];

    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <button onClick={onBack} className="text-blue-600 font-semibold mb-8 sticky top-8 bg-white/80 backdrop-blur-sm py-2 px-3 rounded-lg border border-gray-200">← Back to Main Site</button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-5xl font-bold text-center mb-4">Documentation</h1>
                    <p className="text-center text-gray-500 mb-12">Everything you need to know to get the most out of Scrybe AI.</p>
                    
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-16">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Table of Contents</h2>
                        <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                            {sections.map(section => (
                                <li key={section.id}>
                                    <a href={`#${section.id}`} className="text-blue-600 hover:underline font-semibold">{section.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <Section title="1. Welcome to Scrybe AI" id="welcome">
                        <p>Welcome! Scrybe AI is your personal AI analyst, designed to cut through market noise and save you hours of research. Our system performs a deep, institutional-grade analysis on dozens of top stocks every day to find high-probability swing trading opportunities based on a disciplined, data-driven strategy.</p>
                    </Section>

                    <Section title="2. Quickstart: Your First Analysis" id="quickstart">
                        <p>Getting a detailed report is simple:</p>
                        <ol>
                            <li><strong>Go to the "Stock Analysis" Tab:</strong> This is your main dashboard for selecting a stock.</li>
                            <li><strong>Choose a Stock:</strong> You can scroll through the pre-analyzed list or use the search bar to find a specific company.</li>
                            <li><strong>View the Analysis:</strong> Clicking a stock will instantly load the AI's full report, including its signal, trade plan, and data breakdowns.</li>
                        </ol>
                    </Section>

                    <Section title="3. The Main Dashboard: A Deep Dive" id="dashboard">
                        <p>The analysis dashboard contains everything you need to understand the AI's reasoning.</p>
                        <ul>
                            <li><strong>The Verdict:</strong> This is the final output. It shows the Signal (BUY/SELL/HOLD) and the AI's Confidence level in that signal, from Low to Very High.</li>
                            <li><strong>The Trade Plan:</strong> An actionable plan with specific price levels for Entry, a Target to take profits, and a Stop-Loss to manage risk. This is the core of a disciplined trade.</li>
                            <li><strong>DVM Scores:</strong> A quick visual score (out of 100) for the stock's Durability (financial health), Valuation (is it cheap or expensive?), and Momentum (how strong is its current trend?).</li>
                            <li><strong>Bull vs. Bear Case:</strong> The AI's written arguments for why the stock might go up (Bull Case) or down (Bear Case), helping you understand both sides of the trade.</li>
                            <li><strong>Charts:</strong> Visual charts for different timeframes (1-Week Tactical, 1-Month Contextual) to help you see the patterns the AI is analyzing.</li>
                        </ul>
                    </Section>

                    <Section title="4. Feature Guide: On The Radar" id="radar">
                        <p>This is one of our most powerful features. It's a curated watchlist of stocks that are currently 'HOLD' signals but are very close to becoming a BUY or SELL. The AI tells you the exact condition it's waiting for (e.g., "Waiting for a stronger trend"), which helps you anticipate future trades and learn what a high-quality setup looks like.</p>
                    </Section>

                    <Section title="5. Feature Guide: Market & Index Analysis" id="market">
                        <p>A great trader never ignores the bigger picture. This section provides a high-level strategic overview of the entire market. The AI analyzes key indices like the Nifty 50 to determine the overall market "weather"—are we in a storm or clear skies? This ensures your trading decisions are aligned with the broader market trend.</p>
                    </Section>

                    <Section title="6. Feature Guide: The AI Track Record" id="track-record">
                        <p>Transparency is a core value. This page provides a fully transparent performance log of every trade signal the AI has ever closed. You can review the wins, the losses, the holding periods, and the overall historical performance to understand the strategy's effectiveness over time.</p>
                    </Section>
                    
                    <Section title="7. Our AI's Philosophy" id="philosophy">
                        <p>Our AI is not a magic black box. It follows a disciplined, unemotional strategy based on three pillars:</p>
                        <ol>
                            <li><strong>Check the Weather:</strong> The AI first analyzes the overall market trend and will not issue signals that go against the market's momentum.</li>
                            <li><strong>Look for a Healthy Pulse:</strong> Every potential trade must be confirmed by strong technical data, including a clear trend and high trading volume from institutional players.</li>
                            <li><strong>Demand a Safety Net:</strong> No trade is signaled unless the potential reward is significantly greater than the potential risk.</li>
                        </ol>
                    </Section>
                    
                    <Section title="8. Best Practices: How to Use Scrybe AI" id="best-practices">
                        <ul>
                            <li><strong>Use as a Research Tool:</strong> Scrybe AI is a powerful tool to speed up your research and screening process. It is not a replacement for your own due diligence and is not financial advice.</li>
                            <li><strong>Understand the Timeframe:</strong> The VST strategy is designed for a 1-5 day holding period. It is not for long-term investing or intraday scalping.</li>
                            <li><strong>A 'HOLD' is a Valuable Signal:</strong> A 'HOLD' signal is a core part of our capital preservation strategy. It means the AI has analyzed the stock but concluded that the conditions are not optimal for a high-probability trade. It's an instruction to be patient and wait for a better opportunity.</li>
                        </ul>
                    </Section>
                    
                    <Section title="9. Data & Updates" id="data">
                        <p>Our primary source for market data is the yfinance library, which provides publicly available data. Our news is sourced from MarketAux. The full analysis for all stocks is refreshed once every trading day after the market closes.</p>
                    </Section>
                    
                    <Section title="10. Glossary of Key Terms" id="glossary">
                        <ul>
                            <li><strong>ADX (Average Directional Index):</strong> An indicator that measures the strength of a trend. A high ADX (above 25) indicates a strong trend.</li>
                            <li><strong>RSI (Relative Strength Index):</strong> A momentum indicator that measures the speed and change of price movements to identify overbought or oversold conditions.</li>
                             <li><strong>Swing Trading:</strong> A style of trading that attempts to capture gains in a stock within a period of a few days to several weeks.</li>
                            <li><strong>Volume Surge:</strong> Indicates that trading volume is significantly higher than its recent average, suggesting strong participation from large players.</li>
                             <li><strong>Market Regime:</strong> Our AI's assessment of the overall market trend (Bullish, Bearish, or Neutral).</li>
                             <li><strong>P/E Ratio (Price-to-Earnings):</strong> A valuation metric that measures a company's current share price relative to its per-share earnings.</li>
                             <li><strong>Stop-Loss:</strong> A pre-determined price at which you exit a trade to limit your potential loss.</li>
                        </ul>
                    </Section>

                    <Section title="11. Frequently Asked Questions (FAQ)" id="faq">
                        <p>For answers to the most common questions, please visit our dedicated Q&A page, which you can access from the links in the site footer. You can also submit your own questions there!</p>
                    </Section>
                    
                    <Section title="12. Feedback & Contact" id="contact">
                        <p>Have a question that wasn't answered here, or a suggestion for a new feature? We'd love to hear from you! Please use the **"Feedback"** button on the main application to get in touch with our team.</p>
                    </Section>
                </motion.div>
            </div>
        </div>
    );
};

export default UserGuidePage;