// src/api/api.js

import authFetch from './authFetch';
import { API_BASE_URL } from './apiConfig'; // Assuming you have this file

/**
 * Fetches the official, curated A-List from the backend config.
 * @param {object} currentUser - The user object from the useAuth() hook.
 * @returns {Promise<Array>} - A promise that resolves to the array of A-List tickers.
 */
export const getAList = async (currentUser) => {
    const url = `${API_BASE_URL}/api/config/a-list`;
    return authFetch(url, currentUser);
};

/**
 * Fetches the full Apex analysis for a given ticker.
 * @param {string} ticker - The stock ticker (e.g., "LT.NS").
 * @param {object} currentUser - The user object from the useAuth() hook.
 * @returns {Promise<object>} - A promise that resolves to the analysis JSON object.
 */
export const getAnalysisForTicker = async (ticker, currentUser) => {
    const url = `${API_BASE_URL}/api/analyze/${ticker}`;
    return authFetch(url, currentUser);
};

// You can add all other future API calls here (e.g., getOpenTrades, getTrackRecord, etc.)