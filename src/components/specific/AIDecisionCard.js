import React from 'react';
import { TrendingUp, Brain, Activity, Shield, AlertCircle, Info } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

/**
 * AIDecisionCard - Display AI analysis with signal preservation awareness
 * 
 * SIGNAL PRESERVATION: This component now understands whether signals come from
 * entry time (for open trades) or current analysis (for closed/new opportunities).
 * 
 * Props:
 * - analysisData: Complete analysis object with signal_source flag
 * - hasActiveTrade: Boolean indicating if position is open
 * - activeTrade: Active trade object (if hasActiveTrade=true) with entry metrics
 */

const AIDecisionCard = ({ analysisData, hasActiveTrade = false, activeTrade = null }) => {
  if (!analysisData?.ai_analysis?.score_breakdown) {
    return null;
  }

  const breakdown = analysisData.ai_analysis.score_breakdown;
  
  // SIGNAL PRESERVATION: Determine signal source (entry vs current)
  const signalSource = analysisData.signal_source || 'CURRENT';
  const isOpenTrade = hasActiveTrade === true && activeTrade;
  
  // For open trades, show entry signal + entry metrics
  const scrybeScore = isOpenTrade 
    ? (activeTrade?.entry_date_score ?? analysisData.ai_analysis.scrybe_score ?? 0)
    : (analysisData.ai_analysis.scrybe_score ?? 0);
  
  const signal = isOpenTrade
    ? (activeTrade?.signal ?? analysisData.ai_analysis.signal ?? 'HOLD')
    : (analysisData.ai_analysis.signal ?? 'HOLD');
  
  const signalReason = isOpenTrade
    ? activeTrade?.entry_signal_reason
    : analysisData.ai_analysis.signal_reason;

  const dimensions = [
    {
      name: 'Technical',
      score: breakdown.technical_score || 0,
      reasoning: breakdown.technical_reasoning || 'No reasoning provided',
      icon: TrendingUp,
      color: 'blue',
    },
    {
      name: 'Fundamental',
      score: breakdown.fundamental_score || 0,
      reasoning: breakdown.fundamental_reasoning || 'No reasoning provided',
      icon: Brain,
      color: 'purple',
    },
    {
      name: 'Momentum',
      score: breakdown.momentum_score || 0,
      reasoning: breakdown.momentum_reasoning || 'No reasoning provided',
      icon: Activity,
      color: 'orange',
    },
    {
      name: 'Risk Safety',
      score: breakdown.risk_score || 0,
      reasoning: breakdown.risk_reasoning || 'No reasoning provided',
      icon: Shield,
      color: 'green',
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600 dark:text-green-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getBarColor = (score) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSignalColor = (signal, isEntry = false) => {
    if (isEntry) {
      // Entry signals: Green for BUY, Red for SHORT
      if (signal === 'BUY') return 'text-green-600 dark:text-green-400';
      if (signal === 'SHORT') return 'text-red-600 dark:text-red-400';
      return 'text-gray-600 dark:text-gray-400';
    }
    // Current signals: muted colors
    if (signal === 'BUY') return 'text-green-500/70 dark:text-green-300/70';
    if (signal === 'SHORT') return 'text-red-500/70 dark:text-red-300/70';
    return 'text-gray-500/70 dark:text-gray-400/70';
  };

  const getSignalBadgeClass = (source) => {
    if (source === 'ENTRY') {
      return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800';
    }
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
  };

  return (
    <div className="bg-white dark:bg-neutral-900 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
      {/* Header with Signal Source Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-purple-500/10 dark:bg-purple-900/20 rounded-lg">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {isOpenTrade ? 'Entry Signal Analysis' : 'AI Decision Breakdown'}
              </h3>
              {/* SIGNAL SOURCE BADGE */}
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getSignalBadgeClass(signalSource)}`}>
                {signalSource === 'ENTRY' ? (
                  <>
                    <span className="w-2 h-2 bg-current rounded-full"></span>
                    Entry ({activeTrade?.entry_date ? formatDate(activeTrade.entry_date) : 'N/A'})
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-current rounded-full"></span>
                    Current
                  </>
                )}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isOpenTrade 
                ? 'Analysis at entry time - preserved across daily updates'
                : 'How we calculated the current score'}
            </p>
          </div>
        </div>
        
        {/* Final Score Badge */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Math.round(scrybeScore)}/100</div>
          <div className={`text-sm font-medium ${getSignalColor(signal, isOpenTrade)}`}>{signal}</div>
        </div>
      </div>

      {/* Show Signal Reason */}
      {signalReason && (
        <div className="mb-6 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 dark:text-blue-300">{signalReason}</p>
          </div>
        </div>
      )}

      {/* IF OPEN TRADE: Show entry metrics and current status reference */}
      {isOpenTrade && activeTrade && (
        <div className="mb-6 p-4 bg-green-50/50 dark:bg-green-900/20 rounded-lg border border-green-200/50 dark:border-green-800/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {activeTrade.entry_date_rank && (
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Entry Rank</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">#{activeTrade.entry_date_rank}</div>
              </div>
            )}
            {activeTrade.entry_price && (
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Entry Price</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">₹{activeTrade.entry_price.toFixed(2)}</div>
              </div>
            )}
            {activeTrade.target && (
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Target</div>
                <div className="text-sm font-semibold text-green-600 dark:text-green-400">₹{activeTrade.target.toFixed(2)}</div>
              </div>
            )}
            {activeTrade.stop_loss && (
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Stop Loss</div>
                <div className="text-sm font-semibold text-red-600 dark:text-red-400">₹{activeTrade.stop_loss.toFixed(2)}</div>
              </div>
            )}
          </div>
          
          {/* Current Status Reference */}
          {analysisData.current_analysis && (
            <div className="pt-3 border-t border-green-200/50 dark:border-green-800/50">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Current Status (Today)</span>
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Today's analysis: <span className="font-semibold">{analysisData.current_analysis.final_signal}</span> 
                {analysisData.current_analysis.scrybeScore !== undefined && (
                  <> (Score: {analysisData.current_analysis.scrybeScore})</>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Score Dimensions Grid */}
      <div className="space-y-5">
        {dimensions.map((dimension, index) => {
          const Icon = dimension.icon;
          return (
            <div key={index} className="space-y-2">
              {/* Dimension Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 text-${dimension.color}-400`} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{dimension.name}</span>
                </div>
                <span className={`text-lg font-semibold ${getScoreColor(dimension.score)}`}>
                  {Math.round(dimension.score)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full ${getBarColor(dimension.score)} transition-all duration-500 ease-out`}
                  style={{ width: `${dimension.score}%` }}
                />
              </div>

              {/* Reasoning */}
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-6">
                {dimension.reasoning}
              </p>
            </div>
          );
        })}
      </div>

      {/* Synthesis Explanation */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-700">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-blue-500/10 dark:bg-blue-900/20 rounded-lg mt-0.5">
            <Brain className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isOpenTrade ? 'Entry Synthesis' : 'Synthesis'}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {isOpenTrade ? (
                <>
                  The entry Scrybe Score of <span className="text-gray-900 dark:text-gray-100 font-medium">{Math.round(scrybeScore)}</span> was 
                  a weighted synthesis of these four dimensions at entry time. 
                  This signal is <span className="font-medium">preserved and not changed</span> by daily analysis updates.
                </>
              ) : (
                <>
                  The current Scrybe Score of <span className="text-gray-900 dark:text-gray-100 font-medium">{Math.round(scrybeScore)}</span> is 
                  a weighted synthesis of these four dimensions. 
                  {scrybeScore >= 50 ? (
                    <> Strong scores in {dimensions.filter(d => d.score >= 70).map(d => d.name.toLowerCase()).join(' and ')} 
                    drive the positive rating.</>
                  ) : (
                    <> Weaker scores in {dimensions.filter(d => d.score < 40).map(d => d.name.toLowerCase()).join(' and ')} 
                    limit the overall rating.</>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDecisionCard;
