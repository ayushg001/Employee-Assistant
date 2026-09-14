import React, { useState } from 'react';
import { Bot, Heart, Mail, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'warning' | 'error', text: '' }

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.trim()) return;

    setFeedback(null);
    setLoading(true);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback({
          type: 'success',
          text: data.message || 'Subscribed successfully!',
        });
        setEmail('');
      } else {
        if (data.message === 'You are already subscribed') {
          setFeedback({
            type: 'warning',
            text: 'You are already subscribed',
          });
        } else {
          setFeedback({
            type: 'error',
            text: data.message || 'Subscription failed. Please try again.',
          });
        }
      }
    } catch (_err) {
      setFeedback({
        type: 'error',
        text: 'Network error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
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

          {/* Application links */}
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

          {/* Company links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="/#features" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Features
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Admin Panel
                </Link>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-600 cursor-not-allowed">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Newsletter
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Subscribe for product updates and organizational AI insights.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (feedback) setFeedback(null);
                  }}
                  required
                  className="w-full pl-9 pr-20 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {loading ? '...' : 'Join'}
                </button>
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`p-2 rounded-lg text-[11px] flex items-center gap-1.5 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : feedback.type === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                  }`}
                >
                  {feedback.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                  {feedback.type === 'warning' && <Info className="w-3.5 h-3.5 shrink-0" />}
                  {feedback.type === 'error' && <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
                  <span>{feedback.text}</span>
                </div>
              )}
            </form>
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
