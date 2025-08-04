import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { Tab, Menu, Transition } from '@headlessui/react';
import './App.css';
import { motion } from 'framer-motion';
import { useMotionValue, useTransform, animate } from "framer-motion";
import { Bot, BrainCircuit, RefreshCw, Zap, Timer, Home } from "lucide-react";
import OpenPositions from './OpenPositions';
import NewsSection from './NewsSection';
import Rulebook from './Rulebook';
import TradeJournalCard from './TradeJournalCard';
import ConfidencePoll from './ConfidencePoll';
import FeedbackWidget from './FeedbackWidget';
import DisclaimerModal from './DisclaimerModal';
import DisclaimerFooter from './DisclaimerFooter';
import FaqPage from './FaqPage';
import OnTheRadar from './OnTheRadar.js';
import UserGuidePage from './UserGuidePage.js';
import Footer from './Footer.js';
import PrivacyPolicyPage from './PrivacyPolicyPage.js';
import TermsPage from './TermsPage.js';
import AppGuide from './AppGuide.js';
import LandingWalkthrough from './LandingWalkthrough.js';
import BetaInfoModal from './BetaInfoModal.js';
import { API_BASE_URL } from './apiConfig.js';

// === ALL HELPER & ICON COMPONENTS (CORRECTLY ORDERED) ===

const OurStrategySection = () => {
    const pillars = [
        {
            icon: <BrainCircuitIcon className="w-7 h-7" />,
            title: "1. We Check the Weather",
            description: "Before analyzing any single stock, our AI first looks at the 'big picture'—the overall market health and which sectors are the strongest. We don't try to swim against the current."
        },
        {
            icon: <PulseIcon className="w-7 h-7" />,
            title: "2. We Look for a Healthy Pulse",
            description: "Next, the AI puts the stock through a rigorous health check. It looks for confirmation from big institutional players (by checking for a 'Volume Surge') and ensures the stock's price trend is strong and clear. A weak pulse means we wait."
        },
        {
            icon: <ShieldCheckIcon className="w-7 h-7" />,
            title: "3. We Demand a Safety Net",
            description: "No trade is ever considered, no matter how good it looks, unless the potential reward is significantly greater than the potential risk. Every signal comes with a pre-defined exit plan, ensuring disciplined risk management."
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto my-16 px-4 py-16">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                    An AI Strategy You Can Understand
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                    Our AI isn't a magic black box. It's a disciplined analyst that follows a clear, three-pillar scoring system for every stock.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {pillars.map((pillar) => (
                    <div key={pillar.title} className="bg-gradient-to-br from-slate-900 to-slate-800/60 border border-slate-700/60 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
                        <div className="flex items-center justify-center w-14 h-14 bg-blue-600/20 border-2 border-blue-500/60 rounded-2xl text-blue-300 mb-6">
                            {pillar.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{pillar.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CORRELATION_DEFINITIONS = {
    'Nifty50': 'Measures how closely the stock moves with the overall Indian market. High positive values are common.',
    'USD-INR': 'Shows the relationship with the Rupee-Dollar exchange rate. Important for import/export heavy companies.',
    'S&P 500': 'Shows correlation with the US market. Indicates how sensitive the stock is to global trends.',
    'Gold': 'Gold is often seen as a "safe-haven" asset. A negative correlation can mean the stock is seen as risky.',
    'Crude Oil': 'Measures sensitivity to oil prices. Critical for sectors like Paint, Aviation, and Logistics.',
    'Dow Jones': 'Another measure of correlation with the US market.',
    'Nikkei 225': 'Measures correlation with the Japanese market, indicating sensitivity to Asian market trends.'
};

const getCorrelationInterpretation = (value) => {
    if (isNaN(value)) return "Invalid data";
    if (value >= 0.7) return "Strong positive correlation.";
    if (value >= 0.3) return "Moderate positive correlation.";
    if (value > -0.3) return "No significant correlation.";
    if (value > -0.7) return "Moderate negative correlation.";
    return "Strong negative correlation.";
};

const getStatusColor = (status) => {
    if (!status) return 'text-gray-400';
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('bullish') || lowerStatus.includes('positive') || lowerStatus.includes('strong') || lowerStatus.includes('healthy')) {
        return 'text-green-400';
    }
    if (lowerStatus.includes('bearish') || lowerStatus.includes('negative') || lowerStatus.includes('weak') || lowerStatus.includes('premium')) {
        return 'text-red-400';
    }
    if (lowerStatus.includes('neutral') || lowerStatus.includes('moderate') || lowerStatus.includes('decent')) {
        return 'text-amber-400';
    }
    return 'text-gray-300';
};

const IndexAnalysisView = () => {
    const [indices, setIndices] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [analysisData, setAnalysisData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const DEFINITIONS = {
        VIX: "The India VIX or 'Fear Index' measures the market's expectation of volatility over the next 30 days. Low values (<15) suggest complacency, while high values (>20) suggest fear.",
        
        // Broad-Based
        "^NSEI": "NIFTY 50: The flagship index tracking India's top 50 large-cap leaders.",
        "^BSESN": "SENSEX (BSE 30): The oldest benchmark, closely tracking market sentiment.",
        "^CNXNXT": "NIFTY Next 50: Tracks emerging large-caps; often strong candidates for swing trades.",
        "^CNX100": "NIFTY 100: A combination of NIFTY 50 and NIFTY Next 50.",
        "NIFTY500.NS": "NIFTY 500: The best representation of the broad Indian equity market, covering ~95% of market cap.",
        "^CNXMIDCAP": "NIFTY Midcap 100: The mid-cap sweet spot, known for high volatility and strong trends.",
        "NIFTY_SMALCAP_100.NS": "NIFTY Smallcap 100: Represents small-cap stocks for more aggressive trading strategies.",
        "NIFTY_MIDSML_400.NS": "NIFTY MidSmallcap 400: A blended index of 150 midcaps and 250 smallcaps; ideal for spotting next-generation performers.",

        // Sectoral
        "^NSEBANK": "NIFTY Bank: The most traded index after NIFTY 50, known for fast moves and key for F&O traders.",
        "NIFTY_FIN_SERVICE.NS": "NIFTY Financial Services: Captures non-bank financials like NBFCs and insurance companies.",
        "^CNXIT": "NIFTY IT: Tracks tech stocks, which are often volatile and good for momentum trading.",
        "^CNXAUTO": "NIFTY Auto: A cyclical index that moves with consumer and economic sentiment.",
        "^CNXPHARMA": "NIFTY Pharma: A defensive sector, often used for rotation-based swing trades.",
        "^CNXFMCG": "NIFTY FMCG: A low-beta (less volatile) sector, good for finding safer trending setups.",
        "^CNXMETAL": "NIFTY Metal: Highly volatile and very reactive to global commodity news.",
        "^CNXPSUBANK": "NIFTY PSU Bank: A high-beta index known for explosive swings on news or fund flows.",
        "NIFTY_PRIVATEBANK.NS": "NIFTY Private Bank: Tracks leading private-sector banks, offering more stable trends than PSU-focused indices.",
        "NIFTY_OIL_AND_GAS.NS": "NIFTY Oil & Gas: Covers upstream and downstream energy companies; sensitive to crude prices and policy news.",

        // Thematic & Strategy
        "NIFTY_INDIA_CONSUMPTION.NS": "NIFTY India Consumption: Tracks consumer-centric companies; strong during domestic growth cycles.",
        "NIFTY50_EQL_WGT.NS": "NIFTY50 Equal Weight: Contains the same stocks as NIFTY 50 but with equal weight, avoiding concentration risk.",
        "NIFTY_ALPHA_50.NS": "NIFTY Alpha 50: Quant-based index of high-alpha stocks; excellent for momentum and swing trading.",
        "NIFTY_LOW_VOL_50.NS": "NIFTY Low Volatility 50: Tracks low-beta, stable stocks; useful in sideways or uncertain markets.",
        "NIFTY_HIGH_BETA_50.NS": "NIFTY High Beta 50: Focuses on volatile, high-risk stocks with big swing potential.",
        "NIFTY_QUALITY_30.NS": "NIFTY Quality 30: Tracks financially strong, fundamentally sound companies; ideal during volatile phases.",

        // BSE Indices
        "^BSEMD": "BSE MidCap: An alternative to the Nifty Midcap 100, useful for cross-confirmation.",
        "^BSESM": "BSE SmallCap: Use with caution. Known for extreme swings but with great upside potential.",
        "^BSEHC": "BSE Healthcare: Covers pharma and healthcare services; defensive in nature with stable sector trends.",
        "^BSEFMC": "BSE FMCG: Tracks leading consumer staples companies; useful for spotting defensive trades during market dips."
    };

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/indices`)
            .then(res => res.json())
            .then(data => setIndices(data))
            .catch(err => setError("Failed to load index list."));
    }, []);

    const handleIndexSelect = async (index) => {
        if (!index.ticker) return;
        setSelectedIndex(index);
        setIsLoading(true);
        setError(null);
        setAnalysisData(null);
        try {
            const res = await fetch(`${API_BASE_URL}/api/index-analysis/${index.ticker}`);
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Analysis failed.");
            }
            const data = await res.json();
            setAnalysisData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const IndexDashboard = ({ data }) => {
            if (!data) {
                return <div className="text-center text-gray-400 p-10">Select an index from the left to view its detailed analysis.</div>;
            }
            
            // Safely destructure the final "CIO-Grade" data structure with default values
            const {
                marketPulse = { overallBias: 'N/A', volatilityIndexStatus: 'N/A' },
                trendAnalysis = { shortTermTrend: 'N/A', mediumTermTrend: 'N/A', keyTrendIndicators: 'N/A' },
                keyLevels = { resistance: [], support: [] },
                optionsMatrix = { maxOpenInterestCall: 'N/A', maxOpenInterestPut: 'N/A', putCallRatioAnalysis: 'N/A' },
                forwardOutlook = { next7Days: 'N/A', primaryRisk: 'N/A' }
            } = data;
            
            const biasConfig = {
                "Strongly Bullish": "bg-green-500/20 text-green-300", "Bullish": "bg-green-500/10 text-green-400",
                "Neutral": "bg-slate-700 text-slate-300", "Cautiously Optimistic": "bg-sky-500/10 text-sky-300",
                "Bearish": "bg-red-500/10 text-red-400", "Strongly Bearish": "bg-red-500/20 text-red-300",
                "Neutral with Bearish Leanings": "bg-amber-500/10 text-amber-400"
            };
        
            return (
                <div className="p-4 md:p-6 space-y-6">
                    <div className="text-center border-b border-slate-700/60 pb-4">
                        <h3 className="text-3xl font-bold text-white">{selectedIndex.name} Analysis</h3>
                        <p className={`mt-2 inline-block px-4 py-1.5 rounded-full font-semibold text-lg ${biasConfig[marketPulse.overallBias] || biasConfig.Neutral}`}>
                            {marketPulse.overallBias}
                        </p>
                    </div>
        
                    <div className="bg-slate-800/40 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-lg text-white">Market Pulse</h4>
                            <span title={DEFINITIONS.VIX} className="cursor-help"><InfoIcon /></span>
                        </div>
                        <p className="text-sm text-gray-300">{marketPulse.volatilityIndexStatus}</p>
                    </div>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/40 p-4 rounded-lg">
                            <h4 className="font-bold text-lg text-white mb-2">Trend Analysis</h4>
                            <p className="text-sm text-gray-400"><strong>Short-Term:</strong> <span className="text-gray-200">{trendAnalysis.shortTermTrend}</span></p>
                            <p className="text-sm text-gray-400"><strong>Medium-Term:</strong> <span className="text-gray-200">{trendAnalysis.mediumTermTrend}</span></p>
                            <p className="text-sm text-gray-400 mt-2"><strong>Indicator Summary:</strong> <span className="text-gray-200">{trendAnalysis.keyTrendIndicators}</span></p>
                        </div>
                        <div className="bg-slate-800/40 p-4 rounded-lg">
                            <h4 className="font-bold text-lg text-white mb-2">Key Levels to Watch</h4>
                            <p className="text-sm text-red-400"><strong>Resistance:</strong> <span className="font-semibold text-gray-200">{keyLevels.resistance.join(' / ')}</span></p>
                            <p className="text-sm text-green-400"><strong>Support:</strong> <span className="font-semibold text-gray-200">{keyLevels.support.join(' / ')}</span></p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-800/40 p-4 rounded-lg">
                        <h4 className="font-bold text-lg text-white mb-3">Options Matrix</h4>
                        <div className="space-y-2 text-sm">
                            <p className="text-gray-400"><strong>Max OI Call (Resistance):</strong> <span className="font-semibold text-red-400">{optionsMatrix.maxOpenInterestCall}</span></p>
                            <p className="text-gray-400"><strong>Max OI Put (Support):</strong> <span className="font-semibold text-green-400">{optionsMatrix.maxOpenInterestPut}</span></p>
                            <p className="text-gray-400 mt-2"><strong>Sentiment (PCR):</strong> <span className="text-gray-200">{optionsMatrix.putCallRatioAnalysis}</span></p>
                        </div>
                    </div>
        
                    <div>
                        <h4 className="font-bold text-xl text-white mb-3">Forward Outlook</h4>
                        <div className="space-y-4">
                            <div className="bg-slate-800/40 p-4 rounded-lg">
                                <h5 className="font-semibold text-sky-300 mb-1">Next 7 Days</h5>
                                <p className="text-gray-300">{forwardOutlook.next7Days}</p>
                            </div>
                            <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-4">
                                <h5 className="font-semibold text-red-300 mb-1">Primary Risk</h5>
                                <p className="text-gray-300">{forwardOutlook.primaryRisk}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1 bg-slate-900/40 border border-slate-700/60 rounded-2xl p-4 self-start">
                    <h3 className="font-bold text-white text-lg mb-4 px-2">Market Indices</h3>
                    <div className="space-y-2">
                        {indices.map(index => (
                            <button 
                                key={index.ticker} 
                                onClick={() => handleIndexSelect(index)}
                                className={`w-full text-left p-3 rounded-lg transition-colors font-semibold flex justify-between items-center ${selectedIndex?.ticker === index.ticker ? 'bg-blue-600 text-white' : 'hover:bg-slate-700/50 text-gray-300'}`}
                            >
                                <span>{index.name}</span>
                                {/* --- UPDATED with Tooltip --- */}
                                <span title={DEFINITIONS[index.ticker]} className="cursor-help mr-2"><InfoIcon /></span>
                                {/* --------------------------- */}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-3 bg-slate-900/40 border border-slate-700/60 rounded-2xl min-h-[60vh]">
                    {isLoading && <div className="text-center p-10 animate-pulse">Generating In-Depth Analysis...</div>}
                    {error && <div className="text-center p-10 text-red-400">{error}</div>}
                    {!isLoading && !error && <IndexDashboard data={analysisData} />}
                </div>
            </div>
        </div>
    );
};

const ScrybeLogo = () => (<svg className="rotating-logo" width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="logoGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse"><stop stopColor="#3b82f6" /><stop offset="1" stopColor="#818cf8" /></linearGradient></defs><rect x="30" y="12" width="4" height="10" rx="2" fill="url(#logoGradient)" /><rect x="26" y="22" width="12" height="18" rx="2" fill="url(#logoGradient)" /><rect x="30" y="40" width="4" height="12" rx="2" fill="url(#logoGradient)" /><path d="M8 48 L20 38 L32 32 L44 28 L56 18" stroke="url(#logoGradient)" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>);
const PulseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>);
const LightbulbIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>);
const BullIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10h10"/><path d="m10 7 2-3 2 3"/><path d="M12 21V4"/><path d="M7 21h10"/></svg>);
const BearIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 14h10"/><path d="m10 17 2 3 2-3"/><path d="M12 3v17"/><path d="M7 3h10"/></svg>);
const ChevronDownIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>);
const ArrowUpRightIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>);
const PauseIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 4h4v16H6zM14 4h4v16h-4z"></path></svg>);
const InfoIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400/80"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>);
const BrainCircuitIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5V3M5 12H3M19 12h2M12 21v-2M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M17.6 14.8A5 5 0 0 0 15 7.2"/><path d="M6.4 14.8A5 5 0 0 1 9 7.2"/><path d="M12 15v2.5"/><path d="M12 9V6.5"/><path d="M17.6 14.8l1.5 1.5"/><path d="M6.4 14.8l-1.5 1.5"/><path d="M17.6 9.2l1.5-1.5"/><path d="M6.4 9.2 4.9 7.7"/></svg>);
const ZapIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const ShieldCheckIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>);

const mockAnalysisData = {
  signal: 'BUY',
  signalQualifier: 'Steady Climb',
  confidence: 'High',
  companyName: 'Example Company Inc. (EXMPL)',
  timestamp: new Date().toISOString(),
  analystVerdict: "The AI's detailed, multi-paragraph reasoning for the signal appears here. It synthesizes all data points into a clear and concise institutional-grade verdict.",
  keyInsight: "This section highlights the single most critical factor driving the trade decision, providing a quick, scannable takeaway.",
  bullAndBearAnalysis: {
    bullCase: 'A detailed bull case is presented, outlining the technical and fundamental reasons for a potential upward move.',
    bearCase: 'A corresponding bear case highlights the primary risks and potential invalidation points for the trade thesis.'
  },
  tradePlan: {
    strategy: 'VST (Bullish Continuation)',
    entryPrice: { price: '150.00', rationale: 'Rationale for the precise entry price based on technical levels.' },
    target: { price: '165.00', rationale: 'Rationale for the profit target based on resistance or projections.' },
    stopLoss: { price: '145.00', rationale: 'Rationale for the stop-loss based on support and risk management.' },
    riskRewardRatio: '3.0'
  },
  technicalBreakdown: {
    'ADX': { value: '35.20', status: 'Strong Trend', interpretation: 'The AI provides a detailed interpretation of the indicator.' },
    'RSI': { value: '62.15', status: 'Bullish', interpretation: 'The AI provides a detailed interpretation of the indicator.' },
    'MACD': { value: '1.25', status: 'Bullish Crossover', interpretation: 'The AI provides a detailed interpretation of the indicator.' },
    'Chart Pattern': { value: 'Bull Flag', status: 'Confirmed', interpretation: 'The AI provides a detailed interpretation of the pattern.' }
  },
  fundamentalBreakdown: {
    'Valuation': { value: 'P/E: 25.5', status: 'Moderate', interpretation: 'The AI provides a detailed interpretation of the fundamentals.' },
    'Profitability': { value: 'Margin: 15%', status: 'Healthy', interpretation: 'The AI provides a detailed interpretation of the fundamentals.' },
    'Ownership': { value: 'Institutions: 75%', status: 'Strong', interpretation: 'The AI provides a detailed interpretation of the fundamentals.' }
  },
  dvmScores: {
    durability: { score: 85, phrase: 'Represents strong financial health.' },
    valuation: { score: 45, phrase: 'Represents a fair to moderate valuation.' },
    momentum: { score: 90, phrase: 'Represents very strong price momentum.' }
  },
  charts: {}, // Charts can be left empty for the wireframe
  performanceSnapshot: {},
  correlations: {}
};

const DemoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-[#0A0F1E] border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white z-50"
        >
          {/* Close Icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <AnalysisDashboard data={mockAnalysisData} />
      </div>
    </div>
  );
};

const LandingHeader = ({ onDemoOpen, onFaqOpen, onUserGuideOpen, onBetaModalOpen }) => {
    return (
        <header className="relative z-30 flex justify-between items-center py-5 px-4 md:px-0">
            <div className="flex items-center gap-3">
                <ScrybeLogo />
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold uppercase tracking-[.2em] text-white/90">SCRYBE AI</h1>
                    
                    {/* --- NEW, CLICKABLE BETA BADGE --- */}
                    <button 
                        onClick={onBetaModalOpen}
                        className="px-2 py-0.5 text-xs font-bold text-slate-200 bg-gradient-to-br from-slate-500 to-slate-700 rounded-md transition-all hover:opacity-80 ring-1 ring-slate-400/50"
                        style={{textShadow: '0 1px 0 rgb(0 0 0 / 40%)'}}
                    >
                        BETA
                    </button>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <button 
                    onClick={onUserGuideOpen} 
                    className="text-white/80 text-sm font-semibold hover:text-white transition-colors"
                >
                    User Guide
                </button>
                <button 
                    onClick={onFaqOpen} 
                    className="text-white/80 text-sm font-semibold hover:text-white transition-colors"
                >
                    Q&A
                </button>
                <button 
                    onClick={onDemoOpen}
                    className="bg-slate-50/10 backdrop-blur-sm border border-slate-50/20 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50/20 transition-all duration-300"
                >
                    View a Demo
                </button>
            </div>
        </header>
    );
};

const AppHeader = ({ onReset, isPulseOpen, setIsPulseOpen, onGoToLanding, onBetaModalOpen }) => {
    return (
        <header className="relative z-30 flex justify-between items-center py-5 px-4 md:px-0">
            <div className="flex-1 flex justify-start">
                <button 
                    onClick={onGoToLanding} 
                    title="Back to Landing Page" 
                    className="group flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-slate-800"
                >
                    {/* --- ADDITION: Home Icon --- */}
                    <Home className="w-5 h-5 text-slate-400 transition-colors group-hover:text-white" />

                    <ScrybeLogo />
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-semibold uppercase tracking-[.2em] text-white/90">SCRYBE AI</h1>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onBetaModalOpen();
                            }}
                            className="px-2.5 py-1 text-xs font-bold text-slate-200 bg-gradient-to-b from-slate-500 to-slate-700 rounded-md transition-all hover:opacity-80 ring-1 ring-inset ring-slate-400/50 shadow-md"
                            style={{textShadow: '0 1px 1px #000'}}
                        >
                            BETA
                        </button>
                    </div>
                </button>
            </div>
            <div className="flex-1 flex justify-center">
                <div className="relative">
                    <button onClick={() => setIsPulseOpen(p => !p)} className="bg-slate-50/10 backdrop-blur-sm border border-slate-50/20 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50/20 transition-all duration-300 flex items-center gap-2">
                        <PulseIcon /> Market Pulse
                    </button>
                    {isPulseOpen && <MarketPulsePopover onClose={() => setIsPulseOpen(false)} />}
                </div>
            </div>
            <div className="flex-1 flex justify-end items-center gap-4">
                {onReset && (
                    <button onClick={onReset} className="bg-slate-50/10 backdrop-blur-sm border border-slate-50/20 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50/20 transition-all duration-300 flex items-center gap-2">
                        <ArrowLeftIcon /> New Analysis
                    </button>
                )}
            </div>
        </header>
    );
};

const PerformanceShowcase = () => {
    const pocMetrics = [
    { value: 19, suffix: '', label: "Total Trades", color: "text-white" },
    { value: 63.16, suffix: "%", label: "Win Rate", color: "text-green-400" },
    { value: 1.65, suffix: '', label: "Profit Factor", color: "text-sky-400" },
    { value: 3.33, suffix: "%", label: "Max Drawdown", color: "text-amber-400" },
    { value: 5.08, prefix: '+', suffix: "%", label: "Net Profit (1 Month)", color: "text-green-400" },
    { value: 3.1, suffix: '', label: "Sharpe Ratio", color: "text-violet-400" },
    ];

  const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const duration = 1500;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = +(value * progress).toFixed(2);
        setCount(current);
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, [value]);

    return (
      <span>
        {prefix}
        {Number.isInteger(value) ? Math.floor(count) : count.toFixed(2)}
        {suffix}
      </span>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-16 px-4">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
          Validated Performance
        </h3>
        <p className="text-sm md:text-base text-slate-400 mt-2 max-w-xl mx-auto">
          Our VST strategy was tested over one month of real market data, delivering precision, consistency, and performance.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {pocMetrics.map((metric, idx) => (
          <div
            key={metric.label}
            className="relative group bg-gradient-to-br from-slate-900/60 to-slate-800/70 border border-slate-700/60 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-md hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition duration-300 ease-in-out"
          >
            <div className="text-3xl md:text-4xl font-semibold font-mono flex justify-center items-center h-12">
              <span className={`${metric.color}`}>
                <AnimatedNumber
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </span>
            </div>
            <div className="text-xs md:text-sm text-slate-400 mt-3 tracking-wide text-center uppercase">
              {metric.label}
            </div>

            {/* Accent bar on hover */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-500 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

const SuccessRateDonut = ({ winRate = 63.16, profitFactor = 1.65, maxDrawdown = 3.33 }) => {
    // 1. We use useMemo to calculate the score only when the props change.
    const successScore = useMemo(() => {
        return (winRate * profitFactor) / (maxDrawdown * 10);
    }, [winRate, profitFactor, maxDrawdown]);

    const maxScore = 5;
    const normalizedScore = Math.min(successScore, maxScore) / maxScore;

    // Circle setup
    const radius = 54;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - normalizedScore);

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => latest.toFixed(2));

    useEffect(() => {
        const controls = animate(count, successScore, {
            duration: 2,
            ease: "easeOut",
        });
        return controls.stop;
    // 2. The dependency array now correctly uses the source value.
    }, [successScore, count]); // The warning will now be gone.

    return (
        <div className="relative w-44 h-44 sm:w-48 sm:h-48">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={radius} strokeWidth={strokeWidth} fill="none" stroke="#1e293b" />
                <motion.circle
                    cx="60" cy="60" r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="120" y2="120">
                        <stop offset="0%" stopColor="#16a34a" />
                        <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.span className="text-4xl font-semibold text-white">
                    {rounded}
                </motion.span>
                <span className="text-xs text-gray-400 tracking-wide uppercase mt-1">
                    Success Score
                </span>
                <span className="text-[10px] text-gray-500 mt-1 leading-tight w-32 sm:w-36 font-light">
                    (Win Rate × Profit Factor) ÷ (Max Drawdown × 10)
                </span>
            </div>
        </div>
    );
};

const HowItWorks = () => {
    const steps = [
        { Icon: PulseIcon, title: "Top-Down Analysis", description: "The AI first analyzes the market and sector context to ensure it's trading with the trend, not against it." },
        { Icon: SearchIcon, title: "Deep Technical Scan", description: "It then performs a deep dive on the individual stock, looking for high-probability patterns confirmed by volume and momentum." },
        { Icon: ShieldCheckIcon, title: "Disciplined Risk Check", description: "Finally, every potential trade is checked against strict risk/reward rules. Only the highest quality setups are approved." },
        { Icon: LightbulbIcon, title: "Clear Signal", description: "The result is a clear BUY, SELL, or HOLD signal, complete with a detailed trade plan and confidence score." }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto my-16 text-center">
            <h3 className="text-3xl font-bold text-white mb-16">A Disciplined Process for a Professional Edge</h3>
            <div className="relative">
                <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-slate-700 border-t-2 border-dashed border-slate-700"></div>
                
                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
                    {steps.map((step) => (
                        <div key={step.title} className="flex flex-col items-center">
                            <div className="w-12 h-12 flex items-center justify-center bg-blue-600/20 border-2 border-blue-500/60 rounded-full text-blue-400 mb-4">
                                <step.Icon className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                            <p className="text-sm text-gray-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const LandingPage = ({ onLaunch, handleLaunchAndNavigate, onUserGuideOpen, onFaqOpen, onPrivacyOpen, onTermsOpen, onDemoOpen }) => {
    return (
        <div className="relative z-10 flex flex-col items-center justify-center text-center pt-12 pb-20 md:pt-16 md:pb-24 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 mb-12">
                {/* Left Side: Headline and Button */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="mt-0 text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                        AI-Powered Swing Trading Analysis
                    </h2>
                    <p className="mt-4 max-w-xl text-lg text-gray-400">
                        Scrybe AI combines frontier intelligence with a disciplined, data-driven process to identify high-probability trading setups.
                    </p>
                    <motion.button
                        onClick={onLaunch}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 bg-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
                    >
                        Launch Analysis Tool
                    </motion.button>
                </div>

                {/* Right Side: The new Success Rate Donut */}
                <div className="md:w-1/2 flex justify-center">
                    <SuccessRateDonut />
                </div>
            </div>
            
            {/* The rest of the landing page sections */}
            <AIStrategyInsights />
            <PerformanceShowcase />
            <FeatureCards />
            <LandingWalkthrough 
                handleLaunchAndNavigate={handleLaunchAndNavigate}
                onUserGuideOpen={onUserGuideOpen}
                onFaqOpen={onFaqOpen}
                onPrivacyOpen={onPrivacyOpen}
                onTermsOpen={onTermsOpen}
                onDemoOpen={onDemoOpen}
            />
            <OurStrategySection />
            <HowItWorks />
        </div>
    );
};

const InteractiveGridBackground = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            document.documentElement.style.setProperty('--x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return (
        <div className="fixed top-0 left-0 w-full h-full z-0">
            <div className="absolute inset-[-200%] w-[400%] h-[400%] bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231e293b\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', animation: 'pan-background 30s linear infinite' }}></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),_rgba(59,130,246,0.15),_transparent_30%)]"></div>
        </div>
    );
};

const AIStrategyInsights = () => {
  const aiStats = [
    {
      icon: <Bot size={32} className="text-cyan-400" />,
      label: "AI Confidence",
      value: "92%",
      description: "Our AI doesn't just guess: it predicts with conviction. This is how sure it is when it sends you a signal.",
    },
    {
      icon: <BrainCircuit size={32} className="text-emerald-400" />,
      label: "Signal Clarity",
      value: "High",
      description: "No clutter. No confusion. Just clean, confident trade setups detected through deep pattern recognition.",
    },
    {
      icon: <Zap size={32} className="text-blue-400" />,
      label: "Edge Strength",
      value: "Strong",
      description: "This reflects how much of an edge the AI has - combining profit potential, timing, and win consistency into one score.",
    },
    {
      icon: <RefreshCw size={32} className="text-violet-400" />,
      label: "Adaptability Score",
      value: "87",
      description: "Markets change fast. This shows how quickly the AI recalibrates and thrives in new conditions.",
    },
    {
      icon: <Timer size={32} className="text-pink-400" />,
      label: "Model Runtime",
      value: "43s",
      description: "From raw data to actionable insight — this is how fast the system processes and delivers your next signal.",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gradient-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/60 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.05)]">
        {aiStats.map((item) => (
          <div
            key={item.label}
            className="text-center bg-slate-900/40 border border-slate-700 rounded-2xl px-4 py-6 shadow-md backdrop-blur-md hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-center mb-3">{item.icon}</div>
            <div className="text-2xl font-bold text-white">{item.value}</div>
            <div className="text-sm text-slate-400 mt-1 font-semibold">{item.label}</div>
            <div className="text-xs text-slate-500">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureCards = () => {
    const features = [
        { Icon: BrainCircuitIcon, title: "Frontier Intelligence", description: "Powered by a mix of purpose-built and frontier models, Scrybe AI is smart, fast, and always learning.", color: "text-purple-400" },
        { Icon: ZapIcon, title: "Actionable Speed", description: "Get from raw data to a clear BUY, SELL, or HOLD signal in seconds, not hours. Your time is valuable.", color: "text-blue-400" },
        { Icon: ShieldCheckIcon, title: "Data-Driven Confidence", description: "Every analysis is backed by a transparent breakdown of technical and fundamental data. Trade with conviction.", color: "text-green-400" }
    ];
    return (
        <div className="w-full max-w-7xl mx-auto mt-4 mb-20 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div key={feature.title} className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800/60 shadow-lg">
                        <feature.Icon className={`w-8 h-8 mb-4 ${feature.color}`} />
                        <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

let pulseCache = {
  data: null,
  timestamp: null,
};

const MarketPulsePopover = ({ onClose }) => {
  const [marketPulseData, setMarketPulseData] = useState(null);
  const [pulseError, setPulseError] = useState(null);

  useEffect(() => {
    const fetchPulse = async () => {
      setPulseError(null);
      const CACHE_DURATION_MINUTES = 15;
      const now = new Date();
      if (pulseCache.data && pulseCache.timestamp && (now - pulseCache.timestamp < CACHE_DURATION_MINUTES * 60 * 1000)) {
        setMarketPulseData(pulseCache.data);
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/api/market-pulse`);
        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.error || `A server error occurred: ${res.status}`);
        }
        const data = await res.json();
        setMarketPulseData(data);
        pulseCache = { data: data, timestamp: now };
      } catch (err) {
        console.error("Failed to fetch market pulse:", err);
        setPulseError(err.message);
      }
    };
    fetchPulse();
  }, []);

  return (
    <div className="fixed inset-0 z-30 flex justify-center items-start pt-20" onClick={onClose}>
      {(() => {
        if (pulseError) {
          return (
            <div className="w-80 bg-slate-900/80 backdrop-blur-lg border border-red-500/50 rounded-lg shadow-2xl p-4 animate-fadeIn" onClick={e => e.stopPropagation()}>
              <div className="text-center">
                <h3 className="font-bold text-red-400 mb-2">Market Pulse Unavailable</h3>
                <p className="text-sm text-red-300">{pulseError}</p>
              </div>
            </div>
          );
        }

        if (!marketPulseData) {
          return (
            <div className="w-80 bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-lg shadow-2xl p-4 animate-fadeIn" onClick={e => e.stopPropagation()}>
              <h3 className="font-bold text-white animate-pulse text-center">Loading Market Data...</h3>
            </div>
          );
        }

        const { overall_performance = 0, sector_performance = {}, stale = false, last_updated, performance_1_day, performance_5_day, performance_1_month } = marketPulseData;
        const isBullish = overall_performance >= 0;
        let sentiment;
        if (overall_performance > 0.5) { sentiment = "Strongly Bullish"; } else if (overall_performance > 0) { sentiment = "Slightly Bullish"; } else if (overall_performance < -0.5) { sentiment = "Strongly Bearish"; } else { sentiment = "Slightly Bearish"; }
        const sentiment_color = isBullish ? 'text-green-400' : 'text-red-400';
        const sortedSectors = Object.entries(sector_performance).sort(([, a], [, b]) => b - a);
        const gainers = sortedSectors.filter(([, v]) => v >= 0);
        const losers = sortedSectors.filter(([, v]) => v < 0);
        const bar_width = Math.min(50, (Math.abs(overall_performance) / 2) * 100);
        const formatPercentage = (num) => { if (num === undefined || num === null) return 'N/A'; const fixedNum = num.toFixed(2); return num > 0 ? `+${fixedNum}%` : `${fixedNum}%`; };
        const momentum = { '1D': performance_1_day, '5D': performance_5_day, '1M': performance_1_month };

        return (
          <div className="w-[70vw] max-w-xl bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-lg shadow-2xl p-6 animate-fadeIn" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white text-lg">Nifty50 Market Health</h3>
              {stale && <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" title={`Live data failed. Showing data from: ${new Date(last_updated).toLocaleTimeString()}`}></div>}
            </div>
            <div>
              <div className="flex justify-between items-baseline">
                <p className="text-sm text-gray-400">Overall Sentiment</p>
                <p className="text-sm text-gray-400">Average Change</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className={`font-semibold text-xl ${sentiment_color}`}>{sentiment}</p>
                <p className={`font-mono font-semibold text-lg ${sentiment_color}`}>{formatPercentage(overall_performance)}</p>
              </div>
              <div className="w-full flex items-center h-1.5 mt-2">
                <div className="w-1/2 bg-red-500/20 h-full rounded-l-full flex justify-end">
                  {!isBullish && <div className="bg-red-500 h-full rounded-l-full" style={{ width: `${bar_width}%` }}></div>}
                </div>
                <div className="w-1/2 bg-green-500/20 h-full rounded-r-full">
                  {isBullish && <div className="bg-green-500 h-full rounded-r-full" style={{ width: `${bar_width}%` }}></div>}
                </div>
              </div>
            </div>
            <hr className="border-slate-700 my-4"/>
            <div>
              <h4 className="font-semibold text-white mb-3 text-center">Recent Price Momentum (Nifty50)</h4>
              <div className="flex justify-around items-center text-center">
                {Object.entries(momentum).map(([period, value]) => (
                  <React.Fragment key={period}>
                    <div>
                      <p className={`text-xl font-bold ${value >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatPercentage(value)}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{period}</p>
                    </div>
                    {period !== '1M' && <div className="h-10 border-l border-slate-700"></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <hr className="border-slate-700 my-4"/>
            <div>
              <h4 className="font-semibold text-white mb-2 text-center">Sector Spotlight</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-green-400 text-sm mb-1">Top Gainers</h5>
                  <ul className="text-xs text-gray-300 space-y-1">{gainers.length > 0 ? gainers.slice(0, 3).map(([name, val]) => <li key={name}>{name}: {formatPercentage(val)}</li>) : <li>None</li>}</ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-400 text-sm mb-1">Top Losers</h5>
                  <ul className="text-xs text-gray-300 space-y-1">{losers.length > 0 ? losers.slice(0, 3).map(([name, val]) => <li key={name}>{name}: {formatPercentage(val)}</li>) : <li>None</li>}</ul>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

const StockSelector = ({ onAnalyze }) => {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All'); // New state for filters

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/all-analysis`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load stock analysis list.");
                return res.json();
            })
            .then(data => {
                data.sort((a, b) => Math.abs(b.scrybeScore || 0) - Math.abs(a.scrybeScore || 0));
                setStocks(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching stock list:", error);
                setIsLoading(false);
            });
    }, []);

    const filteredStocks = useMemo(() => {
        let filtered = stocks;

        // Apply the active filter first
        if (activeFilter === 'BUY') {
            filtered = stocks.filter(stock => stock.signal === 'BUY');
        } else if (activeFilter === 'SELL') {
            filtered = stocks.filter(stock => stock.signal === 'SELL');
        } else if (activeFilter === 'On The Radar') {
            filtered = stocks.filter(stock => stock.isOnRadar === true);
        }

        // Then apply the search term
        if (!searchTerm) return filtered;
        return filtered.filter(stock =>
            stock.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [stocks, searchTerm, activeFilter]);

    const ScoreBadge = ({ score }) => {
        // This safety check prevents the crash.
        if (typeof score !== 'number' || isNaN(score)) {
            return (
                <span className="font-mono font-semibold text-sm px-2.5 py-1 rounded-md text-slate-500 bg-slate-700/20 ring-1 ring-inset ring-slate-600/30">
                    N/A
                </span>
            );
        }

        const scoreColor = score > 49 ? 'text-green-300 bg-green-500/10 ring-green-500/30' 
                    : score < -49 ? 'text-red-300 bg-red-500/10 ring-red-500/30'
                    : 'text-slate-400 bg-slate-700/20 ring-slate-600/30';
        const scoreText = score > 0 ? `+${score.toFixed(0)}` : score.toFixed(0);
        
        return (
            <span className={`font-mono font-semibold text-sm px-2.5 py-1 rounded-md ring-1 ring-inset ${scoreColor}`}>
                {scoreText}
            </span>
        );
    };
        
    const FilterButton = ({ filterType }) => {
        const isActive = activeFilter === filterType;
        return (
            <button 
                onClick={() => setActiveFilter(filterType)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'}`}
            >
                {filterType}
            </button>
        );
    };

    return (
        <div className="relative z-10 flex flex-col items-center justify-center text-center pt-16 pb-20 md:pt-20 md:pb-24">
            <h2 className="mt-0 text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">Today's Top Setups</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-400">A daily ranked list of Nifty 50 companies, sorted by the AI's Scrybe Score.</p>
            <div className="mt-12 w-full max-w-2xl">
                {/* --- NEW FILTER BUTTONS --- */}
                <div className="flex justify-center gap-2 mb-4">
                    <FilterButton filterType="All" />
                    <FilterButton filterType="BUY" />
                    <FilterButton filterType="SELL" />
                    <FilterButton filterType="On The Radar" />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><SearchIcon /></div>
                    <input
                        type="text"
                        placeholder={isLoading ? "Loading ranked list..." : "Search for a stock..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900/40 backdrop-blur-md border border-slate-700 text-white placeholder-gray-500 text-lg rounded-xl py-4 pl-12 pr-4 transition-all focus:outline-none focus:border-blue-500"
                        disabled={isLoading}
                    />
                </div>
                <div className="mt-4 max-h-96 overflow-y-auto bg-slate-900/40 border border-slate-700 rounded-xl p-2 space-y-1">
                    {isLoading && <p className="text-gray-400 text-center p-4">Loading...</p>}
                    {!isLoading && filteredStocks.length === 0 && <p className="text-gray-400 text-center p-4">No setups found for the current filter.</p>}
                    {!isLoading && filteredStocks.map((stock, index) => (
                        <button
                            key={stock.ticker}
                            onClick={() => onAnalyze(stock.ticker)}
                            className="w-full text-left p-3 rounded-lg hover:bg-blue-600/50 transition-colors flex justify-between items-center"
                        >
                            <div className="flex items-center">
                                <span className="font-mono text-gray-500 text-sm w-8">{index + 1}.</span>
                                <span className="font-semibold text-white">{stock.companyName}</span>
                            </div>
                            <ScoreBadge score={stock.scrybeScore} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SkeletonLoader = () => (<div className="w-full max-w-5xl mx-auto p-8 animate-fadeIn"><h2 className="text-2xl font-bold text-center text-gray-400 mb-2">Retrieving Instant Analysis...</h2><p className="text-center text-gray-500 mb-8 h-6"></p><div className="w-full h-28 bg-slate-800/80 rounded-lg animate-pulse mb-6"></div><div className="w-full h-24 bg-slate-800/80 rounded-lg animate-pulse mb-6"></div><div className="grid md:grid-cols-2 gap-6 mb-6"><div className="w-full h-48 bg-slate-800/80 rounded-lg animate-pulse"></div><div className="w-full h-48 bg-slate-800/80 rounded-lg animate-pulse"></div></div><div className="w-full h-96 bg-slate-800/80 rounded-lg animate-pulse"></div></div>);
const ErrorDisplay = ({ error, onReset }) => ( <div className="text-center p-8 animate-fadeIn"><h2 className="text-2xl font-bold text-red-400">Analysis Failed</h2><p className="text-red-300 mt-2 max-w-2xl mx-auto">{error}</p><button onClick={onReset} className="mt-6 bg-red-500/80 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-500/100 transition-colors">Try Another Analysis</button></div>);
const TickerTape = () => {
    const nifty50=[ {name:"RELIANCE", price:"2985.50", change:"+12.25", dir:"+"}, {name:"TCS", price:"3850.10", change:"-5.80", dir:"-"}, {name:"HDFCBANK", price:"1690.75", change:"+8.15", dir:"+"}, {name:"INFY", price:"1525.30", change:"-1.90", dir:"-"}, {name:"ICICIBANK", price:"1160.05", change:"+2.55", dir:"+"}, {name:"HINDUNILVR", price:"2455.60", change:"-20.40", dir:"-"}, {name:"BHARTIARTL", price:"1415.90", change:"+15.00", dir:"+"}, {name:"ITC", price:"430.25", change:"-0.65", dir:"-"}, {name:"KOTAKBANK", price:"1725.20", change:"-3.45", dir:"-"}, {name:"LT", price:"3700.80", change:"+25.75", dir:"+"}, {name:"SBIN", price:"870.60", change:"+6.10", dir:"+"}, {name:"AXISBANK", price:"1112.90", change:"-2.20", dir:"-"}, {name:"BAJFINANCE", price:"7520.00", change:"+30.00", dir:"+"}, {name:"ASIANPAINT", price:"3185.40", change:"-15.70", dir:"-"}, {name:"MARUTI", price:"12380.25", change:"+90.15", dir:"+"}, {name:"SUNPHARMA", price:"1225.60", change:"-5.50", dir:"-"}, {name:"NESTLEIND", price:"25250.90", change:"+110.00", dir:"+"}, {name:"ULTRACEMCO", price:"10050.00", change:"-45.20", dir:"-"}, {name:"ADANIENT", price:"3125.70", change:"+20.35", dir:"+"}, {name:"WIPRO", price:"460.20", change:"-2.10", dir:"-"} ];
    const extended_nifty=[...nifty50,...nifty50,...nifty50,...nifty50];
    return (
        <div className="fixed bottom-0 left-0 right-0 z-20 w-full py-4 overflow-hidden group bg-[#0A0F1E]/80 backdrop-blur-sm">
            <div className="flex animate-marquee group-hover:pause">
                {extended_nifty.map((stock, i) => ( <div key={i} className="flex-shrink-0 mx-6 flex items-center gap-3"><span className="font-semibold text-gray-300">{stock.name}</span><span className={`font-mono text-sm ${stock.dir === '+' ? 'text-green-400' : 'text-red-400'}`}>{stock.price} ({stock.change})</span></div> ))}
            </div>
            <style>{` @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 40s linear infinite; } .group-hover\\:pause:hover { animation-play-state: paused; } `}</style>
        </div>
    );
};

const TradingPlanCard = ({ plan, signal, reasonForHold }) => {
    // --- NEW, SIMPLER LOGIC ---
    // If the signal is HOLD, always show the reason and the "Wait and Observe" message.
    if (signal === 'HOLD') {
        return (
            <div className="p-8 text-center">
                <h4 className="font-bold text-lg text-gray-400 mb-2">Wait and Observe</h4>
                <p className="text-sm text-gray-400 max-w-xl mx-auto">
                    {/* Display the specific reason from the AI */}
                    {reasonForHold || "No high-probability trade setup detected. Capital preservation is advised."}
                </p>
            </div>
        );
    }

    // This is the original logic for displaying a valid BUY or SELL plan.
    const isBuySignal = signal === 'BUY';
    return (
        <div className="p-6">
            <h4 className="font-bold text-xl text-white mb-2">{plan.strategy} ({isBuySignal ? 'Long' : 'Short'})</h4>
            <p className="text-sm text-gray-400 mb-6">{plan.strategyRationale}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 text-sm">
                {/* Entry Price */}
                <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">Entry</p>
                    <p className="font-semibold text-white text-2xl">{plan.entryPrice?.price || 'N/A'}</p>
                    <p className="text-gray-400 text-xs italic mt-1">{plan.entryPrice?.rationale || ''}</p>
                </div>
                {/* Target Price */}
                <div>
                    <p className="font-semibold uppercase tracking-wider text-xs text-green-400">Target</p>
                    <p className="font-semibold text-2xl text-green-400">{plan.target?.price || 'N/A'}</p>
                    <p className="text-gray-400 text-xs italic mt-1">{plan.target?.rationale || ''}</p>
                </div>
                {/* Stop Loss */}
                <div>
                     <p className="font-semibold uppercase tracking-wider text-xs text-red-400">Stop Loss</p>
                    <p className="font-semibold text-2xl text-red-400">{plan.stopLoss?.price || 'N/A'}</p>
                    <p className="text-gray-400 text-xs italic mt-1">{plan.stopLoss?.rationale || ''}</p>
                </div>
                {/* Risk/Reward */}
                <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">Risk/Reward Ratio</p>
                    <p className="font-semibold text-white text-lg">{plan.riskRewardRatio || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

const DVMScores = ({ scores }) => {
    if (!scores) return null;
    const scoreDefinitions = { Durability: "Measures the company's financial strength and stability, based on profitability and institutional ownership.", Valuation: "Measures how reasonably the stock is priced relative to its earnings and book value. Lower is often better.", Momentum: "Measures the strength of the stock's recent price trend, based on technical indicators like RSI and ADX." };
    
    const ScoreCard = ({ title, scoreData }) => {
        const score = scoreData?.score || 0;
        const phrase = scoreData?.phrase || 'N/A';
        const barColor = score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500';
        const textColor = score >= 70 ? 'text-green-400' : score >= 40 ? 'text-amber-400' : 'text-red-400';

        return (
            <div className="flex-1 bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 text-center transition-all hover:border-slate-500/80 hover:bg-slate-800/60">
                <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                    <p className="font-bold text-lg text-white">{title}</p>
                    <span title={scoreDefinitions[title]} className="cursor-help"><InfoIcon /></span>
                </div>
                <p className={`text-4xl font-bold ${textColor}`}>{score.toFixed(0)}<span className="text-2xl text-gray-400/80">/100</span></p>
                <p className="text-sm text-gray-400 mt-1 min-h-[2.5rem]">{phrase}</p>
                
                {/* Visual bar section */}
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div className={`${barColor} h-2 rounded-full`} style={{ width: `${score}%` }}></div>
                </div>
            </div>
        );
    };
    
    const overallScore = (scores.durability.score + scores.valuation.score + scores.momentum.score) / 3;
    let overallStatus = "Balanced Profile";
    if (overallScore >= 65) { overallStatus = "Strong Performer"; } else if (overallScore <= 45) { overallStatus = "Needs Caution"; }
    
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
                <span className="flex h-3 w-3"><span className={`animate-ping absolute inline-flex h-3 w-3 rounded-full ${overallScore >= 65 ? 'bg-green-400' : 'bg-amber-400'} opacity-75`}></span><span className={`relative inline-flex rounded-full h-3 w-3 ${overallScore >= 65 ? 'bg-green-500' : 'bg-amber-500'}`}></span></span>
                <h3 className="text-xl font-bold text-white">{overallStatus}</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <ScoreCard title="Durability" scoreData={scores.durability} />
                <ScoreCard title="Valuation" scoreData={scores.valuation} />
                <ScoreCard title="Momentum" scoreData={scores.momentum} />
            </div>
        </div>
    );
};

const AnalysisDashboard = ({ data }) => {
    const {
        scrybeScore, // Let's handle the default below
        signal = 'N/A',
        signalQualifier = '',
        confidence = 'N/A',
        companyName = data?.ticker || 'N/A',
        timestamp,
        analystVerdict = 'No verdict available.',
        keyInsight = 'No key insight available.',
        bullAndBearAnalysis = { bullCase: 'No bull case provided.', bearCase: 'No bear case provided.' },
        reasonForHold = '',
        tradePlan = {},
        charts = {},
        technicalBreakdown = {},
        fundamentalBreakdown = {},
        performanceSnapshot = {},
        correlations = {},
        dvmScores
    } = data || {};

    // This safety check is the critical fix.
    // It ensures scrybeScore is always a number.
    const score = (typeof scrybeScore === 'number' && !isNaN(scrybeScore)) ? scrybeScore : 0;

    const scoreColor = score > 49 ? 'text-green-400' 
                     : score < -49 ? 'text-red-400'
                     : 'text-amber-400';
    const scoreBorderColor = score > 49 ? 'border-green-500/40' 
                           : score < -49 ? 'border-red-500/40'
                           : 'border-amber-500/40';
    const scoreBgColor = score > 49 ? 'bg-green-500/10' 
                       : score < -49 ? 'bg-red-500/10'
                       : 'bg-amber-500/10';
    const scoreGlowColor = score > 49 ? 'shadow-green-500/20' 
                         : score < -49 ? 'shadow-red-500/20'
                         : 'shadow-amber-500/20';
    const scoreText = score > 0 ? `+${score.toFixed(0)}` : score.toFixed(0);

    const qualifierConfig = { 'Steady Climb': { Icon: ArrowUpRightIcon, colors: 'bg-green-500/10 text-green-400 border-green-500/30' }, 'Volatile Move': { Icon: ZapIcon, colors: 'bg-amber-500/10 text-amber-400 border-amber-500/30' }, 'Quiet Consolidation': { Icon: PauseIcon, colors: 'bg-slate-700/40 text-slate-300 border-slate-600/50' } };
    const qConfig = qualifierConfig[signalQualifier];

    const PerformanceBar = () => {
        const timeframes = ['1-Week', '1-Month', '3-Month', '6-Month', '1-Year'];
        return (<div className="flex flex-wrap justify-around bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 mb-8">{timeframes.map(tf => { const perfData = performanceSnapshot[tf]; const perfValue = perfData?.change_percent || 'N/A'; const isPositive = typeof perfValue === 'string' && parseFloat(perfValue) > 0; return (<div key={tf} className="text-center px-3 py-1"><p className="text-sm text-gray-400">{tf}</p><p className={`font-bold text-lg ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{perfValue}</p></div>); })}</div>);
    };

    const FormattedText = ({ text }) => (
        <div className="text-gray-300 leading-relaxed space-y-2">
            {text.split('\\n').map((line, index) => (
                <p key={index} className="flex items-start">
                    {line.trim().startsWith('*') && <span className="mr-2 mt-1">•</span>}
                    <span>{line.trim().replace(/^\* ?/, '')}</span>
                </p>
            ))}
        </div>
    );

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn">
            <h2 className="text-3xl font-bold text-white mb-2">{companyName}</h2>
            <p className="text-gray-400 mb-8">AI Analysis as of {timestamp ? new Date(timestamp).toLocaleString() : 'N/A'}</p>
            
            <div className={`p-8 rounded-xl border ${scoreBorderColor} ${scoreBgColor} shadow-2xl ${scoreGlowColor} text-center mb-8`}>
                <p className={`font-semibold tracking-wider uppercase ${scoreColor}`}>Scrybe Score</p>
                <div className="flex justify-center items-center gap-x-4">
                    <h1 className={`text-7xl font-extrabold my-2 font-mono ${scoreColor}`}>{scoreText}</h1>
                    {qConfig && ( 
                        <span title={qConfig.description} className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border ${qConfig.colors}`}> 
                            <qConfig.Icon className="h-4 w-4" /> {signalQualifier} 
                        </span> 
                    )}
                </div>
                <p className="text-xl font-semibold text-gray-300">Signal: <span className={scoreColor}>{signal} ({confidence})</span></p>
            </div>
            
            <ConfidencePoll analysisId={data?.analysis_id} />
            <PerformanceBar />
            {dvmScores && <DVMScores scores={dvmScores} />}
            
            <div className="grid md:grid-cols-5 gap-8 mb-8">
                <div className="md:col-span-3 bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6">
                    <h3 className="font-bold text-xl text-white mb-3">Analyst's Verdict</h3>
                    <FormattedText text={analystVerdict} />
                </div>
                <div className="md:col-span-2 bg-blue-900/30 backdrop-blur-md border border-blue-500/60 rounded-xl p-6 flex flex-col items-center text-center">
                    <div className="bg-blue-500/20 p-3 rounded-full mb-3"><LightbulbIcon className="text-blue-300 h-6 w-6" /></div>
                    <h3 className="font-bold text-xl text-white mb-3">Key Insight</h3>
                    <FormattedText text={keyInsight} />
                </div>
            </div>
            
            <NewsSection ticker={data?.ticker} />
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-slate-900/40 backdrop-blur-md border border-green-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3"><div className="bg-green-500/20 p-2 rounded-full"><BullIcon className="text-green-300" /></div><h3 className="font-bold text-xl text-white">Bull Case</h3></div>
                    <FormattedText text={bullAndBearAnalysis.bullCase} />
                </div>
                <div className="bg-slate-900/40 backdrop-blur-md border border-red-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3"><div className="bg-red-500/20 p-2 rounded-full"><BearIcon className="text-red-300" /></div><h3 className="font-bold text-xl text-white">Bear Case</h3></div>
                    <FormattedText text={bullAndBearAnalysis.bearCase} />
                </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl mb-8">
                <h3 className="font-bold text-xl text-white p-6 pb-0">Actionable Trade Plan</h3>
                <TradingPlanCard plan={tradePlan} signal={signal} reasonForHold={reasonForHold} />
            </div>

            <TradeJournalCard analysisData={data} />

            <div className="space-y-8 mb-8">
                {charts && charts['1M'] && (
                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6">
                        <h3 className="font-bold text-xl text-white mb-4">1-Month Chart (Contextual View)</h3>
                        <img src={`data:image/png;base64,${charts['1M']}`} alt="1-Month Technical Analysis Chart" className="rounded-md" />
                    </div>
                )}
                {charts && charts['1W'] && (
                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6">
                        <h3 className="font-bold text-xl text-white mb-4">1-Week Chart (Tactical View)</h3>
                        <img src={`data:image/png;base64,${charts['1W']}`} alt="1-Week Technical Analysis Chart" className="rounded-md" />
                    </div>
                )}
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-xl text-white mb-4">Inter-Market Correlations (90-Day)</h3>
                <p className="text-center text-sm text-gray-400 mb-6 max-w-2xl mx-auto">
                    This shows how the stock's price has moved in relation to key global markets over the last 90 days. A value near +1 means they move together; near -1 means they move in opposite directions.
                </p> 
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(correlations).map(([key, value]) => {
                        const cleanKey = key.replace(' Correlation', '');
                        const interpretation = getCorrelationInterpretation(parseFloat(value));
                        const tooltipText = `${CORRELATION_DEFINITIONS[cleanKey]} Current value indicates: ${interpretation}`;

                        return (
                            <div key={key} className="bg-slate-800/50 p-3 rounded-lg text-center">
                                <div className="flex justify-center items-center gap-2 mb-1">
                                    <p className="text-sm text-gray-400">{cleanKey}</p>
                                    <span title={tooltipText} className="cursor-help"><InfoIcon /></span>
                                </div>
                                <p className="font-bold text-lg text-white">{value}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <details className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 group">
                <summary className="font-bold text-xl text-white list-none flex justify-between items-center cursor-pointer">
                    Show Detailed Analysis
                    <ChevronDownIcon className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-6 grid md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                        <h4 className="font-semibold text-white mb-3 border-b border-slate-700 pb-2">Technical Breakdown</h4>
                        <div className="text-sm text-gray-300 space-y-4">
                            {Object.entries(technicalBreakdown).map(([key, value]) => (
                                <div key={key}>
                                    <strong className="text-gray-100">{key}:</strong>
                                    <span className={`ml-2 font-semibold ${getStatusColor(value.status)}`}>
                                        {value.value} ({value.status})
                                    </span>
                                    <p className="text-gray-400 mt-1 italic">{value.interpretation}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-3 border-b border-slate-700 pb-2">Fundamental Snapshot</h4>
                        <div className="text-sm text-gray-300 space-y-4">
                            {Object.entries(fundamentalBreakdown).map(([key, value]) => (
                                <div key={key}>
                                    <strong className="text-gray-100">{key}:</strong>
                                    <span className={`ml-2 font-semibold ${getStatusColor(value.status)}`}>
                                        {value.value} ({value.status})
                                    </span>
                                    <p className="text-gray-400 mt-1 italic">{value.interpretation}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </details>
            <DisclaimerFooter />
        </div>
    );
};

const AITrackRecord = () => {
    const [trackRecordData, setTrackRecordData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchTrackRecord = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/track-record`);
                if (!res.ok) throw new Error("Server failed to return track record.");
                const data = await res.json();
                data.sort((a, b) => new Date(b.close_date) - new Date(a.close_date));
                setTrackRecordData(data);
            } catch (err) { setError(err.message); }
        };
        fetchTrackRecord();
    }, []);
    const getEventDisplay = (event) => { if (!event) return { text: "Unknown", color: "bg-slate-700 text-slate-300" }; const lowerEvent = event.toLowerCase(); if (lowerEvent.includes('final target hit')) { return { text: "Target Hit", color: "bg-green-500/20 text-green-300" }; } if (lowerEvent.includes('leveled up')) { return { text: "Leveled Up", color: "bg-sky-500/20 text-sky-300" }; } if (lowerEvent.includes('stop-loss hit')) { return { text: "Stopped Out", color: "bg-red-500/20 text-red-400" }; } if (lowerEvent.includes('timed out')) { return { text: "Timed Out", color: "bg-amber-500/20 text-amber-400" }; } return { text: "Logged", color: "bg-slate-700 text-slate-300" }; };
    if (error) return <div className="text-red-400 text-center p-8">Error loading track record: {error}</div>
    if (!trackRecordData) return <div className="text-center p-8 animate-pulse">Loading AI Track Record...</div>
    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-fadeIn">
            <h2 className="text-4xl font-bold text-white mb-2 text-center">AI Performance Record</h2><p className="text-lg text-gray-400 text-center mb-12">Reviewing the event log of every AI-driven trade prediction.</p>
            <div className="bg-slate-900/40 border border-slate-700/60 rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-800/50"><tr><th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Ticker</th><th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Prediction Date</th><th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Days Held</th><th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Event</th><th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">Total Return</th></tr></thead>
                    <tbody>
                        {trackRecordData.length > 0 ? trackRecordData.map(trade => {
                            // FIX: Use 'closing_reason' instead of 'event'
                            const eventDisplay = getEventDisplay(trade.closing_reason);
                            // FIX: Use 'return_pct' instead of 'return_vs_prediction_pct'
                            const returnColor = trade.return_pct >= 0 ? 'text-green-400' : 'text-red-400';
                            return (
                                <tr key={trade.prediction_id} className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/40 transition-colors">
                                    <td className="p-4 text-gray-200 font-semibold">{trade.ticker}</td>
                                    {/* FIX: Use 'open_date' to be consistent with the backend */}
                                    <td className="p-4 text-gray-400">{new Date(trade.open_date).toLocaleDateString()}</td>
                                    <td className="p-4 text-gray-400">{trade.evaluation_days}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${eventDisplay.color}`}>
                                            {eventDisplay.text}
                                        </span>
                                    </td>
                                    {/* FIX: Use 'return_pct' for the value */}
                                    <td className={`p-4 font-mono font-semibold text-right ${returnColor}`}>
                                        {trade.return_pct >= 0 ? '+' : ''}{trade.return_pct.toFixed(2)}%
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-16">
                                    No performance data has been recorded yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default function App() {

    const [view, setView] = useState('landing');
    const [showFaq, setShowFaq] = useState(false);
    const [showUserGuide, setShowUserGuide] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [activeTab, setActiveTab] = useState('app_guide'); // New default tab
    const [analysisState, setAnalysisState] = useState('selector');
    const [error, setError] = useState(null);
    const [analysisData, setAnalysisData] = useState(null);
    const [isDemoOpen, setIsDemoOpen] = useState(false);
    const [isPulseOpen, setIsPulseOpen] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);

    // --- Core Application Logic ---
    const handleGoToLanding = () => {
        setView('landing');
        setAnalysisState('selector'); // This resets the analysis page for the next visit
    };

    const handleLaunch = () => {
        const agreedTimestamp = localStorage.getItem('disclaimerAgreedTimestamp');
        if (agreedTimestamp) {
            const ninetyDaysInMillis = 90 * 24 * 60 * 60 * 1000;
            const lastAgreedDate = new Date(parseInt(agreedTimestamp));
            const currentDate = new Date();

            // If it has been more than 90 days, show the disclaimer again
            if (currentDate.getTime() - lastAgreedDate.getTime() > ninetyDaysInMillis) {
                setShowDisclaimer(true);
            } else {
                setView('app'); // Launch directly if within 90 days
            }
        } else {
            setShowDisclaimer(true); // Show if they've never agreed
        }
    };

    const handleAgreeToDisclaimer = () => {
        // Save the current timestamp to localStorage
        localStorage.setItem('disclaimerAgreedTimestamp', Date.now().toString());
        setShowDisclaimer(false);
        setView('app');
    };

    const navigateToTab = (index) => {
        setTabIndex(index);
    };
    const handleLaunchAndNavigate = (index) => {
        setView('app');      // First, switch to the main app view
        setTabIndex(index);  // Then, immediately set the active tab
    };

    const handleResetAnalysis = () => setAnalysisState('selector');

    const handleAnalysis = async (ticker) => {
        if (!ticker) return;
        setAnalysisState('analyzing');
        setError(null);
        setAnalysisData(null);
        try {
            // Use the variable instead of the hardcoded URL
            const response = await fetch(`${API_BASE_URL}/api/analyze/${ticker}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Analysis not found or server error." }));
                throw new Error(errorData.error);
            }
            const data = await response.json();
            setAnalysisData(data);
            setAnalysisState('results');
        } catch (err) {
            console.error("API Error:", err);
            setError(err.message);
            setAnalysisState('error');
        }
    };

    const renderMainApp = () => (
        <div className="w-full">
            <Tab.Group selectedIndex={tabIndex} onChange={(index) => {
                setTabIndex(index);
                if (index === 0) setActiveTab('app_guide');
                if (index === 1) setActiveTab('stock_analysis');
                if (index === 2) setActiveTab('on_the_radar');
                if (index === 3) setActiveTab('open_positions');
                if (index === 4) setActiveTab('index_analysis');
                if (index === 5) setActiveTab('track_record');
                if (index === 6) setActiveTab('rulebook');
            }}>
                <Tab.List>
                    <div className="hidden md:flex justify-center p-1 space-x-1 bg-slate-900/40 rounded-xl sticky top-4 z-10 backdrop-blur-md w-fit mx-auto">
                        <Tab as={Fragment}>{({ selected }) => (<button className={`w-full rounded-lg py-2.5 px-6 text-md font-medium leading-5 transition-all ${selected ? 'bg-slate-700/50 text-white shadow' : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'}`}>App Guide</button>)}</Tab>
                        <Tab as={Fragment}>{({ selected }) => (<button className={`w-full rounded-lg py-2.5 px-6 text-md font-medium leading-5 transition-all ${selected ? 'bg-slate-700/50 text-white shadow' : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'}`}>Stock Analysis</button>)}</Tab>
                        <Tab as={Fragment}>{({ selected }) => (<button className={`w-full rounded-lg py-2.5 px-6 text-md font-medium leading-5 transition-all ${selected ? 'bg-slate-700/50 text-white shadow' : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'}`}>On The Radar</button>)}</Tab>
                        <Tab as={Fragment}>{({ selected }) => (<button className={`w-full rounded-lg py-2.5 px-6 text-md font-medium leading-5 transition-all ${selected ? 'bg-slate-700/50 text-white shadow' : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'}`}>Open Positions</button>)}</Tab>
                        <Tab as={Fragment}>{({ selected }) => (<button className={`w-full rounded-lg py-2.5 px-6 text-md font-medium leading-5 transition-all ${selected ? 'bg-slate-700/50 text-white shadow' : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'}`}>Index Analysis</button>)}</Tab>
                        <Tab as={Fragment}>{({ selected }) => (<button className={`w-full rounded-lg py-2.5 px-6 text-md font-medium leading-5 transition-all ${selected ? 'bg-slate-700/50 text-white shadow' : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'}`}>AI Track Record</button>)}</Tab>
                        <Tab as={Fragment}>{({ selected }) => (<button className={`w-full rounded-lg py-2.5 px-6 text-md font-medium leading-5 transition-all ${selected ? 'bg-slate-700/50 text-white shadow' : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'}`}>Rulebook</button>)}</Tab>
                    </div>

                    <div className="md:hidden sticky top-4 z-10 w-full flex justify-center">
                        <Menu as="div" className="relative inline-block text-left w-full max-w-xs">
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full rounded-lg bg-slate-700/50 px-4 py-2.5 text-md font-medium text-white shadow hover:bg-slate-700/80">
                                    {activeTab.replace(/_/g, ' ')}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </Menu.Button>
                            </div>
                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-slate-700 rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1">
                                        <Menu.Item>{({ active }) => (<Tab as="button" className={`${active ? 'bg-blue-600 text-white' : 'text-gray-300'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>App Guide</Tab>)}</Menu.Item>
                                        <Menu.Item>{({ active }) => (<Tab as="button" className={`${active ? 'bg-blue-600 text-white' : 'text-gray-300'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Stock Analysis</Tab>)}</Menu.Item>
                                        <Menu.Item>{({ active }) => (<Tab as="button" className={`${active ? 'bg-blue-600 text-white' : 'text-gray-300'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>On The Radar</Tab>)}</Menu.Item>
                                        <Menu.Item>{({ active }) => (<Tab as="button" className={`${active ? 'bg-blue-600 text-white' : 'text-gray-300'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Open Positions</Tab>)}</Menu.Item>
                                        <Menu.Item>{({ active }) => (<Tab as="button" className={`${active ? 'bg-blue-600 text-white' : 'text-gray-300'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Index Analysis</Tab>)}</Menu.Item>
                                        <Menu.Item>{({ active }) => (<Tab as="button" className={`${active ? 'bg-blue-600 text-white' : 'text-gray-300'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>AI Track Record</Tab>)}</Menu.Item>
                                        <Menu.Item>{({ active }) => (<Tab as="button" className={`${active ? 'bg-blue-600 text-white' : 'text-gray-300'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Rulebook</Tab>)}</Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </Tab.List>
                <div className="w-full py-8">
                    <Tab.Panels>
                        <Tab.Panel><AppGuide navigateToTab={navigateToTab} /></Tab.Panel>
                        <Tab.Panel>{renderStockAnalysisContent()}</Tab.Panel>
                        <Tab.Panel><OnTheRadar /></Tab.Panel>
                        <Tab.Panel><OpenPositions onAnalyze={handleAnalysis} /></Tab.Panel>
                        <Tab.Panel><IndexAnalysisView /></Tab.Panel>
                        <Tab.Panel><AITrackRecord /></Tab.Panel>
                        <Tab.Panel><Rulebook /></Tab.Panel>
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </div>
    );

    const renderStockAnalysisContent = () => {
        switch (analysisState) {
            case 'analyzing': return <SkeletonLoader />;
            case 'results': return <AnalysisDashboard data={analysisData} />;
            case 'error': return <ErrorDisplay error={error} onReset={handleResetAnalysis} />;
            case 'selector':
            default: return <StockSelector onAnalyze={handleAnalysis} />;
        }
    };
    
    if (showFaq) { return <FaqPage onBack={() => setShowFaq(false)} />; }
    if (showUserGuide) { return <UserGuidePage onBack={() => setShowUserGuide(false)} />; }
    if (showPrivacy) { return <PrivacyPolicyPage onBack={() => setShowPrivacy(false)} />; }
    if (showTerms) { return <TermsPage onBack={() => setShowTerms(false)} />; }

    // This is the final return statement for your main application
    return (
        <main className="bg-[#0A0F1E] min-h-screen text-white font-sans relative flex flex-col">
            {showDisclaimer && <DisclaimerModal onAgree={handleAgreeToDisclaimer} />}
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }`}</style>
            <InteractiveGridBackground />

            <div className="max-w-7xl w-full mx-auto px-4 relative z-20">
                {view === 'landing' ? (
                    <LandingHeader 
                        onDemoOpen={() => setIsDemoOpen(true)} 
                        onFaqOpen={() => setShowFaq(true)}
                        onUserGuideOpen={() => setShowUserGuide(true)}
                        onBetaModalOpen={() => setIsBetaModalOpen(true)}
                    />
                ) : (
                    <AppHeader 
                        onReset={analysisState !== 'selector' ? handleResetAnalysis : null} 
                        isPulseOpen={isPulseOpen} 
                        setIsPulseOpen={setIsPulseOpen}
                        onGoToLanding={handleGoToLanding}
                        onBetaModalOpen={() => setIsBetaModalOpen(true)}
                    />
                )}
                
                {view === 'landing' ? (
                    <LandingPage 
                        onLaunch={handleLaunch}
                        handleLaunchAndNavigate={handleLaunchAndNavigate} // Add this
                        onDemoOpen={() => setIsDemoOpen(true)}
                        onFaqOpen={() => setShowFaq(true)}
                        onUserGuideOpen={() => setShowUserGuide(true)}
                        onPrivacyOpen={() => setShowPrivacy(true)}
                        onTermsOpen={() => setShowTerms(true)}
                    />
                ) : (
                    renderMainApp()
                )}
            </div>

            <TickerTape />
            <Footer 
                onPrivacyClick={() => setShowPrivacy(true)}
                onTermsClick={() => setShowTerms(true)}
                onUserGuideClick={() => setShowUserGuide(true)}
                onFaqClick={() => setShowFaq(true)}
            />
            {isDemoOpen && <DemoModal onClose={() => setIsDemoOpen(false)} />}
            {isBetaModalOpen && <BetaInfoModal onClose={() => setIsBetaModalOpen(false)} />}
            <FeedbackWidget />
        </main>
    );
}