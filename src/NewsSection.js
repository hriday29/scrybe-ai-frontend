import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './apiConfig';

// A new component to display the granular AI analysis for a single article
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
    // --- FIX 1: The state now holds the entire object from the API ---
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
                const res = await fetch(`${API_BASE_URL}/api/news/${ticker}`);
                if (!res.ok) throw new Error("Failed to fetch news.");
                const data = await res.json();
                // --- FIX 2: We set the entire data object in the state ---
                setNewsData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [ticker]);

    const handleAnalyzeClick = async (article, index) => {
        const key = index;
        setAnalyses(prev => ({ ...prev, [key]: { loading: true, error: null, data: null } }));
        try {
            const response = await fetch(`${API_BASE_URL}/api/news/analyze-one`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(article)
            });
            if (response.status === 429) throw new Error("You have reached your analysis limit for the day.");
            if (!response.ok) throw new Error("The AI failed to analyze this article.");
            const analysisData = await response.json();
            setAnalyses(prev => ({ ...prev, [key]: { loading: false, error: null, data: analysisData } }));
        } catch (err) {
            setAnalyses(prev => ({ ...prev, [key]: { loading: false, error: err.message, data: null } }));
        }
    };

    const renderContent = () => {
        if (isLoading) return <div className="p-4 text-center text-gray-400 animate-pulse">Loading news...</div>;
        if (error) return <div className="p-4 text-center text-red-400">{error}</div>;
        
        // --- FIX 3: We check the length of newsData.articles ---
        if (newsData.articles.length === 0) {
            return <div className="p-4 text-center text-gray-500">No recent news found for this stock.</div>;
        }

        return (
            <div className="space-y-4 pt-4">
                {/* --- FIX 4: We map over newsData.articles --- */}
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
                {/* --- FIX 5: The title is now dynamic based on the type of news --- */}
                {newsData.type || 'Recent News'}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-open:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
            </summary>
            {renderContent()}
        </details>
    );
};

export default NewsSection;