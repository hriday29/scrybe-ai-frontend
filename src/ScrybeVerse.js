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

                // Fallback if data is not an array
                if (!Array.isArray(data)) {
                    throw new Error("Invalid API data format.");
                }

                const createNode = (signal, color, valueFn) => ({
                    name: signal,
                    color,
                    children: data
                        .filter(s => s && s.signal === signal)
                        .map(s => ({
                            name: s?.ticker || "Unknown",
                            value: valueFn(Math.abs(s?.scrybeScore) || 0) || 1,
                            originalScore: s?.scrybeScore ?? "N/A",
                            companyName: s?.companyName || "Unknown Company"
                        }))
                });

                const transformedData = {
                    name: "Scrybe-Verse",
                    color: "#0A0F1E",
                    children: [
                        createNode("BUY", "hsl(140, 70%, 50%)", v => v),
                        createNode("SELL", "hsl(340, 80%, 60%)", v => v),
                        createNode("HOLD", "hsl(220, 10%, 50%)", v => v / 2)
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

    if (isLoading) {
        return <div className="text-center p-8 animate-pulse">Building the Scrybe-Verse...</div>;
    }

    if (error) {
        return <div className="text-red-400 text-center p-8">Error: {error}</div>;
    }

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
                
                // --- Safe Tooltip ---
                tooltip={({ node }) => {
                    if (!node || typeof node.data !== 'object') return null;
                    if (!node.data.companyName) return null; // Skip parent nodes

                    return (
                        <div className="bg-slate-800 text-white p-2 rounded-md shadow-lg text-sm">
                            <strong>{node.data.companyName} ({node.id})</strong>
                            <br />
                            Scrybe Score: {node.data.originalScore}
                        </div>
                    );
                }}

                // --- Safe Click ---
                onClick={(node) => {
                    if (node && typeof node.data === 'object' && node.data.companyName) {
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
