// src/App.js — POLISHED (glassmorphism, spacing, UX/accessibility, safe timers)

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalysis, getTrackRecord } from './api/api.js';

// Styles
import './assets/styles/App.css';

// Layout Components
import AppBackground from "./components/layout/AppBackground.js";
import Footer from './components/layout/Footer.js';
import Header from './components/layout/Header.js'; // We will use only this Header

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
import LandingWalkthrough from './components/specific/LandingWalkthrough.js';
import NewsSection from './components/specific/NewsSection.js';
import TradeJournalCard from './components/specific/TradeJournalCard.js';
import MarketRegimeCard from './components/specific/MarketRegimeCard.js';
import SectorHeatmapCard from './components/specific/SectorHeatmapCard.js';
import MarketBreadthCard from './components/specific/MarketBreadthCard.js';

// Page Components
import AppGuide from './pages/AppGuide.js';
import FaqPage from './pages/FaqPage.js';
import OpenPositions from './pages/OpenPositions.js';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.js';
import Rulebook from './pages/Rulebook.js';
import StockDetailPage from './pages/StockDetailPage.js';
import TermsPage from './pages/TermsPage.js';
import UserGuidePage from './pages/UserGuidePage.js';
import IndexAnalysis from './pages/IndexAnalysis.js';
import PortfolioDashboard from './pages/PortfolioDashboard.js';

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
    className={`bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-2xl shadow-slate-950/30 ${className} rounded-2xl`}
  >
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center">
    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-300 leading-tight pb-2">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-slate-400 max-w-2xl mx-auto leading-relaxed">
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
        className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/70 text-slate-300 hover:text-white transition"
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
// Landing Page
// =========================================================================

const LandingPage = ({
  handleLaunchAndNavigate,
  onUserGuideOpen,
  onFaqOpen,
  onPrivacyOpen,
  onTermsOpen,
  onDemoOpen,
  onBetaInfoClick,
}) => (
  <div className="relative z-10 flex flex-col items-center justify-center text-center pt-12 pb-20 md:pt-16 md:pb-24">
    <main>
      <LandingWalkthrough
        handleLaunchAndNavigate={handleLaunchAndNavigate}
        onUserGuideOpen={onUserGuideOpen}
        onFaqOpen={onFaqOpen}
        onPrivacyOpen={onPrivacyOpen}
        onTermsOpen={onTermsOpen}
        onDemoOpen={onDemoOpen}
        onBetaInfoClick={onBetaInfoClick}
      />
    </main>
  </div>
);

// =========================================================================
// Loaders & Error
// =========================================================================

const SkeletonLoader = ({ isLongLoad }) => (
  <div className="w-full max-w-5xl mx-auto p-8">
    <SectionTitle title="Retrieving Instant Analysis..." />
    {isLongLoad && (
      <p className="text-center text-amber-400 text-sm mb-8 animate-pulse">
        Waking up the AI engine... first load can take longer.
      </p>
    )}
    <div className="mt-6 space-y-6">
      <GlassCard className="h-28 animate-pulse" />
      <GlassCard className="h-24 animate-pulse" />
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="h-48 animate-pulse" />
        <GlassCard className="h-48 animate-pulse" />
      </div>
      <GlassCard className="h-96 animate-pulse" />
    </div>
  </div>
);

const ErrorDisplay = ({ error, onReset }) => (
  <div className="text-center p-8">
    <h2 className="text-2xl font-bold text-red-400">Analysis Failed</h2>
    <p className="text-red-300 mt-2 max-w-2xl mx-auto">{error}</p>
    <button
      onClick={onReset}
      className="mt-6 bg-red-500/80 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-500 transition-colors"
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
  const [marketContext, setMarketContext] = useState(null);

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

        // Extract market_context from the first stock (it's the same for all stocks)
        if (analysisData.length > 0 && analysisData[0].market_context) {
          setMarketContext(analysisData[0].market_context);
        }
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
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredStocks = useMemo(() => {
    if (!stocks) return [];
    let filtered = stocks;
    if (activeFilter === "BUY") {
      filtered = stocks.filter((stock) => stock.signal === "BUY");
    }
    if (!searchTerm) return filtered;
    const term = searchTerm.toLowerCase();
    return filtered.filter(
      (stock) =>
        (stock.companyName &&
          stock.companyName.toLowerCase().includes(term)) ||
        (stock.ticker && stock.ticker.toLowerCase().includes(term))
    );
  }, [stocks, searchTerm, activeFilter]);

  const ScoreBadge = ({ score }) => {
    if (typeof score !== "number" || isNaN(score)) {
      return (
        <span className="font-mono font-semibold text-sm px-2.5 py-1 rounded-md text-slate-500 bg-slate-700/20 ring-1 ring-inset ring-slate-600/30">
          N/A
        </span>
      );
    }
    const scoreColor =
      score > 49
        ? "text-green-300 bg-green-500/10 ring-green-500/30"
        : score < -49
        ? "text-red-300 bg-red-500/10 ring-red-500/30"
        : "text-slate-400 bg-slate-700/20 ring-slate-600/30";
    const scoreText = score > 0 ? `+${score.toFixed(0)}` : score.toFixed(0);
    return (
      <span
        className={`font-mono font-semibold text-sm px-2.5 py-1 rounded-md ring-1 ring-inset ${scoreColor}`}
      >
        {scoreText}
      </span>
    );
  };

  const FilterButton = ({ filterType }) => {
    const isActive = activeFilter === filterType;
    return (
      <button
        onClick={() => setActiveFilter(filterType)}
        className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors backdrop-blur-md border ${
          isActive
            ? "bg-blue-600/80 text-white border-blue-400/40"
            : "bg-white/10 text-slate-200 hover:bg-white/20 border-white/10"
        }`}
      >
        {filterType}
      </button>
    );
  };

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

      {/* ========== MARKET-WIDE CONTEXT (UNIVERSAL INDICATORS) ========== */}
      {marketContext && (
        <div className="mt-8 w-full max-w-6xl space-y-6">
          {/* Market Regime Card - Shows overall market direction */}
          <MarketRegimeCard marketContext={marketContext} />

          {/* Sector Performance & Market Breadth - Side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketContext.sector_performance && (
              <SectorHeatmapCard sectorPerformance={marketContext.sector_performance} />
            )}
            {marketContext.breadth_indicators && (
              <MarketBreadthCard breadthData={marketContext.breadth_indicators} />
            )}
          </div>
        </div>
      )}

      {/* Search + results container */}
      <div className="mt-10 w-full max-w-2xl space-y-4">
        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-slate-400 text-lg">🔍</span>
          </div>
          <input
            type="text"
            aria-label="Search stocks"
            placeholder={isLoading ? "Loading ranked list..." : "Search for a stock..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-700 text-white placeholder-slate-400 text-lg rounded-xl py-3 pl-12 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 shadow-lg"
            disabled={isLoading}
          />
        </div>

        {/* Results list */}
        <GlassCard className="max-h-96 overflow-y-auto divide-y divide-white/5">
          {isLoading && (
            <p className="text-gray-400 text-center p-4">Loading...</p>
          )}
          {!isLoading && filteredStocks.length === 0 && (
            <p className="text-gray-400 text-center p-4">
              No setups found for the current filter.
            </p>
          )}
          {!isLoading &&
            filteredStocks.map((stock, index) => (
              <button
                key={stock.ticker}
                onClick={() => onAnalyze(stock.ticker)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-blue-600/30 transition-colors rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-gray-500 text-sm w-8">
                    {index + 1}.
                  </span>
                  <span className="font-semibold text-white group-hover:text-blue-300">
                    {stock.companyName}
                  </span>
                  <span className="text-xs text-slate-400">{stock.ticker}</span>
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
// AI Track Record (mobile-first + glass table)
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
    if (!reason) return { text: 'Closed', color: 'bg-slate-700 text-slate-300' };
    const lower = reason.toLowerCase();
    if (lower.includes('target hit')) return { text: 'Target Hit', color: 'bg-green-500/20 text-green-300' };
    if (lower.includes('stop-loss hit')) return { text: 'Stop-Loss Hit', color: 'bg-red-500/20 text-red-400' };
    if (lower.includes('time exit')) return { text: 'Time Exit', color: 'bg-amber-500/20 text-amber-400' };
    return { text: 'Closed', color: 'bg-slate-700 text-slate-300' };
  };

  if (error) return <div className="text-red-400 text-center p-8">Error loading track record: {error}</div>;
  if (!trackRecordData) return <div className="text-center p-8 animate-pulse">Loading AI Track Record...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <SectionTitle title="AI Performance Record" subtitle="A transparent log of all closed trades from the live engine." />

      <GlassCard className="mt-8 overflow-hidden">
        {/* Mobile cards */}
        <div className="md:hidden">
          {trackRecordData.length > 0 ? (
            trackRecordData.map((trade) => {
              const reasonDisplay = getReasonDisplay(trade.closing_reason);
              const returnColor = trade.net_return_pct >= 0 ? 'text-green-400' : 'text-red-400';
              return (
                <div key={trade._id} className="p-4 border-b border-white/5 last:border-b-0">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-white">
                      {trade.ticker} ({trade.signal})
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${reasonDisplay.color}`}>
                      {reasonDisplay.text}
                    </span>
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between"><span className="text-gray-400">Net Return</span><span className={`font-mono font-semibold ${returnColor}`}>{trade.net_return_pct >= 0 ? '+' : ''}{trade.net_return_pct.toFixed(2)}%</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Days Held</span><span className="text-gray-300">{trade.days_held}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Closed On</span><span className="text-gray-300">{new Date(trade.close_date).toLocaleDateString()}</span></div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-16">No performance data has been recorded yet.</div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5">
                <tr>
                  {['Ticker', 'Signal', 'Open Date', 'Close Date', 'Days Held', 'Closing Reason', 'Net Return'].map((h) => (
                    <th key={h} className="p-4 text-sm font-semibold text-gray-300 tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trackRecordData.length > 0 ? (
                  trackRecordData.map((trade) => {
                    const reasonDisplay = getReasonDisplay(trade.closing_reason);
                    const returnColor = trade.net_return_pct >= 0 ? 'text-green-400' : 'text-red-400';
                    return (
                      <tr key={trade._id} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-gray-200 font-semibold">{trade.ticker}</td>
                        <td className={`p-4 font-semibold ${trade.signal === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>{trade.signal}</td>
                        <td className="p-4 text-gray-400">{new Date(trade.open_date).toLocaleDateString()}</td>
                        <td className="p-4 text-gray-400">{new Date(trade.close_date).toLocaleDateString()}</td>
                        <td className="p-4 text-gray-400">{trade.days_held}</td>
                        <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${reasonDisplay.color}`}>{reasonDisplay.text}</span></td>
                        <td className={`p-4 font-mono font-semibold ${returnColor}`}>{trade.net_return_pct >= 0 ? '+' : ''}{trade.net_return_pct.toFixed(2)}%</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-500 py-16">
                      No performance data has been recorded yet.
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
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [analysisState, setAnalysisState] = useState("selector");
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [postLoginRedirect, setPostLoginRedirect] = useState(null);
  const [isLongLoad, setIsLongLoad] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [marketStatus, setMarketStatus] = useState(null);
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
          console.log('Market Status:', status);
        }
      } catch (err) {
        console.error('Failed to fetch market status:', err);
        // Silently fail - don't block app if endpoint is down
      }
    };
    fetchMarketStatus();
  }, []);

  const handleStockSelect = useCallback((ticker) => setSelectedTicker(ticker), []);
  const handleBackToList = useCallback(() => setSelectedTicker(null), []);
  const navigateToTab = useCallback((index) => setTabIndex(index), []);

  const handleAgreeToDisclaimer = useCallback(() => {
    localStorage.setItem("disclaimerAgreedTimestamp", Date.now().toString());
    setShowDisclaimer(false);
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
      await signInWithPopup(auth, provider);
      setIsSignInModalOpen(false);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  }, []);

  const handleMicrosoftSignIn = useCallback(async () => {
    const provider = new OAuthProvider("microsoft.com");
    try {
      await signInWithPopup(auth, provider);
      setIsSignInModalOpen(false);
    } catch (error) {
      console.error("Error during Microsoft sign in:", error);
    }
  }, []);

  const handleSignOut = useCallback(() => {
    signOut(auth).catch((error) => console.error("Error during sign out:", error));
  }, []);

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
              <NewsSection newsData={analysisData?.news_and_events_analysis} />
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
        <div className="w-full max-w-5xl mx-auto px-4 pt-4">
          <HolidayBanner
            isHoliday={marketStatus.is_holiday}
            holidayReason={marketStatus.holiday_reason}
            nextTradingDay={marketStatus.next_trading_day_display}
          />
        </div>
      )}

      {selectedTicker ? (
        <StockDetailPage ticker={selectedTicker} onBackClick={handleBackToList} />
      ) : (
        <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
          <div className="flex flex-wrap justify-center p-1 bg-white/5 border border-white/10 rounded-2xl sticky top-4 z-10 backdrop-blur-xl w-fit mx-auto shadow-xl">
            {[
              { label: "App Guide", tooltip: "Learn how to use Scrybe AI effectively" },
              { label: "Stock Analysis", tooltip: "Get AI-powered analysis for any stock" },
              { label: "My Trades", tooltip: "View all your trades (open + closed) with performance stats" },
              { label: "Active Trades", tooltip: "Monitor your currently open positions" },
              { label: "Index Analysis", tooltip: "Analyze market indices (NIFTY, SENSEX)" },
              { label: "AI Track Record", tooltip: "See Scrybe AI's historical performance" },
              { label: "Rulebook", tooltip: "Understand the AI's trading strategy and rules" }
            ].map(({ label, tooltip }) => (
                <Tab
                  key={label}
                  title={tooltip}
                  className={({ selected }) =>
                    `px-6 py-2.5 text-md font-medium rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                      selected
                        ? "bg-white/10 text-white shadow"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
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
    <div className="bg-[#0A0F1E] min-h-screen text-white/90 font-sans">
      {/* Modals */}
      <AnimatePresence>
        {isSignInModalOpen && (
          <SignInModal
            onSignIn={handleSignIn}
            onMicrosoftSignIn={handleMicrosoftSignIn}
            onClose={() => setIsSignInModalOpen(false)}
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
        {showDisclaimer && <DisclaimerModal onAgree={handleAgreeToDisclaimer} />}
      </AnimatePresence>

      {/* Standalone pages */}
      {showFaq && <FaqPage onBack={() => setShowFaq(false)} />}
      {showUserGuide && <UserGuidePage onBack={() => setShowUserGuide(false)} />}
      {showPrivacy && <PrivacyPolicyPage onBack={() => setShowPrivacy(false)} />}
      {showTerms && <TermsPage onBack={() => setShowTerms(false)} />}

      {/* Main app / landing */}
      {!showFaq && !showUserGuide && !showPrivacy && !showTerms && (
        <div className="relative w-full max-w-7xl mx-auto px-4 flex flex-col min-h-screen">
          {view === "app" ? (
            <>
              <Header
                mode="app"
                onReset={analysisState !== "selector" ? handleResetAnalysis : null}
                onSignOut={handleSignOut}
                onBetaModalOpen={() => setIsBetaModalOpen(true)}
              />
              <main className="flex-grow">{renderMainApp()}</main>
            </>
          ) : (
            <>
              <Header
                mode="landing"
                onBetaModalOpen={() => setIsBetaModalOpen(true)}
                onFaqClick={() => setShowFaq(true)}
                onGuideClick={() => setShowUserGuide(true)}
                onLaunchAppClick={() => handleAuthAndNavigate(0)}
                onDemoClick={() => setIsDemoOpen(true)}
              />
              <main>
                <LandingPage
                  onSignIn={() => setIsSignInModalOpen(true)}
                  handleLaunchAndNavigate={handleAuthAndNavigate}
                  onUserGuideOpen={() => setShowUserGuide(true)}
                  onFaqOpen={() => setShowFaq(true)}
                  onPrivacyOpen={() => setShowPrivacy(true)}
                  onTermsOpen={() => setShowTerms(true)}
                  onDemoOpen={() => setIsDemoOpen(true)}
                  onBetaInfoClick={() => setIsBetaModalOpen(true)}
                />
              </main>
              <Footer
                onPrivacyClick={() => setShowPrivacy(true)}
                onTermsClick={() => setShowTerms(true)}
                onUserGuideClick={() => setShowUserGuide(true)}
                onFaqClick={() => setShowFaq(true)}
              />
            </>
          )}
        </div>
      )}

      <FeedbackWidget />
    </div>
  );
}