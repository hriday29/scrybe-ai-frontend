// src/pages/FaqPage.js

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext"; // Corrected path
import { submitFeedback } from '../api/api'; // Corrected path

const FaqItem = ({ question, answer, isBeta = false }) => (
    // ... component code remains the same
    <motion.details
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
    className={`group mb-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-md hover:shadow-blue-500/10 transition ${
      isBeta ? "ring-1 ring-amber-400/40" : ""
    }`}
  >
    <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-white list-none">
      <span className="flex items-center gap-2">
        {isBeta && (
          <span className="text-amber-400 text-sm font-normal">[BETA]</span>
        )}
        {question}
      </span>
      <span className="text-gray-400 group-open:rotate-180 transition-transform">
        ▼
      </span>
    </summary>
    <p className="mt-3 prose prose-invert max-w-none leading-relaxed">
      {answer}
    </p>
  </motion.details>
);

const FaqPage = ({ onBack }) => {
  const { currentUser } = useAuth();
  const [questionText, setQuestionText] = useState("");
  const [status, setStatus] = useState("initial");
  const [errorMessage, setErrorMessage] = useState("");

    // ... component logic remains the same
    const betaFaqs = [
    {
      q: "What does 'Beta' mean for Scrybe AI?",
      a: "Beta means we're still testing and improving the platform. You may experience bugs, slower performance, or occasional downtime. Features may change without notice, and we recommend not relying solely on the platform for critical trading decisions during this phase.",
    },
    {
      q: "Will my data be safe during beta testing?",
      a: "We take data security seriously, but beta software inherently carries additional risks. We may collect extra diagnostic data to improve the service, and there's a possibility of data loss. Please don't store any critical information you can't afford to lose.",
    },
    {
      q: "How can I report bugs or issues?",
      a: "Please use the question form below to report any bugs, crashes, or unexpected behavior. Include as much detail as possible about what you were doing when the issue occurred. Your feedback helps us improve the platform for everyone.",
    },
    {
      q: "When will the full version be released?",
      a: "We don't have a specific timeline yet. The beta phase will continue until we've resolved major bugs and stability issues. Beta users will be notified when we transition to the full release.",
    },
  ];

  const generalFaqs = [
    {
      q: "What is Scrybe AI?",
      a: "Scrybe AI is a research tool that uses advanced AI to analyze stock market data. It provides data-driven insights based on a VST (Very Short-Term) swing trading strategy to help users in their own research process.",
    },
    {
      q: "Is this financial advice?",
      a: "No. Absolutely not. Scrybe AI provides informational research outcomes based on historical data. It is not financial advice, and all users are 100% responsible for their own trading decisions and risks.",
    },
    {
      q: "Who is this tool for?",
      a: "Our tool is specifically designed for swing traders with a 1-5 day trading horizon who are looking to automate the tedious process of screening for high-probability trade setups.",
    },
    {
      q: "How often is the analysis updated?",
      a: "The analysis for our core list of stocks is run once every trading day after the market closes, using the latest available data.",
    },
    {
      q: "What markets/exchanges do you cover?",
      a: "Currently, we focus on US equity markets including NYSE and NASDAQ. We may expand to other markets based on user feedback and demand.",
    },
    {
      q: "Do you offer mobile access?",
      a: "The platform is web-based and accessible on mobile devices through your browser. A dedicated mobile app may be considered for future releases.",
    },
    {
      q: "How accurate are the predictions?",
      a: "Our AI model is trained on historical data and provides probability-based insights. Past performance does not guarantee future results. Always conduct your own research and risk management.",
    },
    {
      q: "Can I integrate this with my broker?",
      a: "Currently, we provide analysis and insights only. Direct broker integration is not available but may be considered for future versions based on user demand.",
    },
  ];

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!questionText.trim()) {
          setErrorMessage("Please enter a question before submitting.");
          setStatus("error");
          return;
      }
      if (!currentUser) {
          setErrorMessage(
              "You must be logged in to submit a question. Please sign in and try again."
          );
          setStatus("error");
          return;
      }
      setStatus("submitting");
      setErrorMessage("");
      try {
          // --- THIS IS THE CORRECTED PART ---
          await submitFeedback("FAQ Submission", questionText.trim());
          // ------------------------------------

          setStatus("submitted");
          setQuestionText("");
      } catch (error) {
          console.error("FAQ submission error:", error);
          if (error.message.includes("401") || error.message.includes("unauthorized")) {
              setErrorMessage(
                  "Authentication failed. Please sign out and sign back in, then try again."
              );
          } else if (error.message.includes("429")) {
              setErrorMessage(
                  "Too many requests. Please wait a few minutes before submitting another question."
              );
          } else if (error.message.includes("network") || error.message.includes("fetch")) {
              setErrorMessage("Network error. Please check your connection and try again.");
          } else {
              setErrorMessage(
                  error.message ||
                  "Something went wrong. Please try again or contact support if the issue persists."
              );
          }
          setStatus("error");
      }
  };

  const resetForm = () => {
    setStatus("initial");
    setErrorMessage("");
    setQuestionText("");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-blue-500/30 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-600/30 blur-3xl animate-pulse" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="sticky top-6 mb-12 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white hover:bg-white/20 backdrop-blur-md shadow-md transition"
        >
          ← Back to Main Site
        </button>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="inline-block text-6xl font-extrabold mb-4 pt-2 pb-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-lg leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            Find answers to common questions about{" "}
            <span className="font-semibold">Scrybe AI</span>.
          </p>
        </motion.div>

        {/* Beta Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-amber-400 flex items-center gap-3">
            <span className="bg-amber-500/20 text-amber-300 text-sm font-semibold px-2 py-1 rounded">
              BETA
            </span>
            Beta Testing Questions
          </h2>
          <div className="space-y-4">
            {betaFaqs.map((faq, i) => (
              <FaqItem
                key={`beta-${i}`}
                question={faq.q}
                answer={faq.a}
                isBeta={true}
              />
            ))}
          </div>
        </div>

        {/* General FAQ Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6">General Questions</h2>
          <div className="space-y-4">
            {generalFaqs.map((faq, i) => (
              <FaqItem key={`general-${i}`} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>

        {/* Question Submission */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Can't find your answer?
          </h2>
          <p className="text-gray-300 mb-8 text-center">
            Ask our team! We'll review your question and add it to our list.
          </p>

          {status !== "submitted" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={questionText}
                onChange={(e) => {
                  setQuestionText(e.target.value);
                  if (status === "error") {
                    setStatus("initial");
                    setErrorMessage("");
                  }
                }}
                rows="4"
                className={`w-full rounded-lg p-3 text-sm focus:outline-none focus:ring-2 backdrop-blur-md bg-white/10 text-white placeholder-gray-400 ${
                  status === "error"
                    ? "border border-red-400 focus:ring-red-500"
                    : "border border-white/20 focus:ring-blue-500"
                }`}
                placeholder="Type your question here... (e.g., 'I found a bug when...', 'Feature request...', 'How do I...')"
                required
              />
              <p className="text-xs text-gray-400">
                Please do not submit personal information. Your question will be
                reviewed by our team.
              </p>

              <div className="flex justify-center items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                  {status === "submitting" ? "Submitting..." : "Submit Question"}
                </button>
                {status === "error" && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-200 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              {status === "error" && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-400 rounded-lg">
                  <p className="text-red-400 text-sm font-medium">
                    ❌ {errorMessage}
                  </p>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-green-400 font-semibold text-lg">
                ✅ Thank you! Your question has been submitted for review.
              </p>
              <p className="text-gray-300 text-sm">
                We typically respond to questions within 1-2 business days during
                the beta phase.
              </p>
              <button
                onClick={resetForm}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Submit Another Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;