import React from 'react';

const base = 'rounded-xl border bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 shadow-soft transition-colors';
const paddings = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};
const variants = {
  default: '',
  subtle: 'bg-gray-50 dark:bg-neutral-800/40',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
  warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700',
  danger: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
};

export default function Card({ children, className = '', variant = 'default', padding = 'lg', as: Comp = 'div' }) {
  const pad = paddings[padding] || paddings.lg;
  const variantCls = variants[variant] || variants.default;
  return (
    <Comp className={`${base} ${pad} ${variantCls} ${className}`}>
      {children}
    </Comp>
  );
}
