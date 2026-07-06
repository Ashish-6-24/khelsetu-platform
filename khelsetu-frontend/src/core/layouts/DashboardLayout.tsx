import { SkipLink } from '@features/accessibility';
import { Header } from '@shared/ui/navigation/Header';
import { MobileDrawer } from '@shared/ui/navigation/MobileDrawer';
import { MobileTabBar } from '@shared/ui/navigation/MobileTabBar';
import { Sidebar } from '@shared/ui/navigation/Sidebar';
import { useUIStore } from '@state/uiStore';

import { useEffect } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const MobileDrawerWrapper = () => {
  const isOpen = useUIStore((s) => s.isMobileMenuOpen);
  const setOpen = useUIStore((s) => s.setMobileMenuOpen);
  return <MobileDrawer open={isOpen} onClose={() => setOpen(false)} />;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const sidebarState = useUIStore((s) => s.sidebarState);
  const sidebarWidth = sidebarState === 'collapsed' ? 'lg:pl-20' : 'lg:pl-64';
  const allowDarkMode = useUIStore((s) => s.allowDarkMode);

  useEffect(() => {
    allowDarkMode();
  }, [allowDarkMode]);

  return (
    <div className="min-h-screen bg-[var(--bg-app)]">
      <SkipLink />
      <Sidebar />
      <MobileDrawerWrapper />
      <div className={sidebarWidth}>
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
