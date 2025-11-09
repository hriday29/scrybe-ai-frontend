// components/landing/AnalyticsSampler.js
// Lightweight sampler showing a couple of live metrics pre-signup.
import React, { useEffect, useState } from 'react';
import { Activity, TrendingUp, Clock } from 'lucide-react';
import { API_BASE_URL } from '../../apiConfig';

export default function AnalyticsSampler() {
  const [pulse, setPulse] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pulseResp, portfolioResp] = await Promise.all([
          fetch(`${API_BASE_URL}/api/market-status`),
          fetch(`${API_BASE_URL}/api/portfolio-summary`)
        ]);
        if (pulseResp.ok) setPulse(await pulseResp.json());
        if (portfolioResp.ok) setPortfolio(await portfolioResp.json());
      } catch (e) {
        // swallow
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12" aria-labelledby="analytics-sampler-heading">
      <h2 id="analytics-sampler-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
        <Activity className="w-6 h-6 text-primary-600 dark:text-primary-400" /> Live Snapshot
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">A tiny glimpse of real-time system intelligence. Full dashboard unlocked after signup.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Next Trading Day</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{pulse?.prediction_date || '—'}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Market {pulse?.is_holiday ? 'Closed' : 'Open'}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Executing Positions</span>
          </div>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{portfolio?.portfolio_summary?.selected_for_execution ?? '—'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Of max {portfolio?.portfolio_summary?.max_positions ?? '—'}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Top Conviction Pending</span>
          </div>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{portfolio?.portfolio_summary?.high_conviction_not_selected ?? '—'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Awaiting portfolio capacity</p>
        </div>
      </div>
      {loading && <p className="text-xs mt-4 text-gray-500 dark:text-gray-400">Loading sampler…</p>}
    </section>
  );
}
