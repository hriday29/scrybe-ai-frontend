// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../services/firebase';
import authFetch from '../api/authFetch';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);

      // --- 🔥 GA4 User-ID Tracking via GTM ---
      window.dataLayer = window.dataLayer || [];

      if (user) {
        // User logged in → push UID to GTM
        window.dataLayer.push({
          user_id: user.uid
        });

        console.log("GA4 User ID pushed:", user.uid);

      } else {
        // User logged out → clear user_id
        window.dataLayer.push({
          user_id: null
        });

        console.log("GA4 User ID cleared");
      }
      // --- 🔥 End User-ID Tracking ---
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    authFetch
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
