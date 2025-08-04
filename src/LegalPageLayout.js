import React from 'react';
import { motion } from 'framer-motion';

const LegalPageLayout = ({ title, lastUpdated, onBack, summaryPoints, children }) => {
    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <button onClick={onBack} className="text-blue-600 font-semibold mb-8 sticky top-8 bg-white/80 backdrop-blur-sm py-2 px-3 rounded-lg border border-gray-200">← Back to Main Site</button>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-5xl font-bold text-center mb-4">{title}</h1>
                    <p className="text-center text-gray-500 mb-12">Last Updated: {lastUpdated}</p>

                    {/* Summary Box */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">In Plain English: The Key Points</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            {summaryPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Full Legal Text */}
                    <div className="prose prose-lg max-w-none text-gray-700">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LegalPageLayout;