/**
 * API Caching Layer with Offline Support
 * 
 * This module wraps existing API calls with:
 * 1. React Query caching (request deduplication)
 * 2. IndexedDB offline fallback (graceful degradation)
 * 3. Error handling and retry logic
 * 4. Automatic cache invalidation on mutations
 * 
 * Architecture:
 * API Call → React Query (check cache) → IndexedDB (if offline) → Backend API
 *
 * All caching happens at React Query layer (configured in queryClient.js)
 * IndexedDB is secondary fallback for offline scenarios
 */

import {
  storePortfolio,
  getPortfolio,
  storeAnalysis,
  getAnalysis,
  storeOpenTrades,
  getOpenTrades,
  storeMarketStatus,
  getMarketStatus,
  storeIndexAnalysis,
  getIndexAnalysis,
  clearExpiredData,
} from '../db/db';

/**
 * Wrapper for API calls with offline fallback
 * 
 * @param {string} cacheType - Type of data ('portfolio', 'analysis', etc)
 * @param {Function} apiFunc - API function to call
 * @param {Function} storeFunc - Dexie store function
 * @param {Function} getFunc - Dexie get function
 * @param {any} context - Context (userId, ticker, etc) for cache key
 */
const withOfflineCache = async (
  cacheType,
  apiFunc,
  storeFunc,
  getFunc,
  context
) => {
  try {
    // Try to fetch from API
    const data = await apiFunc();
    
    // Cache in IndexedDB for offline access
    try {
      if (storeFunc) {
        await storeFunc(data, context);
      }
    } catch (dbError) {
      console.warn(`[CACHE] Failed to store ${cacheType} in IndexedDB:`, dbError);
      // Don't fail the API call if caching fails
    }
    
    return data;
  } catch (error) {
    console.error(`[API] Error fetching ${cacheType}:`, error);
    
    // Fallback to IndexedDB if API fails
    if (getFunc) {
      try {
        const cached = await getFunc(context);
        if (cached?.data) {
          console.log(`[CACHE] Using offline ${cacheType} from IndexedDB`);
          return {
            ...cached.data,
            _source: 'offline_cache',
            _isStale: cached.isStale,
          };
        }
      } catch (dbError) {
        console.error(`[CACHE] Error reading ${cacheType} from IndexedDB:`, dbError);
      }
    }
    
    // Re-throw if both API and cache fail
    throw error;
  }
};

/**
 * Portfolio API Wrapper
 * 
 * Features:
 * - Caches portfolio in IndexedDB (5-minute TTL on backend)
 * - Offline fallback shows last cached portfolio
 * - Automatic refetch on window focus
 * 
 * Usage in component:
 *   const { data, isLoading } = useQueryApi(
 *     ['portfolio', userId],
 *     () => getPortfolioWithCache(userId)
 *   )
 */
export const getPortfolioWithCache = async (userId, apiFunc) => {
  return withOfflineCache(
    'portfolio',
    () => apiFunc(),
    async (data, uid) => storePortfolio(uid, data),
    async (uid) => getPortfolio(uid),
    userId
  );
};

/**
 * Stock Analysis API Wrapper
 * 
 * Features:
 * - Date-boundary caching (resets at 2 AM IST)
 * - Valid for 24 hours on backend (until next day's analysis ready)
 * - IndexedDB stores analysis per date (old analyses kept for reference)
 * 
 * Usage in component:
 *   const { data, isLoading } = useQueryApi(
 *     ['analysis', ticker],
 *     () => getAnalysisWithCache(ticker, userId, getAnalysisFunc)
 *   )
 */
export const getAnalysisWithCache = async (ticker, userId, apiFunc) => {
  // FIX: Use IST timezone to match backend (Asia/Kolkata)
  // Backend uses IST for decision dates, frontend must match
  const { getTodayIST } = await import('../utils/dateUtils');
  const today = getTodayIST();
  
  return withOfflineCache(
    `analysis_${ticker}`,
    () => apiFunc(),
    async (data, t) => storeAnalysis(t, today, userId, data),
    async (t) => getAnalysis(t, today, userId),
    ticker
  );
};

/**
 * Open Trades API Wrapper
 * 
 * Features:
 * - 5-minute cache (backend TTL)
 * - Per-user caching
 * - Offline fallback for trade references
 * 
 * Usage in component:
 *   const { data } = useQueryApi(
 *     ['open-trades', userId],
 *     () => getOpenTradesWithCache(userId, getOpenTradesFunc)
 *   )
 */
export const getOpenTradesWithCache = async (userId, apiFunc) => {
  return withOfflineCache(
    'open_trades',
    () => apiFunc(),
    async (data, uid) => storeOpenTrades(uid, data),
    async (uid) => getOpenTrades(uid),
    userId
  );
};

/**
 * Market Status API Wrapper
 * 
 * Features:
 * - 10-minute cache (backend TTL)
 * - Market holiday info cached
 * - Offline: See if market is open without API
 * 
 * Usage in component:
 *   const { data } = useQueryApi(
 *     'market-status',
 *     () => getMarketStatusWithCache(getMarketStatusFunc)
 *   )
 */
export const getMarketStatusWithCache = async (apiFunc) => {
  return withOfflineCache(
    'market_status',
    () => apiFunc(),
    async (data) => storeMarketStatus(data),
    async () => getMarketStatus(),
    null
  );
};

/**
 * Index Analysis API Wrapper
 * 
 * Features:
 * - 30-minute cache (backend TTL)
 * - Date-boundary indexing (like stock analysis)
 * - Offline fallback for index technical analysis
 * 
 * Usage in component:
 *   const { data } = useQueryApi(
 *     ['index-analysis', indexTicker],
 *     () => getIndexAnalysisWithCache(indexTicker, userId, getIndexAnalysisFunc)
 *   )
 */
export const getIndexAnalysisWithCache = async (indexTicker, userId, apiFunc) => {
  // FIX: Use IST timezone to match backend
  const { getTodayIST } = await import('../utils/dateUtils');
  const today = getTodayIST();
  
  return withOfflineCache(
    `index_analysis_${indexTicker}`,
    () => apiFunc(),
    async (data, it) => storeIndexAnalysis(it, today, data),
    async (it) => getIndexAnalysis(it, today),
    indexTicker
  );
};

/**
 * Periodic cache cleanup
 * 
 * Call this on app initialization to remove expired data from IndexedDB
 * Prevents database from growing unbounded
 * 
 * Usage in App.js useEffect:
 *   useEffect(() => {
 *     initializeCaching()
 *   }, [])
 */
export const initializeCaching = async () => {
  try {
    // Clean up expired data on app start
    await clearExpiredData();
    console.log('[CACHE] Cleaned up expired offline data');
    
    // Run cleanup every 5 minutes
    const cleanupInterval = setInterval(async () => {
      try {
        await clearExpiredData();
      } catch (error) {
        console.error('[CACHE] Cleanup failed:', error);
      }
    }, 5 * 60 * 1000);
    
    // Return cleanup function for React cleanup
    return () => clearInterval(cleanupInterval);
  } catch (error) {
    console.error('[CACHE] Failed to initialize caching:', error);
  }
};

/**
 * Cache invalidation helpers
 * 
 * Use these after mutations to update React Query cache
 * 
 * Usage after user executes trade:
 *   await executeTrade(tradeData)
 *   queryClient.invalidateQueries({ queryKey: ['portfolio'] })
 *   queryClient.invalidateQueries({ queryKey: ['open-trades'] })
 * 
 * React Query automatically refetches these queries
 */
export const invalidationPatterns = {
  // After login
  onLogin: (queryClient, userId) => {
    // Don't invalidate - new user data will load automatically
  },
  
  // After logout
  onLogout: (queryClient) => {
    queryClient.clear(); // Clear all cache
  },
  
  // After trade execution
  onTradeExecuted: (queryClient) => {
    queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    queryClient.invalidateQueries({ queryKey: ['open-trades'] });
    // Analysis and market data don't change
  },
  
  // After portfolio update
  onPortfolioUpdated: (queryClient) => {
    queryClient.invalidateQueries({ queryKey: ['portfolio'] });
  },
  
  // After settings change
  onSettingsUpdated: (queryClient) => {
    queryClient.invalidateQueries({ queryKey: ['portfolio'] });
  },
  
  // Manual refresh button
  onManualRefresh: (queryClient, dataTypes = ['all']) => {
    if (dataTypes.includes('all') || dataTypes.includes('portfolio')) {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    }
    if (dataTypes.includes('all') || dataTypes.includes('trades')) {
      queryClient.invalidateQueries({ queryKey: ['open-trades'] });
    }
    if (dataTypes.includes('all') || dataTypes.includes('market')) {
      queryClient.invalidateQueries({ queryKey: ['market-status'] });
    }
  },
};

/**
 * Error Boundary for offline scenarios
 * 
 * Returns user-friendly error messages
 */
export const getErrorMessage = (error, cacheType) => {
  if (!navigator.onLine) {
    return `Offline: Showing cached ${cacheType}. Check your connection.`;
  }
  
  if (error?.response?.status === 404) {
    return `${cacheType} not found`;
  }
  
  if (error?.response?.status === 401) {
    return 'Session expired. Please log in again.';
  }
  
  if (error?.response?.status >= 500) {
    return 'Server error. Try again later.';
  }
  
  return 'Failed to load data. Check your connection.';
};

export default {
  getPortfolioWithCache,
  getAnalysisWithCache,
  getOpenTradesWithCache,
  getMarketStatusWithCache,
  getIndexAnalysisWithCache,
  initializeCaching,
  invalidationPatterns,
  getErrorMessage,
};
