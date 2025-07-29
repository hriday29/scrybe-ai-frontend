import React, { useState } from 'react';
import { API_BASE_URL } from './apiConfig.js';

const TradeJournalCard = ({ analysisData }) => {
    const [step, setStep] = useState('initial'); // 'initial', 'logging', 'submitted', 'error'
    const [formData, setFormData] = useState({
        exitPrice: '',
        exitDate: '',
        notes: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const payload = {
            ticker: analysisData.ticker,
            signal: analysisData.signal,
            ai_trade_plan: analysisData.tradePlan,
            user_exit_price: formData.exitPrice,
            user_exit_date: formData.exitDate,
            user_notes: formData.notes
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/trades/log`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to save trade log. Please try again.');
            }
            
            setStep('submitted');

        } catch (err) {
            setError(err.message);
            setStep('error');
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
                    <button type="submit" className="w-full bg-green-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Save Trade
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