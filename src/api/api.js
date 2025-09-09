import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

// Create a single, configured axios instance for all API calls.
// This is a best practice for managing API interactions.
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * --- API Functions ---
 * Each function corresponds to a specific, verified endpoint from the backend (index.py).
 * All frontend components should use these functions for data fetching.
 */

// --- DATA RETRIEVAL ENDPOINTS ---

/**
 * Fetches the static list of stock tickers that the application actively analyzes.
 * Corresponds to: GET /api/universe
 */
export const getUniverse = async () => {
  try {
    const response = await api.get('/universe');
    return response.data;
  } catch (error) {
    console.error('Error fetching trading universe:', error);
    throw error;
  }
};

/**
 * Retrieves the complete, pre-computed VST analysis for a single stock.
 * Corresponds to: GET /api/analysis/<ticker>
 */
export const getAnalysis = async (ticker) => {
  try {
    const response = await api.get(`/analysis/${ticker}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching analysis for ${ticker}:`, error);
    throw error;
  }
};

/**
 * Fetches all currently active trades in the live portfolio.
 * Corresponds to: GET /api/open-trades
 */
export const getOpenTrades = async () => {
  try {
    const response = await api.get('/open-trades');
    return response.data;
  } catch (error) {
    console.error('Error fetching open trades:', error);
    throw error;
  }
};

/**
 * Retrieves the performance history of all closed live trades.
 * Corresponds to: GET /api/track-record
 */
export const getTrackRecord = async () => {
  try {
    const response = await api.get('/track-record');
    return response.data;
  } catch (error) {
    console.error('Error fetching track record:', error);
    throw error;
  }
};

// --- INTERACTIVE ENDPOINTS ---

/**
 * Allows a user to ask a natural language question about a stock's analysis.
 * Corresponds to: POST /api/ask
 */
export const askQuestion = async (ticker, question) => {
  try {
    const payload = { ticker, question };
    const response = await api.post('/ask', payload);
    return response.data;
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
};

/**
 * Records a user's vote ('agree', 'unsure', 'disagree') on an analysis.
 * Corresponds to: POST /api/feedback/vote
 */
export const submitVote = async (analysisId, voteType) => {
  try {
    const payload = { analysis_id: analysisId, vote_type: voteType };
    const response = await api.post('/feedback/vote', payload);
    return response.data;
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
};

/**
 * A single endpoint to submit general feedback, bug reports, or FAQ questions.
 * Corresponds to: POST /api/feedback/submit
 */
export const submitFeedback = async (category, feedbackText) => {
  try {
    const payload = { category, feedback_text: feedbackText };
    const response = await api.post('/feedback/submit', payload);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

/**
 * Allows a user to manually log their own trade.
 * NOTE: The backend endpoint for this was missing in the original api.js.
 * Corresponds to: POST /api/trades/log
 */
export const logTrade = async (tradeData) => {
    try {
        const response = await api.post('/trades/log', tradeData);
        return response.data;
    } catch (error) {
        console.error('Error logging trade:', error);
        throw error;
    }
};
