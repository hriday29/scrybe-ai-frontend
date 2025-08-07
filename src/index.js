// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css'; // <-- ADD THIS LINE HERE
// import App from './App';

// // Create root using the root element in your HTML
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext'; // <-- ADD THIS IMPORT

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* vvv WRAP YOUR APP COMPONENT LIKE THIS vvv */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* ^^^ END OF WRAPPER ^^^ */}
  </React.StrictMode>
);