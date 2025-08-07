import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './apiConfig.js';

// --- 1. Import the new tools ---
import { useAuth } from './AuthContext';
import authFetch from './api/authFetch';

const ConfidencePoll = ({ analysisId }) => {
    // --- 2. Get the current user from the Auth Context ---
    const { currentUser } = useAuth();

    const [votes, setVotes] = useState({ agree_votes: 0, unsure_votes: 0, disagree_votes: 0 });
    const [userVote, setUserVote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(''); // State to handle errors

    useEffect(() => {
        if (!analysisId) {
            setIsLoading(false);
            return;
        };

        const fetchVotes = async () => {
            setIsLoading(true);
            try {
                // This is a public API call, so standard fetch is fine here
                const response = await fetch(`${API_BASE_URL}/api/analysis/votes/${analysisId}`);
                if (!response.ok) throw new Error("Failed to fetch votes.");
                const data = await response.json();
                setVotes(data);
            } catch (error) {
                console.error("Error fetching votes:", error);
                setError("Could not load vote counts.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchVotes();
    }, [analysisId]);

    // --- 3. Update the handleVote function to use authFetch ---
    const handleVote = async (voteType) => {
        // First, check if the user is logged in
        if (!currentUser) {
            setError("You must be logged in to vote.");
            return;
        }

        if (userVote) return; // Prevent re-voting

        const originalVotes = votes; // Keep a copy in case of an error
        
        // Optimistically update the UI for a fast user experience
        setUserVote(voteType);
        setVotes(prevVotes => ({ ...prevVotes, [`${voteType}_votes`]: prevVotes[`${voteType}_votes`] + 1 }));
        setError('');

        try {
            // Use the new, secure authFetch function
            await authFetch(
                `${API_BASE_URL}/api/analysis/vote`, // The protected URL
                currentUser,                        // The current user object
                {                                   // The fetch options
                    method: 'POST',
                    body: JSON.stringify({ analysis_id: analysisId, vote_type: voteType }),
                }
            );
        } catch (err) {
            console.error("Failed to submit vote:", err);
            setError(err.message); // Show an error to the user
            // If the API call fails, revert the optimistic UI update
            setUserVote(null);
            setVotes(originalVotes);
        }
    };
    
    const VoteButton = ({ type, count, children }) => (
        <button
            onClick={() => handleVote(type)}
            disabled={!!userVote}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold
                ${userVote === type ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-slate-700/50 text-gray-300'}
                ${!userVote ? 'hover:bg-slate-600/80' : ''}
                disabled:cursor-not-allowed disabled:opacity-50`}
        >
            {children}
            <span className="text-xs">{isLoading ? '...' : count}</span>
        </button>
    );

    return (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 mt-8">
            <h3 className="font-bold text-xl text-white mb-4">Analyst's Desk: Do you agree?</h3>
            <div className="flex items-center justify-center gap-4">
                <VoteButton type="agree" count={votes.agree_votes}>👍 Agree</VoteButton>
                <VoteButton type="unsure" count={votes.unsure_votes}>🤔 Unsure</VoteButton>
                <VoteButton type="disagree" count={votes.disagree_votes}>👎 Disagree</VoteButton>
            </div>
            {error && <p className="text-xs text-red-400 mt-3">{error}</p>}
            <p className="text-xs text-gray-500 mt-3">
                {userVote ? "Thank you for your feedback!" : "Note: You can only vote once."}
            </p>
        </div>
    );
};

export default ConfidencePoll;