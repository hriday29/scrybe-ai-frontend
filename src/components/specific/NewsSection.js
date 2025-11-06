// src/components/specific/NewsSection.js (SAGE REVAMP)

import React from 'react';
import { ExternalLink } from 'lucide-react';

const NewsSection = ({ newsData }) => { // It now receives newsData directly

    const renderContent = () => {
        // Check if the articles array is empty or not provided
        if (!newsData || !newsData.articles || newsData.articles.length === 0) {
            return (
                <div className="p-4 text-center text-gray-400">
                    No relevant news found for this stock.
                </div>
            );
        }

        // If we have articles, display them
        return (
            <div className="pt-4 space-y-4">
                {/* Show note if this is general market news */}
                {newsData.note && (
                    <div className="p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                        <p className="text-sm text-blue-300">
                            <span className="font-semibold">ℹ️ Note:</span> {newsData.note}
                        </p>
                    </div>
                )}
                
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
                <span>
                    {newsData?.type || 'Recent News'}
                    {newsData?.articles?.length > 0 && (
                        <span className="ml-2 text-sm font-normal text-gray-400">
                            ({newsData.articles.length})
                        </span>
                    )}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-open:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
            </summary>
            {renderContent()}
        </details>
    );
};

export default NewsSection;