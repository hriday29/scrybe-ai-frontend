// src/components/specific/NewsSection.js (FUNCTIONAL VERSION)

import React, { useState, useEffect } from 'react';
import { getNews } from '../../api/api'; // Import our new function
import { ExternalLink } from 'lucide-react';

const NewsSection = ({ ticker }) => {
    const [newsData, setNewsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!ticker) return;

        const fetchNews = async () => {
            try {
                setIsLoading(true);
                const data = await getNews(ticker);
                setNewsData(data);
            } catch (error) {
                console.error("Failed to fetch news", error);
                setNewsData({ articles: [] }); // Set empty to avoid errors
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [ticker]);

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center text-gray-400 p-4">Loading news...</div>;
        }

        if (!newsData || !newsData.articles || newsData.articles.length === 0) {
            return (
                <div className="p-4 text-center text-gray-400">
                    The news analysis feature is currently unavailable.
                </div>
            );
        }

        return (
            <div className="pt-4 space-y-4">
                {newsData.articles.map((article, index) => (
                    <a 
                        href={article.url} 
                        key={index}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold text-white mb-1">{article.title}</h4>
                                <p className="text-xs text-gray-400">{article.source_name || 'N/A'}</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-500 flex-shrink-0 ml-4 mt-1" />
                        </div>
                    </a>
                ))}
            </div>
        );
    };

    return (
        <details className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 group" open>
            <summary className="font-bold text-xl text-white list-none flex justify-between items-center cursor-pointer">
                Recent News
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-open:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
            </summary>
            {renderContent()}
        </details>
    );
};

export default NewsSection;