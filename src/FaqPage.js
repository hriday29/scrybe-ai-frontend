import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from './apiConfig';

// --- 1. Import the new tools ---
import { useAuth } from './AuthContext';
import authFetch from './api/authFetch';

// A helper component for the accordion items
const FaqItem = ({ question, answer, isBeta = false }) => (
    <details className={`border-b border-gray-200 py-4 group ${isBeta ? 'bg-amber-50 px-4 rounded-lg mb-2' : ''}`}>
        <summary className="font-semibold text-lg text-gray-800 list-none flex justify-between items-center cursor-pointer hover:text-blue-600">
            {isBeta && <span className="text-amber-600 text-sm font-normal mr-2">[BETA]</span>}
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

    const betaFaqs = [
        { 
            q: "What does 'Beta' mean for Scrybe AI?", 
            a: "Beta means we're still testing and improving the platform. You may experience bugs, slower performance, or occasional downtime. Features may change without notice, and we recommend not relying solely on the platform for critical trading decisions during this phase." 
        },
        { 
            q: "Will my data be safe during beta testing?", 
            a: "We take data security seriously, but beta software inherently carries additional risks. We may collect extra diagnostic data to improve the service, and there's a possibility of data loss. Please don't store any critical information you can't afford to lose." 
        },
        { 
            q: "How can I report bugs or issues?", 
            a: "Please use the question form below to report any bugs, crashes, or unexpected behavior. Include as much detail as possible about what you were doing when the issue occurred. Your feedback helps us improve the platform for everyone." 
        },
        { 
            q: "When will the full version be released?", 
            a: "We don't have a specific timeline yet. The beta phase will continue until we've resolved major bugs and stability issues. Beta users will be notified when we transition to the full release." 
        }
    ];

    const generalFaqs = [
        { q: "What is Scrybe AI?", a: "Scrybe AI is a research tool that uses advanced AI to analyze stock market data. It provides data-driven insights based on a VST (Very Short-Term) swing trading strategy to help users in their own research process." },
        { q: "Is this financial advice?", a: "No. Absolutely not. Scrybe AI provides informational research outcomes based on historical data. It is not financial advice, and all users are 100% responsible for their own trading decisions and risks." },
        { q: "Who is this tool for?", a: "Our tool is specifically designed for swing traders with a 1-5 day trading horizon who are looking to automate the tedious process of screening for high-probability trade setups." },
        { q: "How often is the analysis updated?", a: "The analysis for our core list of stocks is run once every trading day after the market closes, using the latest available data." },
        { q: "What markets/exchanges do you cover?", a: "Currently, we focus on US equity markets including NYSE and NASDAQ. We may expand to other markets based on user feedback and demand." },
        { q: "Do you offer mobile access?", a: "The platform is web-based and accessible on mobile devices through your browser. A dedicated mobile app may be considered for future releases." },
        { q: "How accurate are the predictions?", a: "Our AI model is trained on historical data and provides probability-based insights. Past performance does not guarantee future results. Always conduct your own research and risk management." },
        { q: "Can I integrate this with my broker?", a: "Currently, we provide analysis and insights only. Direct broker integration is not available but may be considered for future versions based on user demand." }
    ];

    // --- 3. Update the handleSubmit function to use authFetch ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!questionText.trim()) {
            setErrorMessage("Please enter a question before submitting.");
            setStatus('error');
            return;
        }

        if (!currentUser) {
            setErrorMessage("You must be logged in to submit a question. Please sign in and try again.");
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
                    body: JSON.stringify({ question_text: questionText.trim() }),
                }
            );

            setStatus('submitted');
            setQuestionText('');
        } catch (error) {
            console.error('FAQ submission error:', error);
            
            // Provide more specific error messages
            if (error.message.includes('401') || error.message.includes('unauthorized')) {
                setErrorMessage('Authentication failed. Please sign out and sign back in, then try again.');
            } else if (error.message.includes('429')) {
                setErrorMessage('Too many requests. Please wait a few minutes before submitting another question.');
            } else if (error.message.includes('network') || error.message.includes('fetch')) {
                setErrorMessage('Network error. Please check your connection and try again.');
            } else {
                setErrorMessage(error.message || 'Something went wrong. Please try again or contact support if the issue persists.');
            }
            
            setStatus('error');
        }
    };

    const resetForm = () => {
        setStatus('initial');
        setErrorMessage('');
        setQuestionText('');
    };

    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <button onClick={onBack} className="text-blue-600 font-semibold mb-8 hover:text-blue-800 transition-colors">← Back to Main Site</button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-5xl font-bold text-center mb-4">Frequently Asked Questions</h1>
                    <p className="text-center text-gray-500 mb-12">Find answers to common questions about Scrybe AI.</p>

                    {/* Beta-specific FAQs */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-amber-700 flex items-center">
                            <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-2 py-1 rounded mr-3">BETA</span>
                            Beta Testing Questions
                        </h2>
                        <div className="space-y-2">
                            {betaFaqs.map((faq, i) => <FaqItem key={`beta-${i}`} question={faq.q} answer={faq.a} isBeta={true} />)}
                        </div>
                    </div>

                    {/* General FAQs */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">General Questions</h2>
                        {generalFaqs.map((faq, i) => <FaqItem key={`general-${i}`} question={faq.q} answer={faq.a} />)}
                    </div>

                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
                        <h2 className="text-3xl font-bold mb-2">Can't find your answer?</h2>
                        <p className="text-gray-500 mb-6">Ask our team! We'll review your question and add it to our list.</p>
                        
                        {status !== 'submitted' ? (
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={questionText}
                                    onChange={(e) => {
                                        setQuestionText(e.target.value);
                                        if (status === 'error') {
                                            setStatus('initial');
                                            setErrorMessage('');
                                        }
                                    }}
                                    rows="4"
                                    className={`w-full bg-white border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 ${
                                        status === 'error' ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                    placeholder="Type your question here... (e.g., 'I found a bug when...', 'Feature request...', 'How do I...')"
                                    required
                                />
                                <p className="text-xs text-gray-400 mt-2">Please do not submit personal information. Your question will be reviewed by our team.</p>
                                
                                <div className="flex justify-center items-center gap-4 mt-4">
                                    <button 
                                        type="submit" 
                                        disabled={status === 'submitting'} 
                                        className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {status === 'submitting' ? 'Submitting...' : 'Submit Question'}
                                    </button>
                                    
                                    {status === 'error' && (
                                        <button 
                                            type="button" 
                                            onClick={resetForm}
                                            className="text-gray-500 hover:text-gray-700 font-medium"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                
                                {status === 'error' && (
                                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm font-medium">❌ {errorMessage}</p>
                                    </div>
                                )}
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-green-600 font-semibold text-lg">✅ Thank you! Your question has been submitted for review.</p>
                                <p className="text-gray-500 text-sm">We typically respond to questions within 1-2 business days during the beta phase.</p>
                                <button 
                                    onClick={resetForm}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Submit Another Question
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FaqPage;