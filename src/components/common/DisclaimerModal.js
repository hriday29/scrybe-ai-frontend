import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DisclaimerModal = ({ onAgree }) => {
    const [countdown, setCountdown] = useState(3);
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#131828] border border-slate-700 rounded-2xl w-full max-w-lg text-center p-8">
                <h2 className="text-4xl font-bold text-white mb-4">Welcome to the Lab 🔬</h2>
                <p className="text-gray-400 mb-6">Before you proceed, please acknowledge the following:</p>
                <ul className="text-left space-y-3 text-gray-300 mb-8">
                    <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">✅</span><span>This is a research tool for educational purposes, **not financial advice**.</span></li>
                    <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">✅</span><span>Signals are generated using the latest market data based on historical patterns. They are informational research outcomes, not financial advice.</span></li>
                    <li className="flex items-start gap-3"><span className="text-blue-400 mt-1">✅</span><span>You are **100% responsible** for all your trading decisions and financial risks.</span></li>
                </ul>
                <button onClick={onAgree} disabled={countdown > 0} className="w-full bg-blue-600 text-white font-semibold text-lg px-8 py-3 rounded-xl transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-blue-700">{countdown > 0 ? `I Understand (${countdown})` : "I Understand & Agree"}</button>
            </div>
        </motion.div>
    );
};
export default DisclaimerModal;