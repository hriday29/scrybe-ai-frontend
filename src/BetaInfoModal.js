import React from 'react';
import { motion } from 'framer-motion';

const BetaInfoModal = ({ onClose }) => {
    return (
        <div 
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
        >
            <motion.div 
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-slate-900 to-[#0A0F1E] border border-slate-700 rounded-2xl w-full max-w-md p-8 text-center shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white z-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                
                <h2 className="text-3xl font-bold text-white mb-2">Beta Version</h2>
                <p className="font-mono text-sm text-blue-400 mb-4">Version 0.9.0 - "Phoenix"</p>

                <p className="text-slate-300 leading-relaxed">
                    You're currently using a beta version of Scrybe AI. This means we are actively developing, refining the AI's logic, and adding new features based on user feedback.
                </p>
                <p className="text-slate-400 mt-4 text-sm">
                    Thank you for being an early user and helping us build the future of financial analysis.
                </p>
            </motion.div>
        </div>
    );
};

export default BetaInfoModal;