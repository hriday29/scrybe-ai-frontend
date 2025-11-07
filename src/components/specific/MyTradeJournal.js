// src/components/specific/MyTradeJournal.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyTrades } from '../../api/api';
import { BookMarked, TrendingUp } from 'lucide-react';

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
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Ticker</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Entry Date</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider text-right">Entry Price</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 tracking-wider">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myTrades.map(trade => (
                                <tr key={trade._id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-gray-900 font-semibold flex items-center">
                                        <TrendingUp size={16} className="mr-2 text-sky-400" />
                                        {trade.ticker}
                                    </td>
                                    <td className="p-4 text-gray-300">
                                        {new Date(trade.user_entry_date).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 font-mono text-gray-300 text-right">
                                        ₹{trade.user_entry_price.toFixed(2)}
                                    </td>
                                    <td className="p-4 text-gray-400 italic">
                                        {trade.user_notes || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyTradeJournal;
