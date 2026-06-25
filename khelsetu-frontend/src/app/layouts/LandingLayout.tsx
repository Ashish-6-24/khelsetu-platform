import { Footer } from '@components/navigation/Footer';
import { Navbar } from '@components/navigation/Navbar';
import { SkipLink } from '@features/accessibility';
import { useEffect } from 'react';
import { useUIStore } from '@store/uiStore';

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
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
};
