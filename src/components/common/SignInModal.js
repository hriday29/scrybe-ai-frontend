import React, { useEffect } from 'react';
import { Lock } from 'lucide-react';
import Modal from '../ui/Modal';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.519-3.483-11.188-8.169l-6.571 4.819C9.656 39.663 16.318 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.158 44 30.013 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

const MicrosoftIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#f35325" d="M1 1h10v10H1z"/>
    <path fill="#81bc06" d="M13 1h10v10H13z"/>
    <path fill="#05a6f0" d="M1 13h10v10H1z"/>
    <path fill="#ffba08" d="M13 13h10v10H13z"/>
  </svg>
);

export default function SignInModal({ onSignIn, onMicrosoftSignIn, onClose, onTermsOpen, onPrivacyOpen }) {
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
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button
          onClick={() => handleSignIn(onMicrosoftSignIn, 'Microsoft')}
          className="w-full flex items-center justify-center gap-3 bg-[#0078d4] border-2 border-[#0078d4] text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-[#106ebe] hover:border-[#106ebe] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 shadow-soft"
          aria-label="Sign in with Microsoft"
        >
          <MicrosoftIcon />
          Continue with Microsoft
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