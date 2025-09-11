// src/components/specific/ApexAnalysisDashboard.js (FINAL CORRECTED VERSION)

import React from 'react';
import { Target, ShieldAlert, CheckCircle, XCircle, Info, TrendingUp, Megaphone } from 'lucide-react';

const PointItem = ({ text, Icon, colorClass }) => (
    <li className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-1 flex-shrink-0 ${colorClass}`} />
        <span className="text-gray-300">{text || 'Data Not Available'}</span>
    </li>
);

const DataCard = ({ title, data }) => (
    <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6 h-full">
        <h3 className="font-bold text-xl text-white mb-4">{title}</h3>
        <ul className="space-y-2 text-sm">
            {Object.entries(data).map(([key, value]) => (
                <li key={key} className="flex justify-between items-center">
                    <span className="text-gray-400">{key}:</span>
                    <span className="text-white font-mono font-semibold">{String(value)}</span>
                </li>
            ))}
        </ul>
    </div>
);

const TradePlanCard = ({ plan }) => (
    <div className="bg-green-900/50 border-2 border-green-500 rounded-xl p-6">
        <h3 className="font-bold text-xl text-white mb-4 flex items-center">
            <Target size={20} className="mr-2 text-green-300" />
            Actionable Trade Plan
        </h3>
        <ul className="space-y-3 text-md">
            <li className="flex justify-between"><span className="text-gray-400">Entry Price:</span><span className="text-white font-mono font-semibold">₹{plan.entry_price}</span></li>
            <li className="flex justify-between"><span className="text-gray-400">Stop-Loss:</span><span className="text-white font-mono font-semibold">₹{plan.stop_loss}</span></li>
            <li className="flex justify-between"><span className="text-gray-400">Target Price:</span><span className="text-white font-mono font-semibold">₹{plan.target_price}</span></li>
            <li className="flex justify-between pt-3 border-t border-green-500/30"><span className="text-gray-400">Risk/Reward Ratio:</span><span className="text-white font-mono font-semibold">{plan.risk_reward_ratio}:1</span></li>
            <li className="flex justify-between"><span className="text-gray-400">Holding Period:</span><span className="text-white font-mono font-semibold">~{plan.holding_period_days} days</span></li>
        </ul>
    </div>
);

const ApexAnalysisDashboard = ({ analysisData }) => {
    if (!analysisData) { return <div className="text-center p-8 text-gray-500">No analysis data available.</div>; }

    // --- FIX: Ensure potentially null objects default to {} to prevent crashes ---
    const {
        ticker, companyName, last_updated,
        scrybeScore = 0, signal = 'HOLD', confidence = 'N/A',
        predicted_gain_pct = 0, gain_prediction_rationale = 'N/A',
        keyInsight = 'N/A', analystVerdict = 'N/A',
        keyRisks_and_Mitigants = {}, thesisInvalidationPoint = 'N/A',
        keyObservations = { confluencePoints: [], contradictionPoints: [] },
        strategy_signal = null,
        technical_analysis,       // Allow these to be potentially null...
        options_sentiment_analysis,
        fundamental_proxy_analysis
    } = analysisData;
    
    // ... then provide a safe default right after destructuring.
    const safe_options_sentiment = options_sentiment_analysis || {};
    const safe_technical_analysis = technical_analysis || {};
    const safe_fundamental_proxy = fundamental_proxy_analysis || {};
    // --- END FIX ---

    const getSignalStyle = (sig) => {
        switch (sig) {
            case 'BUY': return 'bg-green-500/10 text-green-300 border-green-500/30';
            case 'SELL': return 'bg-red-500/10 text-red-300 border-red-500/30';
            default: return 'bg-slate-700/50 text-slate-300 border-slate-600/50';
        }
    };

    const scoreText = scrybeScore > 0 ? `+${scrybeScore}` : scrybeScore;

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn space-y-8">
            {strategy_signal && (
                <div className="bg-blue-900/50 border-2 border-blue-500 rounded-xl p-5 flex items-center gap-4 animate-pulse">
                    <Megaphone size={32} className="text-blue-300 flex-shrink-0" />
                    <div>
                        <h2 className="font-bold text-xl text-white">Actionable Signal Identified</h2>
                        <p className="text-blue-200">
                            This stock passed the rigorous **{strategy_signal.type}** strategy filter.
                            {strategy_signal.signal === 'HOLD' && ` It was vetoed due to: ${strategy_signal.veto_reason}.`}
                        </p>
                    </div>
                </div>
            )}

            <div>
                <h1 className="text-4xl font-bold text-white">{ticker?.replace('.NS', '')}</h1>
                <p className="text-lg text-gray-400">{companyName || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-1">Last Updated: {new Date(last_updated).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) || 'N/A'}</p>
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

            {/* --- FIX: Use the safe default objects to prevent crashes --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DataCard title="Technical Snapshot" data={{
                    "RSI (14)": safe_technical_analysis.RSI_14 || 'N/A',
                    "ADX (14)": safe_technical_analysis.ADX_14_trend_strength || 'N/A',
                    "MACD": (safe_technical_analysis.MACD_status || {}).interpretation || 'N/A',
                    "Price vs Bands": (safe_technical_analysis.bollinger_bands || {}).price_position || 'N/A'
                }} />
                <DataCard title="Options Sentiment" data={{
                    "PCR (OI)": safe_options_sentiment.put_call_ratio_oi || 'N/A',
                    "Max OI Call": safe_options_sentiment.max_oi_call_strike || 'N/A',
                    "Max OI Put": safe_options_sentiment.max_oi_put_strike || 'N/A',
                    "Avg IV": safe_options_sentiment.average_iv || 'N/A'
                }} />
                <DataCard title="Fundamental Proxies" data={{
                    "Valuation": safe_fundamental_proxy.valuation_proxy || 'N/A',
                    "Quality (Volatility)": safe_fundamental_proxy.quality_proxy_volatility || 'N/A',
                    "Quality Score": safe_fundamental_proxy.quality_score || 'N/A',
                }} />
            </div>
            {/* --- END FIX --- */}

            <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6">
                {strategy_signal && strategy_signal.trade_plan && (
                    <TradePlanCard plan={strategy_signal.trade_plan} />
                )}
                <div className="flex items-center gap-4">
                    <div className="text-green-400"><TrendingUp size={28} /></div>
                    <div>
                        <h3 className="font-bold text-xl text-white">Predicted Gain: {predicted_gain_pct}%</h3>
                        <p className="text-sm text-gray-400">{gain_prediction_rationale}</p>
                    </div>
                </div>
            </div>

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
                            {(keyObservations.confluencePoints || []).map((point) => (<PointItem key={point} text={point} Icon={CheckCircle} colorClass="text-green-400" />))}
                        </ul>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700">
                        <h4 className="font-semibold text-red-400 mb-2">Contradiction Points</h4>
                        <ul className="space-y-2">
                            {(keyObservations.contradictionPoints || []).map((point) => (<PointItem key={point} text={point} Icon={XCircle} colorClass="text-red-400" />))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApexAnalysisDashboard;