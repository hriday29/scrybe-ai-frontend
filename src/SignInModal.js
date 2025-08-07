// src/SignInModal.js
import React from 'react';
import { motion } from 'framer-motion';

// --- (Icon components for the buttons) ---
const GoogleIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.519-3.483-11.188-8.169l-6.571 4.819C9.656 39.663 16.318 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.158 44 30.013 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>);
const GitHubIcon = () => ( <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>);
const AppleIcon = () => ( <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.16,11.43a3.44,3.44,0,0,1-1.36-2.8A3.33,3.33,0,0,1,18.65,6a3.24,3.24,0,0,0-2.39-1.18,4.12,4.12,0,0,0-3.3,1.59,4.2,4.2,0,0,0-3.3-1.59A4.1,4.1,0,0,0,7.34,6,3.34,3.34,0,0,1,8.19,8.63,3.44,3.44,0,0,1,6.83,11.43c-2.18,2.29-2.26,5.88.21,7.86a4,4,0,0,0,2.83,1.21,4.1,4.1,0,0,0,3.12-1.55,4.3,4.3,0,0,0,3.12,1.55,4,4,0,0,0,2.83-1.21C21.42,17.31,21.34,13.72,19.16,11.43ZM15.34,5.16a2.5,2.5,0,0,1,1.81.82,2.37,2.37,0,0,1-.53,3.41,2.51,2.51,0,0,1-1.8-.83A2.37,2.37,0,0,1,15.34,5.16Z"></path></svg>);

// --- 1. ACCEPT THE NEW HANDLER PROPS ---
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
        
        {/* --- 2. CREATE A CONTAINER FOR THE BUTTONS --- */}
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