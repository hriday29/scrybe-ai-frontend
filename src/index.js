// src/index.js

// --- SENTRY INITIALIZATION (Add this block at the very top) ---
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  // We recommend adjusting this value in production,
  // or using tracesSampler for finer control
  tracesSampleRate: 1.0, // Capture 100% of transactions for performance monitoring.
});
// --- End Sentry Initialization ---


// --- Your existing code continues below ---
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);