import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // <-- ADD THIS LINE HERE
import App from './App';

// Create root using the root element in your HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);