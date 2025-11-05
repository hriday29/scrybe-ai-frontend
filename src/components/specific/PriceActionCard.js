// src/components/specific/PriceActionCard.js
// Price Action Context - Shows 52W range, support/resistance, price position

import React from 'react';
import { TrendingUp, TrendingDown, Target, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { motion } from 'framer-motion';

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

    // Calculate position in range for visual bar
    const rangeWidth = price_percentile_52w;

    // Color coding for price position
    const getPositionColor = () => {
        if (price_position === 'High') return 'text-green-400';
        if (price_position === 'Low') return 'text-red-400';
        return 'text-yellow-400';
    };

    const getPositionBg = () => {
        if (price_position === 'High') return 'bg-green-500/10 border-green-500/30';
        if (price_position === 'Low') return 'bg-red-500/10 border-red-500/30';
        return 'bg-yellow-500/10 border-yellow-500/30';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
        >
            <div className="bg-slate-900/40 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">Price Action</h3>
                            <p className="text-sm text-slate-400">52-week range & key levels</p>
                        </div>
                    </div>

                    {/* Current Price Badge */}
                    <div className="text-right">
                        <p className="text-sm text-slate-400">Current Price</p>
                        <p className="text-3xl font-bold text-white">₹{current_price}</p>
                    </div>
                </div>

                {/* 52-Week Range Visualization */}
                <div className={`border rounded-xl p-5 mb-6 ${getPositionBg()}`}>
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <span className="text-xs text-slate-400">52W Low</span>
                            <p className="text-lg font-bold text-white">₹{low52w}</p>
                            <p className="text-xs text-red-400">{distance_from_52w_low_pct >= 0 ? '+' : ''}{distance_from_52w_low_pct.toFixed(1)}%</p>
                        </div>
                        <div className="text-center">
                            <span className={`text-sm font-bold ${getPositionColor()}`}>
                                {price_position} Range
                            </span>
                            <p className="text-xs text-slate-400 mt-1">{price_percentile_52w.toFixed(0)}th Percentile</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-slate-400">52W High</span>
                            <p className="text-lg font-bold text-white">₹{high52w}</p>
                            <p className="text-xs text-red-400">{distance_from_52w_high_pct >= 0 ? '+' : ''}{distance_from_52w_high_pct.toFixed(1)}%</p>
                        </div>
                    </div>

                    {/* Visual Range Bar */}
                    <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden">
                        {/* Filled portion showing current position */}
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${
                                price_position === 'High' ? 'bg-gradient-to-r from-yellow-500 to-green-500' :
                                price_position === 'Low' ? 'bg-gradient-to-r from-red-500 to-yellow-500' :
                                'bg-gradient-to-r from-yellow-500 to-yellow-400'
                            }`}
                            style={{ width: `${rangeWidth}%` }}
                        />
                        
                        {/* Current price marker */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full border-2 border-blue-500 shadow-lg"
                            style={{ left: `${rangeWidth}%` }}
                        />
                    </div>
                </div>

                {/* Support & Resistance Levels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Support Levels */}
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <ArrowDown className="w-5 h-5 text-red-400" />
                            <span className="font-semibold text-white">Support Levels</span>
                        </div>
                        <div className="space-y-2">
                            {support_levels && support_levels.length > 0 ? (
                                support_levels.map((level, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm text-slate-300">S{idx + 1}:</span>
                                        <div className="text-right">
                                            <span className="text-sm font-bold text-red-300">₹{level}</span>
                                            {level === nearest_support && (
                                                <span className="ml-2 text-xs text-red-400">
                                                    ({distance_to_nearest_support_pct.toFixed(1)}%)
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-500">No clear support levels</p>
                            )}
                        </div>
                        {nearest_support && (
                            <div className="mt-3 pt-3 border-t border-red-500/20">
                                <p className="text-xs text-slate-400">Nearest Support</p>
                                <p className="text-lg font-bold text-red-300">₹{nearest_support}</p>
                            </div>
                        )}
                    </div>

                    {/* Resistance Levels */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <ArrowUp className="w-5 h-5 text-green-400" />
                            <span className="font-semibold text-white">Resistance Levels</span>
                        </div>
                        <div className="space-y-2">
                            {resistance_levels && resistance_levels.length > 0 ? (
                                resistance_levels.map((level, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm text-slate-300">R{idx + 1}:</span>
                                        <div className="text-right">
                                            <span className="text-sm font-bold text-green-300">₹{level}</span>
                                            {level === nearest_resistance && (
                                                <span className="ml-2 text-xs text-green-400">
                                                    ({distance_to_nearest_resistance_pct.toFixed(1)}%)
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-500">No clear resistance levels</p>
                            )}
                        </div>
                        {nearest_resistance && (
                            <div className="mt-3 pt-3 border-t border-green-500/20">
                                <p className="text-xs text-slate-400">Nearest Resistance</p>
                                <p className="text-lg font-bold text-green-300">₹{nearest_resistance}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Key Insights */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-semibold text-white">Price Analysis</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-slate-400 mb-1">Position in Range</p>
                            <p className={`font-bold ${getPositionColor()}`}>
                                {price_position} ({price_percentile_52w.toFixed(0)}th percentile)
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-400 mb-1">Upside to Resistance</p>
                            <p className="font-bold text-green-400">
                                +{distance_to_nearest_resistance_pct.toFixed(1)}%
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-400 mb-1">Downside to Support</p>
                            <p className="font-bold text-red-400">
                                {distance_to_nearest_support_pct.toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info Footer */}
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Support levels act as <span className="text-red-400 font-semibold">price floors</span> where buying interest 
                        typically increases. Resistance levels act as <span className="text-green-400 font-semibold">price ceilings</span> where 
                        selling pressure emerges. Price position shows where the stock sits within its 52-week trading range.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default PriceActionCard;
