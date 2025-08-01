import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './apiConfig.js';

const OpenPositions = ({ onAnalyze }) => {
    const [openTrades, setOpenTrades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOpenTrades = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_BASE_URL}/api/open-trades`);
                if (!res.ok) {
                    throw new Error("Failed to fetch open positions from the server.");
                }
                const data = await res.json();
                setOpenTrades(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOpenTrades();
    }, []);

    if (isLoading) {
        return <div className="text-center p-8 animate-pulse">Loading Open Positions...</div>;
    }

    if (error) {
        return <div className="text-red-400 text-center p-8">Error: {error}</div>;
    }

    if (openTrades.length === 0) {
        return (
            <div className="text-center text-gray-500 py-16">
                <h3 className="text-2xl font-bold text-white">No Open Positions</h3>
                <p className="mt-2">The AI is not currently tracking any active trades.</p>
            </div>
        );
    }

    const PnlProgressBar = ({ trade }) => {
        const totalRange = Math.abs(trade.target - trade.stop_loss);
        const progress = Math.abs(trade.current_price - trade.entry_price);
        const progressPercent = Math.min((progress / totalRange) * 100, 100);
        const isProfit = trade.pnl_percent >= 0;

        return (
            <div className="w-full bg-slate-700 rounded-full h-2 my-1">
                <div 
                    className={`h-2 rounded-full ${isProfit ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-fadeIn">
            <h2 className="text-4xl font-bold text-white mb-2 text-center">Trade Cockpit</h2>
            <p className="text-lg text-gray-400 text-center mb-12">Tracking all live, AI-driven trade signals.</p>

            <div className="bg-slate-900/40 border border-slate-700/60 rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[900px]">
                        <thead className="bg-slate-800/50">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Ticker</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">P&L</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Days Held</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">Entry Price</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">Target</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">Stop-Loss</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">R/R</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openTrades.map(trade => {
                                const pnlColor = trade.pnl_percent >= 0 ? 'text-green-400' : 'text-red-400';
                                return (
                                    <tr key={trade.ticker} className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/40 transition-colors">
                                        <td className="p-4 text-white font-semibold">{trade.companyName}</td>
                                        <td className="p-4 font-mono font-semibold w-48">
                                            <span className={pnlColor}>{trade.pnl_percent >= 0 ? '+' : ''}{trade.pnl_percent.toFixed(2)}%</span>
                                            <PnlProgressBar trade={trade} />
                                        </td>
                                        <td className="p-4 text-gray-300">{trade.days_held}</td>
                                        <td className="p-4 font-mono text-gray-300 text-right">{trade.entry_price.toFixed(2)}</td>
                                        <td className="p-4 font-mono text-green-400 text-right">{trade.target.toFixed(2)}</td>
                                        <td className="p-4 font-mono text-red-400 text-right">{trade.stop_loss.toFixed(2)}</td>
                                        <td className="p-4 font-mono text-sky-400 text-right">{trade.risk_reward_ratio}</td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => onAnalyze(trade.ticker)} className="text-blue-400 hover:text-blue-300 font-semibold text-sm">
                                                View Analysis
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OpenPositions;