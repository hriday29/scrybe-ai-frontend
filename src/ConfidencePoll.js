import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './apiConfig.js';

const ConfidencePoll = ({ analysisId }) => {
    const [votes, setVotes] = useState({ agree_votes: 0, unsure_votes: 0, disagree_votes: 0 });
    const [userVote, setUserVote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!analysisId) {
            setIsLoading(false);
            return;
        };

        const fetchVotes = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/analysis/vote/${analysisId}`);
                if (!response.ok) throw new Error("Failed to fetch votes.");
                const data = await response.json();
                setVotes(data);
            } catch (error) {
                console.error("Error fetching votes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVotes();
    }, [analysisId]);


    const handleVote = async (voteType) => {
        // If user is trying to change their vote
        if (userVote && userVote !== voteType) {
            if (!window.confirm("Are you sure you want to change your vote?")) {
                return; // Do nothing if user cancels
            }
            // Logic for changing a vote would go here (requires a new backend endpoint)
            // For now, we will just lock the vote after the first click.
            return; 
        }

        // If it's the first vote
        if (!userVote) {
             setUserVote(voteType);
             setVotes(prevVotes => ({ ...prevVotes, [`${voteType}_votes`]: prevVotes[`${voteType}_votes`] + 1 }));

            try {
                await fetch(`${API_BASE_URL}/api/analysis/vote`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ analysis_id: analysisId, vote_type: voteType }),
                });
            } catch (error) {
                console.error("Failed to submit vote:", error);
                setUserVote(null); // Revert on failure
                setVotes(prevVotes => ({ ...prevVotes, [`${voteType}_votes`]: prevVotes[`${voteType}_votes`] - 1 }));
            }
        }
    };
    
    // ... (VoteButton component remains the same)
    const VoteButton = ({ type, count, children }) => (
        <button
            onClick={() => handleVote(type)}
            // FIX: Disable only if a vote has been cast and it's NOT the current vote
            disabled={userVote && userVote !== type}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold
                ${userVote === type ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-slate-700/50 text-gray-300'}
                ${!userVote ? 'hover:bg-slate-600/80' : ''}
                ${userVote && userVote !== type ? 'cursor-not-allowed opacity-50' : ''}`}
        >
            {children}
            <span className="text-xs">{isLoading ? '...' : count}</span>
        </button>
    );


    return (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 mt-8">
            <h3 className="font-bold text-xl text-white mb-4">Analyst's Desk: Do you agree? (Vote only once)</h3>
            <div className="flex items-center justify-center gap-4">
                <VoteButton type="agree" count={votes.agree_votes}>👍 Agree</VoteButton>
                <VoteButton type="unsure" count={votes.unsure_votes}>🤔 Unsure</VoteButton>
                <VoteButton type="disagree" count={votes.disagree_votes}>👎 Disagree</VoteButton>
            </div>
            <p className="text-xs text-gray-500 mt-3">
                {userVote ? "Thank you for your feedback!" : "Note: You can only vote once."}
            </p>
        </div>
    );
};

export default ConfidencePoll;