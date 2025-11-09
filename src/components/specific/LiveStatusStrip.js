// components/specific/LiveStatusStrip.js
// Accessible live status strip showing key system + market indicators.
// Each chip uses role="status" for screen reader announcement.
import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCcw, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import { API_BASE_URL } from '../../apiConfig';

const Chip = ({ children, color = 'gray', title }) => {
  const colorClasses = {
    green: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/25 dark:text-green-300 dark:border-green-700',
    red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/25 dark:text-red-300 dark:border-red-700',
    blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/25 dark:text-blue-300 dark:border-blue-700',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/25 dark:text-amber-300 dark:border-amber-700',
    gray: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-neutral-800/50 dark:text-gray-300 dark:border-neutral-700'
  };
  return (
    <span
      role="status"
      aria-live="polite"
      title={title}
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
};

export default function LiveStatusStrip({ className = '' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${API_BASE_URL}/api/live-status`);
      if (!resp.ok) throw new Error('Failed to load live status');
      const json = await resp.json();
      setData(json);
      setLastRefreshed(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    // Optional auto refresh every 60s (lightweight)
    const id = setInterval(fetchStatus, 60000);
    return () => clearInterval(id);
  }, [fetchStatus]);

  return (
    <div className={`w-full flex flex-wrap items-center gap-2 py-3 ${className}`}>      
      {loading && <Chip color="blue" title="Loading system status"><Activity className="w-3 h-3" /> Loading…</Chip>}
      {error && <Chip color="red" title="Error fetching status"><AlertTriangle className="w-3 h-3" /> {error}</Chip>}
      {data && !error && !loading && (
        <>
          <Chip color={data.market_status?.is_holiday ? 'amber' : 'green'} title="Market open/holiday status">
            {data.market_status?.is_holiday ? 'Market Closed' : 'Market Open'}
          </Chip>
          <Chip color="blue" title="Executed positions count">
            Exec: {data.portfolio?.executing_positions ?? '—'} / {data.portfolio?.max_positions ?? '—'}
          </Chip>
          <Chip color="purple" title="Analysis recency">
            Last Run: {data.portfolio?.last_run_short || 'N/A'}
          </Chip>
          <Chip color="green" title="API health">
            API: {data.api?.status || 'unknown'}
          </Chip>
          <Chip color="gray" title="Version information">
            v{data.api?.version || 'dev'}
          </Chip>
        </>
      )}
      <button
        onClick={fetchStatus}
        aria-label="Refresh live status"
        className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
      >
        <RefreshCcw className="w-3 h-3" /> Refresh
      </button>
      {lastRefreshed && (
        <span className="text-xs text-gray-500 dark:text-gray-400" aria-live="polite" role="status">
          Updated {lastRefreshed.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
