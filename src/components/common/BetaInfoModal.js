import React from 'react';
import Modal from '../ui/Modal';

const BetaInfoModal = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Beta Version" maxWidth="max-w-md">
            <p className="font-mono text-xs text-gray-500 dark:text-gray-400 mb-4">Version 0.9.0 — "Genesis"</p>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                    You're currently using a beta version of <span className="font-semibold text-primary-600 dark:text-primary-400">Scrybe AI</span>.
                    We're actively refining the AI and evolving based on your feedback.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-full border border-primary-100 dark:border-primary-800">
                        Early Access
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-medium bg-secondary-50 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 px-3 py-1.5 rounded-full border border-secondary-100 dark:border-secondary-800">
                        Iterating Fast
                    </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Thanks for being part of this journey—you’re helping shape the future of financial analysis.</p>
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                    Continue
                </button>
            </div>
        </Modal>
    );
};

export default BetaInfoModal;
