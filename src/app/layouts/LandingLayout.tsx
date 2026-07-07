import { SkipLink } from '@features/accessibility';
import { Footer } from '@shared/ui/navigation/Footer';
import { Navbar } from '@shared/ui/navigation/Navbar';
import { useUIStore } from '@state/uiStore';

import { useEffect } from 'react';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  const forceLightMode = useUIStore((s) => s.forceLightMode);

  useEffect(() => {
    forceLightMode();
  }, [forceLightMode]);

  return (
    <div className="min-h-screen bg-[var(--bg-app)]">
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
