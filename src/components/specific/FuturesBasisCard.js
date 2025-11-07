import React, { useState } from 'react';

const FuturesBasisCard = ({ basisData }) => {
  const [expandedRisks, setExpandedRisks] = useState(false);

  if (!basisData) {
    return (
      <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">🔮 Futures Basis Analysis</h3>
        <p className="text-gray-600 text-center py-8">No futures basis data available</p>
      </div>
    );
  }

  const {
    basis = {},
    basis_strength = {},
    institutional_bias = {},
    historical_context = {},
    fii_sentiment = {},
    trading_implications = {},
    risk_factors = [],
    summary = ""
  } = basisData;

  // Get basis classification color
  const getBasisColor = (classification) => {
    switch (classification) {
      case 'Premium':
        return 'text-green-400';
      case 'Discount':
        return 'text-red-400';
      case 'At Par':
        return 'text-yellow-400';
      case 'Data Unavailable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  // Get sentiment color
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Bullish':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Bearish':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'Neutral':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-600 border-gray-500/50';
    }
  };

  // Get signal color
  const getSignalColor = (signal) => {
    switch (signal) {
      case 'Bullish':
        return 'text-green-400';
      case 'Bearish':
        return 'text-red-400';
      case 'Neutral':
        return 'text-yellow-400';
      default:
        return 'text-gray-600';
    }
  };

  // Data unavailable state
  if (basis.classification === 'Data Unavailable' || basis.classification === 'Error') {
    return (
      <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">🔮 Futures Basis Analysis</h3>
          <div className="text-sm bg-gray-700/50 px-3 py-1 rounded-full text-gray-600">
            Data Unavailable
          </div>
        </div>
        
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600">{summary}</p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 italic">
            💡 <strong>Note:</strong> Futures basis analysis requires active futures contracts for this stock. 
            Not all stocks have futures contracts. This is normal for many mid and small-cap stocks.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">🔮 Futures Basis Analysis</h3>
        <div className={`text-sm font-semibold px-3 py-1 rounded-full ${getBasisColor(basis.classification)}`}>
          {basis.classification}
        </div>
      </div>

      {/* Basis Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-200">
          <div className="text-xs text-gray-600 mb-1">Current Basis</div>
          <div className={`text-2xl font-bold ${getBasisColor(basis.classification)}`}>
            {basis.percentage !== undefined ? `${basis.percentage > 0 ? '+' : ''}${basis.percentage}%` : 'N/A'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {basis.absolute !== undefined ? `₹${basis.absolute.toFixed(2)}` : ''}
          </div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-200">
          <div className="text-xs text-gray-600 mb-1">Basis Strength</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="text-2xl font-bold text-blue-400">
              {basis_strength.score !== undefined ? `${basis_strength.score.toFixed(0)}` : '0'}
            </div>
            <div className="text-sm text-gray-600">/100</div>
          </div>
          <div className="text-xs text-gray-500">{basis_strength.level || 'Unknown'}</div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-200">
          <div className="text-xs text-gray-600 mb-1">Institutional Bias</div>
          <div className={`text-xl font-bold ${getSentimentColor(institutional_bias.sentiment).split(' ')[1]}`}>
            {institutional_bias.sentiment || 'Unknown'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {institutional_bias.confidence || 'Low'} Confidence
          </div>
        </div>
      </div>

      {/* Institutional Bias Banner */}
      <div className={`rounded-lg p-4 mb-6 border ${getSentimentColor(institutional_bias.sentiment)}`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {institutional_bias.sentiment === 'Bullish' && '🐃'}
            {institutional_bias.sentiment === 'Bearish' && '🐻'}
            {institutional_bias.sentiment === 'Neutral' && '⚖️'}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm mb-1">Institutional Positioning</div>
            <div className="text-xs opacity-90">{institutional_bias.explanation || 'No explanation available'}</div>
          </div>
        </div>
      </div>

      {/* Historical Context */}
      {historical_context && (
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-600 mb-3">Historical Context:</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-700/20 rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">30-Day Avg</div>
              <div className="text-lg font-bold text-gray-300">
                {historical_context.avg_30d !== undefined ? `${historical_context.avg_30d.toFixed(2)}%` : 'N/A'}
              </div>
              <div className={`text-xs mt-1 ${
                historical_context.vs_30d === 'Above' ? 'text-green-400' : 
                historical_context.vs_30d === 'Below' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {historical_context.vs_30d || 'Unknown'}
              </div>
            </div>
            
            <div className="bg-gray-700/20 rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">60-Day Avg</div>
              <div className="text-lg font-bold text-gray-300">
                {historical_context.avg_60d !== undefined ? `${historical_context.avg_60d.toFixed(2)}%` : 'N/A'}
              </div>
              <div className={`text-xs mt-1 ${
                historical_context.vs_60d === 'Above' ? 'text-green-400' : 
                historical_context.vs_60d === 'Below' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {historical_context.vs_60d || 'Unknown'}
              </div>
            </div>
            
            <div className="bg-gray-700/20 rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">90-Day Avg</div>
              <div className="text-lg font-bold text-gray-300">
                {historical_context.avg_90d !== undefined ? `${historical_context.avg_90d.toFixed(2)}%` : 'N/A'}
              </div>
              <div className={`text-xs mt-1 ${
                historical_context.vs_90d === 'Above' ? 'text-green-400' : 
                historical_context.vs_90d === 'Below' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {historical_context.vs_90d || 'Unknown'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FII Sentiment Alignment */}
      {fii_sentiment && fii_sentiment.activity !== 'Unknown' && (
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-600 mb-3">FII Activity Alignment:</div>
          <div className={`rounded-lg p-3 border ${
            fii_sentiment.alignment === 'Aligned' ? 
              'bg-green-500/10 border-green-500/30' : 
              fii_sentiment.alignment === 'Divergent' ?
                'bg-orange-500/10 border-orange-500/30' :
                'bg-gray-700/30 border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">
                {fii_sentiment.alignment === 'Aligned' && '✅'}
                {fii_sentiment.alignment === 'Divergent' && '⚠️'}
                {fii_sentiment.alignment === 'Unknown' && 'ℹ️'}
              </span>
              <span className="font-semibold text-sm">
                FII {fii_sentiment.activity} - {fii_sentiment.alignment}
              </span>
            </div>
            <div className="text-xs text-gray-600">{fii_sentiment.description}</div>
          </div>
        </div>
      )}

      {/* Trading Implications */}
      {trading_implications && (
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-600 mb-3">Trading Implications:</div>
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <div className={`text-lg font-bold ${getSignalColor(trading_implications.signal)}`}>
                {trading_implications.signal || 'Neutral'}
              </div>
              <div className="text-xs bg-gray-700/50 px-2 py-1 rounded text-gray-600">
                {trading_implications.strength || 'Weak'} Strength
              </div>
            </div>
            <div className="text-sm text-gray-300">{trading_implications.recommendation || 'No recommendation available'}</div>
          </div>
        </div>
      )}

      {/* Risk Factors */}
      {risk_factors && risk_factors.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setExpandedRisks(!expandedRisks)}
            className="w-full flex items-center justify-between text-sm font-semibold text-gray-600 hover:text-gray-300 transition-colors mb-3"
          >
            <span>⚠️ Risk Factors ({risk_factors.length})</span>
            <span>{expandedRisks ? '▼' : '▶'}</span>
          </button>
          
          {expandedRisks && (
            <div className="space-y-2">
              {risk_factors.map((risk, idx) => (
                <div key={idx} className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/30">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-400 text-sm">⚠</span>
                    <div className="text-xs text-gray-300">{risk}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div className="bg-gray-700/20 rounded-lg p-4 border border-gray-200 mb-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">Summary:</div>
          <div className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: summary.replace(/\*\*/g, '<strong>').replace(/\*/g, '') }} />
        </div>
      )}

      {/* Help Text */}
      <div className="pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 italic">
          💡 <strong>Understanding Futures Basis:</strong> The basis (futures - spot price) reveals institutional positioning. 
          A premium (&gt;0) indicates bullish bias as institutions pay extra for futures. 
          A discount (&lt;0) suggests bearish positioning with futures trading below spot. 
          Extreme basis levels may normalize, causing price moves.
        </div>
      </div>
    </div>
  );
};

export default FuturesBasisCard;
