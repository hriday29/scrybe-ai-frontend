// src/components/specific/MarketRegimeCard.js
// Market Regime Display - Shows current market regime, volatility, and active strategy

import React from 'react';
import { TrendingUp, TrendingDown, Activity, Shield, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const MarketRegimeCard = ({ marketContext }) => {
    if (!marketContext) {
        return null; // Don't render if no data
    }

    const {
        regime,
        regime_explanation,
        active_strategy,
        vix_level,
        volatility_status,
        nifty_regime,
        smallcap_regime,
        market_breadth
    } = marketContext;

    // Determine regime icon and color
    const getRegimeDisplay = (regimeName) => {
        const regimeConfig = {
            'Uptrend': { icon: TrendingUp, color: 'text-success-600', bgColor: 'bg-success-50', borderColor: 'border-success-300' },
            'Bullish Pullback': { icon: TrendingUp, color: 'text-warning-600', bgColor: 'bg-warning-50', borderColor: 'border-warning-300' },
            'Downtrend': { icon: TrendingDown, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-300' },
            'Bearish Rally': { icon: TrendingDown, color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-300' },
            'Sideways': { icon: Activity, color: 'text-gray-600', bgColor: 'bg-gray-100', borderColor: 'border-gray-300' }
        };
        return regimeConfig[regimeName] || regimeConfig['Sideways'];
    };

    const regimeDisplay = getRegimeDisplay(regime);
    const RegimeIcon = regimeDisplay.icon;

    // Volatility color coding
    const getVolatilityColor = (status) => {
        if (status === 'High-Risk') return 'text-red-600';
        if (status === 'Low') return 'text-success-600';
        return 'text-warning-600';
    };

    // Strategy badge color
    const getStrategyColor = () => {
        if (active_strategy === 'BUY only') return 'bg-primary-50 border-primary-300 text-primary-700';
        if (active_strategy === 'BUY + SHORT') return 'bg-secondary-50 border-secondary-300 text-secondary-700';
        return 'bg-gray-100 border-gray-300 text-gray-700';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-5 md:p-6 shadow-lg">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${regimeDisplay.bgColor}`}>
                            <RegimeIcon className={`w-5 h-5 md:w-6 md:h-6 ${regimeDisplay.color}`} />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Market Regime</h3>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Today's market conditions</p>
                        </div>
                    </div>
                    {active_strategy && (
                        <div className={`px-3 py-1.5 rounded-full border ${getStrategyColor()} font-semibold text-xs md:text-sm whitespace-nowrap`}>
                            {active_strategy}
                        </div>
                    )}
                </div>

                {/* Main Regime Display */}
                {regime && (
                    <div className={`border ${regimeDisplay.borderColor} ${regimeDisplay.bgColor} dark:bg-opacity-20 rounded-lg p-4 mb-4`}>
                        <div className="flex items-start gap-3">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">Primary Regime:</span>
                                    <span className={`text-base md:text-lg font-bold ${regimeDisplay.color} dark:text-opacity-90`}>
                                        {regime}
                                    </span>
                                </div>
                                {regime_explanation && (
                                    <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                                        {regime_explanation}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Index Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {/* Nifty 50 */}
                    <div className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">Nifty 50</span>
                            <span className={`text-xs md:text-sm font-bold ${getRegimeDisplay(nifty_regime || 'Sideways').color} dark:text-opacity-90`}>
                                {nifty_regime || 'N/A'}
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Broad market trend</p>
                    </div>

                    {/* Smallcap 250 */}
                    <div className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">Smallcap 250</span>
                            <span className={`text-xs md:text-sm font-bold ${getRegimeDisplay(smallcap_regime || nifty_regime || 'Sideways').color} dark:text-opacity-90`}>
                                {smallcap_regime || nifty_regime || 'N/A'}
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            {smallcap_regime ? 'Trading universe trend' : 'Using Nifty 50 trend (Smallcap data unavailable)'}
                        </p>
                    </div>
                </div>

                {/* Volatility & Market Health */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Volatility */}
                    <div className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">Volatility</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                {vix_level !== null && vix_level !== undefined && vix_level > 0 ? vix_level.toFixed(1) : 'N/A'}
                            </span>
                            {volatility_status && volatility_status !== 'Unknown' && volatility_status !== 'Normal' && (
                                <span className={`text-xs md:text-sm font-semibold ${getVolatilityColor(volatility_status)}`}>
                                    ({volatility_status})
                                </span>
                            )}
                            {volatility_status === 'Normal' && vix_level && (
                                <span className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    (Normal)
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">India VIX level</p>
                    </div>

                    {/* Market Breadth */}
                    {market_breadth && (
                        <div className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">Market Health</span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-600 dark:text-gray-400">Above 50-day MA:</span>
                                    <span className={`font-semibold ${market_breadth.pct_above_50dma > 50 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {market_breadth.pct_above_50dma !== undefined ? `${market_breadth.pct_above_50dma}%` : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-600 dark:text-gray-400">Above 200-day MA:</span>
                                    <span className={`font-semibold ${market_breadth.pct_above_200dma > 50 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {market_breadth.pct_above_200dma !== undefined ? `${market_breadth.pct_above_200dma}%` : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Footer */}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-neutral-700 flex items-start gap-2">
                    <Info className="w-3 h-3 md:w-4 md:h-4 text-primary-500 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        The market regime is recalculated daily at 10:00 PM IST. It determines which signal types are allowed 
                        (BUY only in bull markets, BUY+SHORT in other conditions) to align with overall market momentum.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default MarketRegimeCard;
