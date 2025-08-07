import React, { useState } from 'react';
import { API_BASE_URL } from './apiConfig.js';

// --- 1. Import the new tools ---
import { useAuth } from './AuthContext';
import authFetch from './api/authFetch';

const FeedbackWidget = () => {
    // --- 2. Get the current user from the Auth Context ---
    const { currentUser } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState('initial'); // 'initial', 'form', 'submitted'
    const [category, setCategory] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(''); // State for error messages

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setStep('initial');
            setFeedbackText('');
            setUserEmail('');
            setError('');
        }, 300);
    };

    const selectCategory = (cat) => {
        setCategory(cat);
        setStep('form');
    };

    // --- 3. Update the handleSubmit function to use authFetch ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            setError("You must be logged in to submit feedback.");
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const payload = {
                category,
                feedback_text: feedbackText,
                email: userEmail
            };

            // Use the new, secure authFetch function
            await authFetch(
                `${API_BASE_URL}/api/feedback/submit`, // The protected URL
                currentUser,                          // The current user object
                {                                     // The fetch options
                    method: 'POST',
                    body: JSON.stringify(payload),
                }
            );
            
            setStep('submitted');
        } catch (err) {
            console.error("Feedback submission error:", err);
            setError(err.message || "Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={handleOpen}
                className="fixed top-5 right-5 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all z-40"
            >
                Feedback
            </button>
        );
    }

    return (
        <div className="fixed top-5 right-5 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-40 animate-fadeIn">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Feedback & Support</h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                </div>

                {step === 'initial' && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-300 mb-3">What would you like to do?</p>
                        <button onClick={() => selectCategory('Share a Testimonial')} className="w-full text-left bg-green-500/20 p-3 rounded-lg hover:bg-green-500/30 text-green-300 font-semibold">Share a Testimonial</button>
                        <button onClick={() => selectCategory('Suggest an Improvement')} className="w-full text-left bg-slate-700/50 p-3 rounded-lg hover:bg-slate-600/80">Suggest an Improvement</button>
                        <button onClick={() => selectCategory('Report a Bug')} className="w-full text-left bg-slate-700/50 p-3 rounded-lg hover:bg-slate-600/80">Report a Bug</button>
                        <button onClick={() => selectCategory('Ask a Question')} className="w-full text-left bg-slate-700/50 p-3 rounded-lg hover:bg-slate-600/80">Ask a Question</button>
                    </div>
                )}

                {step === 'form' && (
                    <form onSubmit={handleSubmit}>
                        <label className="block text-sm font-medium text-blue-400 mb-2">{category}</label>
                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            rows="5"
                            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                            placeholder={category === 'Share a Testimonial' ? "Share your experience with the app..." : "Please provide as much detail as possible..."}
                            required
                        />
                        {category === 'Share a Testimonial' && (
                            <input
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                className="w-full mt-2 bg-slate-900/50 border border-slate-600 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                placeholder="Your Email (Optional)"
                            />
                        )}
                        <button type="submit" disabled={isSubmitting} className="w-full mt-2 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-slate-600">
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                    </form>
                )}
                
                {step === 'submitted' && (
                    <div className="text-center py-4">
                        <p className="text-green-400 font-semibold text-lg">✅ Thank you!</p>
                        <p className="text-sm text-gray-400">Your feedback has been received.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackWidget;