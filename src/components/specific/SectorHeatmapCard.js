// src/components/specific/SectorHeatmapCard.js
// Sector Performance Heatmap - Visual display of sector strength/weakness

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart3, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const SectorHeatmapCard = ({ sectorPerformance }) => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('21d');
    
    if (!sectorPerformance || !sectorPerformance.sectors) {
        return null;
    }

    const { sectors, benchmark, top_3, bottom_3 } = sectorPerformance;

    // Get performance value based on selected timeframe
    const getPerformance = (sector) => {
        return sector[`performance_${selectedTimeframe}`] || 0;
    };

    // Color coding based on performance
    const getColorClass = (performance, benchmarkPerf) => {
        const relative = performance - benchmarkPerf;
        if (relative > 3) return 'bg-green-50 dark:bg-green-500/30 border-green-400 dark:border-green-500/50 text-green-700 dark:text-green-300';
        if (relative > 1) return 'bg-green-50 dark:bg-green-500/20 border-green-300 dark:border-green-500/40 text-green-600 dark:text-green-400';
        if (relative < -3) return 'bg-red-50 dark:bg-red-500/30 border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300';
        if (relative < -1) return 'bg-red-50 dark:bg-red-500/20 border-red-300 dark:border-red-500/40 text-red-600 dark:text-red-400';
        return 'bg-gray-50 dark:bg-gray-500/20 border-gray-300 dark:border-gray-500/40 text-gray-700 dark:text-gray-300';
    };

    // Get icon based on relative strength
    const getStrengthIcon = (strength) => {
        if (strength === 'Strong') return <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />;
        if (strength === 'Weak') return <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />;
        return <Activity className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    };

    const benchmarkPerf = benchmark[`performance_${selectedTimeframe}`] || 0;

    // Sort sectors by performance for heatmap display
    const sortedSectors = [...sectors].sort((a, b) => getPerformance(b) - getPerformance(a));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
        >
            <div className="bg-white border border-gray-200 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <BarChart3 className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Sector Performance</h3>
                            <p className="text-sm text-gray-600">Where the AI is hunting opportunities</p>
                        </div>
                    </div>

                    {/* Timeframe Selector */}
                    <div className="flex gap-2 bg-gray-50 rounded-lg p-1">
                        {['1d', '5d', '21d'].map((tf) => (
                            <button
                                key={tf}
                                onClick={() => setSelectedTimeframe(tf)}
                                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                                    selectedTimeframe === tf
                                        ? 'bg-purple-500 text-gray-900 shadow-lg'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {tf === '1d' ? '1 Day' : tf === '5d' ? '5 Days' : '21 Days'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Benchmark Reference */}
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-400 dark:border-blue-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-sm text-gray-700 dark:text-gray-600">Nifty 50 Benchmark</span>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                                {benchmarkPerf >= 0 ? '+' : ''}{benchmarkPerf.toFixed(2)}%
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-gray-600 dark:text-gray-500">
                                {selectedTimeframe === '1d' ? 'Today' : 
                                 selectedTimeframe === '5d' ? 'Last Week' : 'Last Month'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Heatmap Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {sortedSectors.map((sector, index) => {
                        const performance = getPerformance(sector);
                        const colorClass = getColorClass(performance, benchmarkPerf);
                        const isTopPerformer = top_3.includes(sector.name);
                        const isBottomPerformer = bottom_3.includes(sector.name);

                        return (
                            <motion.div
                                key={sector.ticker}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`relative border rounded-xl p-4 ${colorClass} ${
                                    isTopPerformer ? 'ring-2 ring-green-400' : 
                                    isBottomPerformer ? 'ring-2 ring-red-400' : ''
                                }`}
                            >
                                {/* Top Performer Badge */}
                                {isTopPerformer && (
                                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                        TOP
                                    </div>
                                )}
                                {isBottomPerformer && (
                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                        WEAK
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1">
                                            {sector.name.replace('NIFTY ', '')}
                                        </h4>
                                        <div className="flex items-center gap-1">
                                            {getStrengthIcon(sector.relative_strength)}
                                            <span className="text-xs text-gray-700 dark:text-gray-600">{sector.relative_strength}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                            {performance >= 0 ? '+' : ''}{performance.toFixed(1)}%
                                        </p>
                                    </div>
                                </div>

                                {/* Momentum Score Bar */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-700 dark:text-gray-600">Momentum</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">{sector.momentum_score}/10</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-200 dark:bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${
                                                sector.momentum_score >= 7 ? 'bg-green-500' :
                                                sector.momentum_score >= 5 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}
                                            style={{ width: `${sector.momentum_score * 10}%` }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 dark:bg-green-500/10 border border-green-400 dark:border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-700">Strongest Sectors</span>
                        </div>
                        <div className="space-y-1">
                            {top_3.map((name, idx) => (
                                <div key={idx} className="text-green-700 dark:text-green-300 text-sm font-medium">
                                    {idx + 1}. {name.replace('NIFTY ', '')}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-400 dark:border-red-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-700">Weakest Sectors</span>
                        </div>
                        <div className="space-y-1">
                            {bottom_3.map((name, idx) => (
                                <div key={idx} className="text-red-700 dark:text-red-300 text-sm font-medium">
                                    {idx + 1}. {name.replace('NIFTY ', '')}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Info Footer */}
                <div className="pt-4 border-t border-gray-200 dark:border-slate-700/50 flex items-start gap-2">
                    <Info className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-700 dark:text-gray-600 leading-relaxed">
                        Sectors marked as <span className="text-green-700 dark:text-green-400 font-semibold">Strong</span> outperform the Nifty 50 
                        benchmark (potential BUY opportunities), while <span className="text-red-700 dark:text-red-400 font-semibold">Weak</span> sectors 
                        underperform (potential SHORT opportunities in bearish regimes). Momentum score indicates recent price velocity.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default SectorHeatmapCard;
