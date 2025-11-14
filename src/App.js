// src/App.js — POLISHED (glassmorphism, spacing, UX/accessibility, safe timers)

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BarChart3 } from 'lucide-react';
import { GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
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
import { auth } from './services/firebase.js';
import { API_BASE_URL } from './apiConfig.js';
import { apexDemoData } from './utils/demoData.js';

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
    {/* Overlay */}
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
// Loaders & Error
// =========================================================================

const SkeletonLoader = ({ isLongLoad }) => (
  <div className="w-full max-w-5xl mx-auto p-8">
    <SectionTitle title="Retrieving Instant Analysis..." />
    {isLongLoad && (
      <p className="text-center text-warning-600 text-sm mb-8 animate-pulse">
        Waking up the AI engine... first load can take longer.
      </p>
    )}
    <div className="mt-6 space-y-6">
      <GlassCard className="h-28 animate-pulse bg-gray-100" />
      <GlassCard className="h-24 animate-pulse bg-gray-100" />
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="h-48 animate-pulse bg-gray-100" />
        <GlassCard className="h-48 animate-pulse bg-gray-100" />
      </div>
      <GlassCard className="h-96 animate-pulse bg-gray-100" />
    </div>
  </div>
);

const ErrorDisplay = ({ error, onReset }) => (
  <div className="text-center p-8">
    <h2 className="text-2xl font-bold text-red-600">Analysis Failed</h2>
    <p className="text-red-500 mt-2 max-w-2xl mx-auto">{error}</p>
    <button
      onClick={onReset}
      className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors shadow-soft"
    >
      Try Another Analysis
    </button>
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
          subtitle="Daily ranked analysis for all 250 stocks in the Nifty Smallcap 250 universe, powered by Scrybe Score."
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
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchTrackRecord = async () => {
      try {
        // 1. Call our standardized function. It returns the final data directly.
        const data = await getTrackRecord();

        // 2. Process the data as before.
        const processedData = data.map((trade) => {
          const openDate = new Date(trade.open_date);
          const closeDate = new Date(trade.close_date);
          const timeDiff = closeDate.getTime() - openDate.getTime();
          const daysHeld = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
          return { ...trade, days_held: daysHeld };
        });

        if (isMounted) setTrackRecordData(processedData);
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    };
    fetchTrackRecord();
    return () => {
      isMounted = false;
    };
  }, []);

  const getReasonDisplay = (reason) => {
    if (!reason) return { 
      text: 'Closed', 
      color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      icon: '⚪'
    };
    const lower = reason.toLowerCase();
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

  if (error) return (
    <div className="text-center p-12 max-w-2xl mx-auto">
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8">
        <div className="text-red-600 dark:text-red-400 text-xl font-semibold mb-2">Error loading track record</div>
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    </div>
  );
  
  if (!trackRecordData) return (
    <div className="text-center p-12">
      <div className="relative inline-block mb-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-neutral-800"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 dark:border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
      </div>
      <div className="text-gray-600 dark:text-gray-400 font-medium">Loading AI Track Record...</div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle 
          title="AI Performance Record" 
          subtitle="A transparent log of all closed trades from the live engine." 
        />
      </motion.div>

      <GlassCard className="mt-8 overflow-hidden">
        {/* Mobile cards */}
        <div className="md:hidden">
          {trackRecordData.length > 0 ? (
            trackRecordData.map((trade, index) => {
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
                  className="p-5 border-b border-gray-200 dark:border-gray-800 last:border-b-0 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="font-bold text-lg text-gray-900 dark:text-white">{trade.ticker}</div>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-lg text-xs font-semibold ${signalColor}`}>
                        {trade.signal}
                      </span>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold ${reasonDisplay.color} flex items-center gap-1.5`}>
                      <span>{reasonDisplay.icon}</span>
                      {reasonDisplay.text}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Net Return</div>
                      <div className={`font-mono font-bold text-lg ${returnColor}`}>
                        {trade.net_return_pct >= 0 ? '+' : ''}{trade.net_return_pct.toFixed(2)}%
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Days Held</div>
                      <div className="text-gray-900 dark:text-white font-bold text-lg">{trade.days_held}</div>
                    </div>
                    <div className="col-span-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Closed On</div>
                      <div className="text-gray-900 dark:text-white font-semibold">{new Date(trade.close_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-20">
              <div className="text-6xl mb-4">📊</div>
              <div className="text-lg font-semibold mb-2">No performance data yet</div>
              <p className="text-sm">Track record will appear here once trades are closed</p>
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900">
                <tr>
                  {['Ticker', 'Signal', 'Open Date', 'Close Date', 'Days Held', 'Closing Reason', 'Net Return'].map((h) => (
                    <th key={h} className="p-4 text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trackRecordData.length > 0 ? (
                  trackRecordData.map((trade, index) => {
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
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-gray-200 dark:border-gray-800 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10 transition-all duration-300"
                      >
                        <td className="p-4 text-gray-900 dark:text-white font-bold">{trade.ticker}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-bold ${signalColor}`}>
                            {trade.signal}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">{new Date(trade.open_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">{new Date(trade.close_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 font-semibold">{trade.days_held}</td>
                        <td className="p-4">
                          <span className={`px-4 py-2 rounded-xl text-xs font-bold ${reasonDisplay.color} inline-flex items-center gap-1.5`}>
                            <span>{reasonDisplay.icon}</span>
                            {reasonDisplay.text}
                          </span>
                        </td>
                        <td className={`p-4 font-mono font-bold text-lg ${returnColor}`}>
                          {trade.net_return_pct >= 0 ? '+' : ''}{trade.net_return_pct.toFixed(2)}%
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-20">
                      <div className="text-6xl mb-4">📊</div>
                      <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No performance data yet</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Track record will appear here once trades are closed</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>
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
    const provider = new GoogleAuthProvider();
    try {
      if (!auth) {
        console.warn('Cannot sign in — Firebase auth is not initialized. Check env vars.');
        return;
      }
      await signInWithPopup(auth, provider);
      setIsSignInModalOpen(false);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  }, []);

  const handleMicrosoftSignIn = useCallback(async () => {
    const provider = new OAuthProvider("microsoft.com");
    try {
      if (!auth) {
        console.warn('Cannot sign in with Microsoft — Firebase auth is not initialized. Check env vars.');
        return;
      }
      await signInWithPopup(auth, provider);
      setIsSignInModalOpen(false);
    } catch (error) {
      console.error("Error during Microsoft sign in:", error);
    }
  }, []);

  const handleSignOut = useCallback(() => {
    if (!auth) return;
    signOut(auth).catch((error) => console.error("Error during sign out:", error));
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
          <>
            <ApexAnalysisDashboard analysisData={analysisData} />
            <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">
              <NewsSection newsData={analysisData?.news_context} />
              <ConversationalQa analysisContext={analysisData} />
              <ConfidencePoll analysisId={analysisData?._id} />
              <TradeJournalCard analysisData={analysisData} />
            </div>
          </>
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
              { label: "Portfolio Manager", tooltip: "AI-powered portfolio construction & position management" },
              { label: "Fund Dashboard", tooltip: "Real-time monitoring of active positions & trade execution" },
              { label: "Index Analysis", tooltip: "Analyze market indices (NIFTY, SENSEX)" },
              { label: "AI Track Record", tooltip: "See Scrybe AI's historical performance" },
              { label: "Rulebook", tooltip: "Understand the AI's trading strategy and rules" }
            ].map(({ label, tooltip }) => (
                <Tab
                  key={label}
                  title={tooltip}
                  className={({ selected }) =>
                    `px-6 py-2.5 text-md font-medium rounded-xl transition-all outline-none border focus-visible:ring-2 focus-visible:ring-primary-300 ${
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

  // ✅ Final return with unified Header
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      {/* Modals */}
      <AnimatePresence>
        {isSignInModalOpen && (
          <SignInModal
            onSignIn={handleSignIn}
            onMicrosoftSignIn={handleMicrosoftSignIn}
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
              {/* Sticky Header - Fixed at top with proper z-index */}
              <div className="sticky top-0 z-[61] bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-700 p-4 md:p-5 flex items-center justify-between shadow-sm backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400" />
                    Market Context
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1">Real-time market indicators and analysis</p>
                </div>
                <button
                  onClick={() => setIsMarketDrawerOpen(false)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors text-gray-700 dark:text-gray-300 flex-shrink-0 ml-4"
                  aria-label="Close drawer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 md:space-y-5">
                {globalMarketContext && !globalMarketContext.error ? (
                  <>
                    <MarketRegimeCard marketContext={globalMarketContext} />
                    {globalMarketContext.sector_performance && (
                      <SectorHeatmapCard sectorPerformance={globalMarketContext.sector_performance} />
                    )}
                    {globalMarketContext.breadth_indicators && (
                      <MarketBreadthCard breadthData={globalMarketContext.breadth_indicators} />
                    )}
                  </>
                ) : globalMarketContext && globalMarketContext.error ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="text-center max-w-md">
                      <div className="text-4xl mb-4">⚠️</div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Market Context Unavailable
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {globalMarketContext.error || "Market context data is not available. The daily analysis may not have been run yet."}
                      </p>
                      <button
                        onClick={() => fetchGlobalMarketContext()}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mx-auto mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-400">Loading market context...</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Fetching latest market data</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Market Context Button - Always visible when logged in - Made more prominent */}
      {view === 'app' && (
        <button
          onClick={() => {
            setIsMarketDrawerOpen(true);
            // Trigger fetch if context not loaded
            if (!globalMarketContext) {
              fetchGlobalMarketContext();
            }
          }}
          className="fixed bottom-24 right-6 bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-600 hover:from-primary-600 hover:via-purple-700 hover:to-secondary-700 text-white px-5 py-3.5 md:px-6 md:py-4 rounded-full shadow-2xl z-40 transition-all hover:scale-110 active:scale-95 flex items-center gap-2 md:gap-3 group border-2 border-white/30 animate-pulse hover:animate-none ring-2 ring-primary-400/50"
          title="View Market Context - Real-time market indicators and analysis"
        >
          <BarChart3 className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
          <span className="font-bold text-sm md:text-base whitespace-nowrap">Market Context</span>
        </button>
      )}

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
          onPrivacyOpen={() => openLegal('privacy')}
          onTermsOpen={() => openLegal('terms')}
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
          onPrivacyOpen={() => openLegal('privacy')}
          onTermsOpen={() => openLegal('terms')}
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

      {/* Main app / landing */}
      {!showFaq && !showContact && !showUserGuide && !showPrivacy && !showTerms && !showDisclaimer && !showRefund && !showPaymentsTerms && !showPaymentsPrivacy && !showLegalNotice && (
        <div className={`relative w-full flex flex-col min-h-screen ${view === "app" ? "" : ""}`}>
          {view === "app" ? (
            <>
              <Header
                mode="app"
                onReset={analysisState !== "selector" ? handleResetAnalysis : null}
                onSignOut={handleSignOut}
                onBetaModalOpen={() => setIsBetaModalOpen(true)}
              />
              <main className="flex-grow w-full">{renderMainApp()}</main>
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

      <FeedbackWidget />
    </div>
  );
}
