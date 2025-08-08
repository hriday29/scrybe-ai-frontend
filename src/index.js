// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
// We no longer import from "@sentry/tracing"

import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext';


// --- THIS SENTRY CODE IS NOW UPDATED ---
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    // This is the new, correct way to enable performance monitoring
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, sample the session when an error occurs.
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);