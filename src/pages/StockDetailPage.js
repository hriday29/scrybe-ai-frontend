// src/pages/StockDetailPage.js

import React, { useState, useEffect } from 'react';
// --- Corrected Imports ---
import { useAuth } from '../context/AuthContext';
import { getAnalysis } from '../api/api'; 
import ApexAnalysisDashboard from '../components/specific/ApexAnalysisDashboard';
// --- End Corrected Imports ---
import { ArrowLeft } from 'lucide-react';


const StockDetailPage = ({ ticker, onBackClick }) => {
    const { currentUser } = useAuth();
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (ticker) {
                try {
                    setIsLoading(true);
                    setError(null);
                    const data = await getAnalysis(ticker); 
                    setAnalysis(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchAnalysis();
    }, [ticker]);

    if (isLoading) { return <div className="text-center p-8 text-gray-400 animate-pulse">Loading Apex Analysis for {ticker}...</div>; }
    if (error) { return <div className="text-center p-8 text-red-400">Error loading analysis: {error}</div>; }
    if (!analysis) { return <div className="text-center p-8 text-gray-500">No analysis data found for {ticker}.</div>; }

    return (
        <div>
            <button onClick={onBackClick} className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6 ml-4 md:ml-8"><ArrowLeft size={16} className="mr-2" />Back to A-List</button>
            <ApexAnalysisDashboard analysisData={analysis} />
        </div>
    );
};

export default StockDetailPage;