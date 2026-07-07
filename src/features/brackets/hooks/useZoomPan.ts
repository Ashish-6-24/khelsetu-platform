import { useCallback, useRef, useState } from 'react';

interface UseZoomPanOptions {
  minScale?: number;
  maxScale?: number;
  step?: number;
}

interface UseZoomPanReturn {
  scale: number;
  translateX: number;
  translateY: number;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  handlers: {
    onWheel: (e: React.WheelEvent) => void;
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

export function useZoomPan(options?: UseZoomPanOptions): UseZoomPanReturn {
  const { minScale = 0.25, maxScale = 3, step = 0.15 } = options ?? {};

  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const isPanning = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const lastTouchDist = useRef(0);

  const clamp = useCallback(
    (v: number) => Math.min(maxScale, Math.max(minScale, v)),
    [minScale, maxScale],
  );

  const zoomIn = useCallback(() => {
    setScale((s) => clamp(s + step));
  }, [clamp, step]);

  const zoomOut = useCallback(() => {
    setScale((s) => clamp(s - step));
  }, [clamp, step]);

  const reset = useCallback(() => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  }, []);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -step : step;
      setScale((s) => clamp(s + delta));
    },
    [clamp, step],
  );

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isPanning.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    setTranslateX((t) => t + dx);
    setTranslateY((t) => t + dy);
  }, []);

  const onPointerUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const getTouchDist = useCallback((touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const t0 = touches[0]!;
    const t1 = touches[1]!;
    const dx = t0.clientX - t1.clientX;
    const dy = t0.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        isPanning.current = true;
        const t = e.touches[0]!;
        lastPointer.current = {
          x: t.clientX,
          y: t.clientY,
        };
      } else if (e.touches.length === 2) {
        lastTouchDist.current = getTouchDist(e.touches);
      }
    },
    [getTouchDist],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1 && isPanning.current) {
        const t = e.touches[0]!;
        const dx = t.clientX - lastPointer.current.x;
        const dy = t.clientY - lastPointer.current.y;
        lastPointer.current = {
          x: t.clientX,
          y: t.clientY,
        };
        setTranslateX((t) => t + dx);
        setTranslateY((t) => t + dy);
      } else if (e.touches.length === 2) {
        const dist = getTouchDist(e.touches);
        const delta = (dist - lastTouchDist.current) * 0.005;
        lastTouchDist.current = dist;
        setScale((s) => clamp(s + delta));
      }
    },
    [clamp, getTouchDist],
  );

  const onTouchEnd = useCallback(() => {
    isPanning.current = false;
  }, []);

  return {
    scale,
    translateX,
    translateY,
    zoomIn,
    zoomOut,
    reset,
    handlers: {
      onWheel,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
