import React from 'react';

// You can keep your icon components in App.js and import them here if you move this to a separate file later
const ZapIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const ShieldCheckIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>);
const TargetIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>);
const LightbulbIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>);

const Rulebook = () => {

  const Section = ({ title, children }) => (
    <div className="bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 mb-8">
      <h3 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-3">{title}</h3>
      <div className="text-gray-300 leading-relaxed space-y-4 text-base">
        {children}
      </div>
    </div>
  );

  const SubSection = ({ title, children }) => (
      <div className="mt-4">
          <h4 className="font-semibold text-white text-lg">{title}</h4>
          <div className="prose prose-invert prose-sm text-gray-400">
              {children}
          </div>
      </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fadeIn">
      <h2 className="text-4xl font-bold text-white mb-2 text-center">The Scrybe AI Rulebook</h2>
      <p className="text-lg text-gray-400 text-center mb-12">Understanding our data-driven scoring engine.</p>

      <Section title="The Core Concept: The Scrybe Score">
        <p>
          Instead of a simple signal, the AI's primary output is the **Scrybe Score**, a single number from **-100 (high-conviction short)** to **+100 (high-conviction long)**. This score represents the holistic quality of a trading setup.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-center">
            <div className="bg-green-500/10 p-3 rounded-lg"><strong className="text-green-300">+75 to +100:</strong> High-Conviction BUY</div>
            <div className="bg-red-500/10 p-3 rounded-lg"><strong className="text-red-300">-75 to -100:</strong> High-Conviction SELL (Short)</div>
            <div className="bg-green-500/10 p-3 rounded-lg"><strong className="text-green-400">+50 to +74:</strong> Moderate-Conviction BUY</div>
            <div className="bg-red-500/10 p-3 rounded-lg"><strong className="text-red-400">-50 to -74:</strong> Moderate-Conviction SELL (Short)</div>
            <div className="md:col-span-2 bg-slate-700/50 p-3 rounded-lg"><strong className="text-amber-400">-49 to +49:</strong> HOLD (Neutral / Low-Conviction)</div>
        </div>
      </Section>

      <Section title="The Scoring Protocol: How the Score is Calculated">
        <p>The Scrybe Score is the result of a weighted analysis across several layers. A high score requires a confluence of positive factors.</p>
        <SubSection title="1. Market & Sector Context (40% Weight)">
            <p>The AI's analysis is heavily weighted by the overall market "weather." A stock fighting a bearish market or a weak sector cannot receive a high positive score.</p>
        </SubSection>
        <SubSection title="2. Technical Deep-Dive (30% Weight)">
            <p>This is the core of the setup. A high score (positive or negative) requires a strong, confirmed trend (ADX {'>'} 25) and a significant surge in trading volume.</p>
        </SubSection>
        <SubSection title="3. Fundamental & Sentiment Data (20% Weight)">
            <p>The AI assesses the company's financial health (e.g., profitability, valuation) and data from the options market to gauge trader sentiment. Strong fundamentals and bullish sentiment boost the score.</p>
        </SubSection>
        <SubSection title="4. Data-Driven Risk Management (10% Weight)">
            <p>The AI formulates a trade plan where the stop-loss is based on the stock's actual volatility (ATR). A setup with a poor Risk/Reward ratio receives a significant penalty to its score.</p>
        </SubSection>
      </Section>
      
      <Section title="How to Read the DVM Scores">
        <p>The DVM score provides a quick, data-driven snapshot of the stock's health across three key areas. Each score is out of 100.</p>
        <div className="space-y-4 mt-4">
            <div className="flex items-start gap-4">
                <ShieldCheckIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-semibold text-white">Durability (D)</h4>
                    <p className="text-sm text-gray-400">Measures the company's financial strength and stability. A high score indicates a financially healthy company.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <LightbulbIcon className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-semibold text-white">Valuation (V)</h4>
                    <p className="text-sm text-gray-400">Measures how reasonably the stock is priced. A lower score can indicate the stock may be undervalued.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <ZapIcon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-semibold text-white">Momentum (M)</h4>
                    <p className="text-sm text-gray-400">Measures the strength of the stock's recent price trend. A high score indicates a strong, ongoing trend.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
              <TargetIcon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white">Target Alignment (T)</h4>
                <p className="text-sm text-gray-400">Measures how closely the current price aligns with historical swing targets or projected price zones. A high score suggests proximity to a high-probability breakout or reversal zone.</p>
              </div>
            </div>
        </div>
      </Section>

      <Section title="Anatomy of a High Scrybe Score">
        <p>A top-grade score (e.g., +85) isn't just about price going up. It represents a powerful confluence of factors:</p>
        <ul className="list-none mt-4 space-y-2">
            <li className="flex items-center gap-3"><span className="text-green-400">✅</span> <strong>Favorable Market:</strong> The overall market regime is bullish.</li>
            <li className="flex items-center gap-3"><span className="text-green-400">✅</span> <strong>Strong Sector:</strong> The stock's sector is outperforming.</li>
            <li className="flex items-center gap-3"><span className="text-green-400">✅</span> <strong>Confirmed Technicals:</strong> The trend is strong (High ADX) and backed by institutional volume.</li>
            <li className="flex items-center gap-3"><span className="text-green-400">✅</span> <strong>Positive Fundamentals:</strong> The company is financially healthy.</li>
            <li className="flex items-center gap-3"><span className="text-green-400">✅</span> <strong>Excellent Risk/Reward:</strong> The potential profit is significantly greater than the data-driven risk.</li>
        </ul>
        <p className="mt-4">When all these conditions are met, the AI generates a high Scrybe Score and a high-conviction signal.</p>
      </Section>
    </div>
  );
};

export default Rulebook;
