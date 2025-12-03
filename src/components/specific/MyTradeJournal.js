// src/components/specific/MyTradeJournal.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyTrades } from '../../api/api';
import { BookMarked, TrendingUp, AlertCircle, Award } from 'lucide-react';

/**
 * MyTradeJournal - Display user's open trades with entry signal preservation
 * 
 * SIGNAL PRESERVATION: Shows both entry signal (why trade opened) and current
 * status (what market is showing today), making trade rationale transparent.
 */

const MyTradeJournal = () => {
    const { currentUser, authFetch } = useAuth();
    const [myTrades, setMyTrades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMyTrades = async () => {
            if (!currentUser) {
                setIsLoading(false);
                return;
            }
            try {
                const data = await getMyTrades(authFetch, currentUser);
                setMyTrades(data);
            } catch (error) {
                console.error("Failed to load my trade journal", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyTrades();
    }, [currentUser, authFetch]);

    const getSignalColor = (signal) => {
        if (signal === 'BUY') return 'text-green-600 dark:text-green-400';
        if (signal === 'SHORT') return 'text-red-600 dark:text-red-400';
        return 'text-gray-600 dark:text-gray-400';
    };

    const getSignalBg = (signal) => {
        if (signal === 'BUY') return 'bg-green-100/50 dark:bg-green-900/20 border-green-200/50 dark:border-green-800/50';
        if (signal === 'SHORT') return 'bg-red-100/50 dark:bg-red-900/20 border-red-200/50 dark:border-red-800/50';
        return 'bg-gray-100/50 dark:bg-gray-800/20 border-gray-200/50 dark:border-gray-800/50';
    };

    if (isLoading) {
        return <div className="text-center p-8 animate-pulse">Loading Your Journal...</div>;
    }

    if (myTrades.length === 0) {
        return (
             <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <BookMarked className="mr-3 text-blue-300" />
                    Personal Trade Journal
                </h2>
                <div className="text-center text-gray-500 py-16 bg-white border border-gray-200 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-900">Your Journal is Empty</h3>
                    <p className="mt-2">Log a trade from an analysis page to get started.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <BookMarked className="mr-3 text-blue-300" />
                Personal Trade Journal
            </h2>
            
            {/* Grid layout for trade cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {myTrades.map(trade => (
                    <div 
                        key={trade._id} 
                        className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        {/* Trade Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {trade.ticker}
                                    </h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Opened {new Date(trade.user_entry_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            {/* Signal Badge */}
                            <div className={`px-3 py-1.5 rounded-full border ${getSignalBg(trade.signal || 'HOLD')}`}>
                                <span className={`font-semibold text-sm ${getSignalColor(trade.signal || 'HOLD')}`}>
                                    {trade.signal || 'HOLD'}
                                </span>
                            </div>
                        </div>

                        {/* Trade Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Entry Price</div>
                                <div className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-100">
                                    ₹{trade.user_entry_price.toFixed(2)}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Entry Score</div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    {trade.entry_score !== undefined ? `${trade.entry_score}/100` : 'N/A'}
                                </div>
                            </div>
                        </div>

                        {/* Target & Stop Loss */}
                        {(trade.target || trade.stop_loss) && (
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {trade.target && (
                                    <div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Target</div>
                                        <div className="text-sm font-mono font-semibold text-green-600 dark:text-green-400">
                                            ₹{trade.target.toFixed(2)}
                                        </div>
                                    </div>
                                )}
                                {trade.stop_loss && (
                                    <div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Stop Loss</div>
                                        <div className="text-sm font-mono font-semibold text-red-600 dark:text-red-400">
                                            ₹{trade.stop_loss.toFixed(2)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Entry Reason */}
                        {trade.entry_reason && (
                            <div className="mb-3 p-2.5 bg-blue-50/50 dark:bg-blue-900/20 rounded border border-blue-200/50 dark:border-blue-800/50">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-900 dark:text-blue-300 leading-relaxed">
                                        {trade.entry_reason}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Current Status (if available) */}
                        {trade.current_analysis && (
                            <div className="mb-3 p-2.5 bg-amber-50/50 dark:bg-amber-900/20 rounded border border-amber-200/50 dark:border-amber-800/50">
                                <div className="flex items-start gap-2">
                                    <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-amber-900 dark:text-amber-300 mb-1">
                                            Current Status
                                        </p>
                                        <p className="text-xs text-amber-800 dark:text-amber-300">
                                            {trade.current_analysis.final_signal}
                                            {trade.current_analysis.scrybeScore !== undefined && (
                                                ` (Score: ${trade.current_analysis.scrybeScore})`
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        {trade.user_notes && (
                            <div className="pt-3 border-t border-gray-200 dark:border-neutral-700">
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Notes</div>
                                <p className="text-xs text-gray-700 dark:text-gray-300 italic">
                                    {trade.user_notes}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTradeJournal;
