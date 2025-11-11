// src/components/specific/ApexAnalysisDashboard.js

import { Target, ShieldAlert, CheckCircle, XCircle, Info, TrendingUp, Megaphone, Rss, BarChart, Zap, Activity, Calculator, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
// Market-wide indicators moved to main dashboard (App.js)
// import MarketRegimeCard from './MarketRegimeCard';
// import SectorHeatmapCard from './SectorHeatmapCard';
// import MarketBreadthCard from './MarketBreadthCard';
import PositionSizeCard from './PositionSizeCard';
import MomentumCard from './MomentumCard';
import PriceActionCard from './PriceActionCard';
import VolatilityCard from './VolatilityCard';
import FuturesBasisCard from './FuturesBasisCard';
import TradeChecklistCard from './TradeChecklistCard';
import CollapsibleSection from '../common/CollapsibleSection';

// =========================================================================
// Helper & Display Components
// =========================================================================

const Gauge = ({ value, label }) => {
    const percentage = Math.max(0, Math.min(100, value || 0));
    const color = percentage > 66 ? 'text-green-600' : percentage > 33 ? 'text-amber-600' : 'text-red-600';
    const circumference = 2 * Math.PI * 30; // 30 is the radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative h-20 w-20">
                <svg className="transform -rotate-90" width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="8" className="text-gray-200" fill="transparent" />
                    <motion.circle
                        cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="8"
                        className={color} fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "circOut" }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{Math.round(percentage)}</span>
                </div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{label}</span>
        </div>
    );
};

const Indicator = ({ label, value, state }) => {
    const stateColor = state === 'Bullish' ? 'text-green-600 dark:text-green-400' : state === 'Bearish' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400';
    return (
        <div className="text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
            <p className={`text-lg font-bold ${stateColor}`}>{value}</p>
        </div>
    );
};

const PointItem = ({ text, Icon, colorClass }) => (
    <li className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-1 flex-shrink-0 ${colorClass}`} />
        <span className="text-gray-700 dark:text-gray-300">{text || 'Data Not Available'}</span>
    </li>
);

const TradePlanCard = ({ plan }) => (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6">
        <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Target size={20} className="mr-2 text-green-600 dark:text-green-400" />
            Scrybe Trade Plan
        </h3>
        <div className="mb-4 text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded-lg p-3 border border-green-200 dark:border-green-700">
            <p className="leading-relaxed">
                📚 <strong>Educational Note:</strong> This trade plan combines AI's directional analysis with institutional risk management rules. 
                Entry is at current market price, Stop-Loss is 2× ATR (Average True Range), and Target is 6× ATR for a 3:1 risk-reward ratio.
            </p>
        </div>
        <ul className="space-y-3 text-md">
            <li className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Entry Price:</span><span className="text-gray-900 dark:text-gray-100 font-mono font-semibold">₹{plan.entry_price}</span></li>
            <li className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Stop-Loss (2× ATR):</span><span className="text-gray-900 dark:text-gray-100 font-mono font-semibold">₹{plan.stop_loss}</span></li>
            <li className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Target Price (6× ATR):</span><span className="text-gray-900 dark:text-gray-100 font-mono font-semibold">₹{plan.target_price}</span></li>
            <li className="flex justify-between pt-3 border-t border-green-200 dark:border-green-700"><span className="text-gray-600 dark:text-gray-400">Risk/Reward Ratio:</span><span className="text-gray-900 dark:text-gray-100 font-mono font-semibold">{plan.risk_reward_ratio}:1</span></li>
            <li className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Expected Holding Period:</span><span className="text-gray-900 dark:text-gray-100 font-mono font-semibold">~{plan.holding_period_days} days</span></li>
        </ul>
    </div>
);

// =========================================================================
// Main Dashboard Component
// =========================================================================

const ApexAnalysisDashboard = ({ analysisData }) => {
    if (!analysisData) { return <div className="text-center p-8 text-gray-600 dark:text-gray-400">No analysis data available.</div>; }

    const {
        ticker, companyName, last_updated,
        scrybeScore = 0, signal = 'HOLD', confidence = 'N/A',
        predicted_gain_pct = 0, gain_prediction_rationale = 'N/A', holding_period_days = 0,
        keyInsight = 'N/A', analystVerdict = 'N/A',
        keyRisks_and_Mitigants = {}, thesisInvalidationPoint = 'N/A',
        keyObservations = { confluencePoints: [], contradictionPoints: [] },
        strategy_signal = null,
        prediction_for_date, prediction_for_date_short,
        technical_analysis,
        options_sentiment_analysis,
        fundamental_proxy_analysis,
        volatility_futures_data
    } = analysisData;
    
    const safe_options = options_sentiment_analysis || {};
    const safe_futures = volatility_futures_data || {};
    const safe_technicals = technical_analysis || {};
    const safe_fundamentals = fundamental_proxy_analysis || {};

    // --- Data to Insight Translation ---
    const rsiValue = parseFloat(safe_technicals.RSI_14);
    const adxValue = parseFloat(safe_technicals.ADX_14_trend_strength);
    const adxState = adxValue > 25 ? "Strong Trend" : "Weak Trend";
    const macdState = (safe_technicals.MACD_status || {}).interpretation === 'Bullish Crossover' ? 'Bullish' : 'Bearish';

    const getSignalStyle = (sig) => {
        switch (sig) {
            case 'BUY': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700';
            default: return 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-neutral-700';
        }
    };

    const scoreText = scrybeScore > 0 ? `+${scrybeScore}` : scrybeScore;

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn space-y-8">
            {/* ========== MARKET-WIDE CONTEXT REMOVED ========== */}
            {/* Market Regime, Sector Performance, and Market Breadth moved to main dashboard */}
            {/* These are universal indicators that update daily and apply to ALL stocks */}

            {strategy_signal && (
                <>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-5 flex items-center gap-4">
                        <Megaphone size={32} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <div>
                            <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100">Actionable Signal Identified</h2>
                            <p className="text-blue-700 dark:text-blue-300">
                                This stock passed the rigorous **{strategy_signal.type}** strategy filter.
                                {strategy_signal.signal === 'HOLD' && ` It was vetoed due to: ${strategy_signal.veto_reason}.`}
                            </p>
                        </div>
                    </div>
                    
                    {/* Educational Note for Mean-Reversion Trades (Bearish Pattern → BUY Signal) */}
                    {strategy_signal.type && strategy_signal.type.includes('Short Pattern') && signal === 'BUY' && (
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-5">
                            <div className="flex items-start gap-3">
                                <div className="text-amber-600 dark:text-amber-400 text-2xl">💡</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Wait, a bearish pattern but BUY signal? Here's why:</h3>
                                    <p className="text-amber-800 dark:text-amber-300 text-sm leading-relaxed mb-3">
                                        This is called a <strong>"mean-reversion trade"</strong> or <strong>"buy-the-dip"</strong> strategy. The stock showed a bearish pattern (like Three Black Crows), 
                                        which means it dropped sharply. But our AI analyzed the bigger picture and found:
                                    </p>
                                    <ul className="space-y-2 text-amber-800 dark:text-amber-300 text-sm list-disc list-inside">
                                        <li><strong>Oversold conditions:</strong> The stock fell too far too fast (RSI below 30)</li>
                                        <li><strong>Strong fundamentals:</strong> The company's business is still healthy</li>
                                        <li><strong>Market context:</strong> Overall market trend is positive, supporting a bounce</li>
                                    </ul>
                                    <p className="text-amber-800 dark:text-amber-300 text-sm leading-relaxed mt-3">
                                        <strong>The Strategy:</strong> When panic selling exhausts itself and a good company is unfairly beaten down, 
                                        smart traders step in to buy at discount prices before it recovers. This is a <em>contrarian</em> approach - 
                                        buying when others are fearful, but only when data supports a rebound.
                                    </p>
                                    <p className="text-amber-700 dark:text-amber-400 text-xs mt-3 italic">
                                        📊 The Scrybe Score of +{Math.abs(scrybeScore)} reflects confidence in this bounce, NOT the bearish pattern itself.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{ticker?.replace('.NS', '')}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">{companyName || 'N/A'}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Last Updated: {new Date(last_updated).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </p>
                {prediction_for_date && (
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500/30 dark:border-blue-700">
                        <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold">
                            📅 Prediction for: {prediction_for_date_short || prediction_for_date}
                        </span>
                        <span className="text-xs text-blue-600/70 dark:text-blue-400/70 italic ml-1">
                            (Next trading day)
                        </span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`text-center p-6 rounded-xl border ${getSignalStyle(signal)}`}>
                    <p className="text-sm font-semibold uppercase tracking-wider mb-2">Signal</p>
                    <p className="text-4xl font-bold">{signal}</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700">
                    <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400">Scrybe Score</p>
                    <p className="text-4xl font-bold font-mono text-gray-900 dark:text-gray-100">{scoreText}</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700">
                    <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400">Confidence</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{confidence}</p>
                </div>
            </div>

            {/* Grouped Technicals: Price Action + Momentum + Volatility */}
            {(safe_technicals || safe_futures) && (
                <CollapsibleSection title="Technical Analysis (Price Action, Momentum, Volatility)" icon={Layers} defaultOpen={false}>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Why these matter</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                <li><span className="font-medium">Price Action</span> shows where we sit in the 52-week context and around key support/resistance—helps frame risk and reward.</li>
                                <li><span className="font-medium">Momentum</span> gauges follow-through and timing using ADX, MACD, RSI, and volume—helps avoid fighting the tape.</li>
                                <li><span className="font-medium">Volatility</span> sizes the expected swing (ATR, HV)—drives stop width and expectations for path-to-target.</li>
                            </ul>
                        </div>

                        {/* Price Action */}
                        {safe_technicals && safe_technicals.daily_close && (
                            <PriceActionCard 
                                priceActionContext={{
                                    current_price: safe_technicals.daily_close,
                                    "52w_high": safe_technicals["52w_high"],
                                    "52w_low": safe_technicals["52w_low"],
                                    distance_from_52w_high_pct: safe_technicals.distance_from_52w_high_pct,
                                    distance_from_52w_low_pct: safe_technicals.distance_from_52w_low_pct !== undefined 
                                        ? safe_technicals.distance_from_52w_low_pct
                                        : (safe_technicals["52w_low"] && safe_technicals.daily_close 
                                            ? ((safe_technicals.daily_close - safe_technicals["52w_low"]) / safe_technicals["52w_low"] * 100)
                                            : null),
                                    price_percentile_52w: safe_technicals.price_percentile_52w !== undefined
                                        ? safe_technicals.price_percentile_52w
                                        : (safe_technicals["52w_high"] && safe_technicals["52w_low"] && safe_technicals.daily_close
                                            ? ((safe_technicals.daily_close - safe_technicals["52w_low"]) / (safe_technicals["52w_high"] - safe_technicals["52w_low"]) * 100)
                                            : null),
                                    support_levels: safe_technicals.support_levels,
                                    resistance_levels: safe_technicals.resistance_levels,
                                    nearest_support: safe_technicals.nearest_support,
                                    nearest_resistance: safe_technicals.nearest_resistance,
                                    distance_to_nearest_support_pct: safe_technicals.distance_to_nearest_support_pct,
                                    distance_to_nearest_resistance_pct: safe_technicals.distance_to_nearest_resistance_pct,
                                    price_position: safe_technicals.price_position
                                }}
                                hideTitle={true}
                            />
                        )}

                        {/* Momentum */}
                        {safe_technicals && (
                            <MomentumCard 
                                momentumData={safe_technicals}
                                analysisData={analysisData}
                                hideTitle={true}
                            />
                        )}

                        {/* Volatility */}
                        {safe_futures && (
                            <VolatilityCard 
                                volatilityData={safe_futures}
                                analysisData={analysisData}
                                hideTitle={true}
                            />
                        )}
                    </div>
                </CollapsibleSection>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl p-6 flex flex-col items-center text-center">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mb-3"><Info className="text-indigo-700 dark:text-indigo-400 h-6 w-6" /></div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">Key Insight</h3>
                    <p className="text-indigo-800 dark:text-indigo-300">{keyInsight}</p>
                </div>
                <div className="lg:col-span-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">Analyst Verdict</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{analystVerdict}</p>
                </div>
            </div>

            {/* ========== PHASE 2: MOMENTUM INDICATORS DASHBOARD (ENTRY TIMING) ========== */}
            {/* Momentum now included in grouped section above */}

            {/* ========== PHASE 2: ENHANCED VOLATILITY ANALYSIS ========== */}
            {/* Volatility now included in grouped section above */}

            {/* ========== PHASE 2: FUTURES BASIS ANALYSIS (INSTITUTIONAL BIAS) ========== */}
            {safe_futures && safe_futures.futures_spot_basis_percent && safe_futures.futures_spot_basis_percent !== 'N/A' && (
                <FuturesBasisCard basisData={safe_futures} />
            )}

            {/* --- FIXED EVIDENCE CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Technical Snapshot */}
                <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 flex flex-col">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                        <Zap size={18} className="mr-2 text-blue-400" />Technical Snapshot
                    </h3>
                    <div className="flex items-center justify-between flex-1">
                        <Gauge value={rsiValue} label="RSI" />
                        <div className="flex flex-col gap-4 items-start">
                            <Indicator label="Trend (ADX)" value={adxState} state={adxState === 'Strong Trend' ? 'Bullish' : 'Bearish'} />
                            <Indicator label="Momentum (MACD)" value="Crossover" state={macdState} />
                        </div>
                    </div>
                </div>

                {/* Options Sentiment */}
                <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 flex flex-col">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                        <BarChart size={18} className="mr-2 text-purple-400" />Options Sentiment
                    </h3>
                    {safe_options.put_call_ratio_oi && safe_options.put_call_ratio_oi !== 'N/A' ? (
                        <div className="flex-1 flex flex-col justify-center space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">PCR (OI):</span><span className="text-gray-900 dark:text-gray-100 font-mono">{safe_options.put_call_ratio_oi}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Max OI Call:</span><span className="text-gray-900 dark:text-gray-100 font-mono">{safe_options.max_oi_call_strike}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Max OI Put:</span><span className="text-gray-900 dark:text-gray-100 font-mono">{safe_options.max_oi_put_strike}</span></div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2 py-4">
                            <div className="text-purple-400 opacity-50 mb-2">
                                <BarChart size={32} />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {safe_options.status || "Options data not available. This stock may not have active F&O trading or liquidity is too low for reliable options data."}
                            </p>
                        </div>
                    )}
                </div>

                {/* Futures & Volatility Data */}
                <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 flex flex-col">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                        <TrendingUp size={18} className="mr-2 text-cyan-400" />Futures & Volatility
                    </h3>
                    {safe_futures.futures_spot_basis_percent && safe_futures.futures_spot_basis_percent !== 'N/A' ? (
                        <div className="flex-1 flex flex-col justify-center space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Futures Basis:</span>
                                <span className={`font-mono font-semibold ${
                                    safe_futures.basis_interpretation?.includes('Premium') ? 'text-green-600 dark:text-green-400' : 
                                    safe_futures.basis_interpretation?.includes('Discount') ? 'text-red-600 dark:text-red-400' : 
                                    'text-gray-700 dark:text-gray-300'
                                }`}>
                                    {safe_futures.futures_spot_basis_percent}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Interpretation:</span>
                                <span className="text-gray-700 dark:text-gray-300 text-xs">{safe_futures.basis_interpretation}</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-neutral-700 my-2"></div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">ATR (14):</span>
                                <span className="text-gray-900 dark:text-gray-100 font-mono">{safe_futures.volatility_atr_percent || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">BB Width:</span>
                                <span className="text-gray-900 dark:text-gray-100 font-mono">{safe_futures.volatility_bbw_percent || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Volatility:</span>
                                <span className="text-cyan-700 dark:text-cyan-400 text-xs">{safe_futures.volatility_interpretation || 'N/A'}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2 py-4">
                            <div className="text-cyan-400 opacity-50 mb-2">
                                <TrendingUp size={32} />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                Futures data not available. This stock may not have active futures trading.
                            </p>
                        </div>
                    )}
                </div>

                {/* Price-Based Fundamentals */}
                <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 flex flex-col">
                <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <Rss size={18} className="mr-2 text-orange-400" />
                    Price-Based Fundamentals
                </h3>

                <div className="flex items-center justify-between flex-1">
                    <Gauge value={safe_fundamentals.quality_score} label="Quality Score" />

                    <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Valuation %</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {(safe_fundamentals.valuation_proxy || '').split(' ')[0]}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Position in 52W range
                    </p>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Position sizing moved after Trade Opportunity Overview for better flow */}

            {/* ===== UNIFIED TRADE OPPORTUNITY OVERVIEW ===== */}
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-200 dark:border-neutral-700 pb-4">
                    <TrendingUp size={28} className="text-indigo-600 dark:text-indigo-400" />
                    <div>
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-100">Trade Opportunity Overview</h2>
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">Complete setup: Risk metrics → AI prediction → Execution plan</p>
                    </div>
                </div>

                {/* Step 1: Understanding the Risk Framework */}
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-5 border border-gray-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-indigo-500 dark:bg-indigo-600 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm">1</span>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Risk/Reward Framework (Reference Levels)</h3>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        These are <strong className="text-yellow-600 dark:text-yellow-400">reference levels</strong> calculated from <strong>today's closing price</strong> using 
                        <strong> ATR (Average True Range)</strong> - a measure of daily volatility. They show you what realistic 
                        stop-loss and targets look like for this stock's normal price movement.
                    </p>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded p-2 mb-4">
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                            💡 <strong>Note:</strong> These are based on the closing price. Your actual trade prices in Step 3 below 
                            will use the <strong>live market price at execution time</strong>, which may differ slightly but will follow 
                            the same ATR-based risk framework.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 text-center border border-red-200 dark:border-red-700">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Stop-Loss (1.75× ATR)</p>
                            <p className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">
                                {safe_technicals.potential_stop_loss ? `₹${safe_technicals.potential_stop_loss}` : '—'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Protection against losses</p>
                        </div>
                        <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 text-center border border-gray-200 dark:border-neutral-700">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current Price</p>
                            <p className="text-2xl font-mono font-bold text-gray-900 dark:text-gray-100">
                                {safe_technicals.daily_close ? `₹${safe_technicals.daily_close.toFixed(2)}` : '—'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Today's closing price</p>
                        </div>
                        <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 text-center border border-green-200 dark:border-green-700">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Target (4.4× ATR)</p>
                            <p className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">
                                {safe_technicals.potential_target ? `₹${safe_technicals.potential_target}` : '—'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Potential upside target</p>
                        </div>
                    </div>

                    {safe_technicals.ATR_14 && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                                <p className="mb-1">
                                    <strong className="text-gray-900 dark:text-gray-100">Daily Volatility (ATR):</strong> ₹{safe_technicals.ATR_14.toFixed(2)} 
                                    {safe_technicals.ATR_14_percent && ` (${safe_technicals.ATR_14_percent} of price)`}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    → This creates a <strong className="text-green-700 dark:text-green-400">2.5:1 reward-to-risk ratio</strong> 
                                    (risk 1.75× ATR to potentially gain 4.4× ATR)
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Educational Expandable */}
                    {safe_technicals.ATR_14 && safe_technicals.potential_stop_loss && (
                        <details className="mt-4 group">
                            <summary className="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 list-none flex items-center justify-center gap-2 py-2">
                                <span>📖 Learn: How are these calculated?</span>
                            </summary>
                            <div className="mt-3 space-y-3 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-neutral-800 rounded-lg p-4 border border-gray-200 dark:border-neutral-700">
                                <div>
                                    <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">🎯 What is ATR?</p>
                                    <p className="leading-relaxed">ATR measures average daily price movement. High ATR = volatile stock needs wider stops. Low ATR = stable stock uses tighter stops.</p>
                                </div>
                                <div className="space-y-1 font-mono text-xs bg-gray-50 dark:bg-neutral-800 rounded p-2">
                                    <div className="flex justify-between text-red-600 dark:text-red-400">
                                        <span>Stop-Loss = Current Price - (1.75 × ATR)</span>
                                        <span>= ₹{safe_technicals.potential_stop_loss}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600 dark:text-green-400">
                                        <span>Target = Current Price + (4.4 × ATR)</span>
                                        <span>= ₹{safe_technicals.potential_target}</span>
                                    </div>
                                    <div className="flex justify-between text-blue-700 dark:text-blue-400 pt-1 border-t border-gray-200 dark:border-neutral-700">
                                        <span>Risk/Reward Ratio:</span>
                                        <span>2.5:1</span>
                                    </div>
                                </div>
                            </div>
                        </details>
                    )}
                </div>

                {/* Step 2: AI's Market Prediction */}
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-5 border border-gray-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-indigo-500 dark:bg-indigo-600 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm">2</span>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">AI's Prediction & Rationale</h3>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        Based on technical patterns, fundamentals, and market conditions, our AI predicts:
                    </p>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5 border border-purple-200 dark:border-purple-700">
                        <div className="flex items-center gap-3 mb-3">
                            <TrendingUp size={32} className={predicted_gain_pct > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"} />
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Expected Move</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    {predicted_gain_pct > 0 ? '+' : ''}{predicted_gain_pct}%
                                    {holding_period_days > 0 && (
                                        <span className="text-base font-normal text-gray-600 dark:text-gray-400 ml-2">
                                            in ~{holding_period_days} days
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-neutral-900 rounded p-3 border border-gray-200 dark:border-neutral-700">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold">💡 Why this prediction?</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {gain_prediction_rationale || 'Analysis in progress...'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 3: Execution Plan (Trade Plan) */}
                {strategy_signal && strategy_signal.trade_plan && (
                    <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-5 border border-gray-200 dark:border-neutral-700">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-indigo-500 dark:bg-indigo-600 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm">3</span>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Your Execution Plan (Actual Trade Prices)</h3>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                            These are your <strong className="text-green-600 dark:text-green-400">actual execution prices</strong> calculated from the 
                            <strong> live market price at analysis time</strong>. The stop-loss and target use the same ATR framework 
                            as Step 1, but applied to the real entry price you'll use to place your trade.
                        </p>
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded p-2 mb-4">
                            <p className="text-xs text-amber-800 dark:text-amber-300">
                                ⚡ <strong>Important:</strong> These prices may differ slightly from Step 1's reference levels because 
                                they're based on the live market price (not closing price). However, the risk framework remains the same: 
                                1.75× ATR stop-loss, 4.4× ATR target, 2.5:1 risk/reward ratio.
                            </p>
                        </div>
                        <TradePlanCard plan={strategy_signal.trade_plan} />
                    </div>
                )}

                {/* Summary Flow Explanation */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                        <strong>🔄 How it all connects:</strong> Step 1 shows reference levels (based on today's close) to help you 
                        understand the stock's normal volatility range. Step 2 is the AI's market prediction and reasoning. 
                        Step 3 gives you exact execution prices (based on live market price) using the same risk framework. 
                        <strong className="text-gray-900 dark:text-gray-100"> Always follow Step 3 for your actual trades</strong> - it combines the volatility 
                        framework with AI's analysis and real-time pricing.
                    </p>
                </div>
            </div>

            {/* ========== POSITION SIZING CALCULATOR (moved after Trade Opportunity) ========== */}
            {strategy_signal && strategy_signal.trade_plan && strategy_signal.trade_plan.position_sizing && (
                <PositionSizeCard 
                    tradePlan={{
                        ...strategy_signal.trade_plan,
                        entryPrice: strategy_signal.trade_plan.entry_price,
                        stopLoss: strategy_signal.trade_plan.stop_loss,
                        target: strategy_signal.trade_plan.target_price,
                        position_sizing: strategy_signal.trade_plan.position_sizing
                    }}
                    analysisData={analysisData}
                />
            )}

            {/* ========== PHASE 2: TRADE MANAGEMENT CHECKLIST ========== */}
            {strategy_signal && strategy_signal.trade_checklist && (
                <TradeChecklistCard 
                    checklistData={strategy_signal.trade_checklist}
                />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                        <ShieldAlert size={20} className="mr-2 text-amber-600 dark:text-amber-400" /> Key Risks & Invalidation
                    </h3>
                    <ul className="space-y-3">
                        <PointItem text={(keyRisks_and_Mitigants || {}).risk_1} Icon={XCircle} colorClass="text-red-600 dark:text-red-400" />
                        <PointItem text={(keyRisks_and_Mitigants || {}).risk_2} Icon={XCircle} colorClass="text-red-600 dark:text-red-400" />
                        <PointItem text={(keyRisks_and_Mitigants || {}).mitigant} Icon={CheckCircle} colorClass="text-green-600 dark:text-green-400" />
                        <li className="pt-3 mt-3 border-t border-gray-200 dark:border-neutral-700">
                            <p className="font-semibold text-gray-700 dark:text-gray-300">Thesis Invalidation Point:</p>
                            <p className="text-gray-600 dark:text-gray-400">{thesisInvalidationPoint}</p>
                        </li>
                    </ul>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4">Key Observations</h3>
                    <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Confluence Points</h4>
                        <ul className="space-y-2">
                            {(keyObservations.confluencePoints || []).map((point, i) => (<PointItem key={i} text={point} Icon={CheckCircle} colorClass="text-green-600 dark:text-green-400" />))}
                        </ul>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                        <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Contradiction Points</h4>
                        <ul className="space-y-2">
                            {(keyObservations.contradictionPoints || []).map((point, i) => (<PointItem key={i} text={point} Icon={XCircle} colorClass="text-red-600 dark:text-red-400" />))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApexAnalysisDashboard;
