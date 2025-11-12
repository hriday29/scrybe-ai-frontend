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
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 dark:bg-slate-900 dark:border-slate-700 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-6 h-full transition-all duration-300"
    >
        <div className="flex items-center gap-3 mb-4">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
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
            className="text-center mb-8"
        >
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
                Analysis for {indexName}
            </h3>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard title="Market Pulse" icon={TrendingUp} gradient="from-emerald-500 to-green-500">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Overall Bias:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{data.marketPulse.overallBias}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Volatility:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{data.marketPulse.volatilityIndexStatus}</span>
                    </div>
                    {data.marketPulse.trendStrength && (
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Trend Strength:</span>
                            <span className="font-bold text-gray-900 dark:text-white">{data.marketPulse.trendStrength}</span>
                        </div>
                    )}
                    {data.marketPulse.marketSentiment && (
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Sentiment:</span>
                            <span className="font-bold text-gray-900 dark:text-white">{data.marketPulse.marketSentiment}</span>
                        </div>
                    )}
                </div>
            </InfoCard>
            
            <InfoCard title="Trend Analysis" icon={ArrowRight} gradient="from-blue-500 to-cyan-500">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Short-Term:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{data.trendAnalysis.shortTermTrend}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Medium-Term:</span>
                        <span className="font-bold text-gray-900 dark:text-white">{data.trendAnalysis.mediumTermTrend}</span>
                    </div>
                    {data.trendAnalysis.longTermTrend && (
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Long-Term:</span>
                            <span className="font-bold text-gray-900 dark:text-white">{data.trendAnalysis.longTermTrend}</span>
                        </div>
                    )}
                </div>
            </InfoCard>
            
            {/* Technical Analysis Card - NEW */}
            {data.technicalAnalysis && (
                <InfoCard title="Technical Analysis" icon={Activity} gradient="from-cyan-500 to-blue-500">
                    <div className="space-y-2 text-sm">
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
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Max OI Call:</span>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">{data.optionsMatrix.maxOpenInterestCall}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Max OI Put:</span>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">{data.optionsMatrix.maxOpenInterestPut}</span>
                    </div>
                    {data.optionsMatrix.maxPainLevel && (
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Max Pain:</span>
                            <span className="font-mono font-bold text-gray-900 dark:text-white">{data.optionsMatrix.maxPainLevel}</span>
                        </div>
                    )}
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{data.optionsMatrix.putCallRatioAnalysis}</p>
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
        <div className="w-full max-w-7xl mx-auto p-6 md:p-12 animate-fadeIn">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 mb-4">
                    Market & Index Analysis
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    A high-level strategic overview of the Indian market. The AI analyzes key indices including
                    Nifty 50, Nifty Smallcap 250, and sectoral indices to determine overall market 'weather' and
                    smallcap momentum.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-3 mb-10"
            >
                {indices.map((index, idx) => (
                    <motion.button
                        key={index.ticker}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * idx }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleIndexSelect(index)}
                        className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 border-2 ${
                            selectedTicker === index.ticker
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 dark:border-indigo-400 shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-600'
                        }`}
                    >
                        {index.name}
                    </motion.button>
                ))}
            </motion.div>

            <div>
                {isLoading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center p-12"
                    >
                        <div className="relative inline-block">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-neutral-800"></div>
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 dark:border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
                        </div>
                        <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium">Running live AI analysis on the index...</p>
                    </motion.div>
                )}
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-8"
                    >
                        <div className="inline-block bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8">
                            <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
                        </div>
                    </motion.div>
                )}
                {analysisData && <IndexDashboard data={analysisData} indexName={selectedIndexName} />}
            </div>
        </div>
    );
};

export default IndexAnalysis;
