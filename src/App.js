// src/App.js

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Fix missing imports for error and skeleton loader components
import { ErrorDisplay, SkeletonLoader } from './pages/StockAnalysis.js';
import { Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BarChart3, Filter, Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Activity, AlertTriangle } from 'lucide-react';
import { signInWithGoogle, signInWithTwitter, signOut } from './firebase';
import { getAnalysis, getTrackRecord } from './api/api.js';

// Styles
import './assets/styles/App.css';

// Layout Components
// Removed dark-themed AppBackground and Footer import for light overhaul
import Header from './components/layout/Header.js'; // Unified light Header

// Common Components (Modals)
import BetaInfoModal from './components/common/BetaInfoModal.js';
import DisclaimerModal from './components/common/DisclaimerModal.js';
import SignInModal from './components/common/SignInModal.js';

// Specific Components
import ApexAnalysisDashboard from './components/specific/ApexAnalysisDashboard.js';
import ConfidencePoll from './components/specific/ConfidencePoll.js';
import ConversationalQa from './components/specific/ConversationalQa.js';
import FeedbackWidget from './components/specific/FeedbackWidget.js';
import HolidayBanner from './components/specific/HolidayBanner.js';
import NewsSection from './components/specific/NewsSection.js';
import TradeJournalCard from './components/specific/TradeJournalCard.js';
import MarketRegimeCard from './components/specific/MarketRegimeCard.js';
import SectorHeatmapCard from './components/specific/SectorHeatmapCard.js';
import MarketBreadthCard from './components/specific/MarketBreadthCard.js';

// Page Components
import AppGuide from './pages/AppGuide.js';
import FaqPage from './pages/FaqPage.js';
import ContactPage from './pages/ContactPage.js';
import OpenPositions from './pages/OpenPositions.js';
import Rulebook from './pages/Rulebook.js';
import StockDetailPage from './pages/StockDetailPage.js';
import UserGuidePage from './pages/UserGuidePage.js';
import IndexAnalysis from './pages/IndexAnalysis.js';
import PortfolioDashboard from './pages/PortfolioDashboard.js';
import PaymentStatusPage from './pages/payment/PaymentStatusPage.js';

// New Landing and Legal Pages
import NewLandingPage from './pages/NewLandingPage.js';
import NewPrivacyPolicy from './pages/legal/NewPrivacyPolicy.js';
import NewTermsOfService from './pages/legal/NewTermsOfService.js';
import NewDisclaimer from './pages/legal/NewDisclaimer.js';
import NewRefundPolicy from './pages/legal/NewRefundPolicy.js';
import NewPaymentsTerms from './pages/legal/NewPaymentsTerms.js';
import NewPaymentsPrivacy from './pages/legal/NewPaymentsPrivacy.js';
import NewLegalNotice from './pages/legal/NewLegalNotice.js';

// Context, Services, and Config
import { useAuth } from './context/AuthContext.js';
import ProfilePage from './pages/ProfilePage.js';
import { isPaymentComplete } from './utils/paymentStatus.js';
import { PROFILE_LOCK_ENABLED } from './config/payment';
import { API_BASE_URL } from './apiConfig.js';
import { apexDemoData } from './utils/demoData.js';
import { MAINTENANCE_CONFIG } from './config/maintenance.js';
import MaintenancePage from './pages/MaintenancePage.js';

// =========================================================================
// Visual helpers
// =========================================================================

const GlassCard = ({ className = '', children }) => (
  <div
    className={`bg-white border border-gray-200 shadow-soft-lg ${className} rounded-2xl`}
  >
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center">
    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-secondary-600 leading-tight pb-2">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

// =========================================================================
// Demo Modal
// =========================================================================

const DemoModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="relative w-full max-w-5xl mx-auto max-h-[85vh] overflow-y-auto"
    >
      <GlassCard className="relative p-8 mt-6 rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close demo"
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {/* Dashboard */}
        <ApexAnalysisDashboard analysisData={apexDemoData} />
      </GlassCard>
    </motion.div>
  </div>
);

// =========================================================================
// Stock Selector
// =========================================================================

const StockSelector = ({ onAnalyze }) => {
  const [stocks, setStocks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        // We only need to fetch the pre-computed analysis list.
        const response = await fetch(`${API_BASE_URL}/api/all-analysis`);
        if (!response.ok) throw new Error("Failed to load stock analysis data.");
        
        const analysisData = await response.json();

        // The list is already filtered by the backend, so we just need to sort it.
        analysisData.sort((a, b) => (b.scrybeScore || 0) - (a.scrybeScore || 0));
        
        setStocks(analysisData);
      } catch (err) {
        // If the fetch fails, we can use a more generic error message.
        setError(new Error("Failed to load analysis data."));
      } finally {
        setIsLoading(false);
      }
    };
    fetchStocks();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStocks = useMemo(() => {
    if (!stocks) return [];
    const list = stocks;
    if (!searchTerm) return list;
    const term = searchTerm.toLowerCase();
    return list.filter(
      (stock) =>
        (stock.companyName && stock.companyName.toLowerCase().includes(term)) ||
        (stock.ticker && stock.ticker.toLowerCase().includes(term))
    );
  }, [stocks, searchTerm]);

  const ScoreBadge = ({ score }) => {
    if (typeof score !== "number" || isNaN(score)) {
      return (
        <span className="font-mono font-semibold text-sm px-2.5 py-1 rounded-md text-gray-500 bg-gray-100 ring-1 ring-inset ring-gray-300">
          N/A
        </span>
      );
    }
    const scoreColor =
      score > 49
        ? "text-success-700 bg-success-50 ring-success-300"
        : score < -49
        ? "text-red-700 bg-red-50 ring-red-300"
        : "text-gray-700 bg-gray-100 ring-gray-300";
    const scoreText = score > 0 ? `+${score.toFixed(0)}` : score.toFixed(0);
    return (
      <span
        className={`font-mono font-semibold text-sm px-2.5 py-1 rounded-md ring-1 ring-inset ${scoreColor}`}
      >
        {scoreText}
      </span>
    );
  };

  // Removed unused FilterButton (legacy)

  if (error) {
    return (
      <ErrorDisplay
        error={error.message}
        onReset={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center pt-20 pb-24">
      <GlassCard className="px-6 py-10 w-full max-w-4xl text-center shadow-2xl">
        <SectionTitle
          title="Ranked Analysis Universe"
          subtitle="Daily ranked analysis for all NSE stocks, powered by Scrybe Score."
        />
      </GlassCard>

      {/* Market context is now shown in a drawer via the floating button */}

      {/* Search + results container */}
      <div className="mt-10 w-full max-w-2xl space-y-4">
        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="text-gray-400 h-5 w-5" />
          </div>
          <input
            type="text"
            aria-label="Search stocks"
            placeholder={isLoading ? "Loading ranked list..." : "Search for a stock..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-500 text-lg rounded-xl py-3 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-soft"
            disabled={isLoading}
          />
        </div>

        {/* Results list */}
        <GlassCard className="max-h-96 overflow-y-auto divide-y divide-gray-100">
          {isLoading && (
            <p className="text-gray-500 text-center p-4">Loading...</p>
          )}
          {!isLoading && filteredStocks.length === 0 && (
            <p className="text-gray-500 text-center p-4">
              No setups found for the current filter.
            </p>
          )}
          {!isLoading &&
            filteredStocks.map((stock, index) => (
              <button
                key={stock.ticker}
                onClick={() => onAnalyze(stock.ticker)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-primary-50 transition-colors rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-gray-500 text-sm w-8">
                    {index + 1}.
                  </span>
                  <span className="font-semibold text-gray-900 group-hover:text-primary-600">
                    {stock.companyName}
                  </span>
                  <span className="text-xs text-gray-500">{stock.ticker}</span>
                </div>
                <ScoreBadge score={stock.scrybeScore} />
              </button>
            ))}
        </GlassCard>
      </div>
    </div>
  );
};

// =========================================================================
// AI Track Record (Enhanced institutional design)
// =========================================================================

const AITrackRecord = () => {
  const [trackRecordData, setTrackRecordData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [signalFilter, setSignalFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('close_date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const itemsPerPage = 25;

  useEffect(() => {
    let isMounted = true;
    const fetchTrackRecord = async () => {
      try {
        const data = await getTrackRecord();
        const processedData = data.map((trade) => {
          const openDate = new Date(trade.open_date);
          const closeDate = new Date(trade.close_date);
          const timeDiff = closeDate.getTime() - openDate.getTime();
          const daysHeld = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
          return { ...trade, days_held: daysHeld };
        });

        if (isMounted) {
          setTrackRecordData(processedData);
          setFilteredData(processedData);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    };
    fetchTrackRecord();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and sort data
  useEffect(() => {
    if (!trackRecordData) return;

    let filtered = [...trackRecordData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(trade =>
        trade.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (trade.companyName && trade.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Signal filter
    if (signalFilter !== 'all') {
      filtered = filtered.filter(trade => trade.signal === signalFilter);
    }

    // [REPLACEMENT AUDIT] Reason filter including replacements
    if (reasonFilter !== 'all') {
      const reasonMap = {
        'target_hit': 'target hit',
        'stop_loss_hit': 'stop-loss hit',
        'time_exit': 'time exit',
        'position_replaced': 'position replaced'
      };
      filtered = filtered.filter(trade =>
        trade.closing_reason && trade.closing_reason.toLowerCase().includes(reasonMap[reasonFilter] || reasonFilter)
      );
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      switch (dateRange) {
        case 'last_30_days':
          filterDate.setDate(now.getDate() - 30);
          break;
        case 'last_90_days':
          filterDate.setDate(now.getDate() - 90);
          break;
        case 'last_6_months':
          filterDate.setMonth(now.getMonth() - 6);
          break;
        case 'last_year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      filtered = filtered.filter(trade => new Date(trade.close_date) >= filterDate);
    }

    // Sort data
    filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'ticker':
          aVal = a.ticker;
          bVal = b.ticker;
          break;
        case 'signal':
          aVal = a.signal;
          bVal = b.signal;
          break;
        case 'open_date':
          aVal = new Date(a.open_date);
          bVal = new Date(b.open_date);
          break;
        case 'close_date':
          aVal = new Date(a.close_date);
          bVal = new Date(b.close_date);
          break;
        case 'days_held':
          aVal = a.days_held;
          bVal = b.days_held;
          break;
        case 'net_return_pct':
          aVal = a.net_return_pct;
          bVal = b.net_return_pct;
          break;
        default:
          aVal = new Date(a.close_date);
          bVal = new Date(b.close_date);
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [trackRecordData, searchTerm, signalFilter, reasonFilter, dateRange, sortBy, sortOrder]);

  const getReasonDisplay = (reason) => {
    if (!reason) return {
      text: 'Closed',
      color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      icon: '⚪'
    };
    const lower = reason.toLowerCase();
    
    // [REPLACEMENT AUDIT] Handle replacement closures with conviction tier context
    if (lower.includes('position replaced')) {
      return {
        text: 'Position Replaced',
        color: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 border border-blue-300 dark:border-blue-700',
        icon: '🔄',
        tooltip: 'Position closed and replaced with a higher-conviction signal'
      };
    }
    
    if (lower.includes('target hit')) return {
      text: 'Target Hit',
      color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300 border border-green-300 dark:border-green-700',
      icon: '🎯'
    };
    if (lower.includes('stop-loss hit')) return {
      text: 'Stop-Loss Hit',
      color: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300 border border-red-300 dark:border-red-700',
      icon: '🛑'
    };
    if (lower.includes('time exit')) return {
      text: 'Time Exit',
      color: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-300 border border-amber-300 dark:border-amber-700',
      icon: '⏰'
    };
    return {
      text: 'Closed',
      color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      icon: '⚪'
    };
  };

  // Calculate performance metrics
  const performanceMetrics = useMemo(() => {
    if (!trackRecordData || trackRecordData.length === 0) return null;

    const totalTrades = trackRecordData.length;
    const winningTrades = trackRecordData.filter(t => t.net_return_pct > 0).length;
    const losingTrades = trackRecordData.filter(t => t.net_return_pct < 0).length;
    const winRate = (winningTrades / totalTrades) * 100;

    const totalReturn = trackRecordData.reduce((sum, t) => sum + t.net_return_pct, 0);
    const avgReturn = totalReturn / totalTrades;

    const bestTrade = trackRecordData.reduce((best, t) =>
      t.net_return_pct > best.net_return_pct ? t : best
    );
    const worstTrade = trackRecordData.reduce((worst, t) =>
      t.net_return_pct < worst.net_return_pct ? t : worst
    );

    const avgDaysHeld = trackRecordData.reduce((sum, t) => sum + t.days_held, 0) / totalTrades;

    // Calculate returns by signal
    const buyTrades = trackRecordData.filter(t => t.signal === 'BUY');
    const shortTrades = trackRecordData.filter(t => t.signal === 'SHORT');

    const buyWinRate = buyTrades.length > 0 ? (buyTrades.filter(t => t.net_return_pct > 0).length / buyTrades.length) * 100 : 0;
    const shortWinRate = shortTrades.length > 0 ? (shortTrades.filter(t => t.net_return_pct > 0).length / shortTrades.length) * 100 : 0;

    return {
      totalTrades,
      winningTrades,
      losingTrades,
      winRate,
      avgReturn,
      bestTrade,
      worstTrade,
      avgDaysHeld,
      buyTrades: buyTrades.length,
      shortTrades: shortTrades.length,
      buyWinRate,
      shortWinRate
    };
  }, [trackRecordData]);

  // Pagination
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTrades = filteredData?.slice(startIndex, endIndex) || [];

  const exportToCSV = () => {
    if (!filteredData || filteredData.length === 0) return;

    const headers = ['Ticker', 'Signal', 'Open Date', 'Close Date', 'Days Held', 'Closing Reason', 'Net Return %'];
    const csvData = filteredData.map(trade => [
      trade.ticker,
      trade.signal,
      new Date(trade.open_date).toLocaleDateString('en-IN'),
      new Date(trade.close_date).toLocaleDateString('en-IN'),
      trade.days_held,
      getReasonDisplay(trade.closing_reason).text,
      trade.net_return_pct.toFixed(2)
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `scrybe_track_record_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center py-8 px-4">
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 p-8 text-center shadow-lg max-w-2xl">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Unable to Load Track Record</h3>
        <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          This could be due to a temporary connection issue. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          <Activity className="w-4 h-4" />
          Retry
        </button>
      </div>
    </div>
  );

  if (!trackRecordData) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center py-8 px-4">
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 p-12 text-center shadow-lg max-w-md">
        <div className="relative inline-block mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-neutral-800"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 dark:border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Loading Track Record...</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Fetching all historical trades and calculating performance metrics</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                AI Track Record
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Complete transparency of historical performance
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800 p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-base">📊</span>
              </div>
              <div className="flex-1">
                <p className="text-blue-900 dark:text-blue-100 font-semibold mb-1">Verified Historical Performance</p>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                  Every trade executed by Scrybe AI is logged with exact entry/exit prices, timestamps, and closing reasons. Filter by date range, signal type, exit reason, and more to analyze performance patterns.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      {/* Performance Summary Cards */}
      {performanceMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Performance Overview
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <GlassCard className="p-5 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{performanceMetrics.totalTrades}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-semibold">Total Trades</div>
            </GlassCard>
            <GlassCard className="p-5 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{performanceMetrics.winRate.toFixed(1)}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-semibold">Win Rate</div>
            </GlassCard>
            <GlassCard className={`p-5 text-center hover:shadow-lg transition-shadow ${performanceMetrics.avgReturn >= 0 ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800' : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-200 dark:border-red-800'}`}>
              <div className={`text-2xl md:text-3xl font-bold mb-1 ${performanceMetrics.avgReturn >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {performanceMetrics.avgReturn >= 0 ? '+' : ''}{performanceMetrics.avgReturn.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-semibold">Avg Return</div>
            </GlassCard>
            <GlassCard className="p-5 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{performanceMetrics.avgDaysHeld.toFixed(0)}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-semibold">Avg Days Held</div>
            </GlassCard>
            <GlassCard className="p-5 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">+{performanceMetrics.bestTrade.net_return_pct.toFixed(2)}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-semibold">Best Trade</div>
            </GlassCard>
            <GlassCard className="p-5 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-200 dark:border-red-800">
              <div className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-1">{performanceMetrics.worstTrade.net_return_pct.toFixed(2)}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-semibold">Worst Trade</div>
            </GlassCard>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by ticker or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(searchTerm || signalFilter !== 'all' || reasonFilter !== 'all' || dateRange !== 'all') && (
              <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                {[searchTerm, signalFilter !== 'all', reasonFilter !== 'all', dateRange !== 'all'].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Advanced Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-neutral-900 rounded-xl p-5 border border-gray-200 dark:border-neutral-800 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">Advanced Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Signal</label>
              <select
                value={signalFilter}
                onChange={(e) => setSignalFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Signals</option>
                <option value="BUY">BUY</option>
                <option value="SHORT">SHORT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Exit Reason</label>
              <select
                value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Reasons</option>
                <option value="target_hit">Target Hit</option>
                <option value="stop_loss_hit">Stop-Loss Hit</option>
                <option value="time_exit">Time Exit</option>
                <option value="position_replaced">Position Replaced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Time</option>
                <option value="last_30_days">Last 30 Days</option>
                <option value="last_90_days">Last 90 Days</option>
                <option value="last_6_months">Last 6 Months</option>
                <option value="last_year">Last Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="close_date">Close Date</option>
                  <option value="ticker">Ticker</option>
                  <option value="signal">Signal</option>
                  <option value="net_return_pct">Return %</option>
                  <option value="days_held">Days Held</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div>
          Showing {startIndex + 1}-{Math.min(endIndex, filteredData?.length || 0)} of {filteredData?.length || 0} trades
        </div>
        {(searchTerm || signalFilter !== 'all' || reasonFilter !== 'all' || dateRange !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSignalFilter('all');
              setReasonFilter('all');
              setDateRange('all');
            }}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      <GlassCard className="overflow-hidden">
        {/* Mobile cards */}
        <div className="md:hidden space-y-4 p-4">
          {currentTrades.length > 0 ? (
            currentTrades.map((trade, index) => {
              const reasonDisplay = getReasonDisplay(trade.closing_reason);
              const returnColor = trade.net_return_pct >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400';
              const signalColor = trade.signal === 'BUY'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';

              return (
                <motion.div
                  key={trade._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-bold text-lg text-gray-900 dark:text-white">{trade.ticker}</div>
                      {trade.companyName && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">{trade.companyName}</div>
                      )}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${signalColor}`}>
                      {trade.signal}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Net Return</div>
                      <div className={`font-mono font-bold text-lg ${returnColor}`}>
                        {trade.net_return_pct >= 0 ? '+' : ''}{trade.net_return_pct.toFixed(2)}%
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Days Held</div>
                      <div className="text-gray-900 dark:text-white font-bold text-lg">{trade.days_held}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Closed</div>
                      <div className="text-gray-900 dark:text-white font-medium">
                        {new Date(trade.close_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${reasonDisplay.color} inline-flex items-center gap-1.5`}>
                      <span>{reasonDisplay.icon}</span>
                      {reasonDisplay.text}
                    </span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-20">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-lg font-semibold mb-2">No trades match your filters</div>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900">
                <tr>
                  {[
                    { key: 'ticker', label: 'Ticker' },
                    { key: 'signal', label: 'Signal' },
                    { key: 'entry_conviction_tier', label: 'Entry Conviction' },
                    { key: 'entry_score', label: 'Entry Score' },
                    { key: 'open_date', label: 'Open Date' },
                    { key: 'close_date', label: 'Close Date' },
                    { key: 'days_held', label: 'Days Held' },
                    { key: 'closing_reason', label: 'Exit Reason' },
                    { key: 'net_return_pct', label: 'Net Return' }
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="p-4 text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wider uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                      onClick={() => {
                        if (sortBy === key) {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy(key);
                          setSortOrder('desc');
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {label}
                        {sortBy === key && (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTrades.length > 0 ? (
                  currentTrades.map((trade, index) => {
                    const reasonDisplay = getReasonDisplay(trade.closing_reason);
                    const returnColor = trade.net_return_pct >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
                    const signalColor = trade.signal === 'BUY'
                      ? 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30'
                      : 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30';
                    return (
                      <motion.tr
                        key={trade._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="border-b border-gray-200 dark:border-gray-800 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10 transition-all duration-300"
                      >
                        <td className="p-4">
                          <div>
                            <div className="text-gray-900 dark:text-white font-bold">{trade.ticker}</div>
                            {trade.companyName && (
                              <div className="text-gray-600 dark:text-gray-400 text-xs">{trade.companyName}</div>
                            )}
                            {trade.is_sector_override && (
                              <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">🔄 Sector Override</div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-bold ${signalColor}`}>
                            {trade.signal}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="group relative">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold inline-block cursor-help ${
                              trade.entry_conviction_tier === 'EXCEPTIONAL' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                              trade.entry_conviction_tier === 'STRONG' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                              trade.entry_conviction_tier === 'MODERATE' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                              'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}>
                              {trade.entry_conviction_tier || 'N/A'}
                            </span>
                            {trade.entry_conviction_tier && (
                              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-900 dark:bg-gray-950 text-white dark:text-gray-100 text-xs rounded-lg p-2 whitespace-nowrap z-50 border border-gray-700">
                                <p>Tier when trade opened</p>
                                <p className="text-gray-300 text-xs mt-1">{trade.portfolio_rank ? `Rank #${trade.portfolio_rank}` : 'No rank data'}</p>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-sm font-mono font-bold text-gray-900 dark:text-white">
                            {trade.entry_score ? trade.entry_score.toFixed(1) : 'N/A'}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">
                          {new Date(trade.open_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">
                          {new Date(trade.close_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 font-semibold text-sm">{trade.days_held}</td>
                        <td className="p-4">
                          <div className="group relative">
                            <span className={`px-4 py-2 rounded-xl text-xs font-bold ${reasonDisplay.color} inline-flex items-center gap-1.5 cursor-help`}>
                              <span>{reasonDisplay.icon}</span>
                              {reasonDisplay.text}
                              {trade.replacement_ticker && <span className="ml-1 text-xs">→ {trade.replacement_ticker}</span>}
                            </span>
                            
                            {/* Tooltip with full closing reason and replacement details */}
                            {trade.closing_reason && (
                              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-900 dark:bg-gray-950 text-white dark:text-gray-100 text-xs rounded-lg p-3 z-50 border border-gray-700 dark:border-gray-800 max-w-sm">
                                <p className="font-semibold mb-2">Exit Reason:</p>
                                <p className="text-gray-200 dark:text-gray-300 mb-3">{trade.closing_reason}</p>
                                
                                {/* Replacement audit trail */}
                                {trade.replacement_ticker && (
                                  <div className="border-t border-gray-700 pt-2 mt-2">
                                    <p className="font-semibold text-blue-300 mb-1">Replacement Details:</p>
                                    <p className="text-gray-300">Replaced by: <span className="font-mono">{trade.replacement_ticker}</span></p>
                                    {trade.replacement_old_score && (
                                      <p className="text-gray-300 text-xs mt-1">Old Score: <span className="text-yellow-300">{trade.replacement_old_score.toFixed(1)}</span></p>
                                    )}
                                    {trade.replacement_new_score && (
                                      <p className="text-gray-300 text-xs">New Score: <span className="text-green-300">{trade.replacement_new_score.toFixed(1)}</span></p>
                                    )}
                                    {trade.replacement_reason && (
                                      <p className="text-gray-400 text-xs mt-1 italic">{trade.replacement_reason}</p>
                                    )}
                                  </div>
                                )}
                                
                                {/* Entry context summary */}
                                <div className="border-t border-gray-700 pt-2 mt-2">
                                  <p className="font-semibold text-indigo-300 text-xs mb-1">Entry Context:</p>
                                  <p className="text-gray-300 text-xs">Score: <span className="font-mono">{trade.entry_score?.toFixed(1) || 'N/A'}</span> | Tier: <span className="font-mono">{trade.entry_conviction_tier || 'N/A'}</span></p>
                                  {trade.portfolio_rank && (
                                    <p className="text-gray-300 text-xs">Rank: <span className="font-mono">#{trade.portfolio_rank}</span></p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className={`p-4 font-mono font-bold text-lg ${returnColor}`}>
                          {trade.net_return_pct >= 0 ? '+' : ''}{trade.net_return_pct.toFixed(2)}%
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-20">
                      <div className="text-6xl mb-4">🔍</div>
                      <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No trades match your filters</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              if (pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 border rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-neutral-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Track Record</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Export {filteredData?.length || 0} trades to CSV file. This includes all filtered results.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  exportToCSV();
                  setShowExportModal(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors font-semibold shadow-lg"
              >
                Export CSV
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 text-gray-800 dark:text-gray-200 py-2.5 px-4 rounded-lg transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

// =========================================================================
// MAIN APP COMPONENT
// =========================================================================

export default function App() {
  const { currentUser } = useAuth();
  const [view, setView] = useState("landing");
  const [showFaq, setShowFaq] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showPaymentsTerms, setShowPaymentsTerms] = useState(false);
  const [showPaymentsPrivacy, setShowPaymentsPrivacy] = useState(false);
  const [showLegalNotice, setShowLegalNotice] = useState(false);
  const [analysisState, setAnalysisState] = useState("selector");
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [postLoginRedirect, setPostLoginRedirect] = useState(null);
  const [isLongLoad, setIsLongLoad] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [marketStatus, setMarketStatus] = useState(null);
  const [isMarketDrawerOpen, setIsMarketDrawerOpen] = useState(false);
  const [globalMarketContext, setGlobalMarketContext] = useState(null);
  const longLoadTimerRef = useRef(null);

  // Reflect auth state
  useEffect(() => {
    if (currentUser) {
      setView("app");
      if (postLoginRedirect !== null) {
        setTabIndex(postLoginRedirect);
        setPostLoginRedirect(null);
      }
    } else {
      setView("landing");
    }
  }, [currentUser, postLoginRedirect]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (longLoadTimerRef.current) clearTimeout(longLoadTimerRef.current);
    };
  }, []);

  // Fetch market holiday status on mount
  useEffect(() => {
    const fetchMarketStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/market-status`);
        if (response.ok) {
          const status = await response.json();
          setMarketStatus(status);
        }
      } catch (err) {
        console.error('Failed to fetch market status:', err);
        // Silently fail - don't block app if endpoint is down
      }
    };
    fetchMarketStatus();
  }, []);

  // Fetch global market context - Use dedicated endpoint for better data
  // This fetches on app load, but drawer can also trigger fetch on demand
  const fetchGlobalMarketContext = useCallback(async () => {
    try {
      // Use the dedicated market-context endpoint for better data quality
      const response = await fetch(`${API_BASE_URL}/api/market-context`);
      if (response.ok) {
        const contextData = await response.json();
        if (contextData && !contextData.error) {
          setGlobalMarketContext(contextData);
          return contextData;
        } else {
          // Fallback to all-analysis if market-context endpoint fails
          const fallbackResponse = await fetch(`${API_BASE_URL}/api/all-analysis`);
          if (fallbackResponse.ok) {
            const analysisData = await fallbackResponse.json();
            if (analysisData.length > 0 && analysisData[0].market_context) {
              setGlobalMarketContext(analysisData[0].market_context);
              return analysisData[0].market_context;
            }
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch global market context:', err);
      setGlobalMarketContext({ error: 'Failed to fetch market context. Please try again.' });
    }
    return null;
  }, []);

  useEffect(() => {
    if (currentUser && view === 'app' && !globalMarketContext) {
      fetchGlobalMarketContext();
    }
  }, [currentUser, view, fetchGlobalMarketContext, globalMarketContext]);

  const handleStockSelect = useCallback((ticker) => setSelectedTicker(ticker), []);
  const handleBackToList = useCallback(() => setSelectedTicker(null), []);
  const navigateToTab = useCallback((index) => setTabIndex(index), []);

  const handleAgreeToDisclaimer = useCallback(() => {
    localStorage.setItem("disclaimerAgreedTimestamp", Date.now().toString());
    setShowDisclaimerModal(false);
    setView("app");
  }, []);

  const handleAuthAndNavigate = useCallback(
    (targetTabIndex) => {
      if (currentUser) {
        setView("app");
        setTabIndex(targetTabIndex);
      } else {
        setPostLoginRedirect(targetTabIndex);
        setIsSignInModalOpen(true);
      }
    },
    [currentUser]
  );

  const handleSignIn = useCallback(async () => {
    try {
      await signInWithGoogle();
      setIsSignInModalOpen(false);
    } catch (error) {
      console.error("Error during Google sign in:", error);
    }
  }, []);

  const handleTwitterSignIn = useCallback(async () => {
    try {
      await signInWithTwitter();
      setIsSignInModalOpen(false);
    } catch (error) {
      console.error("Error during Twitter sign in:", error);
    }
  }, []);

  const handleSignOut = useCallback(() => {
    signOut().catch((error) => console.error("Error during sign out:", error));
  }, []);

  // Close all legal / overlay pages in one place and optionally other pages
  const closeAllLegalPages = useCallback(() => {
    setShowPrivacy(false);
    setShowTerms(false);
    setShowDisclaimer(false);
    setShowRefund(false);
    setShowPaymentsTerms(false);
    setShowPaymentsPrivacy(false);
    setShowLegalNotice(false);
  }, []);

  const openLegal = useCallback((page) => {
    // Ensure only one legal / help page is open at a time
    // Close any FAQ/Contact pages that could be open
    setShowFaq(false);
    setShowContact(false);
    // Close any existing legal page
    closeAllLegalPages();

    // Open the requested page
    switch (page) {
      case 'privacy':
        setShowPrivacy(true);
        break;
      case 'terms':
        setShowTerms(true);
        break;
      case 'disclaimer':
        setShowDisclaimer(true);
        break;
      case 'refund':
        setShowRefund(true);
        break;
      case 'paymentsTerms':
        setShowPaymentsTerms(true);
        break;
      case 'paymentsPrivacy':
        setShowPaymentsPrivacy(true);
        break;
      case 'legalNotice':
        setShowLegalNotice(true);
        break;
      default:
        break;
    }

    // Make sure the page is shown from the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [closeAllLegalPages]);

  const handleResetAnalysis = useCallback(() => {
    setAnalysisState("selector");
    setAnalysisData(null);
    setError(null);
  }, []);

  const handleAnalysis = useCallback(async (ticker) => {
    if (!ticker) return;
    setTabIndex(1);
    setAnalysisState("analyzing");
    setError(null);
    setAnalysisData(null);

    if (longLoadTimerRef.current) clearTimeout(longLoadTimerRef.current);
    longLoadTimerRef.current = setTimeout(() => setIsLongLoad(true), 3000);

    try {
        // Use the standardized and corrected API function from api.js
        const data = await getAnalysis(ticker);

        if (longLoadTimerRef.current) {
            clearTimeout(longLoadTimerRef.current);
            longLoadTimerRef.current = null;
        }
        setIsLongLoad(false);

        setAnalysisData(data);
        setAnalysisState("results");
    } catch (err) {
      if (longLoadTimerRef.current) {
        clearTimeout(longLoadTimerRef.current);
        longLoadTimerRef.current = null;
      }
      setIsLongLoad(false);
      console.error("API Error:", err);
      setError(err.message);
      setAnalysisState("error");
    }
  }, []);

  const renderStockAnalysisContent = () => {
    switch (analysisState) {
      case "analyzing":
        return <SkeletonLoader isLongLoad={isLongLoad} />;
      case "results":
        return (
          <div>
            <ApexAnalysisDashboard analysisData={analysisData} handleResetAnalysis={handleResetAnalysis} />
            <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">
              {/* NEWS SECTION DISABLED - Commented out to save compute time */}
              {/* {analysisData?.news_context && analysisData.news_context.articles && analysisData.news_context.articles.length > 0 && (
                <NewsSection newsData={analysisData?.news_context} />
              )} */}
              <ConversationalQa analysisContext={analysisData} />
              <ConfidencePoll analysisId={analysisData?._id} />
              <TradeJournalCard analysisData={analysisData} />
            </div>
          </div>
        );
      case "error":
        return <ErrorDisplay error={error} onReset={handleResetAnalysis} />;
      case "selector":
      default:
        return <StockSelector onAnalyze={handleAnalysis} />;
    }
  };

  const renderMainApp = () => (
    <div className="w-full">
      {/* Market Holiday Banner - Shows at top when market is closed */}
      {marketStatus && (
        <div className="w-full px-4 md:px-6 lg:px-8 pt-4">
          <div className="max-w-7xl mx-auto">
            <HolidayBanner
              isHoliday={marketStatus.is_holiday}
              holidayReason={marketStatus.holiday_reason}
              nextTradingDay={marketStatus.next_trading_day_display}
            />
          </div>
        </div>
      )}

      {selectedTicker ? (
        <StockDetailPage ticker={selectedTicker} onBackClick={handleBackToList} />
      ) : (
        <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
          <div className="flex flex-wrap justify-center p-1 bg-white border border-gray-200 rounded-2xl sticky top-20 z-10 w-fit mx-auto shadow-sm mb-4 mt-4 px-4">
            {[
              { label: "App Guide", tooltip: "Learn how to use Scrybe AI effectively" },
              { label: "Stock Analysis", tooltip: "Get AI-powered analysis for any stock" },
              { label: "Scrybe Portfolio Manager", tooltip: "AI-powered portfolio construction & position management" },
              { label: "Scrybe Fund Dashboard", tooltip: "Real-time monitoring of active positions & trade execution" },
              { label: "Index Analysis", tooltip: "Analyze market indices (NIFTY, SENSEX)" },
              { label: "AI Track Record", tooltip: "See Scrybe AI's historical performance" },
              { label: "Rulebook", tooltip: "Understand the AI's trading strategy and rules" }
            ].map(({ label, tooltip }) => (
                <Tab
                  key={label}
                  title={tooltip}
                  className={({ selected }) =>
                    `px-6 py-2.5 text-md font-medium rounded-xl transition-all outline-none border focus:outline-none focus-visible:ring-0 select-none ${
                      selected
                        ? "bg-primary-50 text-primary-700 border-primary-200"
                        : "bg-white text-gray-600 hover:bg-gray-50 border-transparent"
                    }`
                  }
                >
                  {label}
                </Tab>
              )
            )}
          </div>

          <div className="w-full py-8">
            <Tab.Panels>
              <Tab.Panel>
                <AppGuide navigateToTab={navigateToTab} />
              </Tab.Panel>
              <Tab.Panel>{renderStockAnalysisContent()}</Tab.Panel>
              <Tab.Panel>
                <PortfolioDashboard onStockSelect={handleStockSelect} />
              </Tab.Panel>
              <Tab.Panel>
                <OpenPositions onAnalyze={handleAnalysis} />
              </Tab.Panel>
              <Tab.Panel>
                <IndexAnalysis />
              </Tab.Panel>
              <Tab.Panel>
                <AITrackRecord />
              </Tab.Panel>
              <Tab.Panel>
                <Rulebook />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      )}
    </div>
  );

// ✅ Final return with unified Header and Routes
  return (
    <Routes>
      {/* Payment Status Routes */}
      <Route path="/payment-success" element={<PaymentStatusPage />} />
      <Route path="/payment-failure" element={<PaymentStatusPage />} />
      
      {/* Main App Route */}
      <Route path="*" element={
        <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      {/* Check for maintenance mode first */}
      {MAINTENANCE_CONFIG.enabled && <MaintenancePage />}

      {/* Only show app content if not in maintenance mode */}
      {!MAINTENANCE_CONFIG.enabled && (
        <> {/* <--- Fragment Opened Here */}
          {/* Modals */}
          <AnimatePresence>
            {isSignInModalOpen && (
              <SignInModal
                onSignIn={handleSignIn}
                onTwitterSignIn={handleTwitterSignIn}
                onClose={() => setIsSignInModalOpen(false)}
                onTermsOpen={() => openLegal('terms')}
                onPrivacyOpen={() => openLegal('privacy')}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isBetaModalOpen && <BetaInfoModal onClose={() => setIsBetaModalOpen(false)} />}
          </AnimatePresence>
          <AnimatePresence>
            {isDemoOpen && <DemoModal onClose={() => setIsDemoOpen(false)} />}
          </AnimatePresence>
          <AnimatePresence>
            {showDisclaimerModal && <DisclaimerModal onAgree={handleAgreeToDisclaimer} />}
          </AnimatePresence>

          {/* Market Context Drawer */}
          <AnimatePresence>
            {isMarketDrawerOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMarketDrawerOpen(false)}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]"
                />
                {/* Drawer */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white dark:bg-neutral-900 shadow-2xl z-[60] overflow-hidden flex flex-col"
                >
                  {/* ... (Drawer Content Omitted for brevity, assumed unchanged) ... */}
                  {/* Note: Ensure the Drawer content code from your original snippet is here */}
                  <div className="sticky top-0 z-[61] bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-700 p-4 md:p-5 flex items-center justify-between shadow-sm backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                     {/* ... header content ... */}
                     <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                           Market Context
                        </h2>
                     </div>
                     <button onClick={() => setIsMarketDrawerOpen(false)}>Close</button>
                  </div>
                   <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 md:space-y-5">
                      {globalMarketContext && !globalMarketContext.error ? (
                          <MarketRegimeCard marketContext={globalMarketContext} />
                      ) : (
                          <div>Loading...</div>
                      )}
                   </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* FAQ and User Guide Pages */}
          {showFaq && (
            <FaqPage
              currentUser={currentUser}
              onSignIn={() => setIsSignInModalOpen(true)}
              onSignOut={handleSignOut}
              onGetStarted={() => handleAuthAndNavigate(0)}
              onPrivacyOpen={() => openLegal('privacy')}
              onTermsOpen={() => openLegal('terms')}
              onDisclaimerOpen={() => setShowDisclaimer(true)}
              onRefundOpen={() => openLegal('refund')}
              onPaymentsTermsOpen={() => openLegal('paymentsTerms')}
              onPaymentsPrivacyOpen={() => openLegal('paymentsPrivacy')}
              onLegalNoticeOpen={() => openLegal('legalNotice')}
              onContactOpen={() => {
                setShowFaq(false);
                closeAllLegalPages();
                setShowContact(true);
              }}
              onBack={() => setShowFaq(false)}
            />
          )}
          {showContact && (
            <ContactPage
              currentUser={currentUser}
              onSignIn={() => setIsSignInModalOpen(true)}
              onSignOut={handleSignOut}
              onGetStarted={() => handleAuthAndNavigate(0)}
              onPrivacyOpen={() => openLegal('privacy')}
              onTermsOpen={() => openLegal('terms')}
              onDisclaimerOpen={() => setShowDisclaimer(true)}
              onRefundOpen={() => openLegal('refund')}
              onPaymentsTermsOpen={() => openLegal('paymentsTerms')}
              onPaymentsPrivacyOpen={() => openLegal('paymentsPrivacy')}
              onLegalNoticeOpen={() => openLegal('legalNotice')}
              onFaqOpen={() => {
                setShowContact(false);
                closeAllLegalPages();
                setShowFaq(true);
              }}
              onClose={() => setShowContact(false)}
            />
          )}
          {showUserGuide && <UserGuidePage onBack={() => setShowUserGuide(false)} />}

          {/* Legal Pages */}
          {showPrivacy && (
            <NewPrivacyPolicy
              currentUser={currentUser}
              onSignIn={() => setIsSignInModalOpen(true)}
              onSignOut={handleSignOut}
              onGetStarted={() => handleAuthAndNavigate(0)}
              onFaqOpen={() => { closeAllLegalPages(); setShowFaq(true); }}
              onContactOpen={() => { closeAllLegalPages(); setShowContact(true); }}
              onClose={() => setShowPrivacy(false)}
            />
          )}
          {showTerms && (
            <NewTermsOfService
              currentUser={currentUser}
              onSignIn={() => setIsSignInModalOpen(true)}
              onSignOut={handleSignOut}
              onGetStarted={() => handleAuthAndNavigate(0)}
              onFaqOpen={() => setShowFaq(true)}
              onContactOpen={() => { closeAllLegalPages(); setShowContact(true); }}
              onClose={() => setShowTerms(false)}
            />
          )}
          {showDisclaimer && (
            <NewDisclaimer
              currentUser={currentUser}
              onSignIn={() => setIsSignInModalOpen(true)}
              onSignOut={handleSignOut}
              onGetStarted={() => handleAuthAndNavigate(0)}
              onFaqOpen={() => setShowFaq(true)}
              onContactOpen={() => { closeAllLegalPages(); setShowContact(true); }}
              onClose={() => setShowDisclaimer(false)}
            />
          )}
          {showRefund && (
            <NewRefundPolicy
              currentUser={currentUser}
              onSignIn={() => setIsSignInModalOpen(true)}
              onSignOut={handleSignOut}
              onGetStarted={() => handleAuthAndNavigate(0)}
              onFaqOpen={() => { closeAllLegalPages(); setShowFaq(true); }}
              onContactOpen={() => { closeAllLegalPages(); setShowContact(true); }}
              onClose={() => setShowRefund(false)}
            />
          )}
          {showPaymentsTerms && (
            <NewPaymentsTerms
              currentUser={currentUser}
              onSignIn={() => setIsSignInModalOpen(true)}
              onSignOut={handleSignOut}
              onGetStarted={() => handleAuthAndNavigate(0)}
              onFaqOpen={() => { closeAllLegalPages(); setShowFaq(true); }}
              onContactOpen={() => { closeAllLegalPages(); setShowContact(true); }}
              onRefundOpen={() => openLegal('refund')}
              onClose={() => closeAllLegalPages()}
              onPaymentsTermsOpen={() => openLegal('paymentsTerms')}
              onPaymentsPrivacyOpen={() => openLegal('paymentsPrivacy')}
              onLegalNoticeOpen={() => openLegal('legalNotice')}
              onPrivacyOpen={() => openLegal('privacy')}
              onTermsOpen={() => openLegal('terms')}
            />
          )}
          {showPaymentsPrivacy && (
            <NewPaymentsPrivacy
              currentUser={currentUser}
              onSignIn={() => setIsSignInModalOpen(true)}
              onSignOut={handleSignOut}
              onGetStarted={() => handleAuthAndNavigate(0)}
              onFaqOpen={() => { closeAllLegalPages(); setShowFaq(true); }}
              onContactOpen={() => { closeAllLegalPages(); setShowContact(true); }}
              onClose={() => closeAllLegalPages()}
              onPaymentsPrivacyOpen={() => openLegal('paymentsPrivacy')}
              onPaymentsTermsOpen={() => openLegal('paymentsTerms')}
              onLegalNoticeOpen={() => openLegal('legalNotice')}
              onPrivacyOpen={() => openLegal('privacy')}
              onTermsOpen={() => openLegal('terms')}
            />
          )}
          {showLegalNotice && (
            <NewLegalNotice
              currentUser={currentUser}
              onSignIn={() => setIsSignInModalOpen(true)}
              onSignOut={handleSignOut}
              onGetStarted={() => handleAuthAndNavigate(0)}
              onFaqOpen={() => { closeAllLegalPages(); setShowFaq(true); }}
              onContactOpen={() => { closeAllLegalPages(); setShowContact(true); }}
              onClose={() => closeAllLegalPages()}
              onPaymentsTermsOpen={() => openLegal('paymentsTerms')}
              onPaymentsPrivacyOpen={() => openLegal('paymentsPrivacy')}
            />
          )}

          {/* Main app / landing with payment gating */}
          {!showFaq && !showContact && !showUserGuide && !showPrivacy && !showTerms && !showDisclaimer && !showRefund && !showPaymentsTerms && !showPaymentsPrivacy && !showLegalNotice && (
            <div className={`relative w-full flex flex-col min-h-screen ${view === "app" ? "" : ""}`}>
              {view === "app" ? (
                <>
                  {/* Payment gating: show ProfilePage if not paid */}
                  {/* Profile lock: lock user to profile page only when PROFILE_LOCK_ENABLED is true */}
                  {currentUser && (!isPaymentComplete(currentUser) || PROFILE_LOCK_ENABLED) ? (
                    <ProfilePage />
                  ) : (
                    <>
                      <Header
                        mode="app"
                        onReset={null}
                        resetLabel={selectedTicker ? "Back to Analysis" : "Reset"}
                        onSignOut={handleSignOut}
                        onBetaModalOpen={() => setIsBetaModalOpen(true)}
                        onMarketContextOpen={() => {
                          setIsMarketDrawerOpen(true);
                          if (!globalMarketContext) {
                            fetchGlobalMarketContext();
                          }
                        }}
                      />
                      <main className="flex-grow w-full">{renderMainApp()}</main>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* New Modern Landing Page */}
                  <NewLandingPage
                    currentUser={currentUser}
                    onSignIn={() => setIsSignInModalOpen(true)}
                    onSignOut={handleSignOut}
                    onGetStarted={() => handleAuthAndNavigate(0)}
                    onWatchDemo={() => setIsDemoOpen(true)}
                    onPrivacyOpen={() => openLegal('privacy')}
                    onTermsOpen={() => openLegal('terms')}
                    onPaymentsTermsOpen={() => openLegal('paymentsTerms')}
                    onPaymentsPrivacyOpen={() => openLegal('paymentsPrivacy')}
                    onLegalNoticeOpen={() => openLegal('legalNotice')}
                    onDisclaimerOpen={() => setShowDisclaimer(true)}
                    onRefundOpen={() => openLegal('refund')}
                    onFaqOpen={() => setShowFaq(true)}
                    onContactOpen={() => { closeAllLegalPages(); setShowContact(true); }}
                  />
                </>
              )}
            </div>
          )}
        </> /* <--- FIXED: Added closing Fragment tag here */
      )}

      {/* Feedback widget only shows when not in maintenance mode */}
      {!MAINTENANCE_CONFIG.enabled && <FeedbackWidget />}
        </div>
      } />
    </Routes>
  );
}