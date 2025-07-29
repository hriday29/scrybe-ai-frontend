import React, { useState, useEffect, useRef, useMemo, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import './App.css';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import OpenPositions from './OpenPositions';
import NewsSection from './NewsSection';

// Placeholder icons if you haven't separated them yet.
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
      <p className="text-lg text-gray-400 text-center mb-12">Understanding our data-driven VST strategy.</p>

      <Section title="Our Guiding Strategy">
        <p>
          Our AI is designed for a **Very Short-Term (VST)** trading horizon, typically aiming for trades that last between **1 to 5 days**. The goal is to capture quick, momentum-driven price movements (swings) in high-quality stocks. We prioritize capital preservation; if a high-quality setup isn't present, the signal will be `HOLD`.
        </p>
      </Section>

      <Section title="The AI's Confirmation Checklist">
        <p>An idea is not enough. For the AI to issue a `BUY` or `SELL` signal, the setup must be confirmed by a series of critical indicators. A failure in any key area results in a `HOLD` signal.</p>
        <SubSection title="1. Trend Strength (ADX)">
            <p>The Average Directional Index (ADX) measures trend strength. An ADX **above 25** indicates a reliable trend. An ADX below 25 suggests a weak or sideways market, which is too risky for our strategy.</p>
        </SubSection>
        <SubSection title="2. Institutional Conviction (Volume Surge)">
            <p>A "Volume Surge" means trading volume is at least 20% higher than the 20-day average. This confirms strong institutional participation, making the price move more likely to continue.</p>
        </SubSection>
        <SubSection title="3. Momentum (RSI)">
            <p>The Relative Strength Index (RSI) measures price momentum. For `BUY` signals, we want to see a bullish RSI (typically &gt; 50 but not yet overbought at &gt;70). For `SELL` signals, we look for a bearish RSI (typically &lt; 50 but not yet oversold at &lt;30).</p>
        </SubSection>
        <SubSection title="4. Trend Direction (MACD)">
            <p>The Moving Average Convergence Divergence (MACD) helps confirm the trend's direction. A "bullish crossover" supports a `BUY` signal, while a "bearish crossover" supports a `SELL` signal.</p>
        </SubSection>
      </Section>

       <Section title="Understanding the Analysis">
          <SubSection title="Confidence Score">
            <p>This score reflects how well a setup aligns with all of our rules.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Very High:</strong> Perfect alignment across all technical, fundamental, and market context rules.</li>
              <li><strong>High:</strong> Strong alignment across most rules.</li>
              <li><strong>Medium:</strong> A decent setup, but with some minor conflicting data points.</li>
              <li><strong>Low:</strong> A potential setup, but with significant conflicts. Exercise caution.</li>
            </ul>
          </SubSection>
           <SubSection title="The Trade Plan">
                <div className="flex items-center gap-2">
                    <TargetIcon className="text-gray-400 w-5 h-5" />
                    <p>The trade plan provides clear, actionable levels for a trade.</p>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Entry:</strong> The recommended price to enter the trade.</li>
                    <li><strong>Target:</strong> The price at which to take profits.</li>
                    <li><strong>Stop-Loss:</strong> The price at which to exit the trade to limit potential losses.</li>
                </ul>
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
        </div>
      </Section>

      <Section title="Anatomy of a High-Conviction Signal">
        <p>A top-grade `BUY` signal isn't just about price going up. The AI looks for a confluence of factors:</p>
        <ul className="list-none mt-4 space-y-2">
            <li className="flex items-center gap-3"><span className="text-green-400">✅</span> <strong>Strong Trend:</strong> The ADX is above 25.</li>
            <li className="flex items-center gap-3"><span className="text-green-400">✅</span> <strong>Institutional Conviction:</strong> There is a clear Volume Surge.</li>
            <li className="flex items-center gap-3"><span className="text-green-400">✅</span> <strong>Bullish Momentum:</strong> The RSI is in a healthy range and the MACD confirms the uptrend.</li>
            <li className="flex items-center gap-3"><span className="text-green-400">✅</span> <strong>Favorable Risk/Reward:</strong> The potential profit (Target) is significantly greater than the potential loss (Stop-Loss).</li>
        </ul>
        <p className="mt-4">When all these conditions are met, the AI issues a signal with 'High' or 'Very High' confidence.</p>
      </Section>
    </div>
  );
};

export default Rulebook;