import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from './apiConfig';

// --- 1. Import the new tools ---
import { useAuth } from './AuthContext';
import authFetch from './api/authFetch';

// A helper component for the accordion items
const FaqItem = ({ question, answer }) => (
    <details className="border-b border-gray-200 py-4 group">
        <summary className="font-semibold text-lg text-gray-800 list-none flex justify-between items-center cursor-pointer hover:text-blue-600">
            {question}
            <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p className="text-gray-600 mt-2 leading-relaxed">{answer}</p>
    </details>
);

const FaqPage = ({ onBack }) => {
    // --- 2. Get the current user from the Auth Context ---
    const { currentUser } = useAuth();

    const [questionText, setQuestionText] = useState('');
    const [status, setStatus] = useState('initial'); // 'initial', 'submitting', 'submitted', 'error'
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    const presetFaqs = [
        { q: "What is Scrybe AI?", a: "Scrybe AI is a research tool that uses advanced AI to analyze stock market data. It provides data-driven insights based on a VST (Very Short-Term) swing trading strategy to help users in their own research process." },
        { q: "Is this financial advice?", a: "No. Absolutely not. Scrybe AI provides informational research outcomes based on historical data. It is not financial advice, and all users are 100% responsible for their own trading decisions and risks." },
        { q: "Who is this tool for?", a: "Our tool is specifically designed for swing traders with a 1-5 day trading horizon who are looking to automate the tedious process of screening for high-probability trade setups." },
        { q: "How often is the analysis updated?", a: "The analysis for our core list of stocks is run once every trading day after the market closes, using the latest available data." },
    ];

    // --- 3. Update the handleSubmit function to use authFetch ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            setErrorMessage("You must be logged in to submit a question.");
            setStatus('error');
            return;
        }

        setStatus('submitting');
        setErrorMessage('');
        
        try {
            // Use the new, secure authFetch function
            await authFetch(
                `${API_BASE_URL}/api/faq/submit`, // The protected URL
                currentUser,                     // The current user object
                {                                // The fetch options
                    method: 'POST',
                    body: JSON.stringify({ question_text: questionText }),
                }
            );

            setStatus('submitted');
            setQuestionText('');
        } catch (error) {
            setErrorMessage(error.message || 'Sorry, something went wrong. Please try again.');
            setStatus('error');
        }
    };

    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <button onClick={onBack} className="text-blue-600 font-semibold mb-8">← Back to Main Site</button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-5xl font-bold text-center mb-4">Frequently Asked Questions</h1>
                    <p className="text-center text-gray-500 mb-12">Find answers to common questions about Scrybe AI.</p>

                    <div className="mb-16">
                        {presetFaqs.map((faq, i) => <FaqItem key={i} question={faq.q} answer={faq.a} />)}
                    </div>

                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
                        <h2 className="text-3xl font-bold mb-2">Can't find your answer?</h2>
                        <p className="text-gray-500 mb-6">Ask our team! We'll review your question and add it to our list.</p>
                        
                        {status !== 'submitted' ? (
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    rows="4"
                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type your question here..."
                                    required
                                />
                                <p className="text-xs text-gray-400 mt-2">Please do not submit personal information. Your question will be reviewed by our team.</p>
                                <button type="submit" disabled={status === 'submitting'} className="mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                                    {status === 'submitting' ? 'Submitting...' : 'Submit Question'}
                                </button>
                                {status === 'error' && <p className="text-red-500 mt-2">{errorMessage}</p>}
                            </form>
                        ) : (
                            <p className="text-green-600 font-semibold">✅ Thank you! Your question has been submitted for review.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FaqPage;