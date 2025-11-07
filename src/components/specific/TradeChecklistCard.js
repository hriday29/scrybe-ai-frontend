import React, { useState } from 'react';

const TradeChecklistCard = ({ checklistData }) => {
  const [expandedSteps, setExpandedSteps] = useState(false);

  if (!checklistData) {
    return (
      <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">📋 Trade Management Checklist</h3>
        <p className="text-gray-600 text-center py-8">No checklist data available</p>
      </div>
    );
  }

  if (checklistData.error) {
    return (
      <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">📋 Trade Management Checklist</h3>
        <p className="text-red-400 text-center py-8">Error generating checklist: {checklistData.error}</p>
      </div>
    );
  }

  const {
    checklist_items = [],
    readiness_score = 0,
    max_score = 100,
    recommendation = {},
    critical_issues = [],
    warnings = [],
    execution_steps = [],
    summary = {}
  } = checklistData;

  const { signal = 'Unknown', color = 'gray', advice = '' } = recommendation;

  // Status icon and color mapping
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'pass':
        return { icon: '✓', color: 'text-green-500', bg: 'bg-green-500/10' };
      case 'warning':
        return { icon: '⚠', color: 'text-orange-500', bg: 'bg-orange-500/10' };
      case 'fail':
        return { icon: '✗', color: 'text-red-500', bg: 'bg-red-500/10' };
      case 'unknown':
      default:
        return { icon: '?', color: 'text-gray-500', bg: 'bg-gray-500/10' };
    }
  };

  // Recommendation color mapping
  const getRecommendationColor = (color) => {
    switch (color) {
      case 'green':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'yellow':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'orange':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'red':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-600 border-gray-500/50';
    }
  };

  // Score gauge color
  const getScoreColor = () => {
    if (readiness_score >= 80) return 'text-green-400';
    if (readiness_score >= 65) return 'text-yellow-400';
    if (readiness_score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">📋 Trade Management Checklist</h3>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor()}`}>
            {readiness_score}/{max_score}
          </div>
          <div className="text-xs text-gray-600">Readiness Score</div>
        </div>
      </div>

      {/* Recommendation Banner */}
      <div className={`rounded-lg p-4 mb-6 border ${getRecommendationColor(color)}`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {signal === 'Go' && '🟢'}
            {signal === 'Caution' && '🟡'}
            {signal === 'No-Go' && '🔴'}
            {signal === 'Unknown' && '⚪'}
          </div>
          <div>
            <div className="font-bold text-lg">{signal}</div>
            <div className="text-sm opacity-90">{advice}</div>
          </div>
        </div>
      </div>

      {/* Critical Issues */}
      {critical_issues && critical_issues.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-4">
          <div className="font-semibold text-red-400 mb-2 flex items-center gap-2">
            <span>🚫</span> Critical Issues (Entry Blocked)
          </div>
          <ul className="space-y-1 text-sm">
            {critical_issues.map((issue, idx) => (
              <li key={idx} className="text-red-300">• {issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/50 rounded-lg p-4 mb-4">
          <div className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
            <span>⚠️</span> Warnings (Proceed with Caution)
          </div>
          <ul className="space-y-1 text-sm">
            {warnings.map((warning, idx) => (
              <li key={idx} className="text-orange-300">• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Checklist Items Grid */}
      <div className="space-y-3 mb-6">
        <div className="text-sm font-semibold text-gray-600 mb-3">Pre-Trade Validation:</div>
        {checklist_items && checklist_items.map((item, idx) => {
          const statusDisplay = getStatusDisplay(item.status);
          return (
            <div key={idx} className={`rounded-lg p-3 border ${statusDisplay.bg} border-gray-200`}>
              <div className="flex items-start gap-3">
                <div className={`text-xl ${statusDisplay.color} font-bold min-w-[24px]`}>
                  {statusDisplay.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-sm">{item.item}</div>
                    <div className="text-xs text-gray-600">{item.weight} pts</div>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">{item.category}</div>
                  <div className="text-sm text-gray-300">{item.details}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      {summary && Object.keys(summary).length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-green-500/10 rounded-lg p-3 text-center border border-green-500/30">
            <div className="text-2xl font-bold text-green-400">{summary.passed || 0}</div>
            <div className="text-xs text-gray-600">Passed</div>
          </div>
          <div className="bg-orange-500/10 rounded-lg p-3 text-center border border-orange-500/30">
            <div className="text-2xl font-bold text-orange-400">{summary.warnings || 0}</div>
            <div className="text-xs text-gray-600">Warnings</div>
          </div>
          <div className="bg-red-500/10 rounded-lg p-3 text-center border border-red-500/30">
            <div className="text-2xl font-bold text-red-400">{summary.failed || 0}</div>
            <div className="text-xs text-gray-600">Failed</div>
          </div>
          <div className="bg-gray-500/10 rounded-lg p-3 text-center border border-gray-500/30">
            <div className="text-2xl font-bold text-gray-600">{summary.unknown || 0}</div>
            <div className="text-xs text-gray-600">Unknown</div>
          </div>
        </div>
      )}

      {/* Execution Steps */}
      {execution_steps && execution_steps.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => setExpandedSteps(!expandedSteps)}
            className="w-full flex items-center justify-between text-sm font-semibold text-gray-600 hover:text-gray-300 transition-colors mb-3"
          >
            <span>📝 Execution Steps ({execution_steps.length})</span>
            <span>{expandedSteps ? '▼' : '▶'}</span>
          </button>
          
          {expandedSteps && (
            <div className="space-y-2">
              {execution_steps.map((step, idx) => (
                <div key={idx} className="bg-gray-100/30 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">{step.action}</div>
                      <div className="text-xs text-gray-600">{step.details}</div>
                    </div>
                    {step.completed !== undefined && (
                      <div className={`text-lg ${step.completed ? 'text-green-400' : 'text-gray-600'}`}>
                        {step.completed ? '✓' : '○'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Help Text */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 italic">
          💡 <strong>Tip:</strong> The Trade Management Checklist validates 7 critical conditions before entry. 
          A "Go" signal (≥80/100) means all conditions are favorable. 
          "Caution" (65-79) suggests reducing position size. 
          "No-Go" (&lt;65 or critical issues) means wait for a better setup.
        </div>
      </div>
    </div>
  );
};

export default TradeChecklistCard;
