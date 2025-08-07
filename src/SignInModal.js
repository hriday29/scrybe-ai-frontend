// src/SignInModal.js
import React from 'react';
import { motion } from 'framer-motion';

// A simple Google Icon SVG to use in the button
const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.519-3.483-11.188-8.169l-6.571 4.819C9.656 39.663 16.318 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.158 44 30.013 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

export default function SignInModal({ onSignIn, onClose }) {
  return (
    // The outer div is the blurred, clickable background.
    <motion.div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* The inner div is the modal content itself. */}
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside it
        className="bg-slate-900/80 border border-slate-700 rounded-2xl w-full max-w-sm text-center p-8 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Access Your Dashboard</h2>
        <p className="text-gray-400 mb-8">Sign in to unlock the full suite of AI analysis tools.</p>
        
        <button
          onClick={onSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        <p className="text-xs text-gray-500 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </motion.div>
  );
}