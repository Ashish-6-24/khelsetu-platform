import { Header } from '@components/navigation/Header';
import { MobileDrawer } from '@components/navigation/MobileDrawer';
import { MobileTabBar } from '@components/navigation/MobileTabBar';
import { Sidebar } from '@components/navigation/Sidebar';
import { SkipLink } from '@features/accessibility';
import { useUIStore } from '@store/uiStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const MobileDrawerWrapper = () => {
  const isOpen = useUIStore((s) => s.isMobileMenuOpen);
  const setOpen = useUIStore((s) => s.setMobileMenuOpen);
  return <MobileDrawer open={isOpen} onClose={() => setOpen(false)} />;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[var(--bg-app)]">
      <SkipLink />
      <Sidebar />
      <MobileDrawerWrapper />
      <div className="lg:pl-64">
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 pb-24 lg:pb-8"
        >
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
        <MobileTabBar />
      </div>
    </div>
  );
};
