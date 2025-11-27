// src/api/api.js
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

// This axios instance is for PUBLIC calls that do NOT require a login.
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * --- PUBLIC API FUNCTIONS ---
 * These can be called without a user being logged in.
 */

export const getIndexList = async () => {
  try {
    const response = await api.get('/indices');
    return response.data;
  } catch (error) {
    console.error('Error fetching index list:', error);
    throw error;
  }
};

export const getIndexAnalysis = async (ticker) => {
  try {
    // Note: We encode the ticker to handle special characters like '^'
    const encodedTicker = encodeURIComponent(ticker);
    const response = await api.get(`/index-analysis/${encodedTicker}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching index analysis for ${ticker}:`, error);
    throw error;
  }
};

export const getUniverse = async () => {
  try {
    const response = await api.get('/universe');
    return response.data;
  } catch (error) {
    console.error('Error fetching universe:', error);
    throw error;
  }
};

export const getAnalysis = async (ticker) => {
  try {
    const response = await api.get(`/analysis/${ticker}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching analysis for ${ticker}:`, error);
    throw error;
  }
};

export const getTrackRecord = async () => {
  try {
    const response = await api.get('/track-record');
    return response.data;
  } catch (error) {
    console.error('Error fetching track record:', error);
    throw error;
  }
};

export const getNews = async (ticker) => {
  try {
    const response = await api.get(`/news/${ticker}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching news for ${ticker}:`, error);
    throw error;
  }
};


/**
 * --- AUTHENTICATED API FUNCTIONS ---
 * These functions require the `authFetch` utility and the `currentUser` object
 * to be passed in from the component that calls them.
 */

export const submitFeedback = async (authFetch, currentUser, category, feedbackText) => {
  try {
    const payload = { category, feedback_text: feedbackText };
    const response = await authFetch(`${API_BASE_URL}/api/feedback/submit`, currentUser, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return response;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

// Public contact request (no auth required). Uses plain axios instance.
export const submitContactRequest = async (payload) => {
  try {
    const response = await api.post('/contact/submit', payload);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact request:', error);
    throw error;
  }
};

export const getOpenTrades = async (authFetch, currentUser) => {
  try {
    const response = await authFetch(`${API_BASE_URL}/api/open-trades`, currentUser);
    return response;
  } catch (error) {
    console.error('Error fetching open trades:', error);
    throw error;
  }
};

export const askQuestion = async (authFetch, currentUser, ticker, question) => {
  try {
    const payload = { ticker, question };
    const response = await authFetch(`${API_BASE_URL}/api/ask`, currentUser, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return response;
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
};

export const submitVote = async (authFetch, currentUser, analysisId, voteType) => {
  try {
    const payload = { analysis_id: analysisId, vote_type: voteType };
     const response = await authFetch(`${API_BASE_URL}/api/vote`, currentUser, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return response;
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
};

export const logTrade = async (authFetch, currentUser, tradeData) => {
    try {
        const response = await authFetch(`${API_BASE_URL}/api/trades/log`, currentUser, {
            method: 'POST',
            body: JSON.stringify(tradeData)
        });

        // --- Push log_trade event to dataLayer on success ---
        // Safe check for common success shapes: { success: true }, status 200/201, or ok === true
        const isSuccess = response && (
          response.success === true ||
          response.status === 200 ||
          response.status === 201 ||
          response.ok === true
        );

        if (isSuccess) {
          try {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'log_trade',
              ticker: tradeData.ticker,
              signal: tradeData.signal,
              strategy: tradeData.strategy
            });
            // Helpful debug log (can be removed in production)
            console.log('GTM event pushed: log_trade', {
              ticker: tradeData.ticker,
              signal: tradeData.signal,
              strategy: tradeData.strategy
            });
          } catch (dlError) {
            console.warn('Failed to push log_trade to dataLayer:', dlError);
          }
        }

        return response;
    } catch (error) {
        console.error('Error logging trade:', error);
        throw error;
    }
};

export const getMyTrades = async (authFetch, currentUser) => {
    try {
        const response = await authFetch(`${API_BASE_URL}/api/my-trades`, currentUser);
        return response;
    } catch (error) {
        console.error('Error fetching my trades:', error);
        throw error;
    }
};

/**
 * --- PAYMENT API FUNCTIONS ---
 */

export const initiatePayuPayment = async (paymentData, currentUser) => {
  try {
    // Get Firebase ID token for authentication
    const token = await currentUser.getIdToken();
    
    const response = await axios.post(
      `${API_BASE_URL}/api/payu/initiate`,
      paymentData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error initiating PayU payment:', error);
    throw error.response?.data || { error: error.message };
  }
};

export const getPaymentStatus = async (transactionId) => {
  try {
    const response = await api.get(`/payu/status/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw error;
  }
};

export const getUserPayments = async (authFetch, currentUser) => {
  try {
    const response = await authFetch(`${API_BASE_URL}/api/payu/payments`, currentUser);
    return response;
  } catch (error) {
    console.error('Error fetching user payments:', error);
    throw error;
  }
};
