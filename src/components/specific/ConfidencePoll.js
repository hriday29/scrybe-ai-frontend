// src/components/specific/ConfidencePoll.js

import React, { useState, useEffect } from 'react';
// --- Corrected Imports ---
import { API_BASE_URL } from '../../apiConfig.js';
import { useAuth } from '../../context/AuthContext';
import authFetch from '../../api/authFetch';
// --- End Corrected Imports ---

const ConfidencePoll = ({ analysisId }) => {
    const { currentUser } = useAuth();
    const [votes, setVotes] = useState({ agree_votes: 0, unsure_votes: 0, disagree_votes: 0 });
    const [userVote, setUserVote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        if (!analysisId) { setIsLoading(false); return; };
        const fetchVotes = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/analysis/votes/${analysisId}`);
                if (!response.ok) throw new Error("Failed to fetch votes.");
                const data = await response.json();
                setVotes(data);
            } catch (error) { console.error("Error fetching votes:", error); setError("Could not load vote counts."); } finally { setIsLoading(false); }
        };
        fetchVotes();
    }, [analysisId]);
    const handleVote = async (voteType) => {
        if (!currentUser) { setError("You must be logged in to vote."); return; }
        if (userVote) return;
        const originalVotes = votes;
        setUserVote(voteType);
        setVotes(prevVotes => ({ ...prevVotes, [`${voteType}_votes`]: prevVotes[`${voteType}_votes`] + 1 }));
        setError('');
        try {
            await authFetch(`${API_BASE_URL}/api/analysis/vote`, currentUser, { method: 'POST', body: JSON.stringify({ analysis_id: analysisId, vote_type: voteType }), });
        } catch (err) {
            console.error("Failed to submit vote:", err);
            setError(err.message);
            setUserVote(null);
            setVotes(originalVotes);
        }
    };
    const VoteButton = ({ type, count, children }) => (
        <button onClick={() => handleVote(type)} disabled={!!userVote} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold ${userVote === type ? 'bg-primary-500 text-white ring-2 ring-primary-300' : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300'} ${!userVote ? 'hover:bg-gray-200 dark:hover:bg-neutral-700' : ''} disabled:cursor-not-allowed disabled:opacity-50`}>{children}<span className="text-xs">{isLoading ? '...' : count}</span></button>
    );
    return (
        <div className="bg-white dark:bg-neutral-900 backdrop-blur-none border border-gray-200 dark:border-neutral-700 rounded-xl p-6 mt-8">
            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4">Analyst's Desk: Do you agree?</h3>
            <div className="flex items-center justify-center gap-4"><VoteButton type="agree" count={votes.agree_votes}>👍 Agree</VoteButton><VoteButton type="unsure" count={votes.unsure_votes}>🤔 Unsure</VoteButton><VoteButton type="disagree" count={votes.disagree_votes}>👎 Disagree</VoteButton></div>
            {error && <p className="text-xs text-red-600 dark:text-red-400 mt-3">{error}</p>}
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">{userVote ? "Thank you for your feedback!" : "Note: You can only vote once."}</p>
        </div>
    );
};
export default ConfidencePoll;
