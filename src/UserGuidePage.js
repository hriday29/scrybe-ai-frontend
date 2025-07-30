import React from 'react';
import { motion } from 'framer-motion';

// Helper component for clean section styling
const Section = ({ title, children, id }) => (
    <div id={id} className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3">{title}</h2>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">{children}</div>
    </div>
);

const UserGuidePage = ({ onBack }) => {
    
    // Data for the Table of Contents
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

    const faqs = [
        { q: "What is Scrybe AI?", a: "Scrybe AI is a research tool that uses advanced AI to analyze stock market data. It provides data-driven insights based on a VST (Very Short-Term) swing trading strategy to help users in their own research process." },
        { q: "Is this financial advice?", a: "No. Absolutely not. Scrybe AI provides informational research outcomes based on historical data. It is not financial advice, and all users are 100% responsible for their own trading decisions and risks." },
    ];

    const FaqItem = ({ question, answer }) => (
        <details className="border-b border-gray-200 py-4 group">
            <summary className="font-semibold text-lg list-none flex justify-between items-center cursor-pointer hover:text-blue-600">
                {question}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-gray-600 mt-2">{answer}</p>
        </details>
    );

    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <button onClick={onBack} className="text-blue-600 font-semibold mb-8 sticky top-8 bg-white/80 backdrop-blur-sm py-2 px-3 rounded-lg border border-gray-200">← Back to Main Site</button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-5xl font-bold text-center mb-4">Documentation</h1>
                    <p className="text-center text-gray-500 mb-12">Everything you need to know to get the most out of Scrybe AI.</p>
                    
                    {/* Table of Contents */}
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
                    
                    {/* Content Sections */}
                    <Section title="1. Welcome to Scrybe AI" id="welcome">
                        <p>Welcome! Scrybe AI is designed to be your personal AI analyst, doing the heavy lifting of market research so you can focus on making informed decisions. Our system analyzes dozens of top stocks every day to find high-probability swing trading opportunities based on a disciplined, data-driven strategy.</p>
                    </Section>

                    <Section title="2. Quickstart: Your First Analysis" id="quickstart">
                        <p>Getting a detailed report is simple:</p>
                        <ol>
                            <li><strong>Go to the "Stock Analysis" Tab:</strong> This is your main dashboard for selecting a stock.</li>
                            <li><strong>Choose a Stock:</strong> You can either scroll through the pre-analyzed list or use the search bar to find a specific company.</li>
                            <li><strong>View the Analysis:</strong> Clicking a stock will instantly load the AI's full report, including its signal, trade plan, and data breakdowns.</li>
                        </ol>
                    </Section>

                    <Section title="3. The Main Dashboard: A Deep Dive" id="dashboard">
                        <p>The analysis dashboard is broken down into key sections:</p>
                        <ul>
                            <li><strong>The Verdict:</strong> The most important section, showing the final Signal (BUY/SELL/HOLD) and the AI's Confidence level.</li>
                            <li><strong>The Trade Plan:</strong> An actionable plan with specific price levels for Entry, a Target to take profits, and a Stop-Loss to manage risk.</li>
                            <li><strong>DVM Scores:</strong> A quick visual score (out of 100) for the stock's Durability, Valuation, and Momentum.</li>
                            <li><strong>Bull vs. Bear Case:</strong> The AI's written arguments for why the stock might go up (Bull Case) or down (Bear Case).</li>
                        </ul>
                    </Section>

                    <Section title="4. Feature Guide: On The Radar" id="radar">
                        <p>This isn't just a list of 'HOLDs'. It's a curated watchlist of stocks the AI has identified as being on the verge of a signal. It tells you the exact condition the AI is waiting for (e.g., "Waiting for a stronger trend"), helping you anticipate future trades.</p>
                    </Section>

                    <Section title="5. Feature Guide: Market & Index Analysis" id="market">
                        <p>This provides the "big picture" view of the market's health. By analyzing key indices like the Nifty 50, the AI understands the overall market "weather," ensuring its signals are aligned with the broader market trend.</p>
                    </Section>

                    <Section title="6. Feature Guide: The AI Track Record" id="track-record">
                        <p>A fully transparent performance log of every trade signal the AI has ever closed. You can review the wins, the losses, and the overall historical performance to understand the strategy's effectiveness over time.</p>
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
                            <li><strong>Use as a Research Tool:</strong> Scrybe AI is a powerful tool to speed up your research and screening process. It is not a replacement for your own due diligence.</li>
                            <li><strong>Understand the Timeframe:</strong> The VST strategy is designed for a 1-5 day holding period. It is not for long-term investing or intraday scalping.</li>
                            <li><strong>A 'HOLD' is a Valuable Signal:</strong> The most frequent signal is 'HOLD'. This is the AI's capital preservation strategy in action. It means "wait for a better opportunity."</li>
                        </ul>
                    </Section>
                    
                    <Section title="9. Data & Updates" id="data">
                        <p>Our primary source for market data is the yfinance library, which provides publicly available data. Our news is sourced from MarketAux. The full analysis for all stocks is refreshed once every trading day after the market closes.</p>
                    </Section>
                    
                    <Section title="10. Glossary of Key Terms" id="glossary">
                        <ul>
                            <li><strong>ADX (Average Directional Index):</strong> An indicator that measures the strength of a trend, not its direction. A high ADX (above 25) indicates a strong trend.</li>
                            <li><strong>RSI (Relative Strength Index):</strong> A momentum indicator that measures the speed and change of price movements to identify overbought or oversold conditions.</li>
                            <li><strong>Stop-Loss:</strong> A pre-determined price at which you exit a trade to limit your potential loss.</li>
                        </ul>
                    </Section>

                    <Section title="11. Frequently Asked Questions (FAQ)" id="faq">
                        {faqs.map((faq, i) => <FaqItem key={i} question={faq.q} answer={faq.a} />)}
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