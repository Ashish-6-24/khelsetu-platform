import { useOffline } from '@shared/hooks/useOffline';
import { AnimatePresence, motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';

export const OfflineBanner = () => {
  const { isOnline } = useOffline();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          key="offline-banner"
          role="status"
          aria-live="polite"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-amber-500 px-4 py-2 text-center text-sm font-medium text-white shadow-lg dark:bg-amber-600"
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ x: [0, -3, 3, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <WifiOff className="h-4 w-4" />
            </motion.div>
            <span>You are offline. Some features may be limited.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
