import React, { useState } from 'react';
import { initiatePayuPayment } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

function PaymentManager({ user }) {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Prevent double submission
  const [payuData, setPayuData] = useState(null);
  const [payuUrl, setPayuUrl] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    amount: '1.00',  // Testing amount, will be 500.00 in production
    productinfo: 'Scrybe AI Premium Monthly - ₹500/month',
    firstname: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    udf1: '', // custom field for reference
  });

  // Initialize form with current user data
  React.useEffect(() => {
    if (user?.displayName || user?.email) {
      setFormData(prev => ({
        ...prev,
        firstname: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  // Subscription plan - Single plan only
  const subscriptionPlan = {
    name: 'Premium Monthly',
    amount: '1.00',  // Testing amount, will be 500.00 in production
    desc: 'Unlock all premium features',
    features: [
      'Complete AI-powered stock analysis',
      'Transparent track record & performance',
      'Precision trade signals with entry/exit',
      'On The Radar watchlist curation',
      'Market regime & index analysis',
      'Monthly subscription (auto-renews)'
    ]
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be at least 10 digits';
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Valid amount is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const selectPlan = (plan) => {
    setFormData(prev => ({
      ...prev,
      amount: plan.amount,
      productinfo: `Scrybe AI ${plan.name} - Monthly Subscription`
    }));
    setSuccessMessage(`${plan.name} plan selected`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePayNow = async () => {
    if (!validateForm()) {
      return;
    }

    // Prevent double submission
    if (isSubmitted) {
      setErrors({ submit: 'Payment is already being processed. Please wait...' });
      return;
    }

    setIsLoading(true);
    setIsSubmitted(true); // Mark as submitted
    try {
      const response = await initiatePayuPayment(formData, currentUser);
      
      if (response.status === 'success' && response.payment_data) {
        setPayuData(response.payment_data);
        setPayuUrl(response.payu_url);  // Get URL from backend response
        setShowForm(true);
        setSuccessMessage('Redirecting to secure payment gateway...');
      } else {
        setErrors({ submit: response.error || 'Failed to initiate payment' });
        setIsSubmitted(false); // Allow retry on failure
      }
    } catch (err) {
      setErrors({ submit: err.message || 'Error initiating payment' });
      setIsSubmitted(false); // Allow retry on error
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-submit PayU form when payuData is set
  React.useEffect(() => {
    if (showForm && payuData && payuUrl && document.getElementById('payuForm')) {
      setTimeout(() => {
        document.getElementById('payuForm').submit();
      }, 500);
    }
  }, [showForm, payuData, payuUrl]);

  return (
    <div className="space-y-8">
      {/* Premium Plan Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-300 dark:border-blue-700 overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{subscriptionPlan.name}</h3>
              <p className="text-blue-100 text-sm mt-1">Most comprehensive trading tools</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">₹{subscriptionPlan.amount}</div>
              <div className="text-blue-100 text-xs font-semibold mt-1">per month</div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4 font-medium">{subscriptionPlan.desc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subscriptionPlan.features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-md">
        <div className="mb-6 flex items-center">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Billing Information</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Please provide your details to complete the payment securely</p>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 rounded-lg text-sm flex items-start">
            <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Processing Payment</p>
              <p className="text-xs mt-1">{successMessage}</p>
            </div>
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 rounded-lg text-sm flex items-start">
            <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-xs mt-1">{errors.submit}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 ${
                errors.firstname ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
              }`}
            />
            {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="10-digit mobile number"
              className={`w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Amount - Read Only */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Amount (₹) *
            </label>
            <div className="flex items-center px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 dark:text-white">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">₹</span>
              <input
                type="text"
                value={formData.amount}
                disabled
                className="flex-1 ml-2 bg-transparent font-bold text-lg text-slate-900 dark:text-white focus:outline-none"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">Premium Plan</span>
            </div>
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>
        </div>

        {/* Security Info */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">Secure Payment Gateway</p>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">Your payment information is encrypted and secured by industry-leading technology</p>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayNow}
          disabled={isLoading || isSubmitted}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-bold rounded-lg transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-lg">Pay ₹{formData.amount} Now</span>
            </>
          )}
        </button>

        {/* Info Text */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
          By clicking "Pay Now", you agree to our subscription terms. You will be redirected to our secure payment provider.
        </p>
      </div>

      {/* PayU Hidden Form */}
      {showForm && payuData && payuUrl && (
        <form id="payuForm" action={payuUrl} method="post" style={{ display: 'none' }}>
          {Object.entries(payuData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value || ''} />
          ))}
        </form>
      )}
    </div>
  );
}

export default PaymentManager;
