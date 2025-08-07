import React, { useState } from 'react';
import { API_BASE_URL } from './apiConfig.js';

// --- 1. Import the new tools ---
import { useAuth } from './AuthContext';
import authFetch from './api/authFetch';

const TradeJournalCard = ({ analysisData }) => {
    // --- 2. Get the current user from the Auth Context ---
    const { currentUser } = useAuth();

    const [step, setStep] = useState('initial'); // 'initial', 'logging', 'submitted', 'error'
    const [formData, setFormData] = useState({
        exitPrice: '',
        exitDate: '',
        notes: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- 3. Update the handleSubmit function to use authFetch ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // First, check if the user is logged in
        if (!currentUser) {
            setError("You must be logged in to log a trade.");
            setStep('error');
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                ticker: analysisData.ticker,
                signal: analysisData.signal,
                ai_trade_plan: analysisData.tradePlan,
                user_exit_price: formData.exitPrice,
                user_exit_date: formData.exitDate,
                user_notes: formData.notes
            };

            // Use the new, secure authFetch function
            await authFetch(
                `${API_BASE_URL}/api/trades/log`, // The protected URL
                currentUser,                     // The current user object
                {                                // The fetch options
                    method: 'POST',
                    body: JSON.stringify(payload)
                }
            );
            
            setStep('submitted');

        } catch (err) {
            setError(err.message);
            setStep('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!analysisData.signal || analysisData.signal === 'HOLD') {
        return null; // Don't show the card for HOLD signals
    }

    return (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 mt-8">
            <h3 className="font-bold text-xl text-white mb-4">Personal Trade Journal</h3>

            {step === 'initial' && (
                <div className="text-center">
                    <p className="text-gray-300 mb-4">Did you take this trade?</p>
                    <button
                        onClick={() => setStep('logging')}
                        className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Yes, Log My Outcome
                    </button>
                </div>
            )}

            {step === 'logging' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="exitPrice" className="block text-sm font-medium text-gray-300 mb-1">Exit Price</label>
                        <input
                            type="number"
                            name="exitPrice"
                            id="exitPrice"
                            value={formData.exitPrice}
                            onChange={handleInputChange}
                            className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg p-2 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="exitDate" className="block text-sm font-medium text-gray-300 mb-1">Exit Date</label>
                        <input
                            type="date"
                            name="exitDate"
                            id="exitDate"
                            value={formData.exitDate}
                            onChange={handleInputChange}
                            className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg p-2 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">Notes (Optional)</label>
                        <textarea
                            name="notes"
                            id="notes"
                            rows="3"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg p-2 focus:border-blue-500 focus:outline-none"
                            placeholder="e.g., Exited early due to market volatility."
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-600">
                        {isSubmitting ? 'Saving...' : 'Save Trade'}
                    </button>
                </form>
            )}

            {step === 'submitted' && (
                <div className="text-center text-green-400">
                    <p>✅ Your trade log has been saved successfully!</p>
                </div>
            )}

            {step === 'error' && (
                 <div className="text-center text-red-400">
                    <p>Error: {error}</p>
                </div>
            )}
        </div>
    );
};

export default TradeJournalCard;