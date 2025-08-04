import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './apiConfig.js';

const OnTheRadar = () => {
    const [radarStocks, setRadarStocks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRadarStocks = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_BASE_URL}/api/all-analysis`);
                if (!res.ok) throw new Error("Failed to load analysis data.");
                const allStocks = await res.json();

                // Filter for stocks that have a 'HOLD' signal and a reason
                const filteredStocks = allStocks.filter(stock => stock.isOnRadar === true);
                setRadarStocks(filteredStocks);

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRadarStocks();
    }, []);

    if (isLoading) return <div className="text-center p-8 animate-pulse">Loading stocks on the radar...</div>;
    if (error) return <div className="text-center p-8 text-red-400">Error: {error}</div>;
    if (radarStocks.length === 0) return <div className="text-center p-8 text-gray-500">No stocks are currently on the radar. The AI is waiting for higher-probability conditions.</div>;

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-fadeIn">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-2">On The Radar</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    These are stocks the AI has identified as interesting, but are waiting for a specific condition to be met before a trade is signaled.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {radarStocks.map(stock => (
                    <div key={stock.ticker} className="bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
                        <h3 className="font-bold text-2xl text-white">{stock.companyName}</h3>
                        <p className="text-sm text-gray-500 mb-4">{stock.ticker}</p>
                        <div className="bg-blue-900/30 border border-blue-500/60 rounded-xl p-4">
                            <p className="text-sm font-semibold text-blue-300 mb-1">Reason for 'HOLD':</p>
                            <p className="text-blue-200">{stock.reasonForHold}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OnTheRadar;