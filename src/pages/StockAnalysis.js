import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft } from 'lucide-react';

// Import child components from their new locations
import ApexAnalysisDashboard from '../components/specific/ApexAnalysisDashboard.js';
import NewsSection from '../components/specific/NewsSection.js';
import ConversationalQa from '../components/specific/ConversationalQa.js';
import ConfidencePoll from '../components/specific/ConfidencePoll.js';
import TradeJournalCard from '../components/specific/TradeJournalCard.js';

// Import config and utils
import { API_BASE_URL } from '../apiConfig.js';
import { apexDemoData } from '../utils/demoData.js';

// Visual helpers that were in App.js
const GlassCard = ({ className = '', children }) => (
  <div
    className={`bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-2xl shadow-slate-950/30 ${className} rounded-2xl`}
  >
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center">
    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-300">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
    )}
  </div>
);

// Loader and Error components, now local to this file
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


const StockSelector = ({ onAnalyze }) => {
    const [stocks, setStocks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchStocks = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/all-analysis`);
          if (!response.ok) throw new Error("Failed to load stock analysis data.");
          
          const analysisData = await response.json();
          analysisData.sort((a, b) => (b.scrybeScore || 0) - (a.scrybeScore || 0));
          
          setStocks(analysisData);
        } catch (err) {
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
        if (typeof score !== "number" || isNaN(score)) return <span className="font-mono font-semibold text-sm px-2.5 py-1 rounded-md text-slate-500 bg-slate-700/20 ring-1 ring-inset ring-slate-600/30">N/A</span>
        const scoreColor = score > 49 ? "text-green-300 bg-green-500/10 ring-green-500/30" : score < -49 ? "text-red-300 bg-red-500/10 ring-red-500/30" : "text-slate-400 bg-slate-700/20 ring-slate-600/30";
        const scoreText = score > 0 ? `+${score.toFixed(0)}` : score.toFixed(0);
        return <span className={`font-mono font-semibold text-sm px-2.5 py-1 rounded-md ring-1 ring-inset ${scoreColor}`}>{scoreText}</span>
    };
  
    if (error) return <ErrorDisplay error={error.message} onReset={() => window.location.reload()} />;
  
    return (
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-16 pb-20 md:pt-20 md:pb-24">
        <SectionTitle
          title="Ranked Analysis Universe"
          subtitle="Daily analysis of all 250 stocks in the Nifty Smallcap 250 universe, ranked by Scrybe Score. Only the top 10 highest-conviction trades are selected for execution."
        />
        <div className="mt-10 w-full max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              aria-label="Search stocks"
              placeholder={isLoading ? "Loading ranked list..." : "Search for a stock..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/40 backdrop-blur-md border border-slate-700 text-white placeholder-gray-500 text-lg rounded-xl py-4 pl-12 pr-4 transition-all focus:outline-none focus:border-blue-500"
              disabled={isLoading}
            />
          </div>
  
          <GlassCard className="mt-4 max-h-96 overflow-y-auto p-2 space-y-1">
            {isLoading && <p className="text-gray-400 text-center p-4">Loading...</p>}
            {!isLoading && filteredStocks.length === 0 && <p className="text-gray-400 text-center p-4">No setups found for today.</p>}
            {!isLoading && filteredStocks.map((stock, index) => (
                <button key={stock.ticker} onClick={() => onAnalyze(stock.ticker)} className="w-full text-left p-3 rounded-xl hover:bg-blue-600/40 transition-colors flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-gray-500 text-sm w-8">{index + 1}.</span>
                    <span className="font-semibold text-white">{stock.companyName}</span>
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
              <button onClick={handleResetAnalysis} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 font-semibold transition-colors">
                <ArrowLeft size={16} />
                Back to List
              </button>
              <ApexAnalysisDashboard analysisData={analysisData} />
              <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">
                <NewsSection ticker={analysisData?.ticker} />
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