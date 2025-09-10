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
    // FIX: Changed '/analysis/' to '/get-analysis/'
    const response = await api.get(`/get-analysis/${ticker}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching analysis for ${ticker}:`, error);
    throw error;
  }
};

export const getOpenTrades = async () => {
  try {
    // FIX: Changed '/open-trades' to '/get-open-trades'
    const response = await api.get('/get-open-trades');
    return response.data;
  } catch (error) {
    console.error('Error fetching open trades:', error);
    throw error;
  }
};

export const getTrackRecord = async () => {
  try {
    // FIX: Changed '/track-record' to '/get-track-record'
    const response = await api.get('/get-track-record');
    return response.data;
  } catch (error) {
    console.error('Error fetching track record:', error);
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
    // FIX: Changed '/feedback/vote' to '/vote-analysis'
    const payload = { analysis_id: analysisId, vote_type: voteType };
    const response = await api.post('/vote-analysis', payload);
    return response.data;
  } catch (error)
  {
    console.error('Error submitting vote:', error);
    throw error;
  }
};

export const submitFeedback = async (category, feedbackText) => {
  try {
    // FIX: Changed '/feedback/submit' to '/submit-feedback'
    const payload = { category, feedback_text: feedbackText };
    const response = await api.post('/submit-feedback', payload);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export const logTrade = async (tradeData) => {
  try {
    // FIX: Changed '/trades/log' to '/log-user-trade'
    const response = await api.post('/log-user-trade', tradeData);
    return response.data;
  } catch (error) {
    console.error('Error logging trade:', error);
    throw error;
  }
};