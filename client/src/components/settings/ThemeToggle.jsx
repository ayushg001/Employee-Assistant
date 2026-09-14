import React from 'react';
import { Sun, Moon, Check } from 'lucide-react';
import Card from '../common/Card';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setExplicitTheme } = useTheme();

  const themes = [
    {
      id: 'light',
      label: 'Light Mode',
      description: 'Clean, high-contrast light theme for bright environments',
      icon: Sun,
      previewBg: 'bg-slate-100 border-slate-300',
      previewCard: 'bg-white text-slate-800'
    },
    {
      id: 'dark',
      label: 'Dark Mode',
      description: 'Sleek dark theme optimized for low-light focus',
      icon: Moon,
      previewBg: 'bg-slate-950 border-slate-800',
      previewCard: 'bg-slate-900 text-slate-100'
    }
  ];

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Appearance & Theme
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Select your preferred visual interface mode
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {themes.map((item) => {
          const Icon = item.icon;
          const isSelected = theme === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setExplicitTheme(item.id)}
              className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
              )}

              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {item.label}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {item.description}
              </p>

              <div className={`w-full h-12 rounded-xl p-2 flex items-center gap-2 border ${item.previewBg}`}>
                <div className={`h-full flex-1 rounded-lg p-1.5 flex items-center gap-1.5 shadow-xs ${item.previewCard}`}>
                  <div className="w-4 h-4 rounded-full bg-indigo-500 shrink-0"></div>
                  <div className="w-12 h-2 rounded bg-slate-300 dark:bg-slate-700"></div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
