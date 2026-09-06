import React from 'react';
import { Bot, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                PulseAI
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Workplace assistant and organizational dashboard designed for modern team collaboration.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/dashboard/chat" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/dashboard/directory" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Employee Directory
                </Link>
              </li>
              <li>
                <Link to="/dashboard/analytics" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Profile Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Features
                </a>
              </li>
              <li>
                <a href="#assistant-demo" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Preview Demo
                </a>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-600 cursor-not-allowed">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-600 cursor-not-allowed">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} PulseAI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for productive teams.
          </p>
        </div>
      </div>
    </footer>
  );
}
