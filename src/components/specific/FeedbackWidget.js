// src/components/specific/FeedbackWidget.js (FINAL, CORRECTED VERSION)

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Lightbulb, Bug, HelpCircle, ThumbsUp, Send, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { submitFeedback } from "../../api/api.js"; // Use the standardized API function

// --- Configuration for Feedback Categories ---
const feedbackCategories = [
  { id: "testimonial", label: "Share a Testimonial", icon: ThumbsUp, placeholder: "Share your positive experience with our platform..." },
  { id: "improvement", label: "Suggest an Improvement", icon: Lightbulb, placeholder: "What could we do better? Please be specific!" },
  { id: "bug", label: "Report a Bug", icon: Bug, placeholder: "Please describe the bug, where you found it, and how to reproduce it." },
  { id: "question", label: "Ask a Question", icon: HelpCircle, placeholder: "What can we help you with?" },
];

// --- Main Component ---
const FeedbackWidget = () => {
  const { currentUser, authFetch } = useAuth(); // Get authFetch from the context
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("initial"); // 'initial', 'form', 'submitted'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep("initial");
      setSelectedCategory(null);
      setFeedbackText("");
      setUserEmail("");
      setError("");
    }, 300);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setStep("form");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError("Authentication required to submit feedback.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      // Use the new, standardized API function
      await submitFeedback(
        authFetch,
        currentUser,
        selectedCategory?.label,
        feedbackText
      );
      setStep("submitted");
    } catch (err) {
      console.error("Feedback submission error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const currentCategoryDetails = feedbackCategories.find(c => c.id === selectedCategory?.id);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={handleOpen}
        aria-label="Open feedback widget"
        className="hidden md:flex fixed top-4 right-5 bg-white/10 border border-white/20 backdrop-blur-lg text-slate-100 text-sm font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-white/20 transition-colors items-center gap-2 z-40"
      >
        <MessageSquare size={16} />
        Feedback
      </button>

      {/* Modal Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed top-5 right-5 w-80 bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl z-50 backdrop-blur-xl"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-white">
                  {step === 'form' ? currentCategoryDetails?.label : 'Feedback & Support'}
                </h3>
                <button
                  onClick={handleClose}
                  aria-label="Close feedback widget"
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === "initial" && (
                    <div className="space-y-2">
                      <p className="text-sm text-slate-300 mb-2">
                        What would you like to do?
                      </p>
                      {feedbackCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleSelectCategory(cat)}
                          className="w-full flex items-center gap-3 text-left bg-slate-800/50 p-3 rounded-lg hover:bg-slate-700/70 text-slate-100 font-semibold transition-colors"
                        >
                          <cat.icon size={20} className="text-blue-400" />
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === "form" && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        rows="5"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder={currentCategoryDetails?.placeholder}
                        required
                      />
                      {selectedCategory?.id === "testimonial" && (
                        <input
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          placeholder="Your Email (Optional, for attribution)"
                        />
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting || !feedbackText}
                        className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : <>Submit <Send size={16}/></>}
                      </button>
                      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                    </form>
                  )}

                  {step === "submitted" && (
                    <div className="text-center py-6 flex flex-col items-center gap-3">
                        <CheckCircle size={40} className="text-green-400"/>
                      <p className="font-semibold text-xl text-white">
                        Thank You!
                      </p>
                      <p className="text-sm text-slate-300">
                        Your feedback has been received.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackWidget;