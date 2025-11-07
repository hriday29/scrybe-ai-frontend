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
import Card from '../ui/Card.jsx';
import InfoNote from '../ui/InfoNote.jsx';

const VolatilityCard = ({ volatilityData, analysisData }) => {
  if (!volatilityData || volatilityData.error) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Enhanced Volatility Analysis</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
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
      'green': 'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 border-success-200 dark:border-success-700',
      'yellow': 'bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-400 border-warning-200 dark:border-warning-700',
      'orange': 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-700',
      'red': 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700'
    };
    return colorMap[color] || colorMap['yellow'];
  };

  // Get ATR trend icon and color
  const getATRTrendDisplay = (trend) => {
    if (trend === "Rising") {
  return { icon: "↑", color: "text-red-600 dark:text-red-400", label: "Expanding" };
    } else if (trend === "Falling") {
  return { icon: "↓", color: "text-success-600 dark:text-success-400", label: "Contracting" };
    } else {
  return { icon: "→", color: "text-gray-600 dark:text-gray-400", label: "Stable" };
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
  <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Enhanced Volatility Analysis</h3>
        </div>
        {volatility_regime.classification && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRegimeColorClass(volatility_regime.color)}`}>
            {volatility_regime.classification} Volatility
          </span>
        )}
      </div>

      {/* Volatility Regime Summary */}
      {volatility_regime.advice && (
        <div className={`mb-4 p-3 rounded-lg border transition-colors ${getRegimeColorClass(volatility_regime.color)}`}>
          <p className="text-sm font-medium leading-relaxed">{volatility_regime.advice}</p>
        </div>
      )}

      {/* ATR Metrics Section */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary-500" />
          ATR-Based Volatility
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-50 dark:bg-neutral-900/30 p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
            <p className="text-xs text-gray-600">Current ATR</p>
            <p className="text-lg font-semibold text-gray-900">{formatPct(atr_metrics.current_atr_pct)}</p>
            <p className="text-xs text-gray-500">₹{atr_metrics.current_atr?.toFixed(2) || "N/A"}</p>
          </div>
          <div className="bg-gray-50 dark:bg-neutral-900/30 p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
            <p className="text-xs text-gray-600">ATR Trend (30D)</p>
            <p className={`text-lg font-semibold ${atrTrend.color}`}>
              {atrTrend.icon} {atrTrend.label}
            </p>
            <p className="text-xs text-gray-500">{atr_metrics.atr_trend_pct > 0 ? '+' : ''}{atr_metrics.atr_trend_pct?.toFixed(1)}%</p>
          </div>
          <div className="bg-gray-50 dark:bg-neutral-900/30 p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
            <p className="text-xs text-gray-600">ATR Percentile</p>
            <p className="text-lg font-semibold text-gray-900">{atr_metrics.atr_percentile_90d || "N/A"}th</p>
            <p className="text-xs text-gray-500">90-day range</p>
          </div>
          <div className="bg-gray-50 dark:bg-neutral-900/30 p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
            <p className="text-xs text-gray-600">Regime Score</p>
            <p className="text-lg font-semibold text-gray-900">{volatility_regime.score || "N/A"}/100</p>
            <p className="text-xs text-gray-500">{volatility_regime.classification}</p>
          </div>
        </div>
        {atr_metrics.interpretation && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">💡 {atr_metrics.interpretation}</p>
        )}
      </div>

      {/* Historical Volatility Section */}
      {(historical_volatility.volatility_10d || historical_volatility.volatility_30d || historical_volatility.volatility_90d) && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Historical Volatility (Annualized)</h4>
          <div className="grid grid-cols-3 gap-3">
            {historical_volatility.volatility_10d && (
              <div className="bg-gray-50 dark:bg-neutral-900/30 p-3 rounded-lg text-center border border-gray-200 dark:border-neutral-700">
                <p className="text-xs text-gray-600">10-Day</p>
                <p className="text-lg font-semibold text-gray-900">{historical_volatility.volatility_10d}%</p>
              </div>
            )}
            {historical_volatility.volatility_30d && (
              <div className="bg-gray-50 dark:bg-neutral-900/30 p-3 rounded-lg text-center border border-gray-200 dark:border-neutral-700">
                <p className="text-xs text-gray-600">30-Day</p>
                <p className="text-lg font-semibold text-gray-900">{historical_volatility.volatility_30d}%</p>
              </div>
            )}
            {historical_volatility.volatility_90d && (
              <div className="bg-gray-50 dark:bg-neutral-900/30 p-3 rounded-lg text-center border border-gray-200 dark:border-neutral-700">
                <p className="text-xs text-gray-600">90-Day</p>
                <p className="text-lg font-semibold text-gray-900">{historical_volatility.volatility_90d}%</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bollinger Band Analysis */}
      {bbw_metrics && !bbw_metrics.error && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Bollinger Band Analysis</h4>
          <div className="bg-gray-50 dark:bg-neutral-900/30 p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Band Width:</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{bbw_metrics.band_width_pct}%</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">State:</span>
              <span className={`text-sm font-semibold ${
                bbw_metrics.state === 'Squeeze' ? 'text-warning-700 dark:text-warning-400' :
                bbw_metrics.state === 'Expansion' ? 'text-red-600 dark:text-red-400' : 'text-success-700 dark:text-success-400'
              }`}>
                {bbw_metrics.state}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Price Position:</span>
              <span className="text-sm text-gray-900 dark:text-gray-100">{bbw_metrics.price_position}</span>
            </div>
            {bbw_metrics.interpretation && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">💡 {bbw_metrics.interpretation}</p>
            )}
          </div>
        </div>
      )}

      {/* Recommended Stop-Loss Zone */}
      {recommendedStop && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary-500" />
            Recommended Stop-Loss Zone
          </h4>
          <div className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">{recommendedStop.level}</span>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">₹{recommendedStop.price}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">Distance from Entry:</span>
              <span className="text-sm font-semibold text-warning-700 dark:text-warning-400">{recommendedStop.distance_pct}%</span>
            </div>
            <div className="border-t border-gray-200 dark:border-neutral-700 pt-2 mt-2">
              <p className="text-xs text-gray-600 dark:text-gray-400"><strong>Risk Profile:</strong> {recommendedStop.risk_profile}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">💡 {recommendedStop.implication}</p>
            </div>
          </div>
        </div>
      )}

      {/* All Stop-Loss Zones */}
      {stop_loss_zones && stop_loss_zones.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">All Stop-Loss Options</h4>
          <div className="space-y-2">
            {stop_loss_zones.map((zone, idx) => (
              <div 
                key={idx} 
                className={`p-2 rounded-lg border transition-colors ${
                  zone.level === recommendedStop?.level 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' 
                    : 'bg-gray-50 dark:bg-neutral-900/30 border-gray-200 dark:border-neutral-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">{zone.level}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">₹{zone.price}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({zone.distance_pct}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risk Warnings */}
      {risk_warnings && risk_warnings.length > 0 && (
        <div className="rounded-lg p-3 border bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <h4 className="text-sm font-semibold text-orange-700 dark:text-orange-400">Risk Factors</h4>
          </div>
          <ul className="space-y-1">
            {risk_warnings.map((warning, idx) => (
              <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <span className="flex-shrink-0">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <InfoNote className="mt-4" variant="info">
        Volatility metrics combine ATR trend, historical realized volatility and Bollinger Band dynamics.
        Expanding ATR often signals elevated risk; contracting volatility can precede breakout conditions.
      </InfoNote>
    </Card>
  );
};

export default VolatilityCard;
