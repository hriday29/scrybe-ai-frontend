import React, { useState } from 'react';
import { API_BASE_URL } from '../../apiConfig.js';
import { useAuth } from '../../context/AuthContext';
import authFetch from '../../api/authFetch';
import { BookMarked } from 'lucide-react';

const TradeJournalCard = ({ analysisData }) => {
    const { currentUser } = useAuth();
    const [step, setStep] = useState('initial');
    
    // --- FIX: State updated for ENTRY logging ---
    const [formData, setFormData] = useState({ 
        entryPrice: analysisData?.strategy_signal?.trade_plan?.entry_price || '', 
        entryDate: new Date().toISOString().split('T')[0], // Default to today
        notes: '' 
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!currentUser) { 
            setError("You must be logged in to log a trade."); 
            setStep('error'); 
            return; 
        }
        setIsSubmitting(true);
        try {
            // --- FIX: Payload updated to send the user's ENTRY data ---
            const payload = { 
                ticker: analysisData.ticker, 
                // We save a reference to the specific prediction this trade was based on
                prediction_id: analysisData._id, 
                signal_type: analysisData.signal,
                ai_trade_plan: analysisData.strategy_signal?.trade_plan, // The original AI plan
                user_entry_price: parseFloat(formData.entryPrice), // The user's actual entry price
                user_entry_date: formData.entryDate,
                user_notes: formData.notes 
            };
            
            // The endpoint remains the same, we're still "logging a trade"
            await authFetch(`${API_BASE_URL}/api/trades/log`, currentUser, { 
                method: 'POST', 
                body: JSON.stringify(payload) 
            });
            setStep('submitted');
        } catch (err) {
            setError(err.message);
            setStep('error');
        } finally { 
            setIsSubmitting(false); 
        }
    };

    // Don't show this card unless there is an actionable trade plan from the AI
    if (!analysisData?.strategy_signal?.trade_plan) {
        return null;
    }

    return (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 mt-8">
            <h3 className="font-bold text-xl text-white mb-4 flex items-center">
                <BookMarked size={20} className="mr-2 text-blue-300"/>
                Personal Trade Journal
            </h3>
            
            {step === 'initial' && (
                <div className="text-center">
                    <p className="text-gray-300 mb-4">Did you follow the AI and enter this trade?</p>
                    <button onClick={() => setStep('logging')} className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Yes, Log My Entry
                    </button>
                </div>
            )}
            
            {step === 'logging' && (
                // --- FIX: Form fields updated for ENTRY price and date ---
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="entryPrice" className="block text-sm font-medium text-gray-300 mb-1">Your Entry Price</label>
                        <input type="number" step="0.01" name="entryPrice" id="entryPrice" value={formData.entryPrice} onChange={handleInputChange} className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg p-2 focus:border-blue-500 focus:outline-none" required />
                    </div>
                    <div>
                        <label htmlFor="entryDate" className="block text-sm font-medium text-gray-300 mb-1">Your Entry Date</label>
                        <input type="date" name="entryDate" id="entryDate" value={formData.entryDate} onChange={handleInputChange} className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg p-2 focus:border-blue-500 focus:outline-none" required />
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">Notes (Optional)</label>
                        <textarea name="notes" id="notes" rows="3" value={formData.notes} onChange={handleInputChange} className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg p-2 focus:border-blue-500 focus:outline-none" placeholder="e.g., Entered with a limit order..." />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-600">
                        {isSubmitting ? 'Saving...' : 'Save My Entry'}
                    </button>
                </form>
            )}
            
            {step === 'submitted' && (
                <div className="text-center text-green-400">
                    <p>✅ Your trade entry has been saved successfully!</p>
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