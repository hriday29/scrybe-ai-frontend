/**
 * MomentumCard
 * Feature 8/15: Momentum Indicators Dashboard
 * 
 * Provides comprehensive momentum analysis including:
 * - Overall momentum score (0-100) with timing signal
 * - ADX-based trend strength classification
 * - MACD histogram trend analysis (building/fading)
 * - RSI analysis with divergence detection
 * - Volume momentum patterns
 * - Entry timing recommendations
 * 
 * Helps traders answer:
 * - Is now a good time to enter?
 * - Is momentum building or fading?
 * - Are multiple momentum factors aligned?
 * - What are the key momentum drivers?
 */

import React from 'react';
import { TrendingUp, Activity, Zap, BarChart3, CheckCircle, XCircle } from 'lucide-react';

const MomentumCard = ({ momentumData, analysisData }) => {
  if (!momentumData || momentumData.error) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-gray-900">Momentum Indicators Dashboard</h3>
        </div>
        <p className="text-gray-600">
          {momentumData?.error || "Momentum analysis not available"}
        </p>
      </div>
    );
  }

  const {
    adx_analysis = {},
    macd_analysis = {},
    rsi_analysis = {},
    volume_momentum = {},
    momentum_score = 0,
    timing_signal = {},
    momentum_factors = [],
    score_breakdown = {}
  } = momentumData;

  // Color coding for momentum score
  const getMomentumColor = (score) => {
    if (score >= 75) return 'text-green-400';
    if (score >= 60) return 'text-lime-400';
    if (score >= 40) return 'text-yellow-400';
    if (score >= 25) return 'text-orange-400';
    return 'text-red-400';
  };

  // Timing signal color and badge styling
  const getTimingSignalClass = (color) => {
    const colorMap = {
      'green': 'bg-green-500/20 text-green-400 border-green-500/50',
      'lightgreen': 'bg-lime-500/20 text-lime-400 border-lime-500/50',
      'yellow': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'orange': 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      'red': 'bg-red-500/20 text-red-400 border-red-500/50'
    };
    return colorMap[color] || colorMap['yellow'];
  };

  // Momentum score gauge visualization
  const getMomentumGaugeSegments = () => {
    const segments = [];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    
    for (let i = 0; i < 5; i++) {
      const threshold = i * 20;
      const isActive = momentum_score >= threshold;
      segments.push(
        <div
          key={i}
          className={`h-2 flex-1 rounded-full ${isActive ? colors[i] : 'bg-gray-100'} transition-all duration-300`}
        />
      );
    }
    return segments;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-gray-900">Momentum Indicators Dashboard</h3>
        </div>
        {timing_signal.signal && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTimingSignalClass(timing_signal.color)}`}>
            Timing: {timing_signal.signal}
          </span>
        )}
      </div>

      {/* Momentum Score & Gauge */}
      <div className="mb-4 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Overall Momentum Score</span>
          <span className={`text-3xl font-bold ${getMomentumColor(momentum_score)}`}>
            {momentum_score}/100
          </span>
        </div>
        <div className="flex gap-1 mb-3">
          {getMomentumGaugeSegments()}
        </div>
        {timing_signal.advice && (
          <p className="text-xs text-gray-300 italic">💡 {timing_signal.advice}</p>
        )}
      </div>

      {/* Momentum Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* ADX Analysis */}
        {adx_analysis && !adx_analysis.error && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-semibold text-gray-200">Trend Strength (ADX)</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Current ADX:</span>
                <span className="text-sm font-semibold text-gray-900">{adx_analysis.current_adx}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Strength:</span>
                <span className="text-sm font-semibold text-blue-400">{adx_analysis.strength}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Direction:</span>
                <span className={`text-sm font-semibold ${
                  adx_analysis.trend_direction === 'Bullish' ? 'text-green-400' :
                  adx_analysis.trend_direction === 'Bearish' ? 'text-red-400' : 'text-gray-600'
                }`}>
                  {adx_analysis.trend_direction}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Trend Status:</span>
                <span className="text-sm text-gray-300">{adx_analysis.adx_trend}</span>
              </div>
              {adx_analysis.interpretation && (
                <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-700">
                  {adx_analysis.interpretation}
                </p>
              )}
            </div>
          </div>
        )}

        {/* MACD Analysis */}
        {macd_analysis && !macd_analysis.error && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-gray-200">MACD Momentum</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Position:</span>
                <span className={`text-sm font-semibold ${
                  macd_analysis.position?.includes('Bullish') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {macd_analysis.position?.split(' ')[0]}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Histogram:</span>
                <span className={`text-sm font-semibold ${
                  macd_analysis.histogram_trend?.includes('Building') ? 'text-green-400' :
                  macd_analysis.histogram_trend?.includes('Fading') ? 'text-red-400' : 'text-gray-600'
                }`}>
                  {macd_analysis.histogram_trend}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Crossover:</span>
                <span className={`text-xs ${
                  macd_analysis.recent_crossover?.includes('Bullish') ? 'text-green-400' :
                  macd_analysis.recent_crossover?.includes('Bearish') ? 'text-red-400' : 'text-gray-600'
                }`}>
                  {macd_analysis.recent_crossover}
                </span>
              </div>
              {macd_analysis.interpretation && (
                <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-700">
                  {macd_analysis.interpretation}
                </p>
              )}
            </div>
          </div>
        )}

        {/* RSI Analysis */}
        {rsi_analysis && !rsi_analysis.error && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-green-400" />
              <h4 className="text-sm font-semibold text-gray-200">RSI Analysis</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Current RSI:</span>
                <span className="text-sm font-semibold text-gray-900">{rsi_analysis.current_rsi}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Zone:</span>
                <span className={`text-xs font-semibold ${
                  rsi_analysis.zone?.includes('Overbought') ? 'text-red-400' :
                  rsi_analysis.zone?.includes('Oversold') ? 'text-green-400' :
                  rsi_analysis.zone?.includes('Strong') ? 'text-lime-400' : 'text-gray-600'
                }`}>
                  {rsi_analysis.zone}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Trend:</span>
                <span className={`text-sm ${
                  rsi_analysis.trend === 'Rising' ? 'text-green-400' :
                  rsi_analysis.trend === 'Falling' ? 'text-red-400' : 'text-gray-600'
                }`}>
                  {rsi_analysis.trend}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Divergence:</span>
                <span className={`text-xs ${
                  rsi_analysis.divergence?.includes('Bullish') ? 'text-green-400' :
                  rsi_analysis.divergence?.includes('Bearish') ? 'text-red-400' : 'text-gray-600'
                }`}>
                  {rsi_analysis.divergence}
                </span>
              </div>
              {rsi_analysis.interpretation && (
                <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-700">
                  {rsi_analysis.interpretation}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Volume Momentum */}
        {volume_momentum && !volume_momentum.error && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-orange-400" />
              <h4 className="text-sm font-semibold text-gray-200">Volume Momentum</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Current:</span>
                <span className="text-sm font-semibold text-gray-900">{volume_momentum.current_volume}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">20D Avg:</span>
                <span className="text-sm text-gray-300">{volume_momentum['20d_avg_volume']}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Ratio:</span>
                <span className={`text-sm font-semibold ${
                  volume_momentum.volume_ratio >= 1.5 ? 'text-green-400' :
                  volume_momentum.volume_ratio >= 1.2 ? 'text-lime-400' :
                  volume_momentum.volume_ratio >= 0.8 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {volume_momentum.volume_ratio}x
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">State:</span>
                <span className="text-xs text-gray-300">{volume_momentum.state}</span>
              </div>
              {volume_momentum.interpretation && (
                <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-700">
                  {volume_momentum.interpretation}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Score Breakdown */}
      {score_breakdown && (
        <div className="mb-4 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
          <h4 className="text-xs font-semibold text-gray-300 mb-2">Score Breakdown</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <div className="text-center">
              <p className="text-xs text-gray-600">ADX</p>
              <p className="text-sm font-semibold text-blue-400">{score_breakdown.adx_score || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">MACD</p>
              <p className="text-sm font-semibold text-purple-400">{score_breakdown.macd_score || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">RSI</p>
              <p className="text-sm font-semibold text-green-400">{score_breakdown.rsi_score || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Volume</p>
              <p className="text-sm font-semibold text-orange-400">{score_breakdown.volume_score || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Total</p>
              <p className="text-sm font-semibold text-gray-900">{score_breakdown.total || 0}</p>
            </div>
          </div>
        </div>
      )}

      {/* Momentum Factors */}
      {momentum_factors && momentum_factors.length > 0 && (
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-4 border border-blue-700/30">
          <h4 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            Key Momentum Factors
          </h4>
          <div className="space-y-1.5">
            {momentum_factors.map((factor, idx) => (
              <div key={idx} className="flex items-start gap-2">
                {factor.startsWith('✅') ? (
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                )}
                <span className={`text-xs ${
                  factor.startsWith('✅') ? 'text-gray-200' : 'text-gray-600'
                }`}>
                  {factor.replace('✅ ', '').replace('⚠️ ', '')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentumCard;
