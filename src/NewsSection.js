import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './apiConfig';

// --- 1. Import the new tools ---
import { useAuth } from './AuthContext';
import authFetch from './api/authFetch';

// A component to display the granular AI analysis for a single article
const SingleArticleAnalysis = ({ analysis }) => {
    if (!analysis) return null;

    const impactConfig = {
        Positive: 'bg-green-500/10 border-green-500/30 text-green-300',
        Negative: 'bg-red-500/10 border-red-500/30 text-red-300',
        Neutral: 'bg-slate-700/50 border-slate-600/50 text-slate-300',
    };

    return (
        <div className="mt-3 p-3 border-l-2 border-blue-500/50 bg-slate-900/30 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
                <h5 className="font-bold text-white">AI Impact Analysis</h5>
                <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${impactConfig[analysis.impact] || impactConfig.Neutral}`}>
                    {analysis.impact}
                </span>
            </div>
            <p className="text-sm text-gray-400 italic">"{analysis.summary}"</p>
            <p className="text-sm text-gray-300 mt-2">{analysis.rationale}</p>
        </div>
    );
};

const NewsSection = ({ ticker }) => {
    // --- 2. Get the current user from the Auth Context ---
    const { currentUser } = useAuth();

    const [newsData, setNewsData] = useState({ type: '', articles: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [analyses, setAnalyses] = useState({});

    useEffect(() => {
        if (!ticker) return;

        const fetchNews = async () => {
            setIsLoading(true);
            setError(null);
            setAnalyses({});
            try {
                // This is a public API call, so standard fetch is fine here.
                const res = await fetch(`${API_BASE_URL}/api/news/${ticker}`);
                if (!res.ok) throw new Error("Failed to fetch news.");
                const data = await res.json();
                setNewsData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [ticker]);

    // --- 3. Update the handleAnalyzeClick function to use authFetch ---
    const handleAnalyzeClick = async (article, index) => {
        const key = index;

        // First, check if the user is logged in
        if (!currentUser) {
            setAnalyses(prev => ({ ...prev, [key]: { loading: false, error: "You must be logged in to analyze articles.", data: null } }));
            return;
        }
        
        setAnalyses(prev => ({ ...prev, [key]: { loading: true, error: null, data: null } }));
        try {
            // Use the new, secure authFetch function
            const analysisData = await authFetch(
                `${API_BASE_URL}/api/news/analyze-one`, // The protected URL
                currentUser,                           // The current user object
                {                                      // The fetch options
                    method: 'POST',
                    body: JSON.stringify(article)
                }
            );

            if (analysisData.error) throw new Error(analysisData.error);
            
            setAnalyses(prev => ({ ...prev, [key]: { loading: false, error: null, data: analysisData } }));
        } catch (err) {
            // Special handling for rate limit errors from the backend
            const errorMessage = err.message.includes("rate limit exceeded") ? "You have reached your analysis limit for the day." : err.message;
            setAnalyses(prev => ({ ...prev, [key]: { loading: false, error: errorMessage, data: null } }));
        }
    };

    const renderContent = () => {
        if (isLoading) return <div className="p-4 text-center text-gray-400 animate-pulse">Loading news...</div>;
        if (error) return <div className="p-4 text-center text-red-400">{error}</div>;
        
        if (newsData.articles.length === 0) {
            return <div className="p-4 text-center text-gray-500">No recent news found for this stock.</div>;
        }

        return (
            <div className="space-y-4 pt-4">
                {newsData.articles.map((article, index) => {
                    const key = index;
                    const analysisState = analyses[key];
                    return (
                        <div key={key} className="p-3 rounded-lg bg-slate-800/50">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <h4 className="font-semibold text-white">{article.title}</h4>
                                <p className="text-xs text-gray-400 mt-1">{article.source_name} - {new Date(article.published_at).toLocaleDateString()}</p>
                            </a>
                            <div className="mt-3">
                                {!analysisState ? (
                                    <button onClick={() => handleAnalyzeClick(article, key)} className="text-xs font-semibold text-blue-400 hover:text-blue-300">Analyze Impact 🤖</button>
                                ) : analysisState.loading ? (
                                    <p className="text-xs text-gray-400 animate-pulse">Analyzing...</p>
                                ) : analysisState.error ? (
                                    <p className="text-xs text-red-400">Error: {analysisState.error}</p>
                                ) : (
                                    <SingleArticleAnalysis analysis={analysisState.data} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <details className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 group mb-8" open>
            <summary className="font-bold text-xl text-white list-none flex justify-between items-center cursor-pointer">
                {newsData.type || 'Recent News'}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-open:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
            </summary>
            {renderContent()}
        </details>
    );
};

export default NewsSection;