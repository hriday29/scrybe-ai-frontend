// src/pages/IndexAnalysis.js (Refactored for Light/Dark Theming and Improved Contrast)

import React, { useState, useEffect } from 'react';
import { getIndexList, getIndexAnalysis } from '../api/api';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight, Shield, Activity, AlertTriangle } from 'lucide-react';

// Reusable info card with enhanced institutional design
const InfoCard = ({ title, children, icon: Icon, gradient = 'from-blue-500 to-indigo-500' }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-800 backdrop-blur-sm shadow-lg hover:shadow-xl rounded-xl p-6 h-full transition-all duration-300"
    >
        <div className="flex items-center gap-3 mb-5">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {title}
            </h3>
        </div>
        <div className="text-gray-700 dark:text-gray-300 space-y-3 text-sm leading-relaxed">
            {children}
        </div>
    </motion.div>
);

// Dashboard section (cards + heading) - Enhanced design
const IndexDashboard = ({ data, indexName }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10"
    >
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6"
        >
            <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {indexName} Analysis
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold">Live AI-powered market intelligence</p>
                </div>
            </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <InfoCard title="Market Pulse" icon={TrendingUp} gradient="from-emerald-500 to-green-500">
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Overall Bias:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{data.marketPulse.overallBias}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Volatility:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{data.marketPulse.volatilityIndexStatus}</span>
                    </div>
                    {data.marketPulse.trendStrength && (
                        <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Trend Strength:</span>
                            <span className="font-bold text-gray-900 dark:text-white">{data.marketPulse.trendStrength}</span>
                        </div>
                    )}
                    {data.marketPulse.marketSentiment && (
                        <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Sentiment:</span>
                            <span className="font-bold text-gray-900 dark:text-white">{data.marketPulse.marketSentiment}</span>
                        </div>
                    )}
                </div>
            </InfoCard>
            
            <InfoCard title="Trend Analysis" icon={ArrowRight} gradient="from-blue-500 to-cyan-500">
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Short-Term:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{data.trendAnalysis.shortTermTrend}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Medium-Term:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{data.trendAnalysis.mediumTermTrend}</span>
                    </div>
                    {data.trendAnalysis.longTermTrend && (
                        <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Long-Term:</span>
                            <span className="font-bold text-gray-900 dark:text-white">{data.trendAnalysis.longTermTrend}</span>
                        </div>
                    )}
                </div>
            </InfoCard>
            
            {/* Technical Analysis Card - NEW */}
            {data.technicalAnalysis && (
                <InfoCard title="Technical Analysis" icon={Activity} gradient="from-cyan-500 to-blue-500">
                    <div className="space-y-3 text-sm">
                        {data.technicalAnalysis.rsiAnalysis && (
                            <div>
                                <span className="text-gray-600 dark:text-gray-400 font-semibold">RSI: </span>
                                <span className="text-gray-900 dark:text-white">{data.technicalAnalysis.rsiAnalysis}</span>
                            </div>
                        )}
                        {data.technicalAnalysis.macdSignal && (
                            <div>
                                <span className="text-gray-600 dark:text-gray-400 font-semibold">MACD: </span>
                                <span className="text-gray-900 dark:text-white">{data.technicalAnalysis.macdSignal}</span>
                            </div>
                        )}
                        {data.technicalAnalysis.volumeAnalysis && (
                            <div>
                                <span className="text-gray-600 dark:text-gray-400 font-semibold">Volume: </span>
                                <span className="text-gray-900 dark:text-white">{data.technicalAnalysis.volumeAnalysis}</span>
                            </div>
                        )}
                    </div>
                </InfoCard>
            )}
            
            <InfoCard title="Forward Outlook (7 Days)" icon={TrendingDown} gradient="from-purple-500 to-pink-500">
                <p className="text-gray-700 dark:text-gray-300 mb-3">{data.forwardOutlook.next7Days}</p>
                {data.forwardOutlook.targetLevels && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
                        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">Target Levels</div>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">{data.forwardOutlook.targetLevels}</p>
                    </div>
                )}
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">Primary Risk:</span>
                    </div>
                    <p className="text-red-700 dark:text-red-300 text-sm mt-1 font-medium">{data.forwardOutlook.primaryRisk}</p>
                </div>
                {data.forwardOutlook.tradingStrategy && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mt-3">
                        <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">Strategy</div>
                        <p className="text-amber-700 dark:text-amber-300 text-sm">{data.forwardOutlook.tradingStrategy}</p>
                    </div>
                )}
            </InfoCard>
            
            <InfoCard title="Key Levels" icon={Shield} gradient="from-amber-500 to-orange-500">
                <div className="space-y-3">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">Support</div>
                        <div className="text-green-700 dark:text-green-300 font-bold">
                            {/* Handle both old and new schema */}
                            {data.keyLevels.support ? data.keyLevels.support.join(', ') : 
                             data.keyLevels.immediateSupport ? [...(data.keyLevels.immediateSupport || []), ...(data.keyLevels.majorSupport || [])].join(', ') : 
                             'N/A'}
                        </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">Resistance</div>
                        <div className="text-red-700 dark:text-red-300 font-bold">
                            {/* Handle both old and new schema */}
                            {data.keyLevels.resistance ? data.keyLevels.resistance.join(', ') : 
                             data.keyLevels.immediateResistance ? [...(data.keyLevels.immediateResistance || []), ...(data.keyLevels.majorResistance || [])].join(', ') : 
                             'N/A'}
                        </div>
                    </div>
                    {data.keyLevels.levelsRationale && (
                        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">Why These Levels?</div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">{data.keyLevels.levelsRationale}</p>
                        </div>
                    )}
                </div>
            </InfoCard>
            
            <InfoCard title="Options Matrix" icon={Shield} gradient="from-indigo-500 to-purple-500">
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Max OI Call:</span>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">{data.optionsMatrix.maxOpenInterestCall}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Max OI Put:</span>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">{data.optionsMatrix.maxOpenInterestPut}</span>
                    </div>
                    {data.optionsMatrix.maxPainLevel && (
                        <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Max Pain:</span>
                            <span className="font-mono font-bold text-gray-900 dark:text-white">{data.optionsMatrix.maxPainLevel}</span>
                        </div>
                    )}
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-neutral-700">
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{data.optionsMatrix.putCallRatioAnalysis}</p>
                    </div>
                </div>
            </InfoCard>
            
            {/* Risk Management Card - NEW */}
            {data.riskManagement && (
                <InfoCard title="Risk Management" icon={AlertTriangle} gradient="from-red-500 to-orange-500">
                    <div className="space-y-3">
                        {data.riskManagement.stopLossGuidance && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">Stop Loss</div>
                                <p className="text-red-700 dark:text-red-300 text-sm">{data.riskManagement.stopLossGuidance}</p>
                            </div>
                        )}
                        {data.riskManagement.positionSizingAdvice && (
                            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                                <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">Position Sizing</div>
                                <p className="text-amber-700 dark:text-amber-300 text-sm">{data.riskManagement.positionSizingAdvice}</p>
                            </div>
                        )}
                    </div>
                </InfoCard>
            )}
        </div>
    </motion.div>
);


const IndexAnalysis = () => {
    const [indices, setIndices] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState(null);
    const [selectedIndexName, setSelectedIndexName] = useState('');
    const [analysisData, setAnalysisData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIndexList = async () => {
            try {
                const data = await getIndexList();
                setIndices(data);
                // Automatically select the first index on initial load
                if (data && data.length > 0) {
                    setSelectedTicker(data[0].ticker);
                    setSelectedIndexName(data[0].name);
                }
            } catch (err) {
                setError('Failed to load the list of market indices.');
            }
        };
        fetchIndexList();
    }, []);

    useEffect(() => {
        if (!selectedTicker) return;

        const fetchAnalysis = async () => {
            setIsLoading(true);
            setError(null);
            setAnalysisData(null);
            try {
                const data = await getIndexAnalysis(selectedTicker);
                setAnalysisData(data);
            } catch (err) {
                setError(`Failed to fetch analysis for ${selectedIndexName}.`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalysis();
    }, [selectedTicker, selectedIndexName]);

    const handleIndexSelect = (index) => {
        setSelectedTicker(index.ticker);
        setSelectedIndexName(index.name);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-12 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                Market & Index Analysis
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                Strategic market intelligence powered by AI
                            </p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800 p-5">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-blue-900 dark:text-blue-100 font-semibold mb-1">High-Level Market Intelligence</p>
                                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                                    AI-powered analysis of key indices including Nifty 50 and sectoral indices. Get strategic insights on overall market sentiment, trend strength, key support/resistance levels, and forward outlook to guide your Portfolio Manager decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 p-4 shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-white text-sm font-bold">📊</span>
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">Select Index</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {indices.map((index, idx) => (
                                <motion.button
                                    key={index.ticker}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.05 * idx }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleIndexSelect(index)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 border ${
                                        selectedTicker === index.ticker
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                                            : 'bg-white text-gray-700 hover:bg-blue-50 border-gray-300 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700 dark:border-neutral-700'
                                    }`}
                                >
                                    {index.name}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div>
                    {isLoading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 p-12 text-center shadow-lg"
                        >
                            <div className="relative inline-block mb-6">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-neutral-800"></div>
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 dark:border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Analyzing {selectedIndexName}...</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">AI is processing market data, technical indicators, and options flow</p>
                        </motion.div>
                    )}
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 p-8 text-center shadow-lg max-w-2xl mx-auto"
                        >
                            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Analysis Unavailable</h3>
                            <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                This could be due to a temporary connection issue or the analysis is still being generated.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
                            >
                                <Activity className="w-4 h-4" />
                                Retry Analysis
                            </button>
                        </motion.div>
                    )}
                    {analysisData && <IndexDashboard data={analysisData} indexName={selectedIndexName} />}
                </div>
            </div>
        </div>
    );
};

export default IndexAnalysis;
