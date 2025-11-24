// src/components/specific/ConversationalQa.js

import React, { useState } from 'react';
// --- Corrected Imports ---
import { useAuth } from '../../context/AuthContext';
import { askQuestion } from '../../api/api.js'; // Use the standardized API function
// --- End Corrected Imports ---

const ConversationalQa = ({ analysisContext }) => {
    // ✅ Pull both currentUser and authFetch from context
    const { currentUser, authFetch } = useAuth();

    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [aiAvailable, setAiAvailable] = useState(true); // Assume available initially

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim() || isLoading) return;

        if (!currentUser) {
            setError("You must be logged in to ask a question.");
            return;
        }

        const currentQuestion = question;
        setConversation(prev => [...prev, { type: 'user', text: currentQuestion }]);
        setQuestion('');
        setIsLoading(true);
        setError(null);

        try {
            // ✅ Pass authFetch and currentUser correctly
            const data = await askQuestion(
                authFetch,
                currentUser,
                analysisContext.ticker,
                currentQuestion
            );
            setConversation(prev => [...prev, { type: 'ai', text: data.answer }]);
        } catch (err) {
            // Handle specific AI analyzer unavailable error with a more user-friendly message
            const errorMessage = err.message?.includes('AI Analyzer is not available') || err.message?.includes('AI analysis feature is temporarily unavailable')
                ? 'AI analysis feature is temporarily unavailable. Please try again later or explore the detailed analysis above for insights.'
                : err.message;
            
            // Mark AI as unavailable if we get the specific error
            if (err.message?.includes('AI Analyzer is not available') || err.message?.includes('AI analysis feature is temporarily unavailable')) {
                setAiAvailable(false);
            }
            
            setError(errorMessage);
            setConversation(prev => prev.slice(0, -1));
            setQuestion(currentQuestion);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-neutral-900 backdrop-blur-none border border-gray-200 dark:border-neutral-700 rounded-xl p-6">
            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4">
                Ask a Question About This Analysis
            </h3>

            {!aiAvailable && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                            AI analysis feature is currently unavailable. You can still explore the detailed analysis above for insights.
                        </p>
                    </div>
                </div>
            )}

            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
                {conversation.map((entry, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${
                            entry.type === 'user' ? 'items-end' : 'items-start'
                        }`}
                    >
                        <div
                            className={`p-3 rounded-lg max-w-lg ${
                                entry.type === 'user'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100'
                            }`}
                        >
                            <p className="text-sm">{entry.text}</p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 animate-pulse">
                        AI is thinking...
                    </p>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder={aiAvailable ? "e.g., Why is the RSI considered bullish?" : "AI feature temporarily unavailable"}
                        className={`flex-grow bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm rounded-lg py-2 px-3 transition-all focus:outline-none ${
                            aiAvailable 
                                ? 'focus:border-primary-500 dark:focus:border-primary-400' 
                                : 'opacity-50 cursor-not-allowed'
                        }`}
                        disabled={isLoading || !aiAvailable}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !question.trim() || !aiAvailable}
                        className={`font-semibold text-sm px-4 py-2 rounded-lg transition-colors ${
                            aiAvailable
                                ? 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-400'
                                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        } disabled:cursor-not-allowed`}
                    >
                        {aiAvailable ? 'Ask' : 'Unavailable'}
                    </button>
                </div>

                {error && aiAvailable && (
                    <p className="text-center text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
                )}
            </form>
        </div>
    );
};

export default ConversationalQa;
