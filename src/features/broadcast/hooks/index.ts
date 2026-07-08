import { useBroadcastStore } from '@features/broadcast/store';
import type { Overlay, OverlayType } from '@features/broadcast/types';
import { secureRandom } from '@shared/utils/crypto-random';

import { useCallback, useEffect, useRef } from 'react';

export const useBroadcast = () => {
  const {
    stream,
    overlays,
    isLive,
    viewers,
    startStream,
    stopStream,
    addOverlay,
    removeOverlay,
    toggleOverlay,
    updateOverlayPosition,
    setViewers,
    resetBroadcast,
  } = useBroadcastStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isLive) {
      intervalRef.current = setInterval(() => {
        const newViewers = secureRandom(50) + viewers;
        setViewers(newViewers);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLive, viewers, setViewers]);

  const getOverlayByType = useCallback(
    (type: OverlayType): Overlay | undefined => {
      return overlays.find((o) => o.type === type);
    },
    [overlays],
  );

  const visibleOverlays = overlays.filter((o) => o.visible);

  return {
    stream,
    overlays,
    visibleOverlays,
    isLive,
    viewers,
    startStream,
    stopStream,
    addOverlay,
    removeOverlay,
    toggleOverlay,
    updateOverlayPosition,
    getOverlayByType,
    resetBroadcast,
  };
};
