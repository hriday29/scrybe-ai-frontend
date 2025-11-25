// src/pages/OpenPositions.js - Enhanced Fund Dashboard

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    TrendingUp, TrendingDown, Target, Shield, AlertCircle, 
    Activity, Clock, Eye, RefreshCw, BarChart2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getOpenTrades } from '../api/api';
import MyTradeJournal from '../components/specific/MyTradeJournal';

const GlassCard = ({ className = '', children, variant = 'default' }) => {
  const variants = {
    default: 'bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800',
    elevated: 'bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 shadow-lg',
    subtle: 'bg-gray-50 dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${variants[variant]} backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
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
        <TrendingUp className="w-3.5 h-3.5" />
        BUY
      </span>
    );
  }
  if (signal === 'SHORT') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} rounded-lg bg-gradient-to-r from-rose-500/20 to-red-500/20 dark:from-rose-900/30 dark:to-red-900/30 border border-rose-500/40 dark:border-rose-700 text-rose-700 dark:text-rose-300 font-bold shadow-sm`}>
        <TrendingDown className="w-3.5 h-3.5" />
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

const StatCard = ({ icon: Icon, label, value, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20',
    green: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20',
    red: 'from-rose-50 to-rose-100/50 dark:from-rose-950/30 dark:to-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-500/20',
  };

  const [bgClass, borderClass, iconColor, iconBg] = colorClasses[color].split(' ');

  return (
    <GlassCard variant="elevated" className={`p-6 bg-gradient-to-br ${bgClass} border ${borderClass}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">{label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{value}</p>
      </div>
    </GlassCard>
  );
};

const OpenPositions = ({ onAnalyze }) => {
    const { currentUser, authFetch } = useAuth();
    const [openTrades, setOpenTrades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            setIsLoading(false);
            setOpenTrades([]);
            return;
        }
        const fetchOpenTrades = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getOpenTrades(authFetch, currentUser);
                setOpenTrades(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOpenTrades();
    }, [currentUser, authFetch]);

    // Calculate portfolio metrics
    const portfolioMetrics = {
        totalPositions: openTrades.length,
        profitablePositions: openTrades.filter(t => t.pnl_percent > 0).length,
        losingPositions: openTrades.filter(t => t.pnl_percent < 0).length,
        avgPnl: openTrades.length > 0 
            ? (openTrades.reduce((sum, t) => sum + t.pnl_percent, 0) / openTrades.length).toFixed(2)
            : 0
    };

    const renderTradeCockpit = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center p-16">
                    <RefreshCw className="w-12 h-12 text-primary-600 dark:text-primary-400 animate-spin mb-4" />
                    <p className="text-gray-900 dark:text-gray-100 text-xl font-semibold">Loading Active Positions...</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Fetching real-time trade data</p>
                </div>
            );
        }

        if (error) {
            return (
                <GlassCard variant="elevated" className="p-8 max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Error Loading Positions</h3>
                            <p className="text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    </div>
                </GlassCard>
            );
        }

        if (!currentUser) {
            return (
                <GlassCard variant="elevated" className="p-12 text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Login Required</h3>
                    <p className="text-gray-600 dark:text-gray-400">Please log in to view active positions and monitor trades.</p>
                </GlassCard>
            );
        }

        if (openTrades.length === 0) {
            return (
                <GlassCard variant="elevated" className="p-12 text-center max-w-3xl mx-auto">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No Active Positions</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        The AI is not currently tracking any active trades. Check the Portfolio Manager
                        to see all 250 analyzed stocks and understand why no positions meet the execution criteria today.
                    </p>
                </GlassCard>
            );
        }

        const PnlProgressBar = ({ trade }) => {
            const totalRange = Math.abs(trade.target - trade.stop_loss);
            const progress = Math.abs(trade.current_price - trade.entry_price);
            const progressPercent = Math.min((progress / totalRange) * 100, 100);
            const isProfit = trade.pnl_percent >= 0;
            return (
                <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2 my-2">
                    <div 
                        className={`h-2 rounded-full transition-all ${isProfit ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gradient-to-r from-rose-500 to-red-500'}`} 
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            );
        };

        return (
            <GlassCard variant="elevated">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-neutral-800/50 border-b-2 border-gray-200 dark:border-neutral-700">
                                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Signal</th>
                                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Strategy</th>
                                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Entry Date</th>
                                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Days Held</th>
                                <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">P&L</th>
                                <th className="px-6 py-4 text-right text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Entry</th>
                                <th className="px-6 py-4 text-right text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Current</th>
                                <th className="px-6 py-4 text-right text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Target</th>
                                <th className="px-6 py-4 text-right text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Stop Loss</th>
                                <th className="px-6 py-4 text-center text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">R/R</th>
                                <th className="px-6 py-4 text-center text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openTrades.map((trade, index) => {
                                const isProfit = trade.pnl_percent >= 0;
                                const entryDate = new Date(trade.entry_date);
                                const expiryDate = trade.expiry_date ? new Date(trade.expiry_date) : null;
                                const daysToExpiry = expiryDate ? Math.max(0, Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24))) : null;
                                
                                return (
                                    <motion.tr 
                                        key={trade.ticker}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-gray-100 dark:border-neutral-800 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 transition-all group"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-gray-900 dark:text-gray-100 font-bold text-base group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                    {trade.ticker}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">{trade.companyName}</p>
                                                {trade.price_is_stale && (
                                                    <p className="text-amber-600 dark:text-amber-400 text-xs font-medium flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        Price may be stale
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <SignalBadge signal={trade.signal} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                                                <BarChart2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                                                <span className="text-purple-700 dark:text-purple-300 font-semibold text-sm">{trade.strategy || 'VST'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <p className="text-gray-900 dark:text-gray-100 font-medium">
                                                    {entryDate.toLocaleDateString('en-IN')}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400 text-xs">
                                                    {entryDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                                                    <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                                    <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">{trade.days_held}d</span>
                                                </div>
                                                {daysToExpiry !== null && (
                                                    <span className={`text-xs font-medium ${daysToExpiry <= 2 ? 'text-red-600 dark:text-red-400' : daysToExpiry <= 5 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                                        {daysToExpiry}d left
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 w-48">
                                            <div className="flex items-center gap-2 mb-1">
                                                {isProfit ? (
                                                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                                ) : (
                                                    <TrendingDown className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                                )}
                                                <span className={`font-mono font-bold text-lg ${isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                                    {trade.pnl_percent >= 0 ? '+' : ''}{trade.pnl_percent.toFixed(2)}%
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                Gross: {trade.gross_pnl_percent >= 0 ? '+' : ''}{trade.gross_pnl_percent?.toFixed(2) || 'N/A'}%
                                            </div>
                                            <PnlProgressBar trade={trade} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-2 border border-gray-200 dark:border-neutral-700">
                                                <p className="font-mono text-gray-900 dark:text-gray-100 font-semibold">₹{trade.entry_price.toFixed(2)}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className={`rounded-lg p-2 border ${isProfit ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'}`}>
                                                <p className={`font-mono font-bold ${isProfit ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                                                    ₹{trade.current_price.toFixed(2)}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-2 border border-emerald-200 dark:border-emerald-800">
                                                <p className="font-mono text-emerald-700 dark:text-emerald-300 font-semibold">₹{trade.target.toFixed(2)}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="bg-rose-50 dark:bg-rose-950/20 rounded-lg p-2 border border-rose-200 dark:border-rose-800">
                                                <p className="font-mono text-rose-700 dark:text-rose-300 font-semibold">₹{trade.stop_loss.toFixed(2)}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                                                <Target className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                                                <span className="font-mono text-purple-700 dark:text-purple-300 font-bold text-sm">1:{trade.risk_reward_ratio}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => onAnalyze(trade.ticker)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary-500/20"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Analyze
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        );
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-8 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full"></div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                    Scrybe Fund Dashboard
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-base mt-1">
                                    Real-time monitoring of active positions & trade execution
                                </p>
                            </div>
                        </div>

                        {/* Current Date & Time */}
                        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Current Date & Time</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {new Date().toLocaleDateString('en-IN', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric',
                                                timeZone: 'Asia/Kolkata'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">IST Time</p>
                                    <p className="text-xl font-mono font-bold text-gray-900 dark:text-gray-100">
                                        {new Date().toLocaleTimeString('en-IN', { 
                                            hour12: false,
                                            timeZone: 'Asia/Kolkata'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Metrics */}
                        {openTrades.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                <StatCard
                                    icon={BarChart2}
                                    label="Active Positions"
                                    value={portfolioMetrics.totalPositions}
                                    color="blue"
                                />
                                <StatCard
                                    icon={TrendingUp}
                                    label="Profitable"
                                    value={portfolioMetrics.profitablePositions}
                                    color="green"
                                />
                                <StatCard
                                    icon={TrendingDown}
                                    label="Losing"
                                    value={portfolioMetrics.losingPositions}
                                    color="red"
                                />
                                <StatCard
                                    icon={Activity}
                                    label="Avg P&L"
                                    value={`${portfolioMetrics.avgPnl}%`}
                                    color={portfolioMetrics.avgPnl >= 0 ? 'green' : 'red'}
                                />
                            </div>
                        )}
                    </div>

                    {/* Trade Table */}
                    {renderTradeCockpit()}
                </div>
            </div>

            {/* Trade Journal */}
            {currentUser && <MyTradeJournal />}
        </>
    );
};

export default OpenPositions;
