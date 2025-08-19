// src/OnTheRadar.js

import React from 'react';
import { Zap } from 'lucide-react';

const OnTheRadar = ({ aListData, isLoading, onStockSelect }) => {
    if (isLoading) {
        return <div className="text-center p-8 text-gray-400 animate-pulse">Loading A-List...</div>;
    }

    if (!aListData || aListData.length === 0) {
        return <div className="text-center p-8 text-gray-500">A-List is currently empty.</div>;
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-fadeIn">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center bg-indigo-500/10 text-indigo-400 rounded-full p-3 mb-4">
                    <Zap size={24} />
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">V1.0 A-List</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    The official universe of stocks actively monitored by the Apex AI. These stocks have been selected based on their proven suitability for our strategy.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {aListData.map((ticker) => (
                    <button
                        key={ticker}
                        onClick={() => onStockSelect(ticker)}
                        className="group bg-slate-900/40 border border-slate-700/60 rounded-xl p-4 text-center shadow-lg hover:bg-slate-800/60 hover:border-indigo-500/80 transition-all duration-300"
                    >
                        <h3 className="font-bold text-lg md:text-xl text-white group-hover:text-indigo-400 transition-colors">
                            {ticker.replace('.NS', '')}
                        </h3>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OnTheRadar;
