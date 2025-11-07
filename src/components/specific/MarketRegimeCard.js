// src/components/specific/MarketRegimeCard.js
// Market Regime Display - Shows current market regime, volatility, and active strategy

import React from 'react';
import { TrendingUp, TrendingDown, Activity, Shield, AlertTriangle, Info } from 'lucide-react';
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
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-soft-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${regimeDisplay.bgColor}`}>
                            <RegimeIcon className={`w-6 h-6 ${regimeDisplay.color}`} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Market Regime</h3>
                            <p className="text-sm text-gray-600">Today's market conditions</p>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full border ${getStrategyColor()} font-semibold text-sm`}>
                        {active_strategy}
                    </div>
                </div>

                {/* Main Regime Display */}
                <div className={`border ${regimeDisplay.borderColor} ${regimeDisplay.bgColor} rounded-xl p-5 mb-4`}>
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-gray-600">Primary Regime:</span>
                                <span className={`text-xl font-bold ${regimeDisplay.color}`}>{regime}</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {regime_explanation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Index Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Nifty 50 */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-600">Nifty 50</span>
                            <span className={`text-sm font-bold ${getRegimeDisplay(nifty_regime).color}`}>
                                {nifty_regime || 'N/A'}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">Broad market trend</p>
                    </div>

                    {/* Smallcap 250 */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-600">Smallcap 250</span>
                            <span className={`text-sm font-bold ${getRegimeDisplay(smallcap_regime).color}`}>
                                {smallcap_regime || 'N/A'}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">Trading universe trend</p>
                    </div>
                </div>

                {/* Volatility & Market Health */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Volatility */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-semibold text-gray-600">Volatility</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">{vix_level ? vix_level.toFixed(1) : 'N/A'}</span>
                            <span className={`text-sm font-semibold ${getVolatilityColor(volatility_status)}`}>
                                ({volatility_status})
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">India VIX level</p>
                    </div>

                    {/* Market Breadth */}
                    {market_breadth && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-semibold text-gray-600">Market Health</span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-600">Above 50-day MA:</span>
                                    <span className={`font-semibold ${market_breadth.pct_above_50dma > 50 ? 'text-success-600' : 'text-red-600'}`}>
                                        {market_breadth.pct_above_50dma}%
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-600">Above 200-day MA:</span>
                                    <span className={`font-semibold ${market_breadth.pct_above_200dma > 50 ? 'text-success-600' : 'text-red-600'}`}>
                                        {market_breadth.pct_above_200dma}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600 leading-relaxed">
                        The market regime is recalculated daily at 4:00 PM IST. It determines which signal types are allowed 
                        (BUY only in bull markets, BUY+SHORT in other conditions) to align with overall market momentum.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default MarketRegimeCard;
