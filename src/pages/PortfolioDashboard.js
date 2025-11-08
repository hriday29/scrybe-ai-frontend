import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, CheckCircle, 
  XCircle, Filter, Search, ArrowUpCircle, ArrowDownCircle,
  PieChart, BarChart3, Activity, Eye, Target, Shield
} from 'lucide-react';
import { API_BASE_URL } from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import MarketRegimeCard from '../components/specific/MarketRegimeCard';
import SectorHeatmapCard from '../components/specific/SectorHeatmapCard';

const GlassCard = ({ className = '', children, onClick }) => (
  <motion.div
    whileHover={onClick ? { scale: 1.02 } : {}}
    className={`bg-white border border-gray-200 backdrop-blur-none shadow-2xl shadow-gray-200 rounded-2xl ${className} ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

const StatCard = ({ icon: Icon, label, value, subtitle, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    red: 'from-red-500/20 to-red-600/20 border-red-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
  };

  return (
    <GlassCard className={`p-6 bg-gradient-to-br ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-gray-600 text-xs">{subtitle}</p>}
        </div>
        <Icon className="w-8 h-8 text-gray-700" />
      </div>
    </GlassCard>
  );
};

const SignalBadge = ({ signal }) => {
  if (signal === 'BUY') {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold">
        <ArrowUpCircle className="w-3 h-3" />
        BUY
      </span>
    );
  }
  if (signal === 'SHORT') {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold">
        <ArrowDownCircle className="w-3 h-3" />
        SHORT
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-xs font-bold">
      HOLD
    </span>
  );
};

const ExecutedTradeCard = ({ trade, rank }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/stock/${trade.ticker}`);
  };

  return (
    <GlassCard className="p-4 hover:border-blue-500/50 transition-all" onClick={handleClick}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            #{rank || '?'}
          </div>
          <div>
            <h4 className="text-gray-900 font-bold text-lg">{trade.ticker}</h4>
            <p className="text-gray-600 text-sm">{trade.sector || 'Unknown Sector'}</p>
          </div>
        </div>
        <SignalBadge signal={trade.signal} />
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
        <div>
          <p className="text-gray-600 text-xs mb-1">Entry</p>
          <p className="text-gray-900 font-semibold">₹{trade.entry_price?.toFixed(2) || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs mb-1">Target</p>
          <p className="text-green-600 dark:text-green-400 font-semibold">₹{trade.target?.toFixed(2) || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs mb-1">Stop Loss</p>
          <p className="text-red-600 dark:text-red-400 font-semibold">₹{trade.stop_loss?.toFixed(2) || 'N/A'}</p>
        </div>
      </div>
      
      {trade.selection_reason && (
        <div className="pt-3 border-t border-gray-200">
          <p className="text-gray-700 dark:text-gray-300 text-xs flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            {trade.selection_reason}
          </p>
        </div>
      )}
    </GlassCard>
  );
};

const AnalysisRow = ({ analysis }) => {
  const navigate = useNavigate();
  
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

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => navigate(`/stock/${analysis.ticker}`)}
    >
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <p className="text-gray-900 font-semibold">{analysis.ticker}</p>
            <p className="text-gray-600 text-xs">{analysis.sector || 'Unknown'}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <SignalBadge signal={analysis.signal} />
      </td>
      <td className="px-4 py-4">
        <span className={`font-bold ${analysis.scrybeScore >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {analysis.scrybeScore >= 0 ? '+' : ''}{analysis.scrybeScore || 0}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-gray-900 font-semibold">
          #{analysis.portfolio_rank || 'N/A'}
        </span>
      </td>
      <td className="px-4 py-4 max-w-md">
        <p className={`text-sm ${getReasonColor()}`}>
          {analysis.selection_reason || 'No reason provided'}
        </p>
      </td>
    </motion.tr>
  );
};

const PortfolioDashboard = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('executed'); // executed, not-selected, all
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSignal, setFilterSignal] = useState('all'); // all, BUY, SHORT, HOLD

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/portfolio-summary`);
        if (!response.ok) throw new Error('Failed to fetch portfolio data');
        const data = await response.json();
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const filteredAnalyses = useMemo(() => {
    if (!portfolioData?.all_analyses) return [];

    let filtered = portfolioData.all_analyses;

    // Tab filtering
    if (activeTab === 'executed') {
      filtered = filtered.filter(a => a.is_executed);
    } else if (activeTab === 'not-selected') {
      filtered = filtered.filter(a => !a.portfolio_selected && a.signal !== 'HOLD');
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
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-teal-50/30 to-purple-50/40 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-primary-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-900 text-xl font-semibold">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-teal-50/30 to-purple-50/40 flex items-center justify-center">
        <GlassCard className="p-8 max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Failed to Load</h2>
          <p className="text-gray-700 text-center">{error}</p>
        </GlassCard>
      </div>
    );
  }

  const { portfolio_summary, sector_breakdown, executed_trades, total_analyzed, display_timestamp, prediction_for_date, prediction_for_date_short } = portfolioData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-teal-50/30 to-purple-50/40 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-secondary-500 to-purple-600 mb-4">
            Portfolio Management Dashboard
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            AI analyzes <span className="text-gray-900 dark:text-white font-bold">~{total_analyzed} candidates</span> • 
            Portfolio executes <span className="text-green-600 dark:text-green-400 font-bold"> Top {portfolio_summary.selected_for_execution}</span>
          </p>
          <p className="text-gray-600 text-sm mt-2">Last Updated: {display_timestamp}</p>
          {prediction_for_date && (
            <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-300">
              <span className="text-primary-700 text-sm font-semibold">📅 Analysis for: {prediction_for_date_short || prediction_for_date}</span>
            </div>
          )}
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

        {/* Portfolio Management Education Section */}
        <GlassCard className="p-8 mb-12 border-2 border-primary-300">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Institutional Portfolio Management Process</h2>
          </div>
          
          <div className="space-y-6 text-gray-700">
            {/* Introduction */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary-600" />
                How Scrybe AI Works as Your Portfolio Manager
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Scrybe AI doesn't just analyze stocks—it manages a portfolio like an institutional fund manager. 
                Every day, our AI analyzes <span className="text-gray-900 font-semibold">all 250 Nifty Smallcap stocks</span>, 
                but only executes the <span className="text-green-600 font-semibold">top 10 highest-conviction opportunities</span> that 
                pass strict risk controls.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This isn't swing trading—it's <span className="text-primary-600 font-semibold">institutional positioning</span> with 
                multi-layer AI analysis, quantitative screening, and professional risk management built into every decision.
              </p>
            </div>

            {/* Daily Process */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">📊 Step 1: Daily Analysis</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <span className="text-gray-900 font-semibold">250 stocks screened</span> daily using quantitative filters</li>
                  <li>• <span className="text-gray-900 font-semibold">~{total_analyzed} candidates</span> pass initial momentum/trend screens</li>
                  <li>• Each candidate analyzed by AI "Committee of Experts":</li>
                  <li className="ml-4">→ Technical Analyst (charts, indicators, momentum)</li>
                  <li className="ml-4">→ Fundamental Analyst (valuation, growth, quality)</li>
                  <li className="ml-4">→ Risk Analyst (volatility, futures basis, options)</li>
                  <li className="ml-4">→ Head of Strategy (final synthesis, conviction score)</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">🎯 Step 2: Portfolio Selection</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Only <span className="text-green-600 font-semibold">BUY signals with Scrybe Score ≥ 45</span> considered</li>
                  <li>• Ranked by conviction (highest score = highest priority)</li>
                  <li>• Portfolio Manager applies <span className="text-gray-900 font-semibold">3 risk gates:</span></li>
                  <li className="ml-4">→ <span className="text-yellow-600">Max 10 concurrent positions</span></li>
                  <li className="ml-4">→ <span className="text-yellow-600">Max 40% per sector</span> (4 stocks max)</li>
                  <li className="ml-4">→ <span className="text-yellow-600">Max 2% risk per position</span></li>
                  <li>• Top 10 that pass all gates = <span className="text-green-600 font-semibold">EXECUTED</span></li>
                  <li>• Others = <span className="text-gray-600">Available for review</span></li>
                </ul>
              </div>
            </div>

            {/* Position Sizing */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-3">💰 Position Sizing & Risk Management</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Risk Per Trade</p>
                  <p className="text-2xl font-bold text-yellow-600">1.5%</p>
                  <p className="text-xs text-gray-600 mt-1">Of total capital at risk per position</p>
                </div>
                <div className="bg-white rounded p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Stop-Loss Method</p>
                  <p className="text-2xl font-bold text-red-600">2× ATR</p>
                  <p className="text-xs text-gray-600 mt-1">Dynamic stop based on volatility</p>
                </div>
                <div className="bg-white rounded p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Risk/Reward Target</p>
                  <p className="text-2xl font-bold text-green-600">3:1</p>
                  <p className="text-xs text-gray-600 mt-1">Target = 6× ATR above entry</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="text-gray-900 font-semibold">Position Size Calculation:</span> If you have ₹1,00,000 capital 
                and risk 1.5% per trade (₹1,500), with a stop-loss 5% below entry, you'd invest 
                <span className="text-green-600 font-semibold"> ₹30,000</span> (₹1,500 ÷ 5% = ₹30,000). 
                This ensures controlled risk regardless of stock price or volatility.
              </p>
            </div>

            {/* Trade Execution */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-3">⚡ Trade Execution & Monitoring</h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Entry Price:</p>
                    <p>System uses <span className="text-green-600">live market price (LTP)</span> from Angel One for precise entry calculation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Stop-Loss & Target:</p>
                    <p>Automatically calculated using ATR (Average True Range) for volatility-adjusted exits</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Holding Period:</p>
                    <p>Typically 7 days, adjusted based on market conditions and momentum</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Exit Triggers:</p>
                    <p>Position closes on: Target hit, Stop-loss hit, Holding period expiry, or AI reversal signal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparency */}
            <div className="bg-gradient-to-r from-primary-100/50 to-secondary-100/50 rounded-lg p-6 border border-primary-300">
              <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary-600" />
                Complete Transparency
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Unlike black-box trading algorithms, Scrybe AI shows you <span className="text-gray-900 font-semibold">every analysis, 
                every decision, and every rejection reason</span>. Browse all 250 analyses in the 
                <span className="text-primary-600 font-semibold"> Complete Analysis</span> page, understand why stocks were 
                selected or rejected, and see the exact trade plan for every position. You're not following blind 
                signals—you're learning institutional portfolio management.
              </p>
            </div>
          </div>
        </GlassCard>

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
            subtitle="Not selected (portfolio full)"
            color="yellow"
          />
          <StatCard
            icon={Shield}
            label="Risk Protected"
            value={`${portfolio_summary.sector_limits_reached}`}
            subtitle="Blocked by sector limits"
            color="purple"
          />
        </div>

        {/* Sector Breakdown */}
        {executed_trades.length > 0 && (
          <GlassCard className="p-6 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Sector Diversification</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(sector_breakdown).map(([sector, count]) => (
                <div key={sector} className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-600 text-sm mb-2">{sector}</p>
                  <p className="text-3xl font-bold text-gray-900">{count}</p>
                  <p className="text-gray-600 text-xs mt-1">
                    {((count / portfolio_summary.selected_for_execution) * 100).toFixed(0)}% of portfolio
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Executed Trades Section */}
        {executed_trades.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-7 h-7 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Executed Trades ({executed_trades.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executed_trades.map((trade) => (
                <ExecutedTradeCard key={trade._id} trade={trade} rank={trade.portfolio_rank} />
              ))}
            </div>
          </div>
        )}

        {/* All Analyses Browser */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900">Browse All Analyses</h2>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { id: 'executed', label: 'Executed', count: executed_trades.length },
              { id: 'not-selected', label: 'Not Selected', count: portfolio_summary.high_conviction_not_selected + portfolio_summary.sector_limits_reached },
              { id: 'all', label: 'All Analyses', count: total_analyzed }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by ticker, sector, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <select
                value={filterSignal}
                onChange={(e) => setFilterSignal(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-primary-500 appearance-none"
              >
                <option value="all">All Signals</option>
                <option value="BUY">BUY Only</option>
                <option value="SHORT">SHORT Only</option>
                <option value="HOLD">HOLD Only</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-3 text-gray-600 text-sm font-semibold">Stock</th>
                  <th className="px-4 py-3 text-gray-600 text-sm font-semibold">Signal</th>
                  <th className="px-4 py-3 text-gray-600 text-sm font-semibold">Score</th>
                  <th className="px-4 py-3 text-gray-600 text-sm font-semibold">Rank</th>
                  <th className="px-4 py-3 text-gray-600 text-sm font-semibold">Selection Reason</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredAnalyses.map((analysis) => (
                    <AnalysisRow key={analysis._id} analysis={analysis} />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {filteredAnalyses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300 text-lg">No analyses match your filters</p>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Footer Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 text-gray-700 dark:text-gray-300 text-sm">
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">{portfolio_summary.selected_for_execution}</span> Executing
            </div>
            <div>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">{portfolio_summary.high_conviction_not_selected}</span> High Conviction
            </div>
            <div>
              <span className="font-semibold text-orange-600 dark:text-orange-400">{portfolio_summary.sector_limits_reached}</span> Sector Limited
            </div>
            <div>
              <span className="font-semibold text-gray-600 dark:text-gray-300">{portfolio_summary.no_signal_generated}</span> HOLD Signals
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
