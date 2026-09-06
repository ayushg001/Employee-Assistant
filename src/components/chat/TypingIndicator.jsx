import React from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0, opacity: 0.4 },
    animate: { y: -4, opacity: 1 },
  };

  return (
    <div className="flex items-start gap-3 py-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shrink-0 shadow-xs">
        <Bot className="w-4 h-4 animate-pulse" />
      </div>

      <div className="bg-white dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs">
        <div className="flex items-center gap-1.5 h-5">
          <motion.span
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.4, delay: 0 }}
            className="w-2 h-2 rounded-full bg-indigo-500"
          />
          <motion.span
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.4, delay: 0.15 }}
            className="w-2 h-2 rounded-full bg-indigo-500"
          />
          <motion.span
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.4, delay: 0.3 }}
            className="w-2 h-2 rounded-full bg-indigo-500"
          />
          <span className="text-xs text-slate-400 dark:text-slate-500 ml-2 font-medium">
            PulseAI is generating a response...
          </span>
        </div>
      </div>
    </div>
  );
}
