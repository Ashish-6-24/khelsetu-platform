import { SkipLink } from '@features/accessibility';
import { Footer } from '@shared/components/navigation/Footer';
import { Navbar } from '@shared/components/navigation/Navbar';
import { useUIStore } from '@store/uiStore';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  const forceLightMode = useUIStore((s) => s.forceLightMode);

  forceLightMode();

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
