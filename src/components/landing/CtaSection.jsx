import React from 'react';
import { ArrowRight, Bot, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-6">
              <Bot className="w-3.5 h-3.5" />
              <span>Modern Workplace Copilot</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Transform your team's workflow with PulseAI today
            </h2>

            <p className="mt-4 text-base sm:text-lg text-indigo-100/80 max-w-xl mx-auto">
              Explore the complete dashboard experience with AI assistant, real-time directory filtering, and interactive analytics.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard/chat" className="w-full sm:w-auto">
                <Button variant="white" size="lg" className="w-full sm:w-auto font-bold shadow-xl">
                  Open Assistant Dashboard <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-indigo-700/50 flex flex-wrap justify-center items-center gap-6 text-xs text-indigo-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant policy & HR answers
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Complete employee directory
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Live organizational metrics
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
