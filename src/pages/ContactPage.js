// src/pages/ContactPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User, Send, CheckCircle, ArrowLeft, MapPin, Clock } from 'lucide-react';
import { submitContactRequest } from '../api/api';
import NewHeader from '../components/layout/NewHeader';
import NewFooter from '../components/layout/NewFooter';

const ContactPage = ({
  currentUser,
  onSignIn,
  onSignOut,
  onGetStarted,
  onPrivacyOpen,
  onTermsOpen,
  onDisclaimerOpen,
  onRefundOpen,
  onFaqOpen,
  onClose,
}) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) 
      return 'Name, Email, and Message are required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) 
      return 'Please enter a valid email address.';
    if (form.phone && !/^\+?[0-9\-()\s]{7,20}$/.test(form.phone)) 
      return 'Please enter a valid phone number.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setSubmitting(true);
    setError('');
    try {
      await submitContactRequest(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Header */}
      <NewHeader
        currentUser={currentUser}
        onSignIn={onSignIn}
        onGetStarted={onGetStarted}
        onSignOut={onSignOut}
        onFaqOpen={onFaqOpen}
        onContactOpen={onClose}
      />

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full mb-6 border border-blue-200 dark:border-blue-800">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-bold text-blue-700 dark:text-blue-300 tracking-wide">
                GET IN TOUCH
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Contact Us
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about Scrybe AI? Want to get started or need support? 
              We're here to help—reach out and we'll respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {success ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-10">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="p-4 bg-green-100 dark:bg-green-900/40 rounded-full">
                      <CheckCircle className="text-green-600 dark:text-green-400 w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Message Received!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Send Us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full border-2 border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                        placeholder="Tell us what you're looking for, any questions you have, or how we can help..."
                        required
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-6 py-4 rounded-xl transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Email Card */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Email Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      For general inquiries and support
                    </p>
                    <a
                      href="mailto:support@scrybeai.com"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      support@scrybeai.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                    <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Response Time
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      We typically respond within 24 hours during business days
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Monday - Friday, 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                    <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Location
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Based in India, serving traders nationwide with institutional-grade AI analysis
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ CTA */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Looking for Quick Answers?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Check out our FAQ page for instant answers to common questions about Scrybe AI.
                </p>
                <button
                  onClick={onFaqOpen}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <span>Visit FAQ</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <NewFooter
        onPrivacyOpen={onPrivacyOpen}
        onTermsOpen={onTermsOpen}
        onDisclaimerOpen={onDisclaimerOpen}
        onRefundOpen={onRefundOpen}
      />
    </div>
  );
};

export default ContactPage;
