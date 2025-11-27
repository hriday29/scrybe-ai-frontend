
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PaymentManager from '../components/specific/PaymentManager';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../firebase';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [accessDrawerOpen, setAccessDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleBackHome = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 300);
    } catch (error) {
      console.error('Error signing out:', error);
      setIsSigningOut(false);
    }
  };

  if (!currentUser) {
    return <div className="p-8 text-center">Please sign in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#E0E7FF', stopOpacity: 0.5}} />
              <stop offset="100%" style={{stopColor: '#F0F9FF', stopOpacity: 0.3}} />
            </linearGradient>
          </defs>
          <rect width="1440" height="800" fill="url(#grad1)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        {/* Header Navigation */}
        <div className="px-6 pt-6 flex justify-between items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleBackHome}
            disabled={isSigningOut}
            className="group px-6 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium transition-all duration-300 hover:bg-slate-200 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
          >
            {isSigningOut ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-600 border-t-transparent"></div>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </>
            )}
            <span>{isSigningOut ? 'Signing Out' : 'Back'}</span>
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="px-6 py-12 max-w-6xl mx-auto">
          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Header Section */}
              <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-12">
                <div className="flex items-center gap-6">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <img
                      src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || 'User')}&background=1e293b&color=fff&size=96`}
                      alt="User Avatar"
                      className="w-24 h-24 rounded-xl border-2 border-slate-700 shadow-lg object-cover"
                    />
                  </motion.div>

                  {/* User Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex-1"
                  >
                    <h2 className="text-2xl font-semibold text-white mb-1">
                      {currentUser.displayName || 'Premium Member'}
                    </h2>
                    <p className="text-slate-300 text-sm mb-4">
                      {currentUser.email}
                    </p>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/50 rounded-md w-fit">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-green-700">Profile Active</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div>
                    <button
                      onClick={() => setAccessDrawerOpen(!accessDrawerOpen)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Your Access
                      </h3>
                      <svg
                        className={`w-5 h-5 text-slate-600 transition-transform ${accessDrawerOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: accessDrawerOpen ? 'auto' : 0, opacity: accessDrawerOpen ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-x border-b border-slate-200 rounded-b-lg bg-white">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {[
                            { label: '250-Stock Universe' },
                            { label: 'Scrybe Scores' },
                            { label: 'Daily Analysis' },
                            { label: 'Trade Signals' },
                            { label: 'Entry/Exit Points' },
                            { label: 'Stop-Loss Levels' },
                            { label: 'On The Radar' },
                            { label: 'Market Regime' },
                            { label: 'Index Momentum' },
                            { label: 'Sector Analysis' },
                            { label: 'Performance Track' },
                            { label: 'Risk Controls' },
                            { label: 'Top 10 Selection' },
                            { label: 'Watchlist' },
                            { label: 'Portfolio Tracking' },
                            { label: 'Institutional Grade' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <svg className="w-4 h-4 text-slate-900 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-xs font-medium text-slate-900">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Premium Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Comprehensive Analysis',
                  desc: 'Daily analysis of 250 Nifty Smallcap stocks with objective Scrybe Scores'
                },
                {
                  title: 'Trade Execution Plans',
                  desc: 'Precise entry, exit targets, and stop-loss levels ready for execution'
                },
                {
                  title: 'Market Intelligence',
                  desc: 'Market regime detection, index momentum, and sector trend analysis'
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
                >
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-900">Complete Payment</h3>
              <p className="text-sm text-slate-600 mt-1">Complete payment to access the app completely</p>
            </div>

            <div className="p-8">
              <PaymentManager user={currentUser} />
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12 text-slate-500 text-sm"
          >
            <p>© 2025 Scrybe AI. Trading intelligence for institutional investors.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
