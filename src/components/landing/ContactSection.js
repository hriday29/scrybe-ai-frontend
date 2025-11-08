// src/components/landing/ContactSection.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User, Send, CheckCircle } from 'lucide-react';
import { submitContactRequest } from '../../api/api';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return 'Name, Email, and Message are required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.';
    if (form.phone && !/^\+?[0-9\-()\s]{7,20}$/.test(form.phone)) return 'Please enter a valid phone number.';
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
    <section id="contact" className="py-20 bg-white">
      <div className="w-full px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            Contact Us
          </motion.h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Have questions or want to get started? Send us a message and we'll get back within 24 hours.
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-8">
            <CheckCircle className="text-green-600" size={40} />
            <p className="text-lg font-semibold text-gray-900">Thanks! Your message has been received.</p>
            <p className="text-gray-600">We'll reach out soon.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-soft-xl border border-gray-100 p-6 md:p-10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-3 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-3 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-3 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="Tell us a bit about what you're looking for..."
                  required
                />
              </div>

              {error && (
                <div className="col-span-1 md:col-span-2">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="col-span-1 md:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : (<><span>Send Message</span> <Send size={18}/></>)}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
