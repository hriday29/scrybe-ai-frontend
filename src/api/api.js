// src/api/api.js

import authFetch from './authFetch';
import { API_BASE_URL } from '../apiConfig.js'; // CORRECTED PATH

/**
 * Fetches the official, curated A-List from the backend config.
 */
export const getAList = (currentUser) => {
    const url = `${API_BASE_URL}/api/config/a-list`;
    return authFetch(url, currentUser);
};

/**
 * Fetches the full Apex analysis for a given ticker.
 */
export const getAnalysisForTicker = (ticker, currentUser) => {
    const url = `${API_BASE_URL}/api/analyze/${ticker}`;
    return authFetch(url, currentUser);
};

/**
 * Fetches all currently open positions for the user.
 */
export const getOpenTrades = (currentUser) => {
    const url = `${API_BASE_URL}/api/open-trades`;
    return authFetch(url, currentUser);
};

/**
 * Fetches the historical track record of all closed trades.
 */
export const getTrackRecord = (currentUser) => {
    const url = `${API_BASE_URL}/api/track-record`;
    return authFetch(url, currentUser);
};