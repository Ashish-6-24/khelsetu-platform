import { Footer } from '@components/navigation/Footer';
import { Navbar } from '@components/navigation/Navbar';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
