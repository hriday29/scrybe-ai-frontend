import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './apiConfig.js';

// You can reuse your icon components if they are in a separate file
const ArrowUpRightIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>);
const ArrowDownRightIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m7 7 10 10-10 10"/></svg>);


const OpenPositions = () => {
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

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-fadeIn">
            <h2 className="text-4xl font-bold text-white mb-2 text-center">Trade Cockpit</h2>
            <p className="text-lg text-gray-400 text-center mb-12">Tracking all live, AI-driven trade signals.</p>

            <div className="bg-slate-900/40 border border-slate-700/60 rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-slate-800/50">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Ticker</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Signal</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">P&L</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">Entry Price</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">Current Price</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">Target</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">Stop-Loss</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Entry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openTrades.map(trade => {
                                const pnlColor = trade.pnl_percent >= 0 ? 'text-green-400' : 'text-red-400';
                                const signalConfig = trade.signal === 'BUY'
                                    ? { color: 'text-green-400', icon: <ArrowUpRightIcon /> }
                                    : { color: 'text-red-400', icon: <ArrowDownRightIcon /> };

                                return (
                                    <tr key={trade.ticker} className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/40 transition-colors">
                                        <td className="p-4 text-white font-semibold">{trade.companyName} ({trade.ticker})</td>
                                        <td className="p-4">
                                            <span className={`flex items-center gap-1 font-bold ${signalConfig.color}`}>
                                                {signalConfig.icon} {trade.signal}
                                            </span>
                                        </td>
                                        <td className={`p-4 font-mono font-semibold text-right ${pnlColor}`}>
                                            {trade.pnl_percent >= 0 ? '+' : ''}{trade.pnl_percent.toFixed(2)}%
                                        </td>
                                        <td className="p-4 font-mono text-gray-300 text-right">{trade.entry_price.toFixed(2)}</td>
                                        <td className="p-4 font-mono text-white text-right">{trade.current_price.toFixed(2)}</td>
                                        <td className="p-4 font-mono text-green-400 text-right">{trade.target.toFixed(2)}</td>
                                        <td className="p-4 font-mono text-red-400 text-right">{trade.stop_loss.toFixed(2)}</td>
                                        <td className="p-4 text-gray-400">{new Date(trade.entry_date).toLocaleDateString()}</td>
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