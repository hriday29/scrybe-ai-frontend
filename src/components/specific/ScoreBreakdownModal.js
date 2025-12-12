import React from 'react';
import { TrendingUp, Brain, Activity, Shield, Info } from 'lucide-react';
import Modal from '../ui/Modal';

/**
 * ScoreBreakdownModal - Display detailed AI scoring breakdown
 * Shows the 4 dimensional scores (technical, fundamental, momentum, risk) with reasoning
 */
const ScoreBreakdownModal = ({ isOpen, onClose, scoreBreakdown, signal, scrybeScore }) => {
  if (!scoreBreakdown) return null;

  const dimensions = [
    {
      name: 'Technical',
      score: scoreBreakdown.technical_score || 0,
      reasoning: scoreBreakdown.technical_reasoning || 'No reasoning provided',
      icon: TrendingUp,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-700 dark:text-blue-300',
    },
    {
      name: 'Fundamental',
      score: scoreBreakdown.fundamental_score || 0,
      reasoning: scoreBreakdown.fundamental_reasoning || 'No reasoning provided',
      icon: Brain,
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      borderColor: 'border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-700 dark:text-purple-300',
    },
    {
      name: 'Momentum',
      score: scoreBreakdown.momentum_score || 0,
      reasoning: scoreBreakdown.momentum_reasoning || 'No reasoning provided',
      icon: Activity,
      color: 'orange',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      borderColor: 'border-orange-200 dark:border-orange-800',
      textColor: 'text-orange-700 dark:text-orange-300',
    },
    {
      name: 'Risk Safety',
      score: scoreBreakdown.risk_score || 0,
      reasoning: scoreBreakdown.risk_reasoning || 'No reasoning provided',
      icon: Shield,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-700 dark:text-green-300',
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

  const getSignalColor = () => {
    if (signal === 'BUY') return 'text-green-600 dark:text-green-400';
    if (signal === 'SHORT') return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <Modal open={isOpen} onClose={onClose} maxWidth="max-w-3xl" showClose={true}>
      <div className="relative max-h-[80vh] overflow-y-auto pr-8">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-neutral-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            AI Score Breakdown
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Understanding how our AI arrived at this decision
          </p>
        </div>

        {/* Final Score & Signal */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">Final Scrybe Score</p>
              <p className={`text-4xl font-bold ${getScoreColor(Math.abs(scrybeScore || 0))}`}>
                {scrybeScore || 0}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">Signal</p>
              <p className={`text-3xl font-bold ${getSignalColor()}`}>
                {signal || 'HOLD'}
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">How to Read This</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Each dimension is scored 0-100. Higher scores indicate stronger confidence in that area. 
              The AI weighs these dimensions together (not a simple average) to arrive at the final Scrybe Score.
            </p>
          </div>
        </div>

        {/* Score Dimensions */}
        <div className="space-y-4">
          {dimensions.map((dim, index) => {
            const Icon = dim.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${dim.bgColor} ${dim.borderColor}`}
              >
                {/* Dimension Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-white dark:bg-neutral-800`}>
                      <Icon className={`w-5 h-5 ${dim.textColor}`} />
                    </div>
                    <span className={`font-bold text-lg ${dim.textColor}`}>{dim.name}</span>
                  </div>
                  <span className={`text-2xl font-bold ${getScoreColor(dim.score)}`}>
                    {dim.score}/100
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3 bg-gray-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${getBarColor(dim.score)} transition-all duration-500`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>

                {/* Reasoning */}
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-gray-200 dark:border-neutral-700">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Reasoning
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {dim.reasoning}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            💡 This breakdown provides transparency into our AI's decision-making process. 
            Use it to understand the strengths and weaknesses of each trade setup.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ScoreBreakdownModal;
