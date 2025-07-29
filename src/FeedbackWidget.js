import React, { useState } from 'react';
import { API_BASE_URL } from './apiConfig.js';

const FeedbackWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState('initial'); // 'initial', 'form', 'submitted'
    const [category, setCategory] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const selectCategory = (cat) => {
        setCategory(cat);
        setStep('form');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/feedback/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, feedback_text: feedbackText }),
            });
            if (!response.ok) throw new Error('Submission failed.');
            setStep('submitted');
        } catch (error) {
            console.error("Feedback submission error:", error);
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
                    <button onClick={handleClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>

                {step === 'initial' && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-300 mb-3">What would you like to do?</p>
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
                            placeholder="Please provide as much detail as possible..."
                            required
                        />
                        <button type="submit" disabled={isSubmitting} className="w-full mt-2 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-slate-600">
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </form>
                )}
                
                {step === 'submitted' && (
                    <div className="text-center py-4">
                        <p className="text-green-400 font-semibold">✅ Thank you!</p>
                        <p className="text-sm text-gray-400">Your feedback has been received.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackWidget;