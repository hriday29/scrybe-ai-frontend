// src/components/specific/FundamentalSnapshotCard.js
/**
 * FundamentalSnapshotCard
 * 
 * Displays fundamental metrics in tile format for quick assessment.
 * Dynamically detects available fundamentals from backend data.
 * 
 * Props:
 * - analysisData: Full analysis object containing fundamental_proxy_analysis
 * 
 * Features:
 * - Valuation metrics (PE ratios, P/B)
 * - Profitability metrics (margins, ROE)
 * - Growth metrics (revenue, earnings)
 * - Debt metrics (debt-to-equity)
 * - Ownership metrics (insider, institutional)
 * - Quality score (0-100 calculated by backend)
 * - Market cap
 * - Dynamic field detection
 */

import React from 'react';
import { TrendingUp, Users, BarChart3, Shield, Award, Building2 } from 'lucide-react';

const FundamentalSnapshotCard = ({ analysisData }) => {
    if (!analysisData) return null;

    const fundamentals = analysisData.fundamental_proxy_analysis || {};
    
    // Check if fundamentals data exists
    if (!fundamentals || Object.keys(fundamentals).length === 0) {
        return null;
    }

    // Helper to format numbers
    const formatNumber = (num, decimals = 2) => {
        if (num === null || num === undefined) return 'N/A';
        if (typeof num === 'string') return num;
        if (num >= 1e12) return `₹${(num / 1e12).toFixed(1)}T`;
        if (num >= 1e9) return `₹${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e7) return `₹${(num / 1e7).toFixed(1)}Cr`;
        return num.toFixed(decimals);
    };

    const formatPercentage = (num, decimals = 1) => {
        if (num === null || num === undefined) return 'N/A';
        return `${(num * 100).toFixed(decimals)}%`;
    };

    // Tile component for each metric
    const MetricTile = ({ icon: Icon, label, value, subValue, colorClass, bgClass }) => (
        <div className={`${bgClass} border border-gray-200 dark:border-neutral-700 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200`}>
            <div className="flex items-start justify-between mb-2">
                <Icon size={20} className={colorClass} />
                <span className={`text-xs font-medium ${colorClass}`}>{label}</span>
            </div>
            <div className="mt-2">
                <p className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">{value}</p>
                {subValue && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{subValue}</p>
                )}
            </div>
        </div>
    );

    // Quality score badge
    const getQualityScoreColor = (score) => {
        if (score >= 80) return { text: 'text-green-700 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/20', border: 'border-green-300 dark:border-green-700' };
        if (score >= 60) return { text: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/20', border: 'border-blue-300 dark:border-blue-700' };
        if (score >= 40) return { text: 'text-yellow-700 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/20', border: 'border-yellow-300 dark:border-yellow-700' };
        return { text: 'text-red-700 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/20', border: 'border-red-300 dark:border-red-700' };
    };

    const qualityScore = fundamentals.quality_score;
    const qualityColors = qualityScore ? getQualityScoreColor(qualityScore) : null;

    return (
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex items-center gap-3">
                    <BarChart3 size={24} className="text-indigo-600 dark:text-indigo-400" />
                    <div>
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-100">Fundamental Snapshot</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Key financial metrics at a glance</p>
                    </div>
                </div>
                
                {/* Quality Score Badge */}
                {qualityScore !== null && qualityScore !== undefined && qualityColors && (
                    <div className={`${qualityColors.bg} ${qualityColors.border} border-2 rounded-xl px-4 py-2`}>
                        <div className="flex items-center gap-2">
                            <Award size={20} className={qualityColors.text} />
                            <div>
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Quality Score</p>
                                <p className={`text-2xl font-bold ${qualityColors.text}`}>{qualityScore?.toFixed(0)}/100</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Educational Note */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">
                    📊 <strong>Educational Note:</strong> These are fundamental metrics from the company's financial statements 
                    and market data. They provide context about valuation, profitability, and financial health. 
                    Numbers are sourced from yfinance and calculated by Scrybe AI's quality scoring algorithm.
                </p>
            </div>

            {/* Market Cap (Full Width) */}
            {fundamentals.marketCap && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Building2 size={32} className="text-indigo-600 dark:text-indigo-400" />
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Capitalization</p>
                                <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                                    {formatNumber(fundamentals.marketCap)}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-600 dark:text-gray-400">Company Size</p>
                            <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">
                                {fundamentals.marketCap >= 2e12 ? 'Large Cap' : 
                                 fundamentals.marketCap >= 5e11 ? 'Mid Cap' : 'Small Cap'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Valuation Metrics */}
                {fundamentals.trailingPE && (
                    <MetricTile
                        icon={TrendingUp}
                        label="Trailing P/E"
                        value={fundamentals.trailingPE?.toFixed(2)}
                        subValue="Price-to-Earnings (TTM)"
                        colorClass="text-blue-600 dark:text-blue-400"
                        bgClass="bg-blue-50 dark:bg-blue-900/10"
                    />
                )}

                {fundamentals.forwardPE && (
                    <MetricTile
                        icon={TrendingUp}
                        label="Forward P/E"
                        value={fundamentals.forwardPE?.toFixed(2)}
                        subValue="Expected P/E (Next 12M)"
                        colorClass="text-blue-600 dark:text-blue-400"
                        bgClass="bg-blue-50 dark:bg-blue-900/10"
                    />
                )}

                {fundamentals.priceToBook && (
                    <MetricTile
                        icon={BarChart3}
                        label="Price-to-Book"
                        value={fundamentals.priceToBook?.toFixed(2)}
                        subValue="P/B Ratio"
                        colorClass="text-purple-600 dark:text-purple-400"
                        bgClass="bg-purple-50 dark:bg-purple-900/10"
                    />
                )}

                {/* Profitability Metrics */}
                {fundamentals.profitMargins !== null && fundamentals.profitMargins !== undefined && (
                    <MetricTile
                        icon={Award}
                        label="Profit Margin"
                        value={formatPercentage(fundamentals.profitMargins)}
                        subValue="Net Profit Margin"
                        colorClass="text-green-600 dark:text-green-400"
                        bgClass="bg-green-50 dark:bg-green-900/10"
                    />
                )}

                {fundamentals.returnOnEquity !== null && fundamentals.returnOnEquity !== undefined && (
                    <MetricTile
                        icon={TrendingUp}
                        label="ROE"
                        value={formatPercentage(fundamentals.returnOnEquity)}
                        subValue="Return on Equity"
                        colorClass="text-green-600 dark:text-green-400"
                        bgClass="bg-green-50 dark:bg-green-900/10"
                    />
                )}

                {/* Growth Metrics */}
                {fundamentals.revenueGrowth !== null && fundamentals.revenueGrowth !== undefined && (
                    <MetricTile
                        icon={BarChart3}
                        label="Revenue Growth"
                        value={formatPercentage(fundamentals.revenueGrowth)}
                        subValue="YoY Revenue Growth"
                        colorClass="text-teal-600 dark:text-teal-400"
                        bgClass="bg-teal-50 dark:bg-teal-900/10"
                    />
                )}

                {fundamentals.earningsGrowth !== null && fundamentals.earningsGrowth !== undefined && (
                    <MetricTile
                        icon={TrendingUp}
                        label="Earnings Growth"
                        value={formatPercentage(fundamentals.earningsGrowth)}
                        subValue="YoY Earnings Growth"
                        colorClass="text-teal-600 dark:text-teal-400"
                        bgClass="bg-teal-50 dark:bg-teal-900/10"
                    />
                )}

                {/* Debt Metrics */}
                {fundamentals.debtToEquity !== null && fundamentals.debtToEquity !== undefined && (
                    <MetricTile
                        icon={Shield}
                        label="Debt-to-Equity"
                        value={fundamentals.debtToEquity?.toFixed(2)}
                        subValue="Leverage Ratio"
                        colorClass="text-orange-600 dark:text-orange-400"
                        bgClass="bg-orange-50 dark:bg-orange-900/10"
                    />
                )}

                {/* Ownership Metrics */}
                {fundamentals.heldPercentInsiders !== null && fundamentals.heldPercentInsiders !== undefined && (
                    <MetricTile
                        icon={Users}
                        label="Insider Holdings"
                        value={formatPercentage(fundamentals.heldPercentInsiders)}
                        subValue="% Held by Insiders"
                        colorClass="text-pink-600 dark:text-pink-400"
                        bgClass="bg-pink-50 dark:bg-pink-900/10"
                    />
                )}

                {fundamentals.heldPercentInstitutions !== null && fundamentals.heldPercentInstitutions !== undefined && (
                    <MetricTile
                        icon={Users}
                        label="Institutional Holdings"
                        value={formatPercentage(fundamentals.heldPercentInstitutions)}
                        subValue="% Held by Institutions"
                        colorClass="text-pink-600 dark:text-pink-400"
                        bgClass="bg-pink-50 dark:bg-pink-900/10"
                    />
                )}
            </div>

            {/* Quality Score Explanation */}
            {qualityScore !== null && qualityScore !== undefined && (
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Quality Score Methodology</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        The Quality Score (0-100) is calculated by Scrybe AI's algorithm based on 8 fundamental factors: 
                        ROE, Profit Margins, Debt-to-Equity, PE Ratio, Earnings Growth, Revenue Growth, 
                        Institutional Ownership, and Insider Holdings. Higher scores indicate stronger fundamentals 
                        across multiple dimensions. This is not a buy/sell recommendation.
                    </p>
                </div>
            )}

            {/* Data Source */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    Data sourced from Yahoo Finance • Updated during daily fundamentals refresh • 
                    Metrics may be unavailable for some stocks
                </p>
            </div>
        </div>
    );
};

export default FundamentalSnapshotCard;
