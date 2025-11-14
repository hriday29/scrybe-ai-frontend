// src/pages/FaqPage.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, HelpCircle, ChevronDown, Send, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { submitFeedback } from '../api/api';
import NewHeader from '../components/layout/NewHeader';
import NewFooter from '../components/layout/NewFooter';

const FaqItem = ({ question, answer, isBeta = false, index = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 transition-all ${
        isBeta ? "ring-2 ring-amber-400/40" : ""
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
      >
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            {isBeta && (
              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold rounded">
                BETA
              </span>
            )}
            {question}
          </h3>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqPage = ({ 
  currentUser, 
  onSignIn, 
  onSignOut, 
  onGetStarted,
  onPrivacyOpen,
  onTermsOpen,
  onDisclaimerOpen,
  onRefundOpen,
  onPaymentsTermsOpen,
  onPaymentsPrivacyOpen,
  onLegalNoticeOpen,
  onContactOpen,
  onBack 
}) => {
  const authContext = useAuth();
  const user = currentUser || authContext.currentUser;
  const [questionText, setQuestionText] = useState("");
  const [status, setStatus] = useState("initial");
  const [errorMessage, setErrorMessage] = useState("");

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
      a: "Scrybe AI is an institutional-grade research tool that analyzes all 250 stocks in the Nifty Smallcap 250 universe daily. Using advanced AI and professional fund manager principles, it selects the top 10 highest-conviction trades based on strict risk controls. It provides complete transparency into the analysis and selection process.",
    },
    {
      q: "Why focus on Nifty Smallcap 250?",
      a: "The Nifty Smallcap 250 represents India's emerging growth segment with higher volatility and opportunity. These companies often deliver outsized returns during bull markets but require disciplined analysis and risk management. Our AI analyzes this complex universe daily to identify the best opportunities while managing smallcap-specific risks.",
    },
    {
      q: "How many stocks do you analyze?",
      a: "We analyze all 250 stocks in the Nifty Smallcap 250 index every trading day. Out of these 250 analyses, our Portfolio Manager selects only the top 10 highest-conviction trades that pass institutional risk controls. You can see all 250 analyses in the Portfolio Dashboard with complete transparency on selection reasons.",
    },
    {
      q: "What are the portfolio risk controls?",
      a: "We apply institutional-grade risk management: (1) Maximum 10 concurrent positions at any time, (2) No more than 40% of portfolio in any single sector, (3) Maximum 2% risk per individual stock. These rules ensure diversification and capital protection, just like professional fund managers use.",
    },
    {
      q: "Is this financial advice?",
      a: "No. Absolutely not. Scrybe AI provides informational research and analysis for educational purposes only. It is not financial advice, and all users are 100% responsible for their own trading decisions and risks. Always consult with a qualified financial advisor before making investment decisions.",
    },
    {
      q: "Who is this tool for?",
      a: "Scrybe AI is designed for active traders and investors interested in the Nifty Smallcap 250 universe who want institutional-grade analysis and portfolio management discipline. It's ideal for those who understand smallcap volatility and want a systematic, data-driven approach to identifying opportunities.",
    },
    {
      q: "How often is the analysis updated?",
      a: "The complete 250-stock analysis runs once daily after market close (typically around 10 PM IST). The Portfolio Manager then selects the top 10 trades immediately after. You always see the latest daily snapshot with all analyses and selection reasons visible in the Portfolio Dashboard.",
    },
    {
      q: "What markets/exchanges do you cover?",
      a: "Currently, we focus exclusively on the Indian equity market, specifically the Nifty Smallcap 250 index traded on the NSE (National Stock Exchange). We may expand to other indices or markets based on user feedback and demand.",
    },
    {
      q: "Do you offer mobile access?",
      a: "Yes! The platform is web-based and fully accessible on mobile devices through your browser. The Portfolio Dashboard, analysis pages, and all features are optimized for mobile viewing. A dedicated native app may be considered for future releases.",
    },
    {
      q: "How accurate are the predictions?",
      a: "Our AI model uses historical data and probability-based analysis. Past performance does not guarantee future results. Smallcap stocks are inherently volatile. View the AI Track Record for complete transparency on historical performance. Always conduct your own research and risk management.",
    },
    {
      q: "Why was a high-score stock not selected?",
      a: "Even high Scrybe Score stocks may not be selected if they violate portfolio risk controls. Common reasons: (1) Sector concentration would exceed 40%, (2) Portfolio already has 10 positions, (3) Trade would exceed 2% single-stock risk limit. Check the 'selection_reason' field in Portfolio Dashboard for specifics.",
    },
    {
      q: "Can I see stocks that weren't selected?",
      a: "Yes! The Portfolio Dashboard shows all 250 analyses with complete transparency. Use the 'Not Selected' tab to see high-conviction signals that didn't make the top 10, along with clear reasons why (e.g., 'High conviction, sector limit reached'). This transparency helps you understand the risk management process.",
    },
  ];

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!questionText.trim()) {
          setErrorMessage("Please enter a question before submitting.");
          setStatus("error");
          return;
      }
      if (!user) {
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Header */}
      <NewHeader
        currentUser={user}
        onSignIn={onSignIn}
        onGetStarted={onGetStarted}
        onSignOut={onSignOut}
        onFaqOpen={onBack}
        onContactOpen={onContactOpen}
        onPaymentsTermsOpen={onPaymentsTermsOpen}
        onPaymentsPrivacyOpen={onPaymentsPrivacyOpen}
        onLegalNoticeOpen={onLegalNoticeOpen}
      />

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
          )}

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full mb-6 border border-indigo-200 dark:border-indigo-800">
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 tracking-wide">
                HELP CENTER
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Frequently Asked Questions
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">Scrybe AI</span>.
              Can't find what you're looking for? Submit your question below.
            </p>
          </motion.div>

          {/* Beta Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-bold rounded-lg border border-amber-300 dark:border-amber-700">
                BETA
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Beta Testing Questions
              </h2>
            </div>
            <div className="space-y-4">
              {betaFaqs.map((faq, i) => (
                <FaqItem
                  key={`beta-${i}`}
                  question={faq.q}
                  answer={faq.a}
                  isBeta={true}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* General FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              General Questions
            </h2>
            <div className="space-y-4">
              {generalFaqs.map((faq, i) => (
                <FaqItem 
                  key={`general-${i}`} 
                  question={faq.q} 
                  answer={faq.a}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Question Submission */}
          <div className="rounded-2xl border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Can't Find Your Answer?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Ask our team! We'll review your question and respond within 24-48 hours.
              </p>
            </div>

            {status !== "submitted" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your Question *
                  </label>
                  <textarea
                    value={questionText}
                    onChange={(e) => {
                      setQuestionText(e.target.value);
                      if (status === "error") {
                        setStatus("initial");
                        setErrorMessage("");
                      }
                    }}
                    rows="5"
                    className={`w-full border-2 rounded-xl p-4 text-gray-900 dark:text-white transition-all outline-none resize-none ${
                      status === "error"
                        ? "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/10 focus:ring-2 focus:ring-red-500"
                        : "border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Type your question here... (e.g., 'I found a bug when...', 'Feature request...', 'How do I...')"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Please do not submit personal information. Your question will be reviewed by our team.
                  </p>
                </div>

                {status === "error" && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      ❌ {errorMessage}
                    </p>
                  </div>
                )}

                <div className="flex justify-center items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Question</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  {status === "error" && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors"
                    >
                      Clear Form
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-10">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="p-4 bg-green-100 dark:bg-green-900/40 rounded-full">
                    <CheckCircle className="text-green-600 dark:text-green-400 w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Question Submitted!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Thank you! We typically respond within 24-48 hours during the beta phase.
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    Submit Another Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <NewFooter
        onPrivacyOpen={onPrivacyOpen}
        onTermsOpen={onTermsOpen}
        onDisclaimerOpen={onDisclaimerOpen}
        onRefundOpen={onRefundOpen}
        onPaymentsTermsOpen={onPaymentsTermsOpen}
        onPaymentsPrivacyOpen={onPaymentsPrivacyOpen}
        onLegalNoticeOpen={onLegalNoticeOpen}
      />
    </div>
  );
};

export default FaqPage;