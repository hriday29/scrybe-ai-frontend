import Dexie from 'dexie';

/**
 * IndexedDB Schema using Dexie
 * 
 * Provides offline access to critical data:
 * - Portfolio and trades (synced every 5 min)
 * - Stock analysis (synced every time user views, valid until 2 AM)
 * - Market status (synced every 10 min)
 * - Index analysis (synced every 30 min)
 * 
 * Offline flow:
 * 1. User has connectivity: Fetch from API, store in IndexedDB
 * 2. User goes offline: Show data from IndexedDB (graceful degradation)
 * 3. User comes back online: Sync fresh data from API
 * 
 * Browser quota: ~50 MB for IndexedDB in most browsers
 * Current schema: ~5-10 MB expected (portfolio < 1MB, analysis ~100KB per stock)
 */

export const db = new Dexie('scrybeAI');

/**
 * Database Schema
 * Version 1: Initial schema
 * 
 * Versioning allows schema migrations:
 * - Add tables: Create new version with updated schema
 * - Modify tables: Create new version, Dexie handles migration automatically
 * - Old data: Accessible until user clears cache
 */
db.version(1).stores({
  /**
   * Portfolio data
   * keyPath: 'id' - unique identifier for each cached entry
   * indices: 'userId', 'timestamp' - for querying
   * 
   * Why cache portfolio?
   * - Heavy computation (consolidation, calculations)
   * - User views frequently (multiple times per day)
   * - Offline access needed (check holdings without internet)
   */
  portfolio: 'id, userId, timestamp',

  /**
   * Individual stock analysis
   * keyPath: ['ticker', 'analysisDate'] - combination of ticker + analysis date
   * indices: 'userId', 'timestamp', 'analysisDate'
   * 
   * Why separate from portfolio?
   * - Each stock is independent
   * - Large objects (AI analysis, technicals, patterns)
   * - Users check multiple stocks
   * - Analysis is valid until next day (cache by analysis date)
   * 
   * Example keys:
   * - ['INFY', '2025-01-02'] = INFY analysis from Jan 2
   * - ['SBIN', '2025-01-02'] = SBIN analysis from Jan 2
   * - ['INFY', '2025-01-01'] = INFY analysis from Jan 1 (old, can be cleared)
   */
  analysis: '[ticker+analysisDate], userId, timestamp',

  /**
   * Open trades across all users
   * keyPath: 'id' - unique trade identifier
   * indices: 'userId', 'ticker', 'timestamp'
   * 
   * Why cache?
   * - Reference for portfolio page
   * - Shows which stocks are being traded
   * - Offline view of open positions
   * - Much smaller than analysis (~10 KB)
   */
  openTrades: 'id, userId, ticker, timestamp',

  /**
   * Market status (open/closed, holidays, etc)
   * keyPath: 'date' - cache by date (changes once per day)
   * indices: 'timestamp'
   * 
   * Why cache?
   * - Users check multiple times per day
   * - Doesn't change during trading hours
   * - Small data (< 1 KB)
   * - Offline: See if market is open without API call
   */
  marketStatus: 'date, timestamp',

  /**
   * Index analysis (Nifty 50, Bank Nifty, etc)
   * keyPath: ['indexTicker', 'analysisDate']
   * indices: 'timestamp', 'analysisDate'
   * 
   * Why cache?
   * - Similar to stock analysis
   * - Users check indices before trading
   * - Large objects with VIX, technical indicators
   * - Valid for the trading day
   */
  indexAnalysis: '[indexTicker+analysisDate], timestamp, analysisDate',

  /**
   * Cache metadata
   * Tracks when each data type was last synced
   * 
   * Example entries:
   * { dataType: 'portfolio', lastSyncTime: 1704201600000, expiresAt: 1704202500000 }
   * { dataType: 'marketStatus', lastSyncTime: 1704201600000, expiresAt: 1704202200000 }
   * 
   * Used for:
   * - Deciding when to refetch (if expired, show stale + background sync)
   * - Showing "Last updated: 2 min ago" on UI
   * - Automatic expiration cleanup
   */
  syncMetadata: 'dataType',
});

/**
 * Helper: Store portfolio with metadata
 * 
 * Usage: await storePortfolio(userId, portfolioData)
 */
export async function storePortfolio(userId, portfolioData) {
  const now = Date.now();
  const ttl = 5 * 60 * 1000; // 5 minutes

  await db.portfolio.put({
    id: `portfolio_${userId}_${now}`,
    userId,
    data: portfolioData,
    timestamp: now,
    expiresAt: now + ttl,
  });

  await updateSyncMetadata('portfolio', ttl);
}

/**
 * Helper: Get latest cached portfolio
 * 
 * Returns portfolio if exists and not expired, otherwise null
 * Usage: const cached = await getPortfolio(userId)
 */
export async function getPortfolio(userId) {
  const cached = await db.portfolio
    .where('userId')
    .equals(userId)
    .reverse()
    .first();

  if (!cached) return null;

  // Check if expired
  if (cached.expiresAt < Date.now()) {
    // Expired, but keep in DB for fallback, just mark as stale
    return { ...cached, isStale: true };
  }

  return { ...cached, isStale: false };
}

/**
 * Helper: Store stock analysis
 * 
 * Usage: await storeAnalysis('INFY', '2025-01-02', userId, analysisData)
 */
export async function storeAnalysis(ticker, analysisDate, userId, analysisData) {
  const now = Date.now();
  const ttl = 24 * 60 * 60 * 1000; // 24 hours (backend analysis cache duration)

  await db.analysis.put({
    ticker,
    analysisDate,
    userId,
    data: analysisData,
    timestamp: now,
    expiresAt: now + ttl,
  });

  await updateSyncMetadata('analysis', ttl);
}

/**
 * Helper: Get cached analysis
 * 
 * Usage: const cached = await getAnalysis('INFY', '2025-01-02', userId)
 */
export async function getAnalysis(ticker, analysisDate, userId) {
  const cached = await db.analysis.get([ticker, analysisDate]);

  if (!cached) return null;

  // Check if expired
  if (cached.expiresAt < Date.now()) {
    return { ...cached, isStale: true };
  }

  return { ...cached, isStale: false };
}

/**
 * Helper: Store open trades
 * 
 * Usage: await storeOpenTrades(userId, tradesArray)
 */
export async function storeOpenTrades(userId, trades) {
  const now = Date.now();
  const ttl = 5 * 60 * 1000; // 5 minutes

  // Clear old trades for this user first
  await db.openTrades.where('userId').equals(userId).delete();

  // Store new trades
  const tradesToStore = trades.map((trade) => ({
    id: trade.id || `${userId}_${trade.ticker}_${now}`,
    userId,
    ticker: trade.ticker,
    ...trade,
    timestamp: now,
    expiresAt: now + ttl,
  }));

  await db.openTrades.bulkPut(tradesToStore);
  await updateSyncMetadata('openTrades', ttl);
}

/**
 * Helper: Get cached open trades
 * 
 * Usage: const cached = await getOpenTrades(userId)
 */
export async function getOpenTrades(userId) {
  const trades = await db.openTrades.where('userId').equals(userId).toArray();

  if (trades.length === 0) return null;

  // Check if any are expired
  const now = Date.now();
  const validTrades = trades.filter((t) => t.expiresAt > now);
  const hasStale = trades.length > validTrades.length;

  return {
    data: validTrades,
    isStale: hasStale,
  };
}

/**
 * Helper: Store market status
 * 
 * Usage: await storeMarketStatus(statusData) // date is extracted from statusData
 */
export async function storeMarketStatus(statusData) {
  const now = Date.now();
  const ttl = 10 * 60 * 1000; // 10 minutes

  await db.marketStatus.put({
    date: statusData.date || new Date().toISOString().split('T')[0],
    data: statusData,
    timestamp: now,
    expiresAt: now + ttl,
  });

  await updateSyncMetadata('marketStatus', ttl);
}

/**
 * Helper: Get cached market status
 * 
 * Usage: const cached = await getMarketStatus()
 */
export async function getMarketStatus() {
  const today = new Date().toISOString().split('T')[0];
  const cached = await db.marketStatus.get(today);

  if (!cached) return null;

  if (cached.expiresAt < Date.now()) {
    return { ...cached, isStale: true };
  }

  return { ...cached, isStale: false };
}

/**
 * Helper: Store index analysis
 * 
 * Usage: await storeIndexAnalysis('NIFTY', '2025-01-02', analysisData)
 */
export async function storeIndexAnalysis(indexTicker, analysisDate, analysisData) {
  const now = Date.now();
  const ttl = 30 * 60 * 1000; // 30 minutes

  await db.indexAnalysis.put({
    indexTicker,
    analysisDate,
    data: analysisData,
    timestamp: now,
    expiresAt: now + ttl,
  });

  await updateSyncMetadata('indexAnalysis', ttl);
}

/**
 * Helper: Get cached index analysis
 * 
 * Usage: const cached = await getIndexAnalysis('NIFTY', '2025-01-02')
 */
export async function getIndexAnalysis(indexTicker, analysisDate) {
  const cached = await db.indexAnalysis.get([indexTicker, analysisDate]);

  if (!cached) return null;

  if (cached.expiresAt < Date.now()) {
    return { ...cached, isStale: true };
  }

  return { ...cached, isStale: false };
}

/**
 * Helper: Update sync metadata
 * 
 * Tracks when data was last synced and its TTL
 * Usage: Internal, called by store* functions
 */
async function updateSyncMetadata(dataType, ttl) {
  const now = Date.now();
  await db.syncMetadata.put({
    dataType,
    lastSyncTime: now,
    expiresAt: now + ttl,
  });
}

/**
 * Helper: Get sync metadata
 * 
 * Returns when data was last synced
 * Usage: const meta = await getSyncMetadata('portfolio')
 */
export async function getSyncMetadata(dataType) {
  return await db.syncMetadata.get(dataType);
}

/**
 * Helper: Clear expired data
 * 
 * Run this periodically (e.g., every 5 min) to clean up IndexedDB
 * Usage: await clearExpiredData()
 */
export async function clearExpiredData() {
  const now = Date.now();

  await Promise.all([
    db.portfolio.where('expiresAt').below(now).delete(),
    db.analysis.where('expiresAt').below(now).delete(),
    db.openTrades.where('expiresAt').below(now).delete(),
    db.marketStatus.where('expiresAt').below(now).delete(),
    db.indexAnalysis.where('expiresAt').below(now).delete(),
  ]);
}

/**
 * Helper: Get database stats
 * 
 * Returns count of cached items by type
 * Usage: const stats = await getDBStats()
 */
export async function getDBStats() {
  const stats = {
    portfolio: await db.portfolio.count(),
    analysis: await db.analysis.count(),
    openTrades: await db.openTrades.count(),
    marketStatus: await db.marketStatus.count(),
    indexAnalysis: await db.indexAnalysis.count(),
  };
  return stats;
}

/**
 * Helper: Clear all data
 * 
 * Use on logout or user request
 * Usage: await clearAllData()
 */
export async function clearAllData() {
  await Promise.all([
    db.portfolio.clear(),
    db.analysis.clear(),
    db.openTrades.clear(),
    db.marketStatus.clear(),
    db.indexAnalysis.clear(),
    db.syncMetadata.clear(),
  ]);
}

export default db;
