import { useCallback, useEffect, useState } from 'react';

import { useOffline } from './useOffline';

export const useServiceWorker = () => {
  const { isOnline } = useOffline();
  const [swRegistered, setSwRegistered] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(() => setSwRegistered(true))
        .catch(() => setSwRegistered(false));
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsInstallable(false);
    return result.outcome === 'accepted';
  }, [deferredPrompt]);

  const dismissInstall = useCallback(() => {
    setDeferredPrompt(null);
    setIsInstallable(false);
  }, []);

  return {
    isOnline,
    swRegistered,
    isInstallable,
    promptInstall,
    dismissInstall,
  };
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
