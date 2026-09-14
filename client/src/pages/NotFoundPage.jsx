import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto ring-8 ring-indigo-50/50 dark:ring-indigo-950/20">
          <Bot className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-1">
            Page Not Found
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            The page or workspace tab you are trying to visit does not exist or has been moved.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link to="/dashboard/chat">
            <Button size="sm">Go to Assistant</Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
