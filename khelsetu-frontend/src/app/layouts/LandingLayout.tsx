import { Footer } from '@components/navigation/Footer';
import { Navbar } from '@components/navigation/Navbar';
import { SkipLink } from '@features/accessibility';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="min-h-screen bg-[var(--bg-app)]">
      <SkipLink />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
};
