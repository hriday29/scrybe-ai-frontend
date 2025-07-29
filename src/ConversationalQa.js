import React, { useState } from 'react';

const ConversationalQa = ({ analysisContext }) => {
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim() || isLoading) return;

        const currentQuestion = question;
        setConversation(prev => [...prev, { type: 'user', text: currentQuestion }]);
        setQuestion('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5001/api/analysis/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: currentQuestion, context: analysisContext })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "The AI failed to generate an answer.");
            }

            const data = await response.json();
            setConversation(prev => [...prev, { type: 'ai', text: data.answer }]);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6">
            <h3 className="font-bold text-xl text-white mb-4">Ask a Question About This Analysis</h3>
            
            {/* Conversation Display */}
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
                {conversation.map((entry, index) => (
                    <div key={index} className={`flex flex-col ${entry.type === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`p-3 rounded-lg max-w-lg ${entry.type === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-200'}`}>
                            <p className="text-sm">{entry.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && <p className="text-center text-sm text-gray-400 animate-pulse">AI is thinking...</p>}
                {error && <p className="text-center text-sm text-red-400">{error}</p>}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="e.g., Why is the RSI considered bullish?"
                        className="flex-grow bg-slate-800/50 border border-slate-600 text-white placeholder-gray-500 text-sm rounded-lg py-2 px-3 transition-all focus:outline-none focus:border-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !question.trim()}
                        className="bg-blue-600 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        Ask
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConversationalQa;