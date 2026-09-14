import React from 'react';
import { SearchX } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = SearchX,
  title = 'No results found',
  description = 'Try adjusting your search query or department filters to find what you are looking for.',
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 ring-8 ring-indigo-50/50 dark:ring-indigo-950/20">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
