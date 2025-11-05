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
            'Uptrend': { icon: TrendingUp, color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' },
            'Bullish Pullback': { icon: TrendingUp, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30' },
            'Downtrend': { icon: TrendingDown, color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' },
            'Bearish Rally': { icon: TrendingDown, color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30' },
            'Sideways': { icon: Activity, color: 'text-gray-400', bgColor: 'bg-gray-500/10', borderColor: 'border-gray-500/30' }
        };
        return regimeConfig[regimeName] || regimeConfig['Sideways'];
    };

    const regimeDisplay = getRegimeDisplay(regime);
    const RegimeIcon = regimeDisplay.icon;

    // Volatility color coding
    const getVolatilityColor = (status) => {
        if (status === 'High-Risk') return 'text-red-400';
        if (status === 'Low') return 'text-green-400';
        return 'text-yellow-400';
    };

    // Strategy badge color
    const getStrategyColor = () => {
        if (active_strategy === 'BUY only') return 'bg-blue-500/20 border-blue-500/40 text-blue-300';
        if (active_strategy === 'BUY + SHORT') return 'bg-purple-500/20 border-purple-500/40 text-purple-300';
        return 'bg-gray-500/20 border-gray-500/40 text-gray-300';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <div className="bg-slate-900/40 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${regimeDisplay.bgColor}`}>
                            <RegimeIcon className={`w-6 h-6 ${regimeDisplay.color}`} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">Market Regime</h3>
                            <p className="text-sm text-slate-400">Today's market conditions</p>
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
                                <span className="text-sm text-slate-400">Primary Regime:</span>
                                <span className={`text-xl font-bold ${regimeDisplay.color}`}>{regime}</span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {regime_explanation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Index Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Nifty 50 */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-400">Nifty 50</span>
                            <span className={`text-sm font-bold ${getRegimeDisplay(nifty_regime).color}`}>
                                {nifty_regime || 'N/A'}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500">Broad market trend</p>
                    </div>

                    {/* Smallcap 250 */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-400">Smallcap 250</span>
                            <span className={`text-sm font-bold ${getRegimeDisplay(smallcap_regime).color}`}>
                                {smallcap_regime || 'N/A'}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500">Trading universe trend</p>
                    </div>
                </div>

                {/* Volatility & Market Health */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Volatility */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-semibold text-slate-400">Volatility</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">{vix_level ? vix_level.toFixed(1) : 'N/A'}</span>
                            <span className={`text-sm font-semibold ${getVolatilityColor(volatility_status)}`}>
                                ({volatility_status})
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">India VIX level</p>
                    </div>

                    {/* Market Breadth */}
                    {market_breadth && (
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-semibold text-slate-400">Market Health</span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Above 50-day MA:</span>
                                    <span className={`font-semibold ${market_breadth.pct_above_50dma > 50 ? 'text-green-400' : 'text-red-400'}`}>
                                        {market_breadth.pct_above_50dma}%
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Above 200-day MA:</span>
                                    <span className={`font-semibold ${market_breadth.pct_above_200dma > 50 ? 'text-green-400' : 'text-red-400'}`}>
                                        {market_breadth.pct_above_200dma}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Footer */}
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-400 leading-relaxed">
                        The market regime is recalculated daily at 4:00 PM IST. It determines which signal types are allowed 
                        (BUY only in bull markets, BUY+SHORT in other conditions) to align with overall market momentum.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default MarketRegimeCard;
