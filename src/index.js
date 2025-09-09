import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { BrowserRouter } from "react-router-dom";
import './assets/styles/index.css'; // <-- FIXED PATH
import App from './App';
import { AuthProvider } from './context/AuthContext';

// --- Sentry Code ---
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);