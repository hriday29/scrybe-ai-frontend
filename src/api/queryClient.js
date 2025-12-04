import { QueryClient } from '@tanstack/react-query';

/**
 * React Query Configuration
 * 
 * This configures @tanstack/react-query for intelligent caching and request deduplication
 * 
 * Key configurations:
 * - staleTime: 5 minutes - data is considered fresh for 5 min, no refetch during this time
 * - gcTime: 10 minutes - unused data is garbage collected after 10 min (formerly cacheTime)
 * - retry: 2 with exponential backoff - retries on network errors
 * - retryDelay: exponential backoff - starts at 1s, doubles each retry
 * 
 * This works alongside backend caching:
 * - Backend: HTTP Cache-Control headers (3600s for analysis, 300s for portfolio, etc.)
 * - Frontend: React Query stale time management + browser cache + IndexedDB offline
 * 
 * Together, this eliminates duplicate requests and provides offline access
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * staleTime: 5 minutes (300,000 ms)
       * 
       * Data is considered "fresh" for this duration after fetching.
       * While fresh, React Query will NOT make refetch requests even if:
       * - Component remounts
       * - Component regains focus
       * - Network becomes available
       * 
       * After 5 minutes, data becomes "stale" but is still used. Refetch only occurs when:
       * - User manually triggers refetch (useQuery().refetch())
       * - Component refocuses (with refetchOnWindowFocus: true)
       * - Component remounts (with refetchOnMount: true)
       * 
       * Why 5 minutes?
       * - Portfolio data: Backend caches for 5 min, frontend also 5 min = no wasted backend calls
       * - Market data: Synced with backend Market Pulse cache (5 min)
       * - Analysis data: Backend caches until 2 AM, frontend fresh time doesn't matter
       * 
       * Combined with backend Cache-Control headers:
       * - Browser cache: 300s-3600s depending on endpoint
       * - React Query: 5 min fresh time
       * - Result: Request deduplication at browser + app layer
       */
      staleTime: 5 * 60 * 1000, // 5 minutes

      /**
       * gcTime: 10 minutes (600,000 ms)
       * 
       * Previously called "cacheTime" (renamed in React Query v5)
       * Unused data is kept in memory for this duration after the last subscriber unsubscribes.
       * After this time, the data is garbage collected.
       * 
       * Why 10 minutes?
       * - Portfolio page close: Keep data for 10 min in case user navigates back
       * - Analysis page switch: Keep previous stock data in case user comes back
       * - Reduces API calls on quick page navigation
       * 
       * Example flow:
       * 1. User opens INFY analysis (data fetched, subscriber count = 1)
       * 2. User navigates to SBIN (data fetched, INFY has 0 subscribers, starts gc timer)
       * 3. User navigates back to INFY within 10 min (data reused from gc cache, NO API call)
       * 4. If user comes back after 10 min (data garbage collected, API call made)
       */
      gcTime: 10 * 60 * 1000, // 10 minutes

      /**
       * retry: 2
       * Automatically retry failed requests up to 2 times
       * 
       * Failures retry on:
       * - Network errors (no connection)
       * - 5xx server errors (500, 502, 503, 504)
       * 
       * Failures do NOT retry on:
       * - 4xx client errors (400, 401, 403, 404)
       * - Cancelled requests
       * 
       * This reduces impact of temporary network hiccups without overwhelming server on bad requests
       */
      retry: 2,

      /**
       * retryDelay: Exponential backoff
       * First retry: 1 second
       * Second retry: 2 seconds
       * Max delay: 30 seconds (prevents unreasonable waits)
       * 
       * Formula: Math.min(1000 * 2 ^ (attemptIndex), 30000)
       * 
       * Attempt 0 (initial): Failed
       * Attempt 1: Wait 1s, retry
       * Attempt 2: Wait 2s, retry
       * Attempt 3: Wait 4s (would be, but only 2 retries configured)
       * 
       * Benefits:
       * - Gives server time to recover during outages
       * - Doesn't hammer server with immediate retries
       * - Exponential backoff standard for resilience
       */
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      /**
       * refetchOnWindowFocus: true (default)
       * 
       * When user returns to browser tab, React Query automatically refetches stale queries
       * 
       * Good for:
       * - Portfolio: User checks other apps, comes back to trading - get latest balance
       * - Market status: User checks other tabs, comes back - get latest market status
       * 
       * Respects staleTime: If data < 5 min old, no refetch even on window focus
       * 
       * Enable this for real-time sensitive data (portfolio, market status)
       * Disable for historical data (analysis, which doesn't change until 2 AM)
       */
      refetchOnWindowFocus: 'stale',

      /**
       * refetchOnMount: 'stale' (default)
       * 
       * When component mounts with a query, automatically refetch if data is stale
       * 
       * Example: 
       * - User opens Dashboard, component mounts, data is 6 min old (stale)
       * - React Query automatically refetches to get fresh data
       * - User closes sidebar and reopens, component still mounted, data is 1 min old (fresh)
       * - No refetch on reopen (still within 5 min staleTime)
       * 
       * 'stale' means: Only refetch if data is older than staleTime
       * 'always' would refetch every mount (bad for performance)
       * false would never refetch on mount (bad for fresh data)
       */
      refetchOnMount: 'stale',

      /**
       * refetchOnReconnect: 'stale' (default)
       * 
       * When network reconnects (browser came online), refetch stale queries
       * 
       * Scenario:
       * - User opens app on mobile, goes offline
       * - IndexedDB shows last cached portfolio (from 2 hours ago)
       * - User connects to WiFi
       * - React Query refetches to get fresh data from API
       * - Portfolio updates to real-time
       */
      refetchOnReconnect: 'stale',
    },
  },
});

export default queryClient;
