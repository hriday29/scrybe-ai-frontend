
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PaymentManager from '../components/specific/PaymentManager';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../firebase';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();

  const handleBackHome = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      // Add a delay to allow auth state to update before navigation
      setTimeout(() => {
        navigate('/');
      }, 200);
    } catch (error) {
      console.error('Error signing out:', error);
      setIsSigningOut(false);
    }
  };

  if (!currentUser) {
    return <div className="p-8 text-center">Please sign in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start mb-8"
        >
          <button
            onClick={handleBackHome}
            disabled={isSigningOut}
            className="group px-8 py-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl text-slate-700 dark:text-slate-300 font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {isSigningOut ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-600 dark:border-slate-400 border-t-transparent"></div>
                <span>Signing Out...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Home</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden"
        >
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex flex-col items-center text-center">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative mb-6"
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-2xl">
                  <img
                    src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || 'User')}&background=6366f1&color=fff&size=112`}
                    alt="User Avatar"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                </div>
                {/* Online Status */}
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>

              {/* User Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h1 className="text-3xl font-bold mb-2 text-white">
                  {currentUser.displayName || 'User'}
                </h1>
                <p className="text-blue-100 text-lg mb-4">
                  {currentUser.email}
                </p>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Account Active
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome to Scrybe AI
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Complete your subscription to unlock premium AI-powered trading insights
              </p>
            </motion.div>

            {/* Payment Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 shadow-inner border border-slate-200 dark:border-slate-600"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Secure Payment</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Subscription & Payment
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Choose your plan and start your AI trading journey
                </p>
              </div>

              <PaymentManager user={currentUser} />
            </motion.div>

            {/* Features Preview */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { icon: '📊', title: 'AI Analysis', desc: 'Advanced market insights' },
                { icon: '📈', title: 'Portfolio Tracking', desc: 'Real-time performance' },
                { icon: '🎯', title: 'Trade Signals', desc: 'Precise entry/exit points' }
              ].map((feature, index) => (
                <div key={index} className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-600 text-center">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{feature.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2025 Scrybe AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
