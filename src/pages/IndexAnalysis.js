// src/pages/IndexAnalysis.js (FINAL, FUNCTIONAL VERSION)

import React, { useState, useEffect } from 'react';
import { getIndexList, getIndexAnalysis } from '../api/api';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight, Shield, ShieldOff } from 'lucide-react';

// Sub-component for a single card in the dashboard
const InfoCard = ({ title, children, icon: Icon }) => (
    <div className="bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-lg rounded-2xl p-6 h-full">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Icon className="w-6 h-6 mr-3 text-blue-400" />
            {title}
        </h3>
        <div className="text-gray-300 space-y-2">
            {children}
        </div>
    </div>
);

// The main dashboard display
const IndexDashboard = ({ data, indexName }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
    >
        <h3 className="text-3xl font-bold text-white text-center mb-6">Analysis for {indexName}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard title="Market Pulse" icon={TrendingUp}>
                <p><strong className="text-white">Overall Bias:</strong> {data.marketPulse.overallBias}</p>
                <p><strong className="text-white">Volatility:</strong> {data.marketPulse.volatilityIndexStatus}</p>
            </InfoCard>
            <InfoCard title="Trend Analysis" icon={ArrowRight}>
                <p><strong className="text-white">Short-Term:</strong> {data.trendAnalysis.shortTermTrend}</p>
                <p><strong className="text-white">Medium-Term:</strong> {data.trendAnalysis.mediumTermTrend}</p>
            </InfoCard>
            <InfoCard title="Forward Outlook (7 Days)" icon={TrendingDown}>
                <p>{data.forwardOutlook.next7Days}</p>
                <p className="mt-2"><strong className="text-red-400">Primary Risk:</strong> {data.forwardOutlook.primaryRisk}</p>
            </InfoCard>
            <InfoCard title="Key Levels" icon={Shield}>
                <p><strong className="text-green-400">Support:</strong> {data.keyLevels.support.join(', ')}</p>
                <p><strong className="text-red-400">Resistance:</strong> {data.keyLevels.resistance.join(', ')}</p>
            </InfoCard>
            <InfoCard title="Options Matrix" icon={ShieldOff}>
                <p><strong className="text-white">Max OI Call:</strong> {data.optionsMatrix.maxOpenInterestCall}</p>
                <p><strong className="text-white">Max OI Put:</strong> {data.optionsMatrix.maxOpenInterestPut}</p>
                <p className="mt-2">{data.optionsMatrix.putCallRatioAnalysis}</p>
            </InfoCard>
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
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Market & Index Analysis</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    A high-level strategic overview of the Indian market. The AI analyzes key indices including 
                    Nifty 50, Nifty Smallcap 250, and sectoral indices to determine overall market 'weather' and 
                    smallcap momentum.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {indices.map(index => (
                    <button
                        key={index.ticker}
                        onClick={() => handleIndexSelect(index)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors backdrop-blur-md border ${
                            selectedTicker === index.ticker
                                ? 'bg-blue-600 text-white border-blue-400/40'
                                : 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/10'
                        }`}
                    >
                        {index.name}
                    </button>
                ))}
            </div>

            <div>
                {isLoading && <div className="text-center p-8 text-gray-400 animate-pulse">Running live AI analysis on the index...</div>}
                {error && <div className="text-center p-8 text-red-400">{error}</div>}
                {analysisData && <IndexDashboard data={analysisData} indexName={selectedIndexName} />}
            </div>
        </div>
    );
};

export default IndexAnalysis;