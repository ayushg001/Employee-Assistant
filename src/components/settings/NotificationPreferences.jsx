import React from 'react';
import { Bell, Mail, Bot, Users, Volume2 } from 'lucide-react';
import Card from '../common/Card';
import { useProfile } from '../../context/ProfileContext';

export default function NotificationPreferences() {
  const { notifications, updateNotification } = useProfile();

  const settingsList = [
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive email confirmations for leave requests and HR inquiry tickets',
      icon: Mail,
    },
    {
      key: 'assistantDailySummary',
      title: 'Daily Assistant Digest',
      description: 'Receive a morning briefing with meeting agendas and important company notices',
      icon: Bot,
    },
    {
      key: 'directoryUpdates',
      title: 'Directory & Team Alerts',
      description: 'Get notified when new colleagues join or change departments',
      icon: Users,
    },
    {
      key: 'soundEffects',
      title: 'Subtle Sound Effects',
      description: 'Play a light chime when the assistant completes a response',
      icon: Volume2,
    },
    {
      key: 'desktopAlerts',
      title: 'Desktop Push Notifications',
      description: 'Show browser notifications for urgent company-wide announcements',
      icon: Bell,
    },
  ];

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Notification Preferences
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Control how and when PulseAI alerts you
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {settingsList.map((item) => {
          const Icon = item.icon;
          const isEnabled = !!notifications[item.key];

          return (
            <div
              key={item.key}
              className="py-3.5 flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={isEnabled}
                onClick={() => updateNotification(item.key, !isEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  isEnabled ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
