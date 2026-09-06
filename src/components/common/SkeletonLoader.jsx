import React from 'react';

export default function SkeletonLoader({ type = 'line', count = 1, className = '' }) {
  const baseAnimation = 'animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg';

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 flex flex-col gap-4 animate-pulse"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
            </div>
            <div className="flex gap-2 pt-1">
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chat') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="space-y-2 max-w-md">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48" />
            <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl w-72" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'metric') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 animate-pulse space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-24" />
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded w-16" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'circle') {
    return <div className={`w-10 h-10 rounded-full ${baseAnimation} ${className}`} />;
  }

  return (
    <div className="space-y-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`h-4 ${baseAnimation} ${className}`} />
      ))}
    </div>
  );
}
