import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, TrendingUp, AlertCircle, X, BarChart3 } from 'lucide-react';

// Import child components from their new locations
import ApexAnalysisDashboard from '../components/specific/ApexAnalysisDashboard.js';
import NewsSection from '../components/specific/NewsSection.js';
import ConversationalQa from '../components/specific/ConversationalQa.js';
import ConfidencePoll from '../components/specific/ConfidencePoll.js';
import TradeJournalCard from '../components/specific/TradeJournalCard.js';
import MarketRegimeCard from '../components/specific/MarketRegimeCard.js';
import SectorHeatmapCard from '../components/specific/SectorHeatmapCard.js';
import MarketBreadthCard from '../components/specific/MarketBreadthCard.js';
import PriceActionCard from '../components/specific/PriceActionCard.js';
import AIDecisionCard from '../components/specific/AIDecisionCard.js';
import PositionSizeCard from '../components/specific/PositionSizeCard.js';
import VolatilityCard from '../components/specific/VolatilityCard.js';  // Feature 7/15
import MomentumCard from '../components/specific/MomentumCard.js';  // Feature 8/15
import TradeChecklistCard from '../components/specific/TradeChecklistCard.js';  // Feature 9/15
import FuturesBasisCard from '../components/specific/FuturesBasisCard.js';  // Feature 10/15

// Import config and utils
import { API_BASE_URL } from '../apiConfig.js';
import { apexDemoData } from '../utils/demoData.js';

// Visual helpers - Enhanced institutional design
const GlassCard = ({ className = '', children, variant = 'default' }) => {
  const variants = {
    default: 'bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700',
    elevated: 'bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-600 shadow-xl',
    subtle: 'bg-gray-50 dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-700/50',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${variants[variant]} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${className} rounded-2xl`}
    >
      {children}
    </motion.div>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 leading-tight pb-2">
      {title}
    </h2>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "128px" }}
      transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
      className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 rounded-full mx-auto mb-4"
    />
    {subtitle && (
      <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
    )}
  </motion.div>
);

// Loader and Error components - Enhanced institutional design
const SkeletonLoader = ({ isLongLoad }) => (
    <div className="w-full max-w-5xl mx-auto p-8">
      <SectionTitle title="Retrieving Instant Analysis..." />
      {isLongLoad && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 mx-auto max-w-md"
        >
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">
              Waking up the AI engine... first load can take longer.
            </p>
          </div>
        </motion.div>
      )}
      <div className="mt-8 space-y-6">
        <GlassCard variant="elevated" className="h-28 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 animate-pulse" />
        <GlassCard variant="elevated" className="h-24 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard variant="elevated" className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 animate-pulse" />
          <GlassCard variant="elevated" className="h-48 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 animate-pulse" />
        </div>
        <GlassCard variant="elevated" className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 animate-pulse" />
      </div>
    </div>
);

const ErrorDisplay = ({ error, onReset }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center p-8 max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-3">Analysis Failed</h2>
        <p className="text-red-600 dark:text-red-400 mb-6 leading-relaxed">{error}</p>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 dark:from-red-500 dark:to-rose-500 dark:hover:from-red-600 dark:hover:to-rose-600 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          Try Another Analysis
        </button>
      </div>
    </motion.div>
);


const StockSelector = ({ onAnalyze }) => {
    const [stocks, setStocks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [marketContext, setMarketContext] = useState(null);
    const [isMarketDrawerOpen, setIsMarketDrawerOpen] = useState(false);
    const [isLoadingMarketContext, setIsLoadingMarketContext] = useState(false);
  
    // Fetch stocks list
    useEffect(() => {
      const fetchStocks = async () => {
        try {
          console.log('🔍 Fetching all-analysis data from:', `${API_BASE_URL}/api/all-analysis`);
          const response = await fetch(`${API_BASE_URL}/api/all-analysis`);
          if (!response.ok) throw new Error("Failed to load stock analysis data.");
          
          const analysisData = await response.json();
          console.log('📊 Received analysis data:', analysisData.length, 'stocks');
          
          analysisData.sort((a, b) => (b.scrybeScore || 0) - (a.scrybeScore || 0));
          setStocks(analysisData);
        } catch (err) {
          console.error('❌ Error fetching stock data:', err);
          setError(new Error("Failed to load analysis data."));
        } finally {
          setIsLoading(false);
        }
      };
      fetchStocks();
    }, []);

    // Fetch market context on-demand when drawer opens
    const fetchMarketContext = useCallback(async () => {
      setIsLoadingMarketContext(true);
      try {
        console.log('🌍 Fetching market context from:', `${API_BASE_URL}/api/market-context`);
        const response = await fetch(`${API_BASE_URL}/api/market-context`);
        if (!response.ok) {
          console.warn('⚠️ Failed to fetch market context, status:', response.status);
          setMarketContext({ 
            error: 'Failed to fetch market context. The server may be unavailable.' 
          });
          return;
        }
        
        const contextData = await response.json();
        console.log('🌍 Market context received:', contextData);
        
        // Check if this is placeholder data (no analysis run yet)
        if (contextData._placeholder) {
          console.warn('⚠️ Market context is placeholder data - analysis not run yet');
          setMarketContext({ 
            ...contextData,
            error: 'Market analysis has not been run yet. Data shown is placeholder.' 
          });
        } else if (contextData.error) {
          console.warn('⚠️ Market context error:', contextData.error);
          setMarketContext(contextData);
        } else {
          setMarketContext(contextData);
        }
      } catch (err) {
        console.error('❌ Error fetching market context:', err);
        setMarketContext({ 
          error: 'Could not connect to the backend. Please check if the server is running.' 
        });
      } finally {
        setIsLoadingMarketContext(false);
      }
    }, []);

    // Fetch market context when drawer opens (only if not already loaded)
    useEffect(() => {
      if (isMarketDrawerOpen && !marketContext && !isLoadingMarketContext) {
        fetchMarketContext();
      }
    }, [isMarketDrawerOpen, marketContext, isLoadingMarketContext, fetchMarketContext]);
  
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredStocks = useMemo(() => {
      if (!stocks) return [];
      if (!searchTerm) return stocks;
      const term = searchTerm.toLowerCase();
      return stocks.filter(
        (stock) =>
          (stock.companyName &&
            stock.companyName.toLowerCase().includes(term)) ||
          (stock.ticker && stock.ticker.toLowerCase().includes(term))
      );
    }, [stocks, searchTerm]);
  
  const ScoreBadge = ({ score }) => {
    if (typeof score !== "number" || isNaN(score)) {
      return (
        <span className="font-mono font-semibold text-sm px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 ring-1 ring-inset ring-gray-300 dark:ring-gray-700">
          N/A
        </span>
      );
    }
    
    let scoreColor, bgGradient;
    if (score > 49) {
      scoreColor = "text-emerald-700 dark:text-emerald-300";
      bgGradient = "bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30";
    } else if (score < -49) {
      scoreColor = "text-rose-700 dark:text-rose-300";
      bgGradient = "bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900/30 dark:to-red-900/30";
    } else {
      scoreColor = "text-gray-700 dark:text-gray-300";
      bgGradient = "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900";
    }
    
    const scoreText = score > 0 ? `+${score.toFixed(0)}` : score.toFixed(0);
    
    return (
      <span className={`font-mono font-bold text-sm px-3 py-1.5 rounded-lg ring-1 ring-inset ring-gray-200 dark:ring-gray-700 ${scoreColor} ${bgGradient} shadow-sm`}>
        {scoreText}
      </span>
    );
  };
  
    if (error) return <ErrorDisplay error={error.message} onReset={() => window.location.reload()} />;
  
    return (
      <>
        {/* Market Context Drawer */}
        <AnimatePresence>
          {isMarketDrawerOpen && marketContext && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setIsMarketDrawerOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-4xl bg-white dark:bg-neutral-900 shadow-2xl z-50 overflow-y-auto"
              >
                {/* Sticky Header */}
                <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-700 p-4 md:p-6 flex justify-between items-start gap-4 z-10 shadow-sm backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400" />
                      Market Context
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Real-time market indicators, sector performance, and breadth analysis
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMarketDrawerOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="p-4 md:p-6 space-y-6 pb-8">
                  {isLoadingMarketContext ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mb-4"></div>
                      <span className="text-gray-600 dark:text-gray-400">Loading market context...</span>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Fetching latest market data</p>
                    </div>
                  ) : marketContext && !marketContext.error ? (
                    <>
                      <MarketRegimeCard marketContext={marketContext} />
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {marketContext.sector_performance && (
                          <SectorHeatmapCard sectorPerformance={marketContext.sector_performance} />
                        )}
                        {marketContext.breadth_indicators && (
                          <MarketBreadthCard breadthData={marketContext.breadth_indicators} />
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center max-w-2xl mx-auto">
                      <AlertCircle className="w-16 h-16 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Market Context Unavailable
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {marketContext?.error || "Market context data is not available. The daily analysis may not have been run yet."}
                      </p>
                      <button
                        onClick={() => fetchMarketContext()}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Market Context Button - Positioned to avoid FeedbackWidget overlap */}
        {!isLoading && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMarketDrawerOpen(true)}
            className="fixed bottom-6 right-32 md:right-40 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white px-4 py-3 md:px-5 md:py-4 rounded-2xl shadow-2xl z-30 flex items-center gap-2 md:gap-3 group"
            title="View Market Context"
          >
            <BarChart3 className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden lg:inline-block font-semibold text-sm whitespace-nowrap">
              Market Context
            </span>
          </motion.button>
        )}

        <div className="relative z-10 w-full pt-8 pb-20 md:pt-12 md:pb-24">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <SectionTitle
              title="Ranked Analysis Universe"
              subtitle="Daily ranked analysis for all 250 stocks in the Nifty Smallcap 250 universe, powered by Scrybe Score."
            />

            {/* Stock Search and List */}
            <div className="mt-10 w-full space-y-6">
              {/* Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  aria-label="Search stocks"
                  placeholder={isLoading ? "Loading ranked list..." : "Search for a stock by name or ticker..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-base md:text-lg rounded-2xl py-4 md:py-5 pl-14 pr-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                />
              </motion.div>
      
              {/* Results List */}
              <GlassCard variant="elevated" className="max-h-[36rem] overflow-y-auto divide-y divide-gray-100 dark:divide-neutral-800">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-neutral-800"></div>
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-600 dark:border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Loading stocks...</span>
                  </div>
                )}
                {!isLoading && filteredStocks.length === 0 && (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-full mb-4">
                      <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">No stocks found.</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Try adjusting your search term.</p>
                  </div>
                )}
                {!isLoading && filteredStocks.map((stock, index) => (
                    <motion.button 
                      key={stock.ticker}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.3 }}
                      onClick={() => onAnalyze(stock.ticker)} 
                      className="w-full text-left p-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 flex justify-between items-center group"
                    >
                      <div className="flex items-center gap-5 flex-1 min-w-0">
                        <span className="font-mono text-gray-400 dark:text-gray-500 text-sm font-semibold w-10 flex-shrink-0 text-right">
                          {index + 1}.
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate transition-colors duration-300">
                            {stock.companyName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{stock.ticker}</div>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                        <ScoreBadge score={stock.scrybeScore} />
                      </div>
                    </motion.button>
                ))}
              </GlassCard>

              {/* Info Message */}
              {!isLoading && filteredStocks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center"
                >
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Showing <span className="font-bold">{filteredStocks.length}</span> of <span className="font-bold">{stocks?.length || 0}</span> stocks. Click any stock to view detailed analysis.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

// This is the main component for this page
const StockAnalysis = ({ onAnalyzeRequest }) => {
    const [analysisState, setAnalysisState] = useState("selector");
    const [error, setError] = useState(null);
    const [analysisData, setAnalysisData] = useState(null);
    const [isLongLoad, setIsLongLoad] = useState(false);
    const longLoadTimerRef = useRef(null);

    const handleResetAnalysis = useCallback(() => {
        setAnalysisState("selector");
        setAnalysisData(null);
        setError(null);
    }, []);

    const handleAnalysis = useCallback(async (ticker) => {
        if (!ticker) return;

        setAnalysisState("analyzing");
        setError(null);
        setAnalysisData(null);
    
        if (longLoadTimerRef.current) clearTimeout(longLoadTimerRef.current);
        longLoadTimerRef.current = setTimeout(() => setIsLongLoad(true), 3000);
    
        try {
          const response = await fetch(`${API_BASE_URL}/api/analyze/${ticker}`);
          if (longLoadTimerRef.current) {
            clearTimeout(longLoadTimerRef.current);
            longLoadTimerRef.current = null;
          }
          setIsLongLoad(false);
    
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Analysis not found or server error." }));
            throw new Error(errorData.error);
          }
    
          const data = await response.json();
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

    // This effect allows other components (like OpenPositions) to trigger an analysis
    useEffect(() => {
        if (onAnalyzeRequest) {
            handleAnalysis(onAnalyzeRequest);
        }
    }, [onAnalyzeRequest, handleAnalysis]);
    
    switch (analysisState) {
        case "analyzing":
          return <SkeletonLoader isLongLoad={isLongLoad} />;
        case "results":
          return (
            <>
              <button onClick={handleResetAnalysis} className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-900 dark:text-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={16} />
                Back to List
              </button>
              <ApexAnalysisDashboard analysisData={analysisData} />
              <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">
                {/* Market-wide indicators (Regime, Sector, Breadth) removed - now shown on main dashboard */}
                <PriceActionCard priceActionContext={analysisData?.price_action_context} />
                <AIDecisionCard analysisData={analysisData} />
                <PositionSizeCard tradePlan={analysisData?.trade_plan} analysisData={analysisData} />
                <VolatilityCard volatilityData={analysisData?.enhanced_volatility_analysis} analysisData={analysisData} />
                <MomentumCard momentumData={analysisData?.momentum_analysis} analysisData={analysisData} />
                <TradeChecklistCard checklistData={analysisData?.trade_checklist} />
                <FuturesBasisCard basisData={analysisData?.futures_basis_analysis} />
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

export default StockAnalysis;
