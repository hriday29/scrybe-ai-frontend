import React, { useEffect } from 'react';
import { Lock } from 'lucide-react';
import Modal from '../ui/Modal';
import { isFirebaseConfigured, isFirebaseInitialized, initializationError } from '../../services/firebase';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.519-3.483-11.188-8.169l-6.571 4.819C9.656 39.663 16.318 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.158 44 30.013 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);


const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#1DA1F2" d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.2 1.64 4.16c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.83 1.92 3.61-.71-.02-1.38-.22-1.97-.54v.05c0 2.09 1.49 3.83 3.47 4.23-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21c7.55 0 11.69-6.26 11.69-11.69 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 5.1a8.2 8.2 0 0 1-2.54.7z"/>
  </svg>
);

export default function SignInModal({ onSignIn, onTwitterSignIn, onClose, onTermsOpen, onPrivacyOpen }) {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  const handleSignIn = (handler, provider) => {
    try {
      handler?.();
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    }
  };

  return (
    <Modal onClose={onClose} title="Welcome Back" maxWidth="max-w-md">
      {/* Lock Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-full p-4">
          <Lock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
        Sign in to access your trading dashboard
      </p>

      {/* Sign-in Buttons */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => handleSignIn(onSignIn, 'Google')}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-neutral-900 border-2 border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 font-semibold py-3.5 px-6 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-soft"
          aria-label="Sign in with Google"
          disabled={!isFirebaseConfigured || !isFirebaseInitialized}
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button
          onClick={() => handleSignIn(onTwitterSignIn, 'Twitter')}
          className="w-full flex items-center justify-center gap-3 bg-[#1DA1F2] border-2 border-[#1DA1F2] text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-[#0d8ddb] hover:border-[#0d8ddb] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:ring-offset-2 shadow-soft"
          aria-label="Sign in with Twitter"
          disabled={!isFirebaseConfigured || !isFirebaseInitialized}
        >
          <TwitterIcon />
          Continue with Twitter
        </button>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-neutral-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-neutral-900 text-gray-500 dark:text-gray-400">Secure Authentication</span>
        </div>
      </div>

      {/* Footer */}
      {!isFirebaseConfigured && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm mt-4">
          Firebase is not configured for this environment. Sign-in is disabled locally. Check your <code>REACT_APP_FIREBASE_API_KEY</code> and other Firebase environment variables before running the app.
        </div>
      )}
      {isFirebaseConfigured && !isFirebaseInitialized && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm mt-4">
          Firebase configuration exists but initialization failed. Check keys and console for details. Error: {initializationError?.message || 'unknown error'}
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-center">
        By signing in, you agree to our{' '}
        <button
          onClick={() => { onClose?.(); onTermsOpen?.(); }}
          type="button"
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium underline focus:outline-none focus:ring-2 focus:ring-primary-500/30 rounded-sm"
        >
          Terms of Service
        </button>
        {' '}and{' '}
        <button
          onClick={() => { onClose?.(); onPrivacyOpen?.(); }}
          type="button"
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium underline focus:outline-none focus:ring-2 focus:ring-primary-500/30 rounded-sm"
        >
          Privacy Policy
        </button>
      </p>

      {/* Trust Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Lock className="w-3 h-3" />
        <span>Your data is encrypted and secure</span>
      </div>
    </Modal>
  );
}