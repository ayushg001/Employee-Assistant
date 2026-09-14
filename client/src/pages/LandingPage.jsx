import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import AssistantDemoSection from '../components/landing/AssistantDemoSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CtaSection from '../components/landing/CtaSection';
import QuoteModal from '../components/quote/QuoteModal';

export default function LandingPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main className="flex-1">
        <HeroSection onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
        <AssistantDemoSection />
        <FeaturesSection />
        <CtaSection />
      </main>

      <Footer />

      {/* Get a Free Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
