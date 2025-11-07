// src/components/specific/PriceActionCard.js
// Price Action Context - Shows 52W range, support/resistance, price position

import React from 'react';
import { Target, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card.jsx';
import InfoNote from '../ui/InfoNote.jsx';

const PriceActionCard = ({ priceActionContext }) => {
    if (!priceActionContext || priceActionContext.error) {
        return null;
    }

    const {
        current_price,
        "52w_high": high52w,
        "52w_low": low52w,
        distance_from_52w_high_pct,
        distance_from_52w_low_pct,
        price_percentile_52w,
        support_levels,
        resistance_levels,
        nearest_support,
        nearest_resistance,
        distance_to_nearest_support_pct,
        distance_to_nearest_resistance_pct,
        price_position
    } = priceActionContext;

    // Safe number helper
    const safeNumber = (val, defaultVal = 0) => {
        return (val !== null && val !== undefined && !isNaN(val)) ? val : defaultVal;
    };

    // Calculate position in range for visual bar
    const rangeWidth = safeNumber(price_percentile_52w, 50);

    // Color coding for price position
    const getPositionColor = () => {
        if (price_position === 'High') return 'text-success-700 dark:text-success-400';
        if (price_position === 'Low') return 'text-red-600 dark:text-red-400';
        return 'text-warning-700 dark:text-warning-400';
    };

    const getPositionBg = () => {
        if (price_position === 'High') return 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-700';
        if (price_position === 'Low') return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
        return 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-700';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
        >
            <Card className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Price Action</h3>
                            <p className="text-sm text-gray-600">52-week range & key levels</p>
                        </div>
                    </div>

                    {/* Current Price Badge */}
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Current Price</p>
                        <p className="text-3xl font-bold text-gray-900">₹{current_price}</p>
                    </div>
                </div>

                {/* 52-Week Range Visualization */}
                <div className={`border rounded-xl p-5 mb-6 transition-colors ${getPositionBg()}`}>
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <span className="text-xs text-gray-600">52W Low</span>
                            <p className="text-lg font-bold text-gray-900">₹{low52w || 'N/A'}</p>
                            <p className="text-xs text-red-600 dark:text-red-400">
                                {distance_from_52w_low_pct !== null && distance_from_52w_low_pct !== undefined ? (
                                    `${distance_from_52w_low_pct >= 0 ? '+' : ''}${safeNumber(distance_from_52w_low_pct).toFixed(1)}%`
                                ) : 'N/A'}
                            </p>
                        </div>
                        <div className="text-center">
                            <span className={`text-sm font-semibold ${getPositionColor()}`}>
                                {price_position || 'Mid'} Range
                            </span>
                            <p className="text-xs text-gray-600 mt-1">
                                {price_percentile_52w !== null && price_percentile_52w !== undefined ? `${safeNumber(price_percentile_52w).toFixed(0)}th Percentile` : 'N/A'}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-gray-600">52W High</span>
                            <p className="text-lg font-bold text-gray-900">₹{high52w || 'N/A'}</p>
                            <p className="text-xs text-red-600 dark:text-red-400">
                                {distance_from_52w_high_pct !== null && distance_from_52w_high_pct !== undefined ? (
                                    `${distance_from_52w_high_pct >= 0 ? '+' : ''}${safeNumber(distance_from_52w_high_pct).toFixed(1)}%`
                                ) : 'N/A'}
                            </p>
                        </div>
                    </div>

                    {/* Visual Range Bar */}
                    <div className="relative h-3 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                        {/* Filled portion showing current position */}
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${
                                price_position === 'High' ? 'bg-gradient-to-r from-warning-400 to-success-500' :
                                price_position === 'Low' ? 'bg-gradient-to-r from-red-500 to-warning-400' :
                                'bg-warning-400'
                            }`}
                            style={{ width: `${rangeWidth}%` }}
                        />
                        
                        {/* Current price marker */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white dark:bg-neutral-900 rounded-full border-2 border-primary-500 shadow-lg"
                            style={{ left: `${rangeWidth}%` }}
                        />
                    </div>
                </div>

                {/* Support & Resistance Levels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Support Levels */}
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <ArrowDown className="w-5 h-5 text-red-500 dark:text-red-400" />
                            <span className="font-semibold text-gray-900">Support Levels</span>
                        </div>
                        <div className="space-y-2">
                            {support_levels && support_levels.length > 0 ? (
                                support_levels.map((level, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">S{idx + 1}:</span>
                                        <div className="text-right">
                                            <span className="text-sm font-semibold text-red-600 dark:text-red-300">₹{level}</span>
                                            {level === nearest_support && distance_to_nearest_support_pct !== null && distance_to_nearest_support_pct !== undefined && (
                                                <span className="ml-2 text-xs text-red-600 dark:text-red-400">
                                                    ({safeNumber(distance_to_nearest_support_pct).toFixed(1)}%)
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500">No clear support levels</p>
                            )}
                        </div>
                        {nearest_support && (
                            <div className="mt-3 pt-3 border-t border-red-500/20">
                                <p className="text-xs text-gray-600">Nearest Support</p>
                                <p className="text-lg font-bold text-red-600 dark:text-red-300">₹{nearest_support}</p>
                            </div>
                        )}
                    </div>

                    {/* Resistance Levels */}
                    <div className="bg-success-50 dark:bg-success-900/10 border border-success-200 dark:border-success-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <ArrowUp className="w-5 h-5 text-success-600 dark:text-success-400" />
                            <span className="font-semibold text-gray-900">Resistance Levels</span>
                        </div>
                        <div className="space-y-2">
                            {resistance_levels && resistance_levels.length > 0 ? (
                                resistance_levels.map((level, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">R{idx + 1}:</span>
                                        <div className="text-right">
                                            <span className="text-sm font-semibold text-success-600 dark:text-success-300">₹{level}</span>
                                            {level === nearest_resistance && distance_to_nearest_resistance_pct !== null && distance_to_nearest_resistance_pct !== undefined && (
                                                <span className="ml-2 text-xs text-success-600 dark:text-success-400">
                                                    ({safeNumber(distance_to_nearest_resistance_pct).toFixed(1)}%)
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500">No clear resistance levels</p>
                            )}
                        </div>
                        {nearest_resistance && (
                            <div className="mt-3 pt-3 border-t border-green-500/20">
                                <p className="text-xs text-gray-600">Nearest Resistance</p>
                                <p className="text-lg font-bold text-success-600 dark:text-success-300">₹{nearest_resistance}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Key Insights */}
                <div className="bg-gray-50 dark:bg-neutral-900/40 border border-gray-200 dark:border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                            <Info className="w-5 h-5 text-primary-500" />
                        <span className="text-sm font-semibold text-gray-900">Price Analysis</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600 mb-1">Position in Range</p>
                            <p className={`font-bold ${getPositionColor()}`}>
                                {price_position || 'Mid'} (
                                {price_percentile_52w !== null && price_percentile_52w !== undefined 
                                    ? `${safeNumber(price_percentile_52w).toFixed(0)}th percentile`
                                    : 'N/A'
                                })
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Upside to Resistance</p>
                            <p className="font-semibold text-success-600 dark:text-success-400">
                                {distance_to_nearest_resistance_pct !== null && distance_to_nearest_resistance_pct !== undefined
                                    ? `+${safeNumber(distance_to_nearest_resistance_pct).toFixed(1)}%`
                                    : 'N/A'
                                }
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Downside to Support</p>
                            <p className="font-semibold text-red-600 dark:text-red-400">
                                {distance_to_nearest_support_pct !== null && distance_to_nearest_support_pct !== undefined
                                    ? `${safeNumber(distance_to_nearest_support_pct).toFixed(1)}%`
                                    : 'N/A'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info Footer */}
                <InfoNote className="mt-4" variant="info" icon={Info}>
                    Support levels act as <span className="text-red-600 dark:text-red-400 font-semibold">price floors</span> where buying interest
                    typically increases. Resistance levels act as <span className="text-success-600 dark:text-success-400 font-semibold">price ceilings</span>
                    where selling pressure emerges. Price position shows where the stock sits within its 52-week trading range.
                </InfoNote>
            </Card>
        </motion.div>
    );
};

export default PriceActionCard;
