/**
 * VolatilityCard
 * Feature 7/15: Enhanced Volatility Analysis Dashboard
 * 
 * Provides comprehensive volatility insights including:
 * - Volatility regime classification (Low/Normal/High/Extreme)
 * - ATR trend analysis (expanding/contracting volatility)
 * - Historical volatility metrics (10D, 30D, 90D)
 * - Stop-loss zone recommendations with risk implications
 * - Bollinger Band squeeze/expansion detection
 * - Risk warnings for elevated volatility periods
 * 
 * Helps traders understand:
 * - How volatile is this stock right now?
 * - Is volatility increasing (danger) or decreasing (opportunity)?
 * - What stop-loss distance makes sense?
 * - What are the risk implications of current volatility?
 */

import React from 'react';
import { TrendingUp, AlertTriangle, Activity, Target } from 'lucide-react';

const VolatilityCard = ({ volatilityData, analysisData }) => {
  if (!volatilityData || volatilityData.error) {
    return (
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Enhanced Volatility Analysis</h3>
        </div>
        <p className="text-gray-400">
          {volatilityData?.error || "Volatility analysis not available"}
        </p>
      </div>
    );
  }

  const { 
    atr_metrics = {}, 
    bbw_metrics = {}, 
    historical_volatility = {}, 
    stop_loss_zones = [],
    volatility_regime = {},
    risk_warnings = []
  } = volatilityData;

  // Color coding for volatility regime
  const getRegimeColorClass = (color) => {
    const colorMap = {
      'green': 'bg-green-500/20 text-green-400 border-green-500/50',
      'yellow': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'orange': 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      'red': 'bg-red-500/20 text-red-400 border-red-500/50'
    };
    return colorMap[color] || colorMap['yellow'];
  };

  // Get ATR trend icon and color
  const getATRTrendDisplay = (trend) => {
    if (trend === "Rising") {
      return { icon: "↑", color: "text-red-400", label: "Expanding" };
    } else if (trend === "Falling") {
      return { icon: "↓", color: "text-green-400", label: "Contracting" };
    } else {
      return { icon: "→", color: "text-gray-400", label: "Stable" };
    }
  };

  const atrTrend = getATRTrendDisplay(atr_metrics.atr_trend);

  // Format percentage safely
  const formatPct = (value) => {
    if (value === null || value === undefined) return "N/A";
    return typeof value === 'number' ? `${value.toFixed(2)}%` : value;
  };

  // Determine stop-loss zone recommendation based on regime
  const getRecommendedStopZone = () => {
    if (volatility_regime.classification === "Low") {
      return stop_loss_zones.find(z => z.level.includes("Tight")) || stop_loss_zones[0];
    } else if (volatility_regime.classification === "High" || volatility_regime.classification === "Extreme") {
      return stop_loss_zones.find(z => z.level.includes("Wide")) || stop_loss_zones[stop_loss_zones.length - 1];
    } else {
      return stop_loss_zones.find(z => z.level.includes("Normal")) || stop_loss_zones[1];
    }
  };

  const recommendedStop = getRecommendedStopZone();

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Enhanced Volatility Analysis</h3>
        </div>
        {volatility_regime.classification && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRegimeColorClass(volatility_regime.color)}`}>
            {volatility_regime.classification} Volatility
          </span>
        )}
      </div>

      {/* Volatility Regime Summary */}
      {volatility_regime.advice && (
        <div className={`mb-4 p-3 rounded-lg border ${getRegimeColorClass(volatility_regime.color)}`}>
          <p className="text-sm font-medium">{volatility_regime.advice}</p>
        </div>
      )}

      {/* ATR Metrics Section */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          ATR-Based Volatility
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-900/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400">Current ATR</p>
            <p className="text-lg font-semibold text-white">{formatPct(atr_metrics.current_atr_pct)}</p>
            <p className="text-xs text-gray-500">₹{atr_metrics.current_atr?.toFixed(2) || "N/A"}</p>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400">ATR Trend (30D)</p>
            <p className={`text-lg font-semibold ${atrTrend.color}`}>
              {atrTrend.icon} {atrTrend.label}
            </p>
            <p className="text-xs text-gray-500">{atr_metrics.atr_trend_pct > 0 ? '+' : ''}{atr_metrics.atr_trend_pct?.toFixed(1)}%</p>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400">ATR Percentile</p>
            <p className="text-lg font-semibold text-white">{atr_metrics.atr_percentile_90d || "N/A"}th</p>
            <p className="text-xs text-gray-500">90-day range</p>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400">Regime Score</p>
            <p className="text-lg font-semibold text-white">{volatility_regime.score || "N/A"}/100</p>
            <p className="text-xs text-gray-500">{volatility_regime.classification}</p>
          </div>
        </div>
        {atr_metrics.interpretation && (
          <p className="text-xs text-gray-400 mt-2 italic">💡 {atr_metrics.interpretation}</p>
        )}
      </div>

      {/* Historical Volatility Section */}
      {(historical_volatility.volatility_10d || historical_volatility.volatility_30d || historical_volatility.volatility_90d) && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Historical Volatility (Annualized)</h4>
          <div className="grid grid-cols-3 gap-3">
            {historical_volatility.volatility_10d && (
              <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-400">10-Day</p>
                <p className="text-lg font-semibold text-white">{historical_volatility.volatility_10d}%</p>
              </div>
            )}
            {historical_volatility.volatility_30d && (
              <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-400">30-Day</p>
                <p className="text-lg font-semibold text-white">{historical_volatility.volatility_30d}%</p>
              </div>
            )}
            {historical_volatility.volatility_90d && (
              <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-400">90-Day</p>
                <p className="text-lg font-semibold text-white">{historical_volatility.volatility_90d}%</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bollinger Band Analysis */}
      {bbw_metrics && !bbw_metrics.error && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Bollinger Band Analysis</h4>
          <div className="bg-gray-900/50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Band Width:</span>
              <span className="text-sm font-semibold text-white">{bbw_metrics.band_width_pct}%</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">State:</span>
              <span className={`text-sm font-semibold ${
                bbw_metrics.state === 'Squeeze' ? 'text-yellow-400' :
                bbw_metrics.state === 'Expansion' ? 'text-red-400' : 'text-green-400'
              }`}>
                {bbw_metrics.state}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Price Position:</span>
              <span className="text-sm text-white">{bbw_metrics.price_position}</span>
            </div>
            {bbw_metrics.interpretation && (
              <p className="text-xs text-gray-400 mt-2 italic">💡 {bbw_metrics.interpretation}</p>
            )}
          </div>
        </div>
      )}

      {/* Recommended Stop-Loss Zone */}
      {recommendedStop && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Recommended Stop-Loss Zone
          </h4>
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg border border-blue-700/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">{recommendedStop.level}</span>
              <span className="text-xl font-bold text-white">₹{recommendedStop.price}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Distance from Entry:</span>
              <span className="text-sm font-semibold text-yellow-400">{recommendedStop.distance_pct}%</span>
            </div>
            <div className="border-t border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-400"><strong>Risk Profile:</strong> {recommendedStop.risk_profile}</p>
              <p className="text-xs text-gray-400 mt-1">💡 {recommendedStop.implication}</p>
            </div>
          </div>
        </div>
      )}

      {/* All Stop-Loss Zones */}
      {stop_loss_zones && stop_loss_zones.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">All Stop-Loss Options</h4>
          <div className="space-y-2">
            {stop_loss_zones.map((zone, idx) => (
              <div 
                key={idx} 
                className={`p-2 rounded-lg border ${
                  zone.level === recommendedStop?.level 
                    ? 'bg-blue-900/20 border-blue-600/50' 
                    : 'bg-gray-900/30 border-gray-700/30'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-300">{zone.level}</span>
                  <span className="text-sm font-semibold text-white">₹{zone.price}</span>
                  <span className="text-xs text-gray-400">({zone.distance_pct}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risk Warnings */}
      {risk_warnings && risk_warnings.length > 0 && (
        <div className="bg-orange-900/20 border border-orange-600/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <h4 className="text-sm font-semibold text-orange-300">Risk Factors</h4>
          </div>
          <ul className="space-y-1">
            {risk_warnings.map((warning, idx) => (
              <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                <span className="flex-shrink-0">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VolatilityCard;
