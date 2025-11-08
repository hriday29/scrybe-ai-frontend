import React from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';

const MarketBreadthCard = ({ breadthData }) => {
  if (!breadthData) {
    return null;
  }

  const {
    advance_decline_ratio = 0,
    advancing_stocks = 0,
    declining_stocks = 0,
    new_highs_52w = 0,
    new_lows_52w = 0,
    high_low_ratio = 0,
    bullish_breadth_pct = 0,
    stocks_above_both_ma = 0,
    sector_rotation_strength = 'Neutral',
    total_stocks_analyzed = 0,
    market_health_score = 'Fair'
  } = breadthData;

  // Color coding for health score
  const getHealthColor = (health) => {
    const colors = {
      'Excellent': 'text-green-400 bg-green-500/10 border-green-500/30',
      'Good': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      'Fair': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      'Poor': 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      'Weak': 'text-red-400 bg-red-500/10 border-red-500/30'
    };
    return colors[health] || colors['Fair'];
  };

  // Color coding for A/D ratio
  const getADColor = (ratio) => {
    if (ratio > 1.5) return 'text-green-400';
    if (ratio > 1.0) return 'text-emerald-400';
    if (ratio > 0.7) return 'text-yellow-400';
    if (ratio > 0.5) return 'text-orange-400';
    return 'text-red-400';
  };

  // Color coding for rotation strength
  const getRotationColor = (strength) => {
    if (strength === 'Strong') return 'text-green-400 bg-green-500/10';
    if (strength === 'Neutral') return 'text-yellow-400 bg-yellow-500/10';
    return 'text-red-400 bg-red-500/10';
  };

  // Calculate percentage for A/D visual
  const adPercentage = Math.min((advance_decline_ratio / 3) * 100, 100);

  // Calculate percentage for bullish breadth bar
  const breadthBarWidth = bullish_breadth_pct;

  return (
    <div className="bg-white dark:bg-neutral-900 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Market Breadth Indicators</h3>
            <p className="text-sm text-gray-400">
              Analyzing {total_stocks_analyzed} stocks in the Smallcap 250 universe
            </p>
          </div>
        </div>

        {/* Market Health Badge */}
        <div className={`px-4 py-2 rounded-lg border ${getHealthColor(market_health_score)}`}>
          <div className="text-xs font-medium opacity-70">Market Health</div>
          <div className="text-lg font-bold">{market_health_score}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Advance/Decline Ratio */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Advance/Decline Ratio</span>
            </div>
            <span className={`text-xl font-bold ${getADColor(advance_decline_ratio)}`}>
              {advance_decline_ratio.toFixed(2)}
            </span>
          </div>

          {/* A/D Visual Bar */}
          <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                advance_decline_ratio > 1 ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${adPercentage}%` }}
            />
            <div className="absolute left-1/3 top-0 h-full w-0.5 bg-gray-600" />
            <div className="absolute left-2/3 top-0 h-full w-0.5 bg-gray-600" />
          </div>

          {/* A/D Details */}
          <div className="flex justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span>{advancing_stocks} advancing</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-red-400" />
              <span>{declining_stocks} declining</span>
            </div>
          </div>
        </div>

        {/* New Highs/Lows */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">52-Week Highs vs Lows</span>
            <span className={`text-xl font-bold ${getADColor(high_low_ratio)}`}>
              {high_low_ratio.toFixed(1)}x
            </span>
          </div>

          {/* Highs/Lows Comparison */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">New 52W Highs</span>
              <span className="text-sm font-semibold text-green-400">{new_highs_52w}</span>
            </div>
            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-500"
                style={{ width: `${Math.min((new_highs_52w / 50) * 100, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-400">New 52W Lows</span>
              <span className="text-sm font-semibold text-red-400">{new_lows_52w}</span>
            </div>
            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-red-500 transition-all duration-500"
                style={{ width: `${Math.min((new_lows_52w / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bullish Breadth Percentage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Bullish Breadth</span>
            <span className="text-xl font-bold text-gray-900">{bullish_breadth_pct.toFixed(1)}%</span>
          </div>

          <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                bullish_breadth_pct > 50 ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${breadthBarWidth}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span>{stocks_above_both_ma} stocks above 50 & 200 DMA</span>
            <span>{total_stocks_analyzed - stocks_above_both_ma} below</span>
          </div>
        </div>

        {/* Sector Rotation Strength */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Sector Rotation</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRotationColor(sector_rotation_strength)}`}>
              {sector_rotation_strength}
            </span>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-3 space-y-2">
            <div className="text-xs text-gray-400">
              {sector_rotation_strength === 'Strong' && (
                <>
                  <span className="text-green-400 font-medium">Strong rotation:</span> Many stocks hitting new highs
                  with few new lows. Healthy market with clear leadership.
                </>
              )}
              {sector_rotation_strength === 'Neutral' && (
                <>
                  <span className="text-yellow-400 font-medium">Neutral rotation:</span> Balanced distribution of
                  highs and lows. Market lacks clear direction.
                </>
              )}
              {sector_rotation_strength === 'Weak' && (
                <>
                  <span className="text-red-400 font-medium">Weak rotation:</span> More stocks hitting new lows than
                  highs. Deteriorating market breadth.
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Insight */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-purple-500/10 rounded-lg mt-0.5">
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-300 mb-1">What This Means</div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {advance_decline_ratio > 1.5 && bullish_breadth_pct > 60 ? (
                <>
                  <span className="text-green-400 font-medium">Bullish breadth:</span> Most stocks are trending up
                  with strong advance/decline ratio. This confirms the uptrend is broad-based and healthy.
                </>
              ) : advance_decline_ratio < 0.7 && bullish_breadth_pct < 40 ? (
                <>
                  <span className="text-red-400 font-medium">Weak breadth:</span> More stocks declining than
                  advancing. Even if indices look ok, internal health is deteriorating.
                </>
              ) : (
                <>
                  <span className="text-yellow-400 font-medium">Mixed breadth:</span> Market is selective with some
                  sectors strong while others weak. Focus on stock-specific opportunities.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketBreadthCard;
