import React from 'react';

const colorMap = {
  blue: 'bg-blue-50 dark:bg-blue-900/25 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700',
  green: 'bg-green-50 dark:bg-green-900/25 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700',
  red: 'bg-red-50 dark:bg-red-900/25 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700',
  amber: 'bg-amber-50 dark:bg-amber-900/25 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700',
  purple: 'bg-purple-50 dark:bg-purple-900/25 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700',
  gray: 'bg-gray-100 dark:bg-neutral-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-neutral-700'
};

export default function Badge({ children, color = 'gray', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${colorMap[color] || colorMap.gray} ${className}`}>
      {children}
    </span>
  );
}
