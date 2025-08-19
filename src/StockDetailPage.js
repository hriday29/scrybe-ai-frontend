// src/StockDetailPage.js

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getAnalysisForTicker } from './api/api';
import { ArrowLeft, AlertTriangle, CheckCircle, Target, ShieldClose, Info } from 'lucide-react';

const MetricCard = ({ title, value, icon, colorClass }) => (
    <div className={`bg-slate-800/50 border border-slate-700/60 rounded-xl p-4`}>
        <div className={`mb-2 flex items-center justify-center h-10 w-10 rounded-full bg-slate-700 ${colorClass}`}>
            {icon}
        </div>
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

const StockDetailPage = ({ ticker, onBackClick }) => {
    const { currentUser } = useAuth();
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (currentUser && ticker) {
                try {
                    setIsLoading(true);
                    setError(null);
                    const data = await getAnalysisForTicker(ticker, currentUser);
                    setAnalysis(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchAnalysis();
    }, [ticker, currentUser]);

    if (isLoading) {
        return <div className="text-center p-8 text-gray-400 animate-pulse">Loading Apex Analysis for {ticker}...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-400">Error loading analysis: {error}</div>;
    }

    if (!analysis) {
        return <div className="text-center p-8 text-gray-500">No analysis data found for {ticker}.</div>;
    }
    
    const getSignalColor = (signal) => {
        if (signal === 'BUY') return 'bg-green-500/10 text-green-400 border-green-500/30';
        if (signal === 'SELL') return 'bg-red-500/10 text-red-400 border-red-500/30';
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn">
            <button onClick={onBackClick} className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6">
                <ArrowLeft size={16} className="mr-2" />
                Back to A-List
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-white">{analysis.ticker?.replace('.NS', '')}</h1>
                    <p className="text-lg text-gray-400">{analysis.companyName || 'N/A'}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg font-bold text-lg ${getSignalColor(analysis.signal)}`}>
                    {analysis.signal}
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <MetricCard title="Scrybe Score" value={analysis.scrybeScore} icon={<Info size={20} />} colorClass="text-indigo-400" />
                <MetricCard title="Predicted Gain" value={`${analysis.predicted_gain_pct || 0}%`} icon={<Target size={20} />} colorClass="text-green-400" />
                <MetricCard title="Confidence" value={analysis.confidence} icon={<CheckCircle size={20} />} colorClass="text-yellow-400" />
                <MetricCard title="Invalidation" value={analysis.thesisInvalidationPoint?.split(' ')[0]} icon={<ShieldClose size={20} />} colorClass="text-red-400" />
            </div>

            {/* Analyst Verdict and Risks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">Analyst Verdict</h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{analysis.analystVerdict}</p>
                </div>
                <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                        <AlertTriangle size={20} className="mr-2 text-yellow-400" />
                        Key Risks & Mitigants
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li><span className="font-semibold">Risk 1:</span> {analysis.keyRisks_and_Mitigants?.risk_1}</li>
                        <li><span className="font-semibold">Risk 2:</span> {analysis.keyRisks_and_Mitigants?.risk_2}</li>
                        <li className="mt-4"><span className="font-semibold text-green-400">Mitigant:</span> {analysis.keyRisks_and_Mitigants?.mitigant}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StockDetailPage;
