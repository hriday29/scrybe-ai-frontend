// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

// --- ADD THIS LINE ---
const PUBLISHABLE_KEY = "your_publishable_key_from_clerk";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* vvv WRAP YOUR APP COMPONENT LIKE THIS vvv */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
    {/* ^^^ END OF WRAPPER ^^^ */}
  </React.StrictMode>
);