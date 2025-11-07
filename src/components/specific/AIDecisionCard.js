import React from 'react';
import { TrendingUp, Brain, Activity, Shield } from 'lucide-react';

const AIDecisionCard = ({ analysisData }) => {
  if (!analysisData?.ai_analysis?.score_breakdown) {
    return null;
  }

  const breakdown = analysisData.ai_analysis.score_breakdown;
  const scrybeScore = analysisData.ai_analysis.scrybe_score || 0;
  const signal = analysisData.ai_analysis.signal || 'HOLD';

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
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBarColor = (score) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSignalColor = (signal) => {
    if (signal === 'BUY') return 'text-green-400';
    if (signal === 'SHORT') return 'text-red-400';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white backdrop-blur-sm rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Decision Breakdown</h3>
            <p className="text-sm text-gray-600">How we calculated the score</p>
          </div>
        </div>
        
        {/* Final Score Badge */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{Math.round(scrybeScore)}/100</div>
          <div className={`text-sm font-medium ${getSignalColor(signal)}`}>{signal}</div>
        </div>
      </div>

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
                  <span className="text-sm font-medium text-gray-300">{dimension.name}</span>
                </div>
                <span className={`text-lg font-semibold ${getScoreColor(dimension.score)}`}>
                  {Math.round(dimension.score)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full ${getBarColor(dimension.score)} transition-all duration-500 ease-out`}
                  style={{ width: `${dimension.score}%` }}
                />
              </div>

              {/* Reasoning */}
              <p className="text-xs text-gray-600 leading-relaxed pl-6">
                {dimension.reasoning}
              </p>
            </div>
          );
        })}
      </div>

      {/* Synthesis Explanation */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-blue-500/10 rounded-lg mt-0.5">
            <Brain className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-300 mb-1">Synthesis</div>
            <p className="text-xs text-gray-600 leading-relaxed">
              The final Scrybe Score of <span className="text-gray-900 font-medium">{Math.round(scrybeScore)}</span> is 
              a weighted synthesis of these four dimensions. 
              {scrybeScore >= 50 ? (
                <> Strong scores in {dimensions.filter(d => d.score >= 70).map(d => d.name.toLowerCase()).join(' and ')} 
                drive the positive rating.</>
              ) : (
                <> Weaker scores in {dimensions.filter(d => d.score < 40).map(d => d.name.toLowerCase()).join(' and ')} 
                limit the overall rating.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDecisionCard;
