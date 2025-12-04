import { useQuery, useMutation, useQueryClient as useBaseQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';

/**
 * React Query-based API Hook
 * 
 * Replaces the old useApi hook with React Query for:
 * - Request deduplication (multiple components = single request)
 * - Automatic caching (5 min fresh time by default)
 * - Background refetching (when data becomes stale)
 * - Error handling with retries
 * - Manual refetch capability
 * 
 * Backward-compatible interface to minimize changes to existing code
 */

/**
 * useQueryApi: Wrapper around React Query's useQuery
 * 
 * Usage (Example 1: Simple API call):
 *   const { data, isLoading, error, refetch } = useQueryApi(
 *     'stock-analysis',  // queryKey
 *     () => getAnalysis('INFY'),
 *     { staleTime: 10 * 60 * 1000 }  // optional config
 *   )
 * 
 * Usage (Example 2: Dependent query - only runs when ticker is set):
 *   const { data } = useQueryApi(
 *     ['analysis', ticker],
 *     () => getAnalysis(ticker),
 *     { enabled: !!ticker }
 *   )
 * 
 * Deduplication Example:
 *   // Component A
 *   const { data } = useQueryApi('stock-list', () => getUniverse())
 *   // Component B (mounted same time)
 *   const { data } = useQueryApi('stock-list', () => getUniverse())
 *   
 *   Result: Single API call, both get same data, perfect deduplication!
 * 
 * Benefits:
 * - Automatic caching (default 5 min)
 * - Built-in retry on errors (2 retries with exponential backoff)
 * - Automatic background refetch when data becomes stale
 * - Manual refetch available
 * - Automatic garbage collection (10 min after last subscriber)
 */
export const useQueryApi = (queryKey, queryFn, options = {}) => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    status,
  } = useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn,
    ...options,
  });

  // Return object compatible with old useApi interface
  return {
    data,
    isLoading: isLoading || isFetching,
    error,
    refetch,
    // Additional useful properties
    isFetching,
    status, // 'pending' | 'error' | 'success'
  };
};

/**
 * useMutationApi: Wrapper around React Query's useMutation
 * 
 * For POST, PUT, DELETE requests that modify data
 * 
 * Usage:
 *   const { mutate, isPending, error } = useMutationApi(
 *     (newData) => apiUpdateTrade(newData),
 *     {
 *       onSuccess: () => {
 *         queryClient.invalidateQueries({ queryKey: ['open-trades'] })
 *       }
 *     }
 *   )
 *   
 *   // In component:
 *   mutate(tradeData)
 * 
 * Automatic cache invalidation pattern:
 *   const onSuccess = () => {
 *     // Invalidate related queries to trigger automatic refetch
 *     queryClient.invalidateQueries({ queryKey: ['portfolio'] })
 *     queryClient.invalidateQueries({ queryKey: ['open-trades'] })
 *   }
 */
export const useMutationApi = (mutationFn, options = {}) => {
  const { mutate, data, isPending, error, reset } = useMutation({
    mutationFn,
    retry: 1, // Retry once on error for mutations
    ...options,
  });

  return {
    mutate,
    isPending,
    error,
    data,
    reset,
    // Alias for compatibility
    isLoading: isPending,
  };
};

/**
 * Legacy useApi Hook (Backward Compatible)
 * 
 * **DEPRECATED**: Use useQueryApi instead
 * 
 * This still works but doesn't provide deduplication benefits.
 * Only kept for backward compatibility during migration.
 * 
 * Old code still works:
 *   const { data, isLoading, error, execute } = useApi(getAnalysis)
 * 
 * But it's better to migrate to useQueryApi:
 *   const { data, isLoading, error, refetch } = useQueryApi(
 *     'analysis',
 *     getAnalysis
 *   )
 * 
 * Why migrate?
 * - Old useApi runs query on every component mount (no caching)
 * - useQueryApi only runs once, reuses results across mounts
 * - Old useApi doesn't deduplicate (10 components = 10 API calls)
 * - useQueryApi deduplicates (10 components = 1 API call)
 */
export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await apiFunc();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [apiFunc]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, isLoading, error, execute };
};

/**
 * Advanced Hook: useAsyncData
 * 
 * For complex scenarios with dependent queries
 * 
 * Usage: Fetch a list, then fetch details for selected item
 *   const queryClient = useQueryClient()
 *   
 *   const list = useQueryApi('stocks', () => getUniverse())
 *   const details = useQueryApi(
 *     ['stock-details', selectedTicker],
 *     () => getAnalysis(selectedTicker),
 *     { enabled: !!selectedTicker }  // Only run if ticker selected
 *   )
 *   
 *   // When user selects stock, details auto-fetch
 * 
 * Invalidation Pattern:
 *   const handleTradeExecuted = () => {
 *     queryClient.invalidateQueries({ queryKey: ['open-trades'] })
 *     // All components using this key auto-refetch
 *   }
 */
export const useAsyncData = (queryKey, queryFn, deps = []) => {
  const { data, isLoading, error } = useQueryApi(queryKey, queryFn);
  
  return {
    data,
    isLoading,
    error,
    isEmpty: !data || (Array.isArray(data) && data.length === 0),
  };
};

/**
 * Cache Management Hook
 * 
 * For manual cache operations (clear, invalidate, etc)
 * 
 * Usage:
 *   const queryClient = useQueryClient()
 *   
 *   // After user login
 *   const clearUserCache = () => {
 *     queryClient.invalidateQueries({ queryKey: ['portfolio'] })
 *     queryClient.invalidateQueries({ queryKey: ['open-trades'] })
 *   }
 */
export const useQueryClient = () => {
  // Use the aliased import defined at the top
  const queryClient = useBaseQueryClient();
  return queryClient;
};

/**
 * Offline-aware Hook
 * 
 * Combines React Query with IndexedDB fallback
 * 
 * Usage:
 *   const { data, isOffline } = useOfflineApi(
 *     ['portfolio', userId],
 *     () => getPortfolio(),
 *     getPortfolio  // IndexedDB fallback
 *   )
 *   
 *   return (
 *     <>
 *       {isOffline && <div>Showing cached data</div>}
 *       {data && <PortfolioDisplay data={data} />}
 *     </>
 *   )
 */
export const useOfflineApi = (queryKey, queryFn, offlineFn, options = {}) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // If offline, use IndexedDB fallback
  const { data, error, isLoading } = useQueryApi(
    queryKey,
    isOffline ? offlineFn : queryFn,
    { ...options, enabled: !isOffline || !!options.enabled }
  );
  
  return {
    data,
    error,
    isLoading,
    isOffline,
  };
};

export default useQueryApi;
