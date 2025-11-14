// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Validate config - at minimum we need an API key to attempt initialization.
// Some projects may still provide other values later; require only the key.
const isFirebaseConfigured = Boolean(firebaseConfig.apiKey);

let app = null;
let auth = null;
let initializationError = null;
if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (err) {
    // If there's an error during initialization, keep app/auth null
    // and surface the error during dev.
    initializationError = err;
    console.error('Failed to initialize Firebase:', err);
  }
} else {
  console.warn('Firebase not configured - missing REACT_APP_FIREBASE_API_KEY (or other firebase vars).');
}

const isFirebaseInitialized = Boolean(auth) && !initializationError;

export { app, auth, isFirebaseConfigured, isFirebaseInitialized, initializationError };