// src/ScrybeVerse.js
import React, { useState, useEffect } from 'react';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { API_BASE_URL } from './apiConfig.js';

const ScrybeVerse = ({ onAnalyze }) => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/all-analysis`);
                if (!response.ok) {
                    throw new Error("Failed to load market data.");
                }
                const data = await response.json();

                const transformedData = {
                    name: "Scrybe-Verse",
                    color: "#0A0F1E",
                    children: [
                        {
                            name: "BUY",
                            color: "hsl(140, 70%, 50%)",
                            children: data
                                .filter(s => s.signal === 'BUY')
                                .map(s => ({
                                    name: s.ticker,
                                    value: Math.abs(s.scrybeScore),
                                    originalScore: s.scrybeScore,
                                    companyName: s.companyName
                                }))
                        },
                        {
                            name: "SELL",
                            color: "hsl(340, 80%, 60%)",
                            children: data
                                .filter(s => s.signal === 'SELL')
                                .map(s => ({
                                    name: s.ticker,
                                    value: Math.abs(s.scrybeScore),
                                    originalScore: s.scrybeScore,
                                    companyName: s.companyName
                                }))
                        },
                        {
                            name: "HOLD",
                            color: "hsl(220, 10%, 50%)",
                            children: data
                                .filter(s => s.signal === 'HOLD')
                                .map(s => ({
                                    name: s.ticker,
                                    value: Math.abs(s.scrybeScore) / 2, 
                                    originalScore: s.scrybeScore,
                                    companyName: s.companyName
                                }))
                        },
                    ]
                };

                setChartData(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div className="text-center p-8 animate-pulse">Building the Scrybe-Verse...</div>;
    if (error) return <div className="text-red-400 text-center p-8">Error: {error}</div>;

    return (
        <div className="w-full h-[60vh] md:h-[70vh]">
            <ResponsiveCirclePacking
                data={chartData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                id="name"
                value="value"
                colors={{ scheme: 'spectral' }}
                childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
                padding={4}
                enableLabels={true}
                labelsFilter={label => label.node.height === 0}
                labelsSkipRadius={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                borderWidth={2}
                borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
                
                // --- THIS IS THE CORRECTED TOOLTIP FUNCTION ---
                tooltip={({ node }) => {
                    // Only show the tooltip if the node has a companyName (i.e., it's a stock, not a category)
                    if (!node.data.companyName) {
                        return null; // Return nothing for parent circles
                    }
                    return (
                        <div className="bg-slate-800 text-white p-2 rounded-md shadow-lg text-sm">
                            <strong>{node.data.companyName} ({node.id})</strong>
                            <br />
                            Scrybe Score: {node.data.originalScore}
                        </div>
                    );
                }}
                onClick={(node) => {
                    // Only run the analysis if the clicked node is a stock
                    if (node.data.companyName) {
                        onAnalyze(node.id);
                    }
                }}
                theme={{
                    labels: {
                        text: {
                            fontSize: 12,
                            fontWeight: 'bold',
                        },
                    },
                }}
            />
        </div>
    );
};

export default ScrybeVerse;