// src/pages/StockDetailPage.js

import React, { useState, useEffect } from 'react';
// --- Corrected Imports ---
import { useAuth } from '../context/AuthContext';
import { getAnalysis } from '../api/api'; 
import ApexAnalysisDashboard from '../components/specific/ApexAnalysisDashboard';
import MarketRegimeCard from '../components/specific/MarketRegimeCard';
import SectorHeatmapCard from '../components/specific/SectorHeatmapCard';
import MarketBreadthCard from '../components/specific/MarketBreadthCard';
// --- End Corrected Imports ---
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';


const StockDetailPage = ({ ticker, onBackClick }) => {
    const { currentUser } = useAuth();
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMarketContext, setShowMarketContext] = useState(false);

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (ticker) {
                try {
                    setIsLoading(true);
                    setError(null);
                    const data = await getAnalysis(ticker); 
                    setAnalysis(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchAnalysis();
    }, [ticker]);

    if (isLoading) { return <div className="text-center p-8 text-gray-400 animate-pulse">Loading Apex Analysis for {ticker}...</div>; }
    if (error) { return <div className="text-center p-8 text-red-400">Error loading analysis: {error}</div>; }
    if (!analysis) { return <div className="text-center p-8 text-gray-500">No analysis data found for {ticker}.</div>; }

    return (
        <div>
            <button onClick={onBackClick} className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6 ml-4 md:ml-8">
                <ArrowLeft size={16} className="mr-2" />Back to A-List
            </button>

            {/* Collapsible Market Context Section */}
            {analysis?.market_context && (
                <div className="w-full max-w-5xl mx-auto px-4 mb-6">
                    <button
                        onClick={() => setShowMarketContext(!showMarketContext)}
                        className="w-full bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700/50 rounded-xl p-4 flex items-center justify-between transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📊</span>
                            <div className="text-left">
                                <h3 className="text-white font-semibold">Market Context</h3>
                                <p className="text-slate-400 text-sm">Daily market indicators (applies to all stocks)</p>
                            </div>
                        </div>
                        {showMarketContext ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                    </button>

                    {showMarketContext && (
                        <div className="mt-4 space-y-6 animate-fadeIn">
                            <MarketRegimeCard marketContext={analysis.market_context} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {analysis.market_context.sector_performance && (
                                    <SectorHeatmapCard sectorPerformance={analysis.market_context.sector_performance} />
                                )}
                                {analysis.market_context.breadth_indicators && (
                                    <MarketBreadthCard breadthData={analysis.market_context.breadth_indicators} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <ApexAnalysisDashboard analysisData={analysis} />
        </div>
    );
};

export default StockDetailPage;