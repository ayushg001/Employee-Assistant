import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

export default function AssistantDemoSection() {
  const [activeTab, setActiveTab] = useState(0);

  const demoScenarios = [
    {
      tab: 'Leave Policy',
      query: 'What is our Paid Time Off (PTO) policy and how do I request leave?',
      response: `You receive **24 days of annual paid leave** and 12 sick days per year.

To request leave:
1. Submit your dates on the internal portal.
2. Your manager (*Aarav Sharma*) will review and approve.
3. For questions, contact **Ananya Iyer** in HR.`,
    },
    {
      tab: 'Directory Lookup',
      query: 'Who leads our Design team and what is their contact email?',
      response: `**Priya Patel** is our Lead UI/UX Designer.

* **Department:** Design
* **Email:** priya.patel@company.com
* **Role:** Lead UI/UX Designer`,
    },
    {
      tab: 'Expense Rules',
      query: 'What is our monthly work from home allowance policy?',
      response: `Full-time employees can claim up to **₹3,500/month** for broadband and mobile expenses.

Submit your receipts by the 25th of each month for reimbursement in the next payroll cycle.`,
    }
  ];

  return (
    <section id="assistant-demo" className="py-16 bg-slate-100/50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Meet Your AI Workplace Assistant
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Ask questions about company guidelines, leave balances, and team contacts in plain English.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {demoScenarios.map((scenario, index) => (
              <button
                key={scenario.tab}
                onClick={() => setActiveTab(index)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === index
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700'
                }`}
              >
                {scenario.tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                PulseAI Assistant Preview
              </span>
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Ready
            </span>
          </div>

          <div className="p-5 space-y-4 min-h-[220px]">
            <motion.div
              key={`user-${activeTab}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start justify-end gap-2.5"
            >
              <div className="bg-indigo-600 text-white text-xs sm:text-sm rounded-2xl rounded-tr-xs px-4 py-2.5 max-w-sm">
                {demoScenarios[activeTab].query}
              </div>
              <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
            </motion.div>

            <motion.div
              key={`bot-${activeTab}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-2.5"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm rounded-2xl rounded-tl-xs px-4 py-3 max-w-md whitespace-pre-line leading-relaxed">
                {demoScenarios[activeTab].response}
              </div>
            </motion.div>
          </div>

          <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Try asking your own questions in real time.
            </span>
            <Link to="/dashboard/chat">
              <Button size="sm">
                Open Chat <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
