import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';

const DisclaimerModal = ({ onAgree }) => {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <Modal title="Welcome to the Lab 🔬" onClose={countdown > 0 ? undefined : onAgree} maxWidth="max-w-lg">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
                Before you proceed, please acknowledge the following:
            </p>
            <ul className="text-left space-y-3 text-gray-700 dark:text-gray-200 mb-8">
                <li className="flex items-start gap-3">
                    <span className="text-primary-600 dark:text-primary-400 mt-1">✅</span>
                    <span>
                        This is a research tool for educational purposes, <strong>not financial advice</strong>.
                    </span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-primary-600 dark:text-primary-400 mt-1">✅</span>
                    <span>
                        Signals are generated using the latest market data based on historical patterns. They are informational research outcomes, not financial advice.
                    </span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-primary-600 dark:text-primary-400 mt-1">✅</span>
                    <span>
                        You are <strong>100% responsible</strong> for all your trading decisions and financial risks.
                    </span>
                </li>
            </ul>

            <button
                onClick={onAgree}
                disabled={countdown > 0}
                className="w-full bg-primary-600 text-white font-semibold text-lg px-8 py-3 rounded-xl transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
                {countdown > 0 ? `I Understand (${countdown})` : 'I Understand & Agree'}
            </button>
        </Modal>
    );
};

export default DisclaimerModal;
