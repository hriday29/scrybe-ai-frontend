// src/api/api.js (CORRECTED)
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * --- API Functions ---
 */

// --- DATA RETRIEVAL ENDPOINTS ---

export const getUniverse = async () => {
  try {
    const response = await api.get('/universe'); // This one was correct
    return response.data;
  } catch (error) {
    console.error('Error fetching trading universe:', error);
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

export const getOpenTrades = async () => {
  try {
    const response = await api.get('/open-trades');
    return response.data;
  } catch (error) {
    console.error('Error fetching open trades:', error);
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
    // This route exists in your final api/index.py
    const response = await api.get(`/news/${ticker}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching news for ${ticker}:`, error);
    throw error;
  }
};

// --- INTERACTIVE ENDPOINTS ---

export const askQuestion = async (ticker, question) => {
  try {
    const payload = { ticker, question };
    const response = await api.post('/ask', payload); // This one was correct
    return response.data;
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
};

export const submitVote = async (analysisId, voteType) => {
  try {
    const payload = { analysis_id: analysisId, vote_type: voteType };
    const response = await api.post('/vote', payload);
    return response.data;
  }
  catch (error)
  {
    console.error('Error submitting vote:', error);
    throw error;
  }
};

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

export const logTrade = async (tradeData) => {
  try {
    const response = await api.post('/trades/log', tradeData);
    return response.data;
  } catch (error) {
    console.error('Error logging trade:', error);
    throw error;
  }
};