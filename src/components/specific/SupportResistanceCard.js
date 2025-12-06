// src/components/specific/SupportResistanceCard.js
/**
 * SupportResistanceCard
 * 
 * Displays support and resistance levels for observation only.
 * No trading recommendations - purely shows where key price levels exist.
 * 
 * Props:
 * - analysisData: Full analysis object containing technical_analysis with support/resistance data
 * 
 * Features:
 * - Major support zones (3 levels)
 * - Major resistance zones (3 levels)
 * - Current price position
 * - Distance to nearest levels
 * - Visual representation of price levels
 */

import React from 'react';
import { TrendingUp, TrendingDown, Circle } from 'lucide-react';

const SupportResistanceCard = ({ analysisData }) => {
    if (!analysisData) return null;

    const technicalData = analysisData.technical_analysis || {};
    
    const currentPrice = technicalData.daily_close;
    const supportLevels = technicalData.support_levels || [];
    const resistanceLevels = technicalData.resistance_levels || [];
    const nearestSupport = technicalData.nearest_support;
    const nearestResistance = technicalData.nearest_resistance;
    const distanceToSupport = technicalData.distance_to_nearest_support_pct;
    const distanceToResistance = technicalData.distance_to_nearest_resistance_pct;
    const high52w = technicalData["52w_high"];
    const low52w = technicalData["52w_low"];

    // If no support/resistance data available, don't render
    if (!currentPrice || (supportLevels.length === 0 && resistanceLevels.length === 0)) {
        return null;
    }

    // Calculate price range for visualization
    const allLevels = [
        low52w,
        ...supportLevels,
        currentPrice,
        ...resistanceLevels,
        high52w
    ].filter(Boolean);

    const minPrice = Math.min(...allLevels);
    const maxPrice = Math.max(...allLevels);
    const priceRange = maxPrice - minPrice;

    // Calculate position percentage for visualization
    const getPositionPercent = (price) => {
        if (!price || priceRange === 0) return 50;
        return ((price - minPrice) / priceRange) * 100;
    };

    return (
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-neutral-700">
                <Circle size={24} className="text-purple-600 dark:text-purple-400" />
                <div>
                    <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-100">Support & Resistance Zones</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Key price levels — observation only</p>
                </div>
            </div>

            {/* Educational Note */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-purple-800 dark:text-purple-300 leading-relaxed">
                    📍 <strong>Educational Note:</strong> These are price levels where the stock has historically found support 
                    (buying interest) or resistance (selling pressure). They represent areas of liquidity and psychological 
                    significance, not trade recommendations.
                </p>
            </div>

            {/* Current Price & Position */}
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Price</p>
                        <p className="text-3xl font-bold font-mono text-gray-900 dark:text-gray-100">
                            ₹{currentPrice?.toFixed(2)}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                            <TrendingUp size={16} />
                            <span className="text-sm">
                                Nearest Resistance: ₹{nearestResistance?.toFixed(2)} 
                                <span className="font-semibold ml-1">(+{distanceToResistance?.toFixed(1)}%)</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                            <TrendingDown size={16} />
                            <span className="text-sm">
                                Nearest Support: ₹{nearestSupport?.toFixed(2)}
                                <span className="font-semibold ml-1">(-{distanceToSupport?.toFixed(1)}%)</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Price Ladder */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Price Level Visualization</h3>
                <div className="relative h-64 bg-gray-100 dark:bg-neutral-800 rounded-lg p-4">
                    {/* 52-Week High */}
                    {high52w && (
                        <div 
                            className="absolute left-0 right-0 flex items-center"
                            style={{ bottom: `${getPositionPercent(high52w)}%` }}
                        >
                            <div className="w-full border-t-2 border-dashed border-gray-400 dark:border-gray-600"></div>
                            <span className="absolute right-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800 px-2">
                                52W High: ₹{high52w?.toFixed(2)}
                            </span>
                        </div>
                    )}

                    {/* Resistance Levels */}
                    {resistanceLevels.map((level, idx) => (
                        <div 
                            key={`res-${idx}`}
                            className="absolute left-0 right-0 flex items-center"
                            style={{ bottom: `${getPositionPercent(level)}%` }}
                        >
                            <div className="w-full border-t-2 border-red-400 dark:border-red-600"></div>
                            <span className="absolute right-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">
                                R{idx + 1}: ₹{level?.toFixed(2)}
                            </span>
                        </div>
                    ))}

                    {/* Current Price */}
                    <div 
                        className="absolute left-0 right-0 flex items-center z-10"
                        style={{ bottom: `${getPositionPercent(currentPrice)}%` }}
                    >
                        <div className="w-full border-t-4 border-blue-600 dark:border-blue-400"></div>
                        <span className="absolute left-2 text-sm font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg shadow-lg">
                            📍 Current: ₹{currentPrice?.toFixed(2)}
                        </span>
                    </div>

                    {/* Support Levels */}
                    {supportLevels.map((level, idx) => (
                        <div 
                            key={`sup-${idx}`}
                            className="absolute left-0 right-0 flex items-center"
                            style={{ bottom: `${getPositionPercent(level)}%` }}
                        >
                            <div className="w-full border-t-2 border-green-400 dark:border-green-600"></div>
                            <span className="absolute right-2 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                                S{idx + 1}: ₹{level?.toFixed(2)}
                            </span>
                        </div>
                    ))}

                    {/* 52-Week Low */}
                    {low52w && (
                        <div 
                            className="absolute left-0 right-0 flex items-center"
                            style={{ bottom: `${getPositionPercent(low52w)}%` }}
                        >
                            <div className="w-full border-t-2 border-dashed border-gray-400 dark:border-gray-600"></div>
                            <span className="absolute right-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800 px-2">
                                52W Low: ₹{low52w?.toFixed(2)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed Levels Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Resistance Zones */}
                <div>
                    <h3 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                        <TrendingUp size={16} />
                        Resistance Zones (Overhead Supply)
                    </h3>
                    <div className="space-y-2">
                        {resistanceLevels.length > 0 ? (
                            resistanceLevels.map((level, idx) => {
                                const distancePct = ((level - currentPrice) / currentPrice) * 100;
                                return (
                                    <div 
                                        key={idx}
                                        className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-3"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-red-700 dark:text-red-400">R{idx + 1}</span>
                                            <span className="font-mono text-gray-900 dark:text-gray-100">₹{level?.toFixed(2)}</span>
                                        </div>
                                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                                            {distancePct > 0 ? '+' : ''}{distancePct.toFixed(2)}% from current price
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">No resistance levels detected in recent price action</p>
                        )}
                    </div>
                </div>

                {/* Support Zones */}
                <div>
                    <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                        <TrendingDown size={16} />
                        Support Zones (Demand Areas)
                    </h3>
                    <div className="space-y-2">
                        {supportLevels.length > 0 ? (
                            supportLevels.map((level, idx) => {
                                const distancePct = ((currentPrice - level) / currentPrice) * 100;
                                return (
                                    <div 
                                        key={idx}
                                        className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-3"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-green-700 dark:text-green-400">S{idx + 1}</span>
                                            <span className="font-mono text-gray-900 dark:text-gray-100">₹{level?.toFixed(2)}</span>
                                        </div>
                                        <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                                            -{distancePct.toFixed(2)}% from current price
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">No support levels detected in recent price action</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Context Note */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    Support and resistance levels are identified from recent swing highs and lows in price action. 
                    These zones represent areas where historical buying or selling activity has occurred, 
                    not predictions of future price movement.
                </p>
            </div>
        </div>
    );
};

export default SupportResistanceCard;
