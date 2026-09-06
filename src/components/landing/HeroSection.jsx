import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Users, Zap, BarChart3 } from 'lucide-react';
import Button from '../common/Button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6"
        >
          <Zap className="w-3.5 h-3.5 text-indigo-500" />
          <span>Workplace Copilot & Directory</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 max-w-4xl mx-auto leading-tight"
        >
          Empower your workforce with an{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            AI-driven copilot
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Instant answers to HR policies, quick employee directory lookup, and clear organizational metrics in one unified dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/dashboard/chat" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-indigo-500/25">
              Launch AI Assistant <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link to="/dashboard/directory" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Directory
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm shadow-xs">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">1.4s</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Avg AI Response</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm shadow-xs">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto mb-2">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">100%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Team Coverage</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm shadow-xs">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 mx-auto mb-2">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">7 Depts</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Integrated Metrics</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm shadow-xs">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">Local First</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Fast & Responsive</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
