import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, ShieldCheck } from 'lucide-react';
import ProfileForm from '../components/settings/ProfileForm';
import ThemeToggle from '../components/settings/ThemeToggle';
import NotificationPreferences from '../components/settings/NotificationPreferences';

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sliders className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Profile & Workspace Settings</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your employee details, appearance theme, and alert frequencies.
        </p>
      </div>

      <ProfileForm />
      <ThemeToggle />
      <NotificationPreferences />

      <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center gap-3 text-xs text-indigo-900 dark:text-indigo-200">
        <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
        <p>
          <strong>Local Storage:</strong> Your profile settings, theme preferences, and notification options are saved directly in your local browser storage.
        </p>
      </div>
    </motion.div>
  );
}
