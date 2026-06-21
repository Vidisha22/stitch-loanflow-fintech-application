import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ProgressBar } from './ProgressBar';
import { useApplicationStore } from '../store/useApplicationStore';

interface WizardLayoutProps {
  children: ReactNode;
  showProgress?: boolean;
  showFeatures?: boolean;
}

export function WizardLayout({ children, showProgress = true, showFeatures = false }: WizardLayoutProps) {
  const currentStep = useApplicationStore((state) => state.currentStep);

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center py-xl px-gutter max-w-[1280px] mx-auto w-full">
        {showProgress && <ProgressBar currentStep={currentStep} />}
        {children}
        {showFeatures && (
          <div className="mt-lg w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="p-sm bg-white rounded-lg border border-outline-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-secondary">speed</span>
              <span className="font-label-sm text-label-sm">5-min completion</span>
            </div>
            <div className="p-sm bg-white rounded-lg border border-outline-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-secondary">security</span>
              <span className="font-label-sm text-label-sm">Privacy guaranteed</span>
            </div>
            <div className="p-sm bg-white rounded-lg border border-outline-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-secondary">support_agent</span>
              <span className="font-label-sm text-label-sm">24/7 Expert help</span>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}