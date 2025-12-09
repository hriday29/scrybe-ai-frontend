import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, CheckCircle, 
  XCircle, Filter, Search, ArrowUpCircle, ArrowDownCircle,
  PieChart, BarChart3, Activity, Eye, Target, Shield, X, BookOpen
} from 'lucide-react';
import { API_BASE_URL } from '../apiConfig';
import MarketRegimeCard from '../components/specific/MarketRegimeCard';
import SectorHeatmapCard from '../components/specific/SectorHeatmapCard';
import PaymentManager from '../components/specific/PaymentManager';
import { useAuth } from '../context/AuthContext';

const GlassCard = ({ className = '', children, onClick, variant = 'default' }) => {
  const variants = {
    default: 'bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800',
    elevated: 'bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 shadow-lg',
    subtle: 'bg-gray-50 dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-800',
    accent: 'bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800 border border-gray-200 dark:border-neutral-700'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={onClick ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`${variants[variant]} backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 ${className} ${onClick ? 'cursor-pointer hover:shadow-xl hover:border-primary-400 dark:hover:border-primary-600' : ''}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

const StatCard = ({ icon: Icon, label, value, subtitle, color = 'blue', trend }) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/20'
    },
    green: {
      bg: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20'
    },
    yellow: {
      bg: 'from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      icon: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/20'
    },
    red: {
      bg: 'from-rose-50 to-rose-100/50 dark:from-rose-950/30 dark:to-rose-900/20',
      border: 'border-rose-200 dark:border-rose-800',
      icon: 'text-rose-600 dark:text-rose-400',
      iconBg: 'bg-rose-500/10 dark:bg-rose-500/20'
    },
    purple: {
      bg: 'from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      icon: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-500/10 dark:bg-purple-500/20'
    }
  };

  const colors = colorClasses[color];

  return (
    <GlassCard variant="elevated" className={`p-6 bg-gradient-to-br ${colors.bg} border ${colors.border}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">{label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 tracking-tight">{value}</p>
        {subtitle && <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
    </GlassCard>
  );
};

const SignalBadge = ({ signal, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  if (signal === 'BUY') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-500/40 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm`}>
        <ArrowUpCircle className="w-3.5 h-3.5" />
        BUY
      </span>
    );
  }
  if (signal === 'SHORT') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} rounded-lg bg-gradient-to-r from-rose-500/20 to-red-500/20 dark:from-rose-900/30 dark:to-red-900/30 border border-rose-500/40 dark:border-rose-700 text-rose-700 dark:text-rose-300 font-bold shadow-sm`}>
        <ArrowDownCircle className="w-3.5 h-3.5" />
        SHORT
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold shadow-sm`}>
      HOLD
    </span>
  );
};

const ExecutedTradeCard = ({ trade, rank, onStockSelect }) => {
  const handleClick = () => {
    if (onStockSelect) {
      onStockSelect(trade.ticker);
    }
  };

  const riskReward = trade.target && trade.entry_price && trade.stop_loss
    ? ((trade.target - trade.entry_price) / (trade.entry_price - trade.stop_loss)).toFixed(2)
    : null;

  return (
    <GlassCard variant="elevated" className="p-6 group" onClick={handleClick}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              #{rank || '?'}
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900 animate-pulse"></div>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-gray-100 font-bold text-xl tracking-tight">{trade.ticker}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{trade.sector || 'Unknown Sector'}</p>
          </div>
        </div>
        <SignalBadge signal={trade.signal} size="lg" />
      </div>
      
      {/* Price Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3 border border-gray-200 dark:border-neutral-700">
          <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Entry</p>
          <p className="text-gray-900 dark:text-gray-100 font-bold text-lg">₹{trade.entry_price?.toFixed(2) || 'N/A'}</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800">
          <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">Target</p>
          <p className="text-emerald-700 dark:text-emerald-300 font-bold text-lg">₹{trade.target?.toFixed(2) || 'N/A'}</p>
        </div>
        <div className="bg-rose-50 dark:bg-rose-950/30 rounded-lg p-3 border border-rose-200 dark:border-rose-800">
          <p className="text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">Stop</p>
          <p className="text-rose-700 dark:text-rose-300 font-bold text-lg">₹{trade.stop_loss?.toFixed(2) || 'N/A'}</p>
        </div>
      </div>

      {/* Risk/Reward Ratio */}
      {riskReward && (
        <div className="flex items-center justify-between mb-4 p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <span className="text-blue-700 dark:text-blue-300 text-xs font-semibold">Risk/Reward Ratio</span>
          <span className="text-blue-900 dark:text-blue-100 font-bold">1:{riskReward}</span>
        </div>
      )}

      {/* Position Sizing Transparency - AI Manager Reasoning (Phase 2) */}
      {trade.position_sizing && (
        <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-start gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">📊</span>
            </div>
            <div>
              <p className="text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider">Position Sizing Logic</p>
              <p className="text-indigo-600 dark:text-indigo-400 text-xs mt-1">
                Our AI manager sized this position based on market-cap tier, liquidity, and quality factors. Each metric tells you how we protect your capital.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white dark:bg-neutral-800 rounded p-2.5 border border-indigo-100 dark:border-indigo-800">
              <p className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-1">📈 Shares to Buy</p>
              <p className="text-indigo-900 dark:text-indigo-100 font-bold text-base">{trade.position_sizing?.shares || 'N/A'}</p>
              <p className="text-indigo-600 dark:text-indigo-400 text-xs mt-1">@ ₹{trade.entry_price?.toFixed(2)} each</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded p-2.5 border border-indigo-100 dark:border-indigo-800">
              <p className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-1">💰 Capital Required</p>
              <p className="text-indigo-900 dark:text-indigo-100 font-bold text-base">₹{trade.position_sizing?.capital_deployed?.toLocaleString('en-IN') || 'N/A'}</p>
              <p className="text-indigo-600 dark:text-indigo-400 text-xs mt-1">From your fund</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded p-2.5 border border-indigo-100 dark:border-indigo-800">
              <p className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-1">📊 Portfolio Weight</p>
              <p className="text-indigo-900 dark:text-indigo-100 font-bold text-base">{trade.position_sizing?.portfolio_percentage?.toFixed(2) || 'N/A'}%</p>
              <p className="text-indigo-600 dark:text-indigo-400 text-xs mt-1">Of total portfolio</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded p-2.5 border border-rose-100 dark:border-rose-800">
              <p className="text-rose-600 dark:text-rose-400 text-xs font-semibold mb-1">⚠️ Maximum Risk</p>
              <p className="text-rose-700 dark:text-rose-300 font-bold text-base">₹{trade.position_sizing?.risk_amount?.toLocaleString('en-IN') || 'N/A'}</p>
              <p className="text-rose-600 dark:text-rose-400 text-xs mt-1">If stop loss hit</p>
            </div>
          </div>
        </div>
      )}

      {/* Quality & Liquidity Indicators - Why These Matter (Phase 2-3) */}
      <div className="mb-4 space-y-2">
        {trade.quality_score !== undefined && (
          <div className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-2.5 ${
            trade.quality_score >= 75 ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700' :
            trade.quality_score >= 60 ? 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700' :
            'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700'
          }`}>
            <span className="text-base mt-0.5">⭐</span>
            <div>
              <p className="font-bold">Quality: {trade.quality_score >= 75 ? 'Excellent Fundamentals' : trade.quality_score >= 60 ? 'Good Fundamentals' : 'Average Fundamentals'} ({trade.quality_score}%)</p>
              <p className="text-xs opacity-90 mt-0.5">
                {trade.quality_score >= 75 ? 'Strong balance sheet, good profitability - manager allocated more capital for higher potential returns' :
                 trade.quality_score >= 60 ? 'Solid business metrics - manager sized conservatively to manage risk' :
                 'Weaker metrics - manager sized smaller position to limit downside exposure'}
              </p>
            </div>
          </div>
        )}
        {trade.liquidity_tier && (
          <div className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-start gap-2.5 ${
            trade.liquidity_tier === 'very_high' ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700' :
            trade.liquidity_tier === 'high' ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700' :
            trade.liquidity_tier === 'medium' ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700' :
            'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
          }`}>
            <span className="text-base mt-0.5">💧</span>
            <div>
              <p className="font-bold">Liquidity: {trade.liquidity_tier === 'very_high' ? 'Very High Volume' : trade.liquidity_tier === 'high' ? 'High Volume' : trade.liquidity_tier === 'medium' ? 'Medium Volume' : 'Low Volume'}</p>
              <p className="text-xs opacity-90 mt-0.5">
                {trade.liquidity_tier === 'very_high' ? 'Easy to buy & sell - no slippage concerns, optimal for quick exit' :
                 trade.liquidity_tier === 'high' ? 'Good volume - can enter/exit without major impact on price' :
                 trade.liquidity_tier === 'medium' ? 'Moderate volume - can trade but requires careful execution' :
                 'Limited volume - higher risk of price impact, smaller position recommended'}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Why This Trade Was Selected */}
      {trade.selection_reason && (
        <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
          <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-700 dark:text-green-300 text-xs font-semibold uppercase mb-1">Manager's Decision</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-normal break-words">{trade.selection_reason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hover Effect Indicator */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary-500 dark:group-hover:border-primary-400 transition-all pointer-events-none"></div>
    </GlassCard>
  );
};

const AnalysisRow = ({ analysis, onStockSelect }) => {
  const getStatusIcon = () => {
    if (analysis.is_executed) {
      return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
    }
    if (analysis.portfolio_selected) {
      return <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
    return <XCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
  };

  const getReasonColor = () => {
    const reason = analysis.selection_reason?.toLowerCase() || '';
    if (reason.includes('selected')) return 'text-green-600 dark:text-green-400';
    if (reason.includes('sector')) return 'text-yellow-600 dark:text-yellow-400';
    if (reason.includes('portfolio full')) return 'text-orange-600 dark:text-orange-400';
    return 'text-gray-600 dark:text-gray-300';
  };

  const getSimplifiedReason = (reason) => {
    if (!reason) return 'Analysis pending';
    
    // Selected trades
    if (reason.includes('SELECTED')) {
      const rankMatch = reason.match(/Rank #(\d+)/);
      const rank = rankMatch ? rankMatch[1] : 'N/A';
      return `✅ Selected for trading (Rank #${rank})`;
    }
    
    // High conviction but not selected
    if (reason.includes('High conviction') && reason.includes('available for review')) {
      const rankMatch = reason.match(/Global Rank #(\d+)/);
      const rank = rankMatch ? rankMatch[1] : 'N/A';
      return `⭐ Strong buy signal (Rank #${rank}) - Available for manual review`;
    }
    
    // Portfolio constraints
    if (reason.includes('Portfolio full')) {
      return '📊 Portfolio is full (10 positions maximum)';
    }
    
    // *** SECTOR LIMITS REMOVED ***
    // Sector concentration limits have been disabled
    // This category is no longer used for signal rejection
    
    // Single stock risk limit
    if (reason.includes('Single-stock risk limit')) {
      return '⚠️ Too much money already invested in this stock';
    }
    
    // Conviction threshold
    if (reason.includes('below 45 threshold') || reason.includes('Conviction score')) {
      return '📉 Signal strength too weak for automatic trading';
    }
    
    // HOLD signals
    if (reason.includes('HOLD signal') || reason.includes('No trading opportunity')) {
      return '⏸️ No clear buy or sell signal detected';
    }
    
    // Default fallback
    return reason.length > 60 ? reason.substring(0, 57) + '...' : reason;
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-100 dark:border-neutral-800 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 cursor-pointer transition-all group"
      onClick={() => onStockSelect && onStockSelect(analysis.ticker)}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {getStatusIcon()}
            {analysis.is_executed && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <div>
            <p className="text-gray-900 dark:text-gray-100 font-bold text-base group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{analysis.ticker}</p>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">{analysis.sector || 'Unknown'}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <SignalBadge signal={analysis.signal} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className={`font-bold text-lg ${analysis.scrybeScore >= 45 ? 'text-emerald-600 dark:text-emerald-400' : analysis.scrybeScore >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {analysis.scrybeScore >= 0 ? '+' : ''}{analysis.scrybeScore || 0}
          </span>
          {analysis.scrybeScore >= 45 && (
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">
          <span className="text-gray-900 dark:text-gray-100 font-bold text-sm">
            #{analysis.global_rank || 'N/A'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 max-w-md">
        <p className={`text-sm leading-relaxed ${getReasonColor()}`}>
          {getSimplifiedReason(analysis.selection_reason)}
        </p>
      </td>
    </motion.tr>
  );
};

const InstitutionalEducationDrawer = ({ isOpen, onClose, totalAnalyzed }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[800px] bg-white dark:bg-neutral-900 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-secondary-600 p-6 flex items-center justify-between z-10 shadow-lg">
              <div>
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Shield className="w-8 h-8" />
                    Scrybe Portfolio Management
                  </h2>
                <p className="text-sm text-white/90 mt-1">Professional-grade process & risk controls</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close education drawer"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Introduction */}
              <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  How Scrybe AI Works as Your Portfolio Manager
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  Scrybe AI doesn't just analyze stocks—it manages a portfolio like an institutional fund manager. 
                  Every day, our AI analyzes <span className="text-gray-900 dark:text-gray-100 font-semibold">~1,900 NSE stocks</span>, 
                  but only executes the <span className="text-green-600 dark:text-green-400 font-semibold">top 10 highest-conviction opportunities</span> that 
                  pass strict risk controls.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  This isn't swing trading—it's <span className="text-primary-600 dark:text-primary-400 font-semibold">institutional positioning</span> with 
                  multi-layer AI analysis, quantitative screening, and professional risk management built into every decision.
                </p>
              </div>

              {/* Daily Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-5 border border-gray-200 dark:border-neutral-700">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">📊 Step 1: Daily Analysis</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• <span className="text-gray-900 dark:text-gray-100 font-semibold">~1,900 NSE stocks screened</span> daily using quantitative filters</li>
                    <li>• <span className="text-gray-900 dark:text-gray-100 font-semibold">All candidates</span> analyzed by AI Committee of Experts</li>
                    <li>• Each candidate analyzed by AI "Committee of Experts":</li>
                    <li className="ml-4">→ Technical Analyst (charts, indicators, momentum)</li>
                    <li className="ml-4">→ Fundamental Analyst (valuation, growth, quality)</li>
                    <li className="ml-4">→ Risk Analyst (volatility, futures basis, options)</li>
                    <li className="ml-4">→ Head of Strategy (final synthesis, conviction score)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-5 border border-gray-200 dark:border-neutral-700">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">🎯 Step 2: Portfolio Selection</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Only <span className="text-green-600 dark:text-green-400 font-semibold">BUY signals with Scrybe Score ≥ 45</span> considered</li>
                    <li>• <span className="text-gray-900 dark:text-gray-100 font-semibold">Global ranking</span> by conviction across all analyzed stocks</li>
                    <li>• Portfolio Manager applies <span className="text-gray-900 dark:text-gray-100 font-semibold">3 risk gates:</span></li>
                    <li className="ml-4">→ <span className="text-yellow-600 dark:text-yellow-400">Max 10 concurrent positions</span></li>
                    <li className="ml-4">→ <span className="text-yellow-600 dark:text-yellow-400">NSE-proportional sector caps</span> (e.g., 5 in Financials, 3 in Materials, 1 in Telecom)</li>
                    <li className="ml-4">→ <span className="text-yellow-600 dark:text-yellow-400">Max 2% risk per position</span></li>
                    <li>• Top 10 that pass all gates = <span className="text-green-600 dark:text-green-400 font-semibold">EXECUTED</span></li>
                    <li>• Others = <span className="text-gray-600 dark:text-gray-400">Available for review</span></li>
                  </ul>
                </div>
              </div>

              {/* Position Sizing */}
              <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">💰 Position Sizing & Risk Management</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white dark:bg-neutral-900 rounded p-4 border border-gray-200 dark:border-neutral-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Risk Per Trade</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1.5%</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Of total capital at risk per position</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 rounded p-4 border border-gray-200 dark:border-neutral-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Stop-Loss Method</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">2× ATR</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Dynamic stop based on volatility</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-900 rounded p-4 border border-gray-200 dark:border-neutral-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Risk/Reward Target</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">3:1</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Target = 6× ATR above entry</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="text-gray-900 dark:text-gray-100 font-semibold">Position Size Calculation:</span> If you have ₹1,00,000 capital 
                  and risk 1.5% per trade (₹1,500), with a stop-loss 5% below entry, you'd invest 
                  <span className="text-green-600 dark:text-green-400 font-semibold"> ₹30,000</span> (₹1,500 ÷ 5% = ₹30,000). 
                  This ensures controlled risk regardless of stock price or volatility.
                </p>
              </div>

              {/* Trade Execution */}
              <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">⚡ Trade Execution & Monitoring</h4>
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Entry Price:</p>
                      <p>System uses <span className="text-green-600 dark:text-green-400">live market price (LTP)</span> from Angel One for precise entry calculation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Stop-Loss & Target:</p>
                      <p>Automatically calculated using ATR (Average True Range) for volatility-adjusted exits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Holding Period:</p>
                      <p>Typically 7 days, adjusted based on market conditions and momentum</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Exit Triggers:</p>
                      <p>Position closes on: Target hit, Stop-loss hit, Holding period expiry, or AI reversal signal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transparency */}
              <div className="bg-gradient-to-r from-primary-100/50 to-secondary-100/50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg p-6 border border-primary-300 dark:border-primary-700">
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  Complete Transparency
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Unlike black-box trading algorithms, Scrybe AI shows you <span className="text-gray-900 dark:text-gray-100 font-semibold">every analysis, 
                  every decision, and every rejection reason</span>. Browse all analyzed stocks in the NSE universe in the 
                  <span className="text-primary-600 dark:text-primary-400 font-semibold"> Complete Analysis</span> page, understand why stocks were 
                  selected or rejected, and see the exact trade plan for every position. You're not following blind 
                  signals—you're learning institutional portfolio management.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const PortfolioDashboard = ({ onStockSelect }) => {
  const { currentUser } = useAuth();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('executed'); // executed, not-selected, all
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSignal, setFilterSignal] = useState('all'); // all, BUY, SHORT, HOLD
  const [educationDrawerOpen, setEducationDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        if (!currentUser) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        // Get Firebase token
        const token = await currentUser.getIdToken();

        const response = await fetch(`${API_BASE_URL}/api/portfolio-summary`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized - Please log in again');
          }
          throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
        }

        const data = await response.json();
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [currentUser]);

  const filteredAnalyses = useMemo(() => {
    if (!portfolioData?.all_analyses) return [];

    let filtered = portfolioData.all_analyses;

    // Tab filtering - FIXED for NSE scale
    if (activeTab === 'executed') {
      filtered = filtered.filter(a => a.is_executed);
    } else if (activeTab === 'not-selected') {
      // Show top 50-100 high-conviction NOT executed trades
      // Filter for high conviction (score >= 45) and not executed
      filtered = filtered
        .filter(a => !a.is_executed && (a.scrybeScore >= 45 || a.scrybeScore <= -45))
        .sort((a, b) => Math.abs(b.scrybeScore) - Math.abs(a.scrybeScore))
        .slice(0, 100);  // Show top 100 opportunities
    }

    // Search filtering
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(a => 
        a.ticker?.toLowerCase().includes(term) ||
        a.sector?.toLowerCase().includes(term) ||
        a.selection_reason?.toLowerCase().includes(term)
      );
    }

    // Signal filtering
    if (filterSignal !== 'all') {
      filtered = filtered.filter(a => a.signal === filterSignal);
    }

    return filtered;
  }, [portfolioData, activeTab, searchTerm, filterSignal]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-teal-50/30 to-purple-50/40 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-primary-600 dark:text-primary-400 animate-pulse mx-auto mb-4" />
          <p className="text-gray-900 dark:text-gray-100 text-xl font-semibold">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-teal-50/30 to-purple-50/40 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center">
        <GlassCard className="p-8 max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">Failed to Load</h2>
          <p className="text-gray-700 dark:text-gray-300 text-center">{error}</p>
        </GlassCard>
      </div>
    );
  }

  const { portfolio_summary, sector_breakdown, executed_trades, total_analyzed, display_timestamp, prediction_for_date, prediction_for_date_short } = portfolioData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-8 px-4 sm:px-6 lg:px-8">
      {/* Payment & Subscription Manager */}
      {/* {currentUser && (
        <div className="mt-12">
          <PaymentManager user={currentUser} />
        </div>
      )} */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Institutional Grade */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-10 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full"></div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Portfolio Manager
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Institutional-grade AI portfolio management
                  </p>
                </div>
              </div>
            </div>
            {display_timestamp && (
              <div className="bg-gray-100 dark:bg-neutral-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Analysis Date</p>
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{prediction_for_date_short || display_timestamp}</p>
              </div>
            )}
          </div>

          {/* Manager Overview - What's Happening */}
          <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-base">🤖</span>
              </div>
              <div className="flex-1">
                <p className="text-blue-900 dark:text-blue-100 font-semibold mb-1">How Our Manager Works</p>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                  Our AI analyzes ~1,900 NSE stocks daily to find the best trading opportunities. It ranks them by conviction strength and selects the top performers based on institutional risk controls. 
                  Each trade shown below has been automatically sized based on market-cap, quality, and liquidity to maximize returns while protecting your capital. You can review every decision we made.
                </p>
              </div>
            </div>
          </div>

          {/* Key Stats Summary Bar - Manager's Daily Work */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <GlassCard variant="elevated" className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <div className="text-2xl flex-shrink-0">📊</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider font-semibold mb-0.5">Daily Analysis</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-900 dark:text-blue-100 truncate">~{total_analyzed}</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Stocks screened</p>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard variant="elevated" className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="text-2xl flex-shrink-0">✅</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold mb-0.5">Executing Now</p>
                  <p className="text-xl md:text-2xl font-bold text-emerald-900 dark:text-emerald-100 truncate">{portfolio_summary.selected_for_execution}</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">Active positions</p>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard variant="elevated" className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3">
                <div className="text-2xl flex-shrink-0">⭐</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider font-semibold mb-0.5">High Conviction</p>
                  <p className="text-xl md:text-2xl font-bold text-amber-900 dark:text-amber-100 truncate">{portfolio_summary.high_conviction_not_selected}</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">Strong signals</p>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard variant="elevated" className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3">
                <div className="text-2xl flex-shrink-0">🎯</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wider font-semibold mb-0.5">Sectors</p>
                  <p className="text-xl md:text-2xl font-bold text-purple-900 dark:text-purple-100 truncate">{Object.keys(sector_breakdown).length}</p>
                  <p className="text-xs text-purple-700 dark:text-purple-300">Diversified</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Market Regime Card - Feature 1/15 */}
        {portfolioData?.all_analyses && portfolioData.all_analyses.length > 0 && portfolioData.all_analyses[0]?.market_context && (
          <div className="mb-12">
            <MarketRegimeCard marketContext={portfolioData.all_analyses[0].market_context} />
          </div>
        )}

        {/* Sector Performance Heatmap - Feature 2/15 */}
        {portfolioData?.all_analyses && portfolioData.all_analyses.length > 0 && portfolioData.all_analyses[0]?.market_context?.sector_performance && (
          <div className="mb-12">
            <SectorHeatmapCard sectorPerformance={portfolioData.all_analyses[0].market_context.sector_performance} />
          </div>
        )}

        {/* Institutional Portfolio Management - Now in Drawer */}
        <motion.button
          onClick={() => setEducationDrawerOpen(true)}
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 dark:from-primary-600 dark:to-secondary-600 dark:hover:from-primary-500 dark:hover:to-secondary-500 rounded-xl shadow-lg hover:shadow-xl transition-all group overflow-hidden"
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg mb-1">How Portfolio Manager Works</p>
                <p className="text-white/90 text-sm">Learn about institutional-grade AI portfolio management</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform">Learn More</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.button>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Target}
            label="Executing Positions"
            value={`${portfolio_summary.selected_for_execution}/${portfolio_summary.max_positions}`}
            subtitle="Top conviction trades"
            color="green"
          />
          <StatCard
            icon={Eye}
            label="Total Analyzed"
            value={total_analyzed}
            subtitle="All AI analyses available"
            color="blue"
          />
          <StatCard
            icon={AlertTriangle}
            label="High Conviction Pending"
            value={portfolio_summary.high_conviction_not_selected}
            subtitle="Top 10 ranked stocks available for review"
            color="yellow"
          />
          <StatCard
            icon={Shield}
            label="Risk Limits Applied"
            value={`${portfolio_summary.sector_limits_reached + (portfolio_summary.single_stock_limit || 0)}`}
            subtitle="Sector & single-stock constraints"
            color="purple"
          />
        </div>

        {/* Sector Breakdown */}
        {executed_trades.length > 0 && (
          <GlassCard variant="elevated" className="p-8 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center">
                <PieChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sector Diversification</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">NSE allocation vs portfolio allocation strategy</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(sector_breakdown).map(([sector, count]) => {
                // NSE sector context (approximate NSE universe proportions)
                const nseContext = {
                  'Financials': { nse_count: 400, nse_pct: 25, max_positions: 5 },
                  'IT': { nse_count: 85, nse_pct: 5, max_positions: 2 },
                  'Energy': { nse_count: 65, nse_pct: 4, max_positions: 2 },
                  'Healthcare': { nse_count: 95, nse_pct: 6, max_positions: 3 },
                  'Telecom': { nse_count: 35, nse_pct: 2, max_positions: 1 },
                  'Consumer': { nse_count: 120, nse_pct: 7, max_positions: 3 },
                  'Infrastructure': { nse_count: 75, nse_pct: 5, max_positions: 2 },
                  'Materials': { nse_count: 110, nse_pct: 7, max_positions: 3 },
                  'Utilities': { nse_count: 45, nse_pct: 3, max_positions: 1 },
                  'Other': { nse_count: 655, nse_pct: 34, max_positions: 5 }
                };
                
                const sectorData = nseContext[sector] || { nse_count: 100, nse_pct: 6, max_positions: 2 };
                const percentage = ((count / portfolio_summary.selected_for_execution) * 100).toFixed(0);
                const isHighAllocation = percentage >= 30;
                const exceededCap = count > sectorData.max_positions;
                const isOptimal = count <= sectorData.max_positions && count > 0;
                return (
                  <motion.div 
                    key={sector}
                    whileHover={{ y: -4 }}
                    className={`p-5 rounded-xl border-2 transition-all cursor-default ${
                      exceededCap
                        ? 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-300 dark:border-red-700'
                        : isHighAllocation 
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-300 dark:border-amber-700'
                        : isOptimal
                        ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-300 dark:border-emerald-700'
                        : 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">{sector}</p>
                      {exceededCap && <span className="text-red-600 dark:text-red-400 text-xs font-bold">⚠️ Over Cap</span>}
                      {isOptimal && !exceededCap && <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">✓ Optimal</span>}
                    </div>
                    <p className={`text-3xl font-bold ${exceededCap ? 'text-red-700 dark:text-red-300' : 'text-gray-900 dark:text-gray-100'} mb-2`}>{count}/{sectorData.max_positions}</p>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${exceededCap ? 'bg-red-500' : isHighAllocation ? 'bg-amber-500' : isOptimal ? 'bg-emerald-500' : 'bg-primary-500'}`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className={`text-xs leading-tight ${exceededCap ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-500 dark:text-gray-500'}`}>NSE: ~{sectorData.nse_count} stocks, Cap: {sectorData.max_positions} pos{exceededCap ? ` (Actual: ${count})` : ''}</p>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-semibold">📊 NSE Scale Context:</span> Portfolio adapts position limits based on sector size in the NSE universe (~1900 stocks analyzed daily). Large sectors get higher caps: Financials (~400 stocks, 21%) and Other (~655 stocks, 34%) allow 5 positions each; Industrials, Healthcare, Consumer, and Materials allow 3 positions each. Small sectors like Telecom (~35 stocks, 2%) are capped at 1 position. This maintains proportional exposure while preventing over-concentration.
              </p>
            </div>
          </GlassCard>
        )}

        {/* Executed Trades Section */}
        {executed_trades.length > 0 && (
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Active Positions</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Top {executed_trades.length} highest conviction trades</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 w-fit">
                <span className="text-emerald-700 dark:text-emerald-300 font-semibold text-sm">{executed_trades.length}/{portfolio_summary.max_positions} filled</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executed_trades.map((trade, index) => (
                <ExecutedTradeCard key={trade._id} trade={trade} rank={index + 1} onStockSelect={onStockSelect} />
              ))}
            </div>
          </div>
        )}

        {/* All Analyses Browser */}
        <GlassCard variant="elevated" className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Complete Analysis Browser</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Full transparency into every AI decision</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex gap-3 mb-6 flex-wrap">
              {[
                { id: 'executed', label: 'Executed', count: executed_trades.length, color: 'emerald' },
                { id: 'not-selected', label: 'Not Selected (Top 100)', count: Math.min(100, portfolioData.all_analyses.filter(a => !a.is_executed && (a.scrybeScore >= 45 || a.scrybeScore <= -45)).length), color: 'amber' },
                { id: 'all', label: 'All Analyses', count: total_analyzed, color: 'blue' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all border-2 ${
                    activeTab === tab.id
                      ? `bg-${tab.color}-500 border-${tab.color}-500 text-white shadow-lg shadow-${tab.color}-500/20`
                      : 'bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.label}
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : 'bg-gray-100 dark:bg-neutral-700'
                    }`}>
                      {tab.count}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            
            {/* Tab Explanations */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-700">
              {activeTab === 'executed' && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">✅ Executed Trades:</span> These are trades the AI manager decided to execute based on conviction. All have been sized for optimal risk/reward and meet your portfolio constraints.
                </p>
              )}
              {activeTab === 'not-selected' && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">⭐ Not Selected (High Conviction):</span> These are strong buy/sell signals but weren't executed due to portfolio being full or other constraints. Note: The tab count shows total not-selected analyses; the table filters to show only high-conviction signals (score ≥45) for your review. You can decide to act on them manually.
                </p>
              )}
              {activeTab === 'all' && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">📊 All Analyses (~{total_analyzed} total):</span> Complete list of all stocks analyzed today. Shows every decision made by the AI - which stocks have signals, which don't, and why. Full transparency into manager's work.
                </p>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by ticker, sector, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <select
                value={filterSignal}
                onChange={(e) => setFilterSignal(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Signals</option>
                <option value="BUY">BUY Only</option>
                <option value="SHORT">SHORT Only</option>
                <option value="HOLD">HOLD Only</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-neutral-800">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-neutral-800/50 border-b-2 border-gray-200 dark:border-neutral-700">
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Signal</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Selection Reason</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredAnalyses.map((analysis) => (
                    <AnalysisRow key={analysis._id} analysis={analysis} onStockSelect={onStockSelect} />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {filteredAnalyses.length === 0 && (
              <div className="text-center py-16 bg-gray-50 dark:bg-neutral-900/50">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-1">No analyses found</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Try adjusting your filters or search terms</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Footer Stats - Refined */}
        <div className="mt-12">
          <GlassCard variant="subtle" className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center mb-1">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{portfolio_summary.selected_for_execution}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">Executing</span>
              </div>
              <div className="flex flex-col items-center gap-2 border-l border-gray-200 dark:border-neutral-700">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center mb-1">
                  <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{portfolio_summary.high_conviction_not_selected}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">High Conviction</span>
              </div>
              <div className="flex flex-col items-center gap-2 border-l border-gray-200 dark:border-neutral-700">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center mb-1">
                  <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{(portfolio_summary.sector_limits_reached || portfolio_summary.single_stock_limit || 0)}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">Risk Limited</span>
              </div>
              <div className="flex flex-col items-center gap-2 border-l border-gray-200 dark:border-neutral-700">
                <div className="w-10 h-10 rounded-lg bg-gray-500/10 dark:bg-gray-500/20 flex items-center justify-center mb-1">
                  <Activity className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">{portfolio_summary.no_signal_generated || 0}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">HOLD Signals</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Institutional Education Drawer */}
      <InstitutionalEducationDrawer 
        isOpen={educationDrawerOpen} 
        onClose={() => setEducationDrawerOpen(false)}
        totalAnalyzed={total_analyzed}
      />
    </div>
  );
};

export default PortfolioDashboard;