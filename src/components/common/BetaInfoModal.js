import React from 'react';
import { motion } from 'framer-motion';

const BetaInfoModal = ({ onClose }) => {
    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <motion.div onClick={(e) => e.stopPropagation()} className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-md p-8 text-center shadow-[inset_0_1px_3px_rgba(255,255,255,0.1),0_8px_30px_rgba(200,200,200,0.15)] transition-all duration-300 ease-in-out" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-white/5 blur-[2px] opacity-30" />
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors duration-200 z-50"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]">Beta Version</h2><p className="font-mono text-sm text-gray-600 mb-4">Version 0.9.0 — "Genesis"</p>
                <p className="text-gray-700 leading-relaxed">You're currently using a beta version of <span className="text-white font-semibold">Scrybe AI</span>. We're actively refining the AI and evolving based on your feedback.</p><p className="text-gray-500 mt-4 text-sm">Thanks for being part of this journey, you’re helping shape the future of financial analysis.</p>
            </motion.div>
        </div>
    );
};
export default BetaInfoModal;
