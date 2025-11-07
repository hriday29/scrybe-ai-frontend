import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ open = true, onClose, title, children, maxWidth = 'max-w-md', showClose = true }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl w-full ${maxWidth} p-6 md:p-8 shadow-soft-2xl`}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {showClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {title ? (
          <h2 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h2>
        ) : null}

        {children}
      </motion.div>
    </motion.div>
  );
}
