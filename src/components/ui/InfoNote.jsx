import React from 'react';

const variantMap = {
  info: {
    wrap: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700',
    title: 'text-blue-700 dark:text-blue-300',
    icon: 'text-blue-600 dark:text-blue-400'
  },
  warning: {
    wrap: 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700',
    title: 'text-amber-800 dark:text-amber-300',
    icon: 'text-amber-600 dark:text-amber-400'
  },
  success: {
    wrap: 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700',
    title: 'text-green-800 dark:text-green-300',
    icon: 'text-green-600 dark:text-green-400'
  },
  danger: {
    wrap: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700',
    title: 'text-red-800 dark:text-red-300',
    icon: 'text-red-600 dark:text-red-400'
  },
  neutral: {
    wrap: 'bg-gray-50 dark:bg-neutral-800/40 border border-gray-200 dark:border-neutral-700',
    title: 'text-gray-800 dark:text-gray-200',
    icon: 'text-gray-600 dark:text-gray-400'
  }
};

export default function InfoNote({ title, children, variant = 'info', Icon, className = '' }) {
  const v = variantMap[variant] || variantMap.info;
  return (
    <div className={`rounded-xl p-4 ${v.wrap} ${className}`}>
      <div className="flex items-start gap-3">
        {Icon ? <Icon className={`w-5 h-5 mt-0.5 ${v.icon}`} /> : null}
        <div className="flex-1">
          {title ? <h4 className={`font-semibold ${v.title} mb-1`}>{title}</h4> : null}
          <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
        </div>
      </div>
    </div>
  );
}
