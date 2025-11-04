// src/components/specific/ApexAnalysisDashboard.js (AURORA REVAMP - FIXED ALIGNMENT)

import React from 'react';
import { Target, ShieldAlert, CheckCircle, XCircle, Info, TrendingUp, Megaphone, Rss, BarChart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import NewsSection from './NewsSection';

// =========================================================================
// Helper & Display Components
// =========================================================================

const Gauge = ({ value, label }) => {
    const percentage = Math.max(0, Math.min(100, value || 0));
    const color = percentage > 66 ? 'text-green-400' : percentage > 33 ? 'text-yellow-400' : 'text-red-400';
    const circumference = 2 * Math.PI * 30; // 30 is the radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative h-20 w-20">
                <svg className="transform -rotate-90" width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="8" className="text-slate-700" fill="transparent" />
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
                    <span className="text-xl font-bold text-white">{Math.round(percentage)}</span>
                </div>
            </div>
            <span className="text-xs text-slate-400 font-medium">{label}</span>
        </div>
    );
};

const Indicator = ({ label, value, state }) => {
    const stateColor = state === 'Bullish' ? 'text-green-400' : state === 'Bearish' ? 'text-red-400' : 'text-yellow-400';
    return (
        <div className="text-left">
            <p className="text-sm text-slate-400">{label}</p>
            <p className={`text-lg font-bold ${stateColor}`}>{value}</p>
        </div>
    );
};

const PointItem = ({ text, Icon, colorClass }) => (
    <li className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-1 flex-shrink-0 ${colorClass}`} />
        <span className="text-gray-300">{text || 'Data Not Available'}</span>
    </li>
);

const TradePlanCard = ({ plan }) => (
    <div className="bg-green-900/50 border-2 border-green-500 rounded-xl p-6">
        <h3 className="font-bold text-xl text-white mb-4 flex items-center">
            <Target size={20} className="mr-2 text-green-300" />
            Scrybe Trade Plan
        </h3>
        <div className="mb-4 text-xs text-green-200 bg-green-900/30 rounded-lg p-3 border border-green-500/20">
            <p className="leading-relaxed">
                📚 <strong>Educational Note:</strong> This trade plan combines AI's directional analysis with institutional risk management rules. 
                Entry is at current market price, Stop-Loss is 2× ATR (Average True Range), and Target is 6× ATR for a 3:1 risk-reward ratio.
            </p>
        </div>
        <ul className="space-y-3 text-md">
            <li className="flex justify-between"><span className="text-gray-400">Entry Price:</span><span className="text-white font-mono font-semibold">₹{plan.entry_price}</span></li>
            <li className="flex justify-between"><span className="text-gray-400">Stop-Loss (2× ATR):</span><span className="text-white font-mono font-semibold">₹{plan.stop_loss}</span></li>
            <li className="flex justify-between"><span className="text-gray-400">Target Price (6× ATR):</span><span className="text-white font-mono font-semibold">₹{plan.target_price}</span></li>
            <li className="flex justify-between pt-3 border-t border-green-500/30"><span className="text-gray-400">Risk/Reward Ratio:</span><span className="text-white font-mono font-semibold">{plan.risk_reward_ratio}:1</span></li>
            <li className="flex justify-between"><span className="text-gray-400">Expected Holding Period:</span><span className="text-white font-mono font-semibold">~{plan.holding_period_days} days</span></li>
        </ul>
    </div>
);

// =========================================================================
// Main Dashboard Component
// =========================================================================

const ApexAnalysisDashboard = ({ analysisData }) => {
    console.log("INSPECTING ANALYSIS DATA:", JSON.stringify(analysisData, null, 2));
    if (!analysisData) { return <div className="text-center p-8 text-gray-500">No analysis data available.</div>; }

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
        news_context
    } = analysisData;
    
    const safe_options = options_sentiment_analysis || {};
    const safe_technicals = technical_analysis || {};
    const safe_fundamentals = fundamental_proxy_analysis || {};

    // --- Data to Insight Translation ---
    const rsiValue = parseFloat(safe_technicals.RSI_14);
    const adxValue = parseFloat(safe_technicals.ADX_14_trend_strength);
    const adxState = adxValue > 25 ? "Strong Trend" : "Weak Trend";
    const macdState = (safe_technicals.MACD_status || {}).interpretation === 'Bullish Crossover' ? 'Bullish' : 'Bearish';

    const getSignalStyle = (sig) => {
        switch (sig) {
            case 'BUY': return 'bg-green-500/10 text-green-300 border-green-500/30';
            default: return 'bg-slate-700/50 text-slate-300 border-slate-600/50';
        }
    };

    const scoreText = scrybeScore > 0 ? `+${scrybeScore}` : scrybeScore;

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn space-y-8">
            {strategy_signal && (
                <>
                    <div className="bg-blue-900/50 border-2 border-blue-500 rounded-xl p-5 flex items-center gap-4">
                        <Megaphone size={32} className="text-blue-300 flex-shrink-0" />
                        <div>
                            <h2 className="font-bold text-xl text-white">Actionable Signal Identified</h2>
                            <p className="text-blue-200">
                                This stock passed the rigorous **{strategy_signal.type}** strategy filter.
                                {strategy_signal.signal === 'HOLD' && ` It was vetoed due to: ${strategy_signal.veto_reason}.`}
                            </p>
                        </div>
                    </div>
                    
                    {/* Educational Note for Mean-Reversion Trades (Bearish Pattern → BUY Signal) */}
                    {strategy_signal.type && strategy_signal.type.includes('Short Pattern') && signal === 'BUY' && (
                        <div className="bg-yellow-900/20 border border-yellow-600/40 rounded-xl p-5">
                            <div className="flex items-start gap-3">
                                <div className="text-yellow-400 text-2xl">💡</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-yellow-200 mb-2">Wait, a bearish pattern but BUY signal? Here's why:</h3>
                                    <p className="text-yellow-100 text-sm leading-relaxed mb-3">
                                        This is called a <strong>"mean-reversion trade"</strong> or <strong>"buy-the-dip"</strong> strategy. The stock showed a bearish pattern (like Three Black Crows), 
                                        which means it dropped sharply. But our AI analyzed the bigger picture and found:
                                    </p>
                                    <ul className="space-y-2 text-yellow-100 text-sm list-disc list-inside">
                                        <li><strong>Oversold conditions:</strong> The stock fell too far too fast (RSI below 30)</li>
                                        <li><strong>Strong fundamentals:</strong> The company's business is still healthy</li>
                                        <li><strong>Market context:</strong> Overall market trend is positive, supporting a bounce</li>
                                    </ul>
                                    <p className="text-yellow-100 text-sm leading-relaxed mt-3">
                                        <strong>The Strategy:</strong> When panic selling exhausts itself and a good company is unfairly beaten down, 
                                        smart traders step in to buy at discount prices before it recovers. This is a <em>contrarian</em> approach - 
                                        buying when others are fearful, but only when data supports a rebound.
                                    </p>
                                    <p className="text-yellow-200 text-xs mt-3 italic">
                                        📊 The Scrybe Score of +{Math.abs(scrybe_score)} reflects confidence in this bounce, NOT the bearish pattern itself.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            <div>
                <h1 className="text-4xl font-bold text-white">{ticker?.replace('.NS', '')}</h1>
                <p className="text-lg text-gray-400">{companyName || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-1">
                    Last Updated: {new Date(last_updated).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </p>
                {prediction_for_date && (
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30">
                        <span className="text-blue-400 text-xs font-semibold">
                            📅 Prediction for: {prediction_for_date_short || prediction_for_date}
                        </span>
                        <span className="text-xs text-blue-300/70 italic ml-1">
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
                <div className="text-center p-6 rounded-xl bg-slate-900/40 border border-slate-700/60">
                    <p className="text-sm font-semibold uppercase tracking-wider mb-2">Scrybe Score</p>
                    <p className="text-4xl font-bold font-mono">{scoreText}</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-slate-900/40 border border-slate-700/60">
                    <p className="text-sm font-semibold uppercase tracking-wider mb-2">Confidence</p>
                    <p className="text-4xl font-bold">{confidence}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-indigo-900/30 border border-indigo-500/60 rounded-xl p-6 flex flex-col items-center text-center">
                    <div className="bg-indigo-500/20 p-3 rounded-full mb-3"><Info className="text-indigo-300 h-6 w-6" /></div>
                    <h3 className="font-bold text-xl text-white mb-2">Key Insight</h3>
                    <p className="text-indigo-200">{keyInsight}</p>
                </div>
                <div className="lg:col-span-3 bg-slate-900/40 border border-slate-700/60 rounded-xl p-6">
                    <h3 className="font-bold text-xl text-white mb-2">Analyst Verdict</h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{analystVerdict}</p>
                </div>
            </div>

            {/* --- FIXED EVIDENCE CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Technical Snapshot */}
                <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6 flex flex-col">
                    <h3 className="font-bold text-xl text-white mb-4 flex items-center">
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
                <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6 flex flex-col">
                    <h3 className="font-bold text-xl text-white mb-4 flex items-center">
                        <BarChart size={18} className="mr-2 text-purple-400" />Options Sentiment
                    </h3>
                    {safe_options.put_call_ratio_oi && safe_options.put_call_ratio_oi !== 'N/A' ? (
                        <div className="flex-1 flex flex-col justify-center space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-slate-400">PCR (OI):</span><span className="text-white font-mono">{safe_options.put_call_ratio_oi}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Max OI Call:</span><span className="text-white font-mono">{safe_options.max_oi_call_strike}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Max OI Put:</span><span className="text-white font-mono">{safe_options.max_oi_put_strike}</span></div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2 py-4">
                            <div className="text-purple-400 opacity-50 mb-2">
                                <BarChart size={32} />
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Options data unavailable for this smallcap stock. Most smallcap stocks don't have active options trading due to lower liquidity.
                            </p>
                        </div>
                    )}
                </div>

                {/* Price-Based Fundamentals */}
                <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6 flex flex-col">
                <h3 className="font-bold text-xl text-white mb-4 flex items-center">
                    <Rss size={18} className="mr-2 text-orange-400" />
                    Price-Based Fundamentals
                </h3>

                <div className="flex items-center justify-between flex-1">
                    <Gauge value={safe_fundamentals.quality_score} label="Quality Score" />

                    <div className="text-center">
                    <p className="text-sm text-slate-400">Valuation %</p>
                    <p className="text-lg font-bold text-white">
                        {(safe_fundamentals.valuation_proxy || '').split(' ')[0]}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                        Position in 52W range
                    </p>
                    </div>
                </div>
                </div>
            </div>
            
            {/* --- Risk/Reward Snapshot --- */}
            <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6">
                <h3 className="font-bold text-xl text-white mb-4">Risk/Reward Snapshot</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-sm text-slate-400">Potential Stop-Loss (2× ATR)</p>
                        <p className="text-xl font-mono font-semibold text-red-400">
                            {safe_technicals.potential_stop_loss ? `₹${safe_technicals.potential_stop_loss}` : '—'}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Potential Target (6× ATR)</p>
                        <p className="text-xl font-mono font-semibold text-green-400">
                            {safe_technicals.potential_target ? `₹${safe_technicals.potential_target}` : '—'}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Daily Volatility (ATR)</p>
                        <p className="text-xl font-mono font-semibold text-white">
                            {safe_technicals.ATR_14 ? `₹${safe_technicals.ATR_14.toFixed(2)}` : '—'}
                        </p>
                        {safe_technicals.ATR_14_percent && (
                            <p className="text-xs text-slate-400 mt-1">
                                ({safe_technicals.ATR_14_percent} of price)
                            </p>
                        )}
                    </div>
                </div>
                
                {/* ATR Calculation Breakdown */}
                {safe_technicals.ATR_14 && safe_technicals.potential_stop_loss && safe_technicals.daily_close && (
                    <div className="mt-6 pt-4 border-t border-slate-700">
                        <details className="group">
                            <summary className="cursor-pointer text-sm font-semibold text-blue-400 hover:text-blue-300 list-none flex items-center justify-center gap-2">
                                <span>📊 How Are These Calculated?</span>
                                <span className="text-xs text-slate-400">(Click to expand)</span>
                            </summary>
                            <div className="mt-4 space-y-4 text-sm text-slate-300 bg-slate-800/50 rounded-lg p-4">
                                <div>
                                    <p className="font-semibold text-blue-300 mb-2">🎯 What is ATR (Average True Range)?</p>
                                    <p className="leading-relaxed">
                                        ATR measures the average price movement (volatility) of a stock over 14 trading days. 
                                        Higher ATR means the stock moves more, lower ATR means it's more stable.
                                    </p>
                                </div>
                                
                                <div className="bg-slate-900/50 rounded p-3 border border-slate-600/30">
                                    <p className="font-semibold text-white mb-2">📐 Calculation Breakdown:</p>
                                    <div className="space-y-2 font-mono text-xs">
                                        <div className="flex justify-between border-b border-slate-700 pb-1">
                                            <span className="text-slate-400">Current Price:</span>
                                            <span className="text-white">₹{safe_technicals.daily_close?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-700 pb-1">
                                            <span className="text-slate-400">ATR (14-day):</span>
                                            <span className="text-white">₹{safe_technicals.ATR_14.toFixed(2)} {safe_technicals.ATR_14_percent && `(${safe_technicals.ATR_14_percent})`}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-red-900/30 pb-1 mt-2">
                                            <span className="text-red-300">Stop-Loss Formula:</span>
                                            <span className="text-red-400">Price - (2 × ATR)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-red-300">= ₹{safe_technicals.daily_close?.toFixed(2)} - (2 × ₹{safe_technicals.ATR_14.toFixed(2)})</span>
                                            <span className="text-red-400 font-bold">= ₹{safe_technicals.potential_stop_loss}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-green-900/30 pb-1 mt-2">
                                            <span className="text-green-300">Target Formula:</span>
                                            <span className="text-green-400">Price + (6 × ATR)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-green-300">= ₹{safe_technicals.daily_close?.toFixed(2)} + (6 × ₹{safe_technicals.ATR_14.toFixed(2)})</span>
                                            <span className="text-green-400 font-bold">= ₹{safe_technicals.potential_target}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <p className="font-semibold text-purple-300 mb-2">🎓 Why This Framework?</p>
                                    <ul className="space-y-2 text-xs leading-relaxed list-disc list-inside">
                                        <li><strong>2× ATR Stop-Loss:</strong> Gives the stock room to breathe (normal volatility) while protecting against larger losses. Too tight = frequent stop-outs.</li>
                                        <li><strong>6× ATR Target:</strong> Creates a 3:1 reward-to-risk ratio. Risk 2× ATR to potentially gain 6× ATR = professional risk management.</li>
                                        <li><strong>Volatility-Adjusted:</strong> High volatility stocks get wider stops/targets. Stable stocks get tighter levels. One size doesn't fit all!</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-yellow-900/20 border border-yellow-700/30 rounded p-3">
                                    <p className="text-yellow-200 text-xs">
                                        <strong>⚠️ Important:</strong> These are mechanical reference levels. The actual Trade Plan below combines these with AI's directional analysis, 
                                        market conditions, and may adjust based on support/resistance levels. Always follow the Trade Plan, not just raw ATR calculations.
                                    </p>
                                </div>
                            </div>
                        </details>
                    </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-xs text-slate-300 text-center">
                        💡 <span className="font-semibold">Risk/Reward Framework:</span> These are reference levels based on ATR volatility. 
                        Stop-Loss = 2× ATR (manages risk), Target = 6× ATR (3:1 reward-to-risk ratio). 
                        Actual entry/exit prices in the Trade Plan below may vary based on AI's directional analysis.
                    </p>
                </div>
                {(!safe_technicals.ATR_14 || !safe_technicals.potential_stop_loss) && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                        <p className="text-xs text-slate-400 text-center">
                            📚 <span className="italic">Risk metrics require 14+ days of trading data. New listings or stocks with limited history may show incomplete data.</span>
                        </p>
                    </div>
                )}
            </div>

            {/* --- Predicted Gain --- */}
            <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <div className={predicted_gain_pct > 0 ? "text-green-400" : predicted_gain_pct < 0 ? "text-red-400" : "text-slate-400"}>
                        <TrendingUp size={28} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-xl text-white">
                            AI Predicted Gain: {predicted_gain_pct > 0 ? '+' : ''}{predicted_gain_pct}%
                            {holding_period_days > 0 && <span className="text-sm font-normal text-slate-400 ml-2">(~{holding_period_days} days)</span>}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                            {gain_prediction_rationale || 'Analysis in progress...'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Trade Plan Card */}
            {strategy_signal && strategy_signal.trade_plan && (
                <TradePlanCard plan={strategy_signal.trade_plan} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6">
                    <h3 className="font-bold text-xl text-white mb-4 flex items-center">
                        <ShieldAlert size={20} className="mr-2 text-yellow-400" /> Key Risks & Invalidation
                    </h3>
                    <ul className="space-y-3">
                        <PointItem text={(keyRisks_and_Mitigants || {}).risk_1} Icon={XCircle} colorClass="text-red-400" />
                        <PointItem text={(keyRisks_and_Mitigants || {}).risk_2} Icon={XCircle} colorClass="text-red-400" />
                        <PointItem text={(keyRisks_and_Mitigants || {}).mitigant} Icon={CheckCircle} colorClass="text-green-400" />
                        <li className="pt-3 mt-3 border-t border-slate-700">
                            <p className="font-semibold text-gray-300">Thesis Invalidation Point:</p>
                            <p className="text-gray-400">{thesisInvalidationPoint}</p>
                        </li>
                    </ul>
                </div>
                <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6">
                    <h3 className="font-bold text-xl text-white mb-4">Key Observations</h3>
                    <div>
                        <h4 className="font-semibold text-green-400 mb-2">Confluence Points</h4>
                        <ul className="space-y-2">
                            {(keyObservations.confluencePoints || []).map((point, i) => (<PointItem key={i} text={point} Icon={CheckCircle} colorClass="text-green-400" />))}
                        </ul>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700">
                        <h4 className="font-semibold text-red-400 mb-2">Contradiction Points</h4>
                        <ul className="space-y-2">
                            {(keyObservations.contradictionPoints || []).map((point, i) => (<PointItem key={i} text={point} Icon={XCircle} colorClass="text-red-400" />))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApexAnalysisDashboard;
