// src/components/specific/KeyIndicatorsCard.js
/**
 * KeyIndicatorsCard
 * 
 * Displays key technical indicators with their current values and neutral interpretations.
 * This component is purely informational - it shows readings without trade recommendations.
 * 
 * Props:
 * - analysisData: Full analysis object containing technical_analysis, momentum_analysis, volatility_analysis
 * 
 * Features:
 * - Dynamic indicator detection from available backend data
 * - Clean table format: Indicator Name | Value | Interpretation
 * - Neutral, educational language (no buy/sell advice)
 * - Supports RSI, MACD, Volume, ATR, ADX, Bollinger Bands, and more
 */

import React from 'react';
import { Activity } from 'lucide-react';

const KeyIndicatorsCard = ({ analysisData }) => {
    if (!analysisData) return null;

    const technicalData = analysisData.technical_analysis || {};
    const volatilityData = analysisData.volatility_futures_data || {};

    // Debug logging to see what data is available
    console.log('KeyIndicatorsCard Debug:');
    console.log('- Bollinger_Band_Width_Percent:', technicalData.Bollinger_Band_Width_Percent);
    console.log('- bollinger_bands_interpretation:', technicalData.bollinger_bands_interpretation);
    console.log('- relative_strength_vs_benchmark:', technicalData.relative_strength_vs_benchmark);
    console.log('- futures_spot_basis_percent:', volatilityData.futures_spot_basis_percent);

    // Build indicators array dynamically from available data
    const indicators = [];

    // 1. RSI (Momentum)
    if (technicalData.RSI_14 && technicalData.RSI_14 !== 'N/A') {
        const rsiValue = parseFloat(technicalData.RSI_14);
        let interpretation = '';
        if (rsiValue >= 70) {
            interpretation = 'Overbought territory - price has risen significantly';
        } else if (rsiValue >= 60) {
            interpretation = 'Strong upward momentum';
        } else if (rsiValue >= 40) {
            interpretation = 'Neutral momentum range';
        } else if (rsiValue >= 30) {
            interpretation = 'Weakening momentum';
        } else {
            interpretation = 'Oversold territory - price has fallen significantly';
        }
        indicators.push({
            name: 'RSI (14-day)',
            value: technicalData.RSI_14,
            interpretation: interpretation,
            category: 'Momentum'
        });
    }

    // 2. MACD (Trend & Momentum)
    if (technicalData.MACD_status && technicalData.MACD_status.interpretation !== 'N/A') {
        const macdInterpretation = technicalData.MACD_status.interpretation || '';
        let neutralInterpretation = '';
        
        if (macdInterpretation.includes('Bullish')) {
            neutralInterpretation = 'Fast-moving average crossed above slow average';
        } else if (macdInterpretation.includes('Bearish')) {
            neutralInterpretation = 'Fast-moving average crossed below slow average';
        } else if (macdInterpretation.includes('above')) {
            neutralInterpretation = 'Fast average is above slow average (positive momentum)';
        } else if (macdInterpretation.includes('below')) {
            neutralInterpretation = 'Fast average is below slow average (negative momentum)';
        } else {
            neutralInterpretation = macdInterpretation;
        }

        indicators.push({
            name: 'MACD',
            value: macdInterpretation.includes('Crossover') ? 'Crossover Detected' : 'No Recent Crossover',
            interpretation: neutralInterpretation,
            category: 'Momentum'
        });
    }

    // 3. ADX (Trend Strength)
    if (technicalData.ADX_14_trend_strength && technicalData.ADX_14_trend_strength !== 'N/A') {
        const adxValue = parseFloat(technicalData.ADX_14_trend_strength);
        let interpretation = '';
        
        if (adxValue >= 50) {
            interpretation = 'Very strong trend in place';
        } else if (adxValue >= 25) {
            interpretation = 'Strong trend present';
        } else if (adxValue >= 20) {
            interpretation = 'Emerging trend';
        } else {
            interpretation = 'Weak or absent trend (ranging market)';
        }

        indicators.push({
            name: 'ADX (Trend Strength)',
            value: technicalData.ADX_14_trend_strength,
            interpretation: interpretation,
            category: 'Trend'
        });
    }

    // 4. Volume Analysis
    if (technicalData.volume_analysis && technicalData.volume_analysis.interpretation !== 'N/A') {
        const volumeData = technicalData.volume_analysis;
        let interpretation = volumeData.interpretation || '';
        
        // Make interpretation more neutral
        if (interpretation.includes('above average')) {
            interpretation = 'Trading activity is higher than usual';
        } else if (interpretation.includes('below average')) {
            interpretation = 'Trading activity is lower than usual';
        }

        indicators.push({
            name: 'Volume',
            value: volumeData.latest_volume ? volumeData.latest_volume.toLocaleString() : 'N/A',
            interpretation: interpretation,
            category: 'Volume'
        });
    }

    // 5. ATR (Volatility)
    if (technicalData.ATR_14_percent && technicalData.ATR_14_percent !== 'N/A') {
        const atrPercent = technicalData.ATR_14_percent;
        const atrValue = parseFloat(atrPercent);
        let interpretation = '';

        if (atrValue >= 5) {
            interpretation = 'High volatility - large daily price swings';
        } else if (atrValue >= 3) {
            interpretation = 'Moderate volatility';
        } else if (atrValue >= 2) {
            interpretation = 'Normal volatility range';
        } else {
            interpretation = 'Low volatility - relatively stable prices';
        }

        indicators.push({
            name: 'ATR Volatility',
            value: atrPercent,
            interpretation: interpretation,
            category: 'Volatility'
        });
    }

    // 6. Bollinger Band Width (Volatility)
    if (technicalData.Bollinger_Band_Width_Percent && technicalData.Bollinger_Band_Width_Percent !== 'N/A') {
        const bbwPercent = technicalData.Bollinger_Band_Width_Percent;
        const bbwValue = parseFloat(bbwPercent);
        let interpretation = '';

        if (bbwValue >= 15) {
            interpretation = 'Wide bands indicate high volatility period';
        } else if (bbwValue >= 8) {
            interpretation = 'Moderate band width - normal volatility';
        } else {
            interpretation = 'Narrow bands - volatility compression (potential breakout setup)';
        }

        indicators.push({
            name: 'Bollinger Band Width',
            value: bbwPercent,
            interpretation: interpretation,
            category: 'Volatility'
        });
    }

    // 7. Bollinger Band Position (Price Context)
    if (technicalData.bollinger_bands_interpretation && 
        technicalData.bollinger_bands_interpretation.position) {
        const position = technicalData.bollinger_bands_interpretation.position;
        let interpretation = '';

        if (position.includes('above upper')) {
            interpretation = 'Price is above the upper band (extended move)';
        } else if (position.includes('below lower')) {
            interpretation = 'Price is below the lower band (extended move)';
        } else if (position.includes('near upper')) {
            interpretation = 'Price is approaching the upper band';
        } else if (position.includes('near lower')) {
            interpretation = 'Price is approaching the lower band';
        } else {
            interpretation = 'Price is within normal range (between bands)';
        }

        indicators.push({
            name: 'Price vs Bollinger Bands',
            value: position,
            interpretation: interpretation,
            category: 'Trend'
        });
    }

    // 8. 52-Week Position (Long-term Context)
    if (technicalData.price_percentile_52w !== undefined && technicalData.price_percentile_52w !== null) {
        const percentile = technicalData.price_percentile_52w;
        let interpretation = '';

        if (percentile >= 90) {
            interpretation = 'Near 52-week high - trading at upper end of annual range';
        } else if (percentile >= 70) {
            interpretation = 'Above middle of 52-week range';
        } else if (percentile >= 30) {
            interpretation = 'Mid-range within 52-week high and low';
        } else if (percentile >= 10) {
            interpretation = 'Below middle of 52-week range';
        } else {
            interpretation = 'Near 52-week low - trading at lower end of annual range';
        }

        indicators.push({
            name: '52-Week Position',
            value: `${percentile.toFixed(1)}th percentile`,
            interpretation: interpretation,
            category: 'Context'
        });
    }

    // 9. Relative Strength vs NIFTY (Benchmark Comparison)
    if (technicalData.relative_strength_vs_benchmark && 
        technicalData.relative_strength_vs_benchmark !== 'N/A') {
        const rs = technicalData.relative_strength_vs_benchmark;
        let interpretation = '';
        
        if (typeof rs === 'object' && rs['5D_relative_performance']) {
            const rsValue = parseFloat(rs['5D_relative_performance']);
            if (rsValue > 2) {
                interpretation = 'Significantly outperforming NIFTY index';
            } else if (rsValue > 0) {
                interpretation = 'Outperforming NIFTY index';
            } else if (rsValue > -2) {
                interpretation = 'Underperforming NIFTY index';
            } else {
                interpretation = 'Significantly underperforming NIFTY index';
            }

            indicators.push({
                name: 'Relative Strength (5D)',
                value: `${rsValue > 0 ? '+' : ''}${rsValue.toFixed(2)}%`,
                interpretation: interpretation,
                category: 'Context'
            });
        }
    }

    // 10. Futures Basis (Institutional Sentiment) - if available
    if (volatilityData.futures_spot_basis_percent && 
        volatilityData.futures_spot_basis_percent !== 'N/A') {
        const basis = volatilityData.futures_spot_basis_percent;
        const basisValue = parseFloat(basis);
        let interpretation = '';

        if (basisValue > 1) {
            interpretation = 'Futures trading at premium - institutional buying interest';
        } else if (basisValue > 0) {
            interpretation = 'Slight futures premium - normal contango';
        } else if (basisValue > -1) {
            interpretation = 'Slight futures discount - normal backwardation';
        } else {
            interpretation = 'Futures at significant discount - institutional selling pressure';
        }

        indicators.push({
            name: 'Futures-Spot Basis',
            value: basis,
            interpretation: interpretation,
            category: 'Sentiment'
        });
    }

    // If no indicators available, don't render the card
    if (indicators.length === 0) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-neutral-700">
                <Activity size={24} className="text-blue-600 dark:text-blue-400" />
                <div>
                    <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-100">Key Indicators</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current technical readings and neutral market observations</p>
                </div>
            </div>

            {/* Educational Note */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                    📊 <strong>Educational Note:</strong> These are raw technical indicator readings with neutral interpretations. 
                    They show what the market data says, not what you should do. Use these readings alongside other analysis 
                    sections to form your complete view.
                </p>
            </div>

            {/* Indicators Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-200 dark:border-neutral-700">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Indicator</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Current Value</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Interpretation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {indicators.map((indicator, index) => (
                            <tr 
                                key={index} 
                                className="border-b border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
                            >
                                <td className="py-4 px-4">
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{indicator.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{indicator.category}</div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-mono text-gray-900 dark:text-gray-100 font-semibold">
                                        {indicator.value}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {indicator.interpretation}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Note */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    Showing {indicators.length} indicators dynamically detected from available market data. 
                    Readings are current as of the analysis timestamp.
                </p>
            </div>
        </div>
    );
};

export default KeyIndicatorsCard;
