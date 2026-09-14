import React from 'react';
import { SUGGESTED_PROMPTS } from '../../data/suggestedPrompts';
import { Calendar, Users, Receipt, FileText, Heart, Laptop, ArrowRight } from 'lucide-react';

const ICON_MAP = {
  Calendar,
  Users,
  Receipt,
  FileText,
  Heart,
  Laptop
};

export default function SuggestedPrompts({ onSelectPrompt }) {
  return (
    <div className="py-2">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
        <span>Suggested questions for the assistant:</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {SUGGESTED_PROMPTS.map((item) => {
          const Icon = ICON_MAP[item.icon] || FileText;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group text-left p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-850 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <Icon className="w-3 h-3" />
                  {item.category}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
                {item.prompt}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
