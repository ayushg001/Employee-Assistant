import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProfile } from '../../context/ProfileContext';

export default function Topbar({ onOpenSidebar }) {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { profile } = useProfile();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard/chat':
        return 'AI Assistant';
      case '/dashboard/directory':
        return 'Employee Directory';
      case '/dashboard/analytics':
        return 'Analytics Dashboard';
      case '/dashboard/settings':
        return 'Profile Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <Link
          to="/dashboard/settings"
          className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800"
        >
          <img
            src={profile.avatar}
            alt={profile.fullName}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
        </Link>
      </div>
    </header>
  );
}
