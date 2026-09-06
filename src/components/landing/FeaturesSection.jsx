import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Users, 
  BarChart3, 
  Moon, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import Card from '../common/Card';

export default function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: 'AI Workplace Assistant',
      description: 'Answers questions regarding HR policies, leave balances, and company guidelines with quick, helpful responses.',
      color: 'indigo',
    },
    {
      icon: Users,
      title: 'Employee Directory',
      description: 'Search colleagues by name, position, or department with instant filtering and clear contact cards.',
      color: 'violet',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track department headcounts, team status breakdowns, and key organization metrics in real time.',
      color: 'emerald',
    },
    {
      icon: Moon,
      title: 'Dark & Light Modes',
      description: 'Comfortable theme switching with system detection and persistent preference storage.',
      color: 'amber',
    },
    {
      icon: Zap,
      title: 'Fast & Responsive',
      description: 'Built for speed with smooth transitions, instant filter updates, and mobile-friendly layouts.',
      color: 'rose',
    },
    {
      icon: ShieldCheck,
      title: 'Local Persistence',
      description: 'Settings, theme preferences, and conversation history stay safely stored on your device.',
      color: 'cyan',
    },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'indigo':
        return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400';
      case 'violet':
        return 'bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400';
      case 'amber':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400';
      case 'rose':
        return 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400';
      case 'cyan':
        return 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400';
      default:
        return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400';
    }
  };

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Core Capabilities
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Everything your team needs in one unified dashboard
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Designed to help teams collaborate, look up teammates, and get quick answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card hover className="h-full flex flex-col p-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${getColorClasses(feature.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
