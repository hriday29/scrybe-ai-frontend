// src/components/specific/AIObservationSummary.js
/**
 * AIObservationSummary
 * 
 * Displays a dynamic, AI-generated market observation summary that adapts to real-time data.
 * This is NOT a prediction or recommendation - it's a neutral analytical observation
 * of what the current market structure, indicators, and patterns are showing.
 * 
 * Props:
 * - analysisData: Full analysis object containing ai_analysis with market_observation_summary
 * 
 * Features:
 * - Dynamic AI-generated content (not templated or hardcoded)
 * - Neutral, observational tone (no predictions or advice)
 * - Adapts to changing market conditions
 * - Pulls insights from technical, fundamental, pattern, and volatility data
 * - Natural language interpretation
 */

import React from 'react';
import { Brain, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const AIObservationSummary = ({ analysisData }) => {
    if (!analysisData) return null;

    const aiAnalysis = analysisData.ai_analysis || {};
    const observationSummary = aiAnalysis.market_observation_summary;

    // If no observation summary available, don't render
    if (!observationSummary || observationSummary.trim() === '') {
        return null;
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 border-2 border-violet-200 dark:border-violet-800 rounded-xl p-6 shadow-lg"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-violet-200 dark:border-violet-700">
                <div className="relative">
                    <Brain size={28} className="text-violet-600 dark:text-violet-400" />
                    <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Activity size={14} className="text-violet-500 dark:text-violet-300" />
                    </motion.div>
                </div>
                <div>
                    <h2 className="font-bold text-2xl text-violet-900 dark:text-violet-100">
                        AI Market Observation
                    </h2>
                    <p className="text-sm text-violet-700 dark:text-violet-300">
                        Real-time analytical overview — What the data reveals right now
                    </p>
                </div>
            </div>

            {/* Educational Note */}
            <div className="bg-violet-100 dark:bg-violet-900/30 border border-violet-300 dark:border-violet-700 rounded-lg p-4 mb-5">
                <p className="text-sm text-violet-800 dark:text-violet-300 leading-relaxed">
                    🧠 <strong>What This Is:</strong> A dynamic, AI-generated analysis of current market structure, 
                    indicators, patterns, and positioning. This is <strong>observational only</strong> — describing what the data shows, 
                    not predicting future outcomes or recommending actions. The AI adapts this summary to real-time market conditions.
                </p>
            </div>

            {/* AI-Generated Observation */}
            <div className="bg-white dark:bg-violet-950/40 rounded-lg p-6 border border-violet-200 dark:border-violet-800">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400 animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                        <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200 font-medium">
                            {observationSummary}
                        </p>
                    </div>
                </div>
            </div>

            {/* Context Footer */}
            <div className="mt-5 pt-4 border-t border-violet-200 dark:border-violet-700">
                <div className="flex items-center justify-between text-xs text-violet-600 dark:text-violet-400">
                    <div className="flex items-center gap-2">
                        <Activity size={14} />
                        <span>Generated from live technical, fundamental, and pattern data</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span>Dynamic Analysis</span>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 pt-4 border-t border-violet-200 dark:border-violet-700">
                <p className="text-xs text-violet-700 dark:text-violet-400 text-center leading-relaxed">
                    <strong>Important:</strong> This observation describes current market structure only. 
                    It does not constitute investment advice, predictions, or recommendations. 
                    Markets change rapidly — use this as contextual information, not trading signals.
                </p>
            </div>
        </motion.div>
    );
};

export default AIObservationSummary;
