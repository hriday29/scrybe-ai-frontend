// src/index.js

// --- 1. ALL IMPORTS ARE NOW GROUPED AT THE TOP ---
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext';


// --- 2. SENTRY IS INITIALIZED *AFTER* ALL IMPORTS ---
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  // We recommend adjusting this value in production,
  // or using tracesSampler for finer control
  tracesSampleRate: 1.0, 
});


// --- 3. THE REST OF THE APP CODE FOLLOWS ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);