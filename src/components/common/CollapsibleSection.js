import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CollapsibleSection = ({ title, icon: Icon = Menu, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(!!defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-neutral-700 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-gray-100 dark:bg-neutral-800">
            <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;


