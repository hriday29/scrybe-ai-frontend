import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getPaymentStatus } from '../../api/api';
import { motion } from 'framer-motion';

const PaymentStatusPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [statusState, setStatusState] = useState('loading');
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState('');

  const transactionId = searchParams.get('txnid') || '';
  const payuStatus = searchParams.get('status') || '';

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        if (!transactionId) {
          setStatusState('error');
          setError('No transaction ID found');
          return;
        }

        const response = await getPaymentStatus(transactionId);
        
        if (response && response.status === 'success') {
          setPaymentData(response.payment);
          setStatusState('success');
        } else if (response && response.status === 'failed') {
          setPaymentData(response.payment);
          setStatusState('failure');
          setError(response.message || 'Payment was not processed');
        } else {
          setStatusState('error');
          setError('Unable to determine payment status');
        }
      } catch (err) {
        setStatusState('error');
        setError((err && err.message) || 'Failed to fetch payment status');
      }
    };

    if (transactionId) {
      fetchPaymentStatus();
    }
  }, [transactionId]);

  const handleRetry = () => {
    navigate('/profile?section=payment');
  };

  const handleDashboard = () => {
    // Redirect to the main app - use root path and let App.js handle the view
    // The app will detect authenticated user and show the main interface
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {statusState === 'success' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-green-200 dark:border-green-800">
            <div className="bg-gradient-to-r from-green-400 to-green-500 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-green-100">Your subscription has been activated</p>
            </div>

            <div className="p-8">
              {paymentData && (
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Transaction ID</p>
                    <p className="font-mono text-lg font-bold text-slate-900 dark:text-white break-all">
                      {paymentData.txnid || transactionId}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Amount Paid</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ₹{paymentData.amount}
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Plan</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">
                        Premium
                      </p>
                    </div>
                  </div>

                  {paymentData.timestamp && (
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Payment Date & Time</p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {formatDate(paymentData.timestamp)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleDashboard}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg transition-all duration-300"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>

              <p className="text-center text-xs text-slate-600 dark:text-slate-400 mt-4">
                A confirmation email has been sent to your registered email address
              </p>
            </div>
          </div>
        )}

        {statusState === 'failure' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-red-200 dark:border-red-800">
            <div className="bg-gradient-to-r from-red-400 to-red-500 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">Payment Failed</h2>
              <p className="text-red-100">Your payment could not be processed</p>
            </div>

            <div className="p-8">
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <p className="text-red-800 dark:text-red-300 font-semibold">
                  {error || 'Payment was declined. Please try again with a different payment method.'}
                </p>
              </div>

              {transactionId && (
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Transaction ID (for reference)</p>
                  <p className="font-mono text-sm font-bold text-slate-900 dark:text-white break-all">
                    {transactionId}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleRetry}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-all duration-300"
                >
                  Retry Payment
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>

              <p className="text-center text-xs text-slate-600 dark:text-slate-400 mt-4">
                Need help? Contact our support team
              </p>
            </div>
          </div>
        )}

        {statusState === 'loading' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400"></div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Verifying Payment
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Please wait while we confirm your payment...
            </p>
          </div>
        )}

        {statusState === 'error' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-yellow-200 dark:border-yellow-800">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">Unable to Verify</h2>
              <p className="text-yellow-100">We couldn't verify your payment status</p>
            </div>

            <div className="p-8">
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 dark:text-yellow-300">
                  {error}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleRetry}
                  className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold rounded-lg transition-all duration-300"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>

              <p className="text-center text-xs text-slate-600 dark:text-slate-400 mt-4">
                If you were charged, the amount will be refunded within 24-48 hours
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentStatusPage;
