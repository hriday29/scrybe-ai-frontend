import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertTriangle, DollarSign, Percent } from 'lucide-react';

const PositionSizeCard = ({ tradePlan, analysisData }) => {
  if (!tradePlan || !tradePlan.position_sizing) {
    return null;
  }

  const sizing = tradePlan.position_sizing;
  const entryPrice = tradePlan.entryPrice || tradePlan.entry_price;
  const stopLoss = tradePlan.stopLoss || tradePlan.stop_loss;
  const target = tradePlan.target || tradePlan.target_price;
  
  // Interactive calculator state
  const [accountEquity, setAccountEquity] = useState(sizing.calculations?.account_equity || 1000000);
  const [riskPct, setRiskPct] = useState(sizing.calculations?.risk_per_trade_pct || 1.0);
  
  // Recalculate position size based on user inputs
  const riskPerShare = Math.abs(entryPrice - stopLoss);
  const maxRiskAmount = accountEquity * (riskPct / 100);
  const calculatedShares = Math.floor(maxRiskAmount / riskPerShare);
  const calculatedCapital = calculatedShares * entryPrice;
  const calculatedRiskAmount = calculatedShares * riskPerShare;
  const calculatedPositionPct = (calculatedCapital / accountEquity) * 100;

  // Risk level color coding
  const getRiskColor = (riskPct) => {
    if (riskPct <= 1.0) return 'text-green-400';
    if (riskPct <= 2.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPositionSizeColor = (positionPct) => {
    if (positionPct <= 10) return 'text-green-400';
    if (positionPct <= 15) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Format rupee values
  const formatRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/10 rounded-lg">
          <Calculator className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Position Sizing Calculator</h3>
          <p className="text-sm text-gray-400">Risk-based position sizing for this trade</p>
        </div>
      </div>

      {/* Interactive Inputs */}
      <div className="bg-gray-900/50 rounded-lg p-4 mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Account Equity Input */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Your Account Equity</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={accountEquity}
                onChange={(e) => setAccountEquity(parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="1000000"
                step="10000"
              />
            </div>
          </div>

          {/* Risk % Input */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Risk Per Trade (%)</label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={riskPct}
                onChange={(e) => setRiskPct(parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="1.0"
                step="0.1"
                min="0.1"
                max="5.0"
              />
            </div>
          </div>
        </div>

        {/* Risk Level Warning */}
        {riskPct > 2.0 && (
          <div className="flex items-center gap-2 text-orange-400 text-xs bg-orange-500/10 rounded-lg p-3">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>Warning: Risking more than 2% per trade increases account volatility significantly</span>
          </div>
        )}
      </div>

      {/* Calculation Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Recommended Shares */}
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">Recommended Shares</div>
          <div className="text-2xl font-bold text-white">{calculatedShares.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">shares to buy</div>
        </div>

        {/* Capital Required */}
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">Capital Required</div>
          <div className={`text-2xl font-bold ${getPositionSizeColor(calculatedPositionPct)}`}>
            {formatRupees(calculatedCapital)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{calculatedPositionPct.toFixed(1)}% of account</div>
        </div>

        {/* Risk Amount */}
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">Amount at Risk</div>
          <div className={`text-2xl font-bold ${getRiskColor((calculatedRiskAmount / accountEquity) * 100)}`}>
            {formatRupees(calculatedRiskAmount)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{((calculatedRiskAmount / accountEquity) * 100).toFixed(2)}% of account</div>
        </div>
      </div>

      {/* Trade Details Breakdown */}
      <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
        <div className="text-sm font-medium text-gray-300 mb-3">Trade Price Levels</div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs text-gray-500 mb-1">Entry Price</div>
            <div className="text-white font-semibold">₹{entryPrice.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Stop Loss</div>
            <div className="text-red-400 font-semibold">₹{stopLoss.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Target</div>
            <div className="text-green-400 font-semibold">₹{target.toFixed(2)}</div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-700/50 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Risk per share</span>
            <span className="text-white font-medium">₹{riskPerShare.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Potential profit per share</span>
            <span className="text-green-400 font-medium">₹{(target - entryPrice).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total potential profit</span>
            <span className="text-green-400 font-medium">{formatRupees((target - entryPrice) * calculatedShares)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total potential loss</span>
            <span className="text-red-400 font-medium">{formatRupees(calculatedRiskAmount)}</span>
          </div>
        </div>
      </div>

      {/* Method Used & Guidelines */}
      <div className="mt-6 pt-6 border-t border-gray-700/50">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-blue-500/10 rounded-lg mt-0.5">
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-300 mb-1">Sizing Method</div>
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="text-blue-400 font-medium">{sizing.position_size_method}:</span>{' '}
              {sizing.method_reason}
            </p>
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <div>💡 <span className="text-gray-400">Conservative: Risk 0.5% per trade</span></div>
              <div>💡 <span className="text-gray-400">Moderate: Risk 1.0% per trade (recommended)</span></div>
              <div>💡 <span className="text-gray-400">Aggressive: Risk 2.0% per trade (experienced traders only)</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionSizeCard;
