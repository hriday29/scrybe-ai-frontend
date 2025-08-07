// src/SignInModal.js
import React from 'react';
import { motion } from 'framer-motion';

// --- (Icon components for the buttons) ---
const GoogleIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.519-3.483-11.188-8.169l-6.571 4.819C9.656 39.663 16.318 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.158 44 30.013 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>);
const GitHubIcon = () => ( <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>);

const AppleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M318.7 268.6c-.3-37.3 16.5-65.5 51.6-86.2-19.3-28.1-48.6-43.6-88.1-46.6-36.9-2.8-77.4 21.6-91.4 21.6s-47.6-20.9-74.1-20.3c-56.9.9-118 41.8-118 124.9 0 27.7 5.1 56.6 15.3 86.7 13.6 40.1 63.1 138.4 114.7 136.6 27.7-1.1 47.5-19.5 83.4-19.5s53.8 19.5 83.9 19c52.1-.8 97.3-90.4 110.5-130.6-69.7-33.1-65.7-95.4-65.8-106.6zM258.1 79.4c26.5-32.2 23.4-61.5 22.8-71.4-22 1-47.4 15-62.6 33.5-15.2 18.6-25.3 44.4-22.1 70.2 24.1 1.8 49.1-12.3 61.9-32.3z"/>
  </svg>
);

export default function SignInModal({ onSignIn, onGitHubSignIn, onAppleSignIn, onClose }) {
  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900/80 border border-slate-700 rounded-2xl w-full max-w-sm text-center p-8 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Access Your Dashboard</h2>
        <p className="text-gray-400 mb-8">Choose a sign-in method to continue.</p>
        
        <div className="space-y-3">
            <button
              onClick={onSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <GoogleIcon />
              Sign in with Google
            </button>

            <button
              onClick={onGitHubSignIn}
              className="w-full flex items-center justify-center gap-3 bg-[#24292e] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#33383d] transition-colors"
            >
              <GitHubIcon />
              Sign in with GitHub
            </button>

            <button
              onClick={onAppleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <AppleIcon />
              Sign in with Apple
            </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </motion.div>
  );
}