import type { BroadcastStream, Overlay, OverlayType } from '@features/live-broadcast/types';
import { OVERLAY_PRESETS } from '@features/live-broadcast/types';
import { create } from 'zustand';

interface BroadcastState {
  stream: BroadcastStream | null;
  overlays: Overlay[];
  isLive: boolean;
  viewers: number;
  setStream: (stream: BroadcastStream | null) => void;
  startStream: (matchId: string) => void;
  stopStream: () => void;
  addOverlay: (type: OverlayType, content: Record<string, unknown>) => void;
  removeOverlay: (id: string) => void;
  toggleOverlay: (id: string) => void;
  updateOverlayPosition: (id: string, position: Overlay['position']) => void;
  setViewers: (viewers: number) => void;
  resetBroadcast: () => void;
}

export const useBroadcastStore = create<BroadcastState>((set) => ({
  stream: null,
  overlays: [],
  isLive: false,
  viewers: 0,

  setStream: (stream) => set({ stream }),
  startStream: (matchId) =>
    set({
      stream: {
        id: `stream-${Date.now()}`,
        matchId,
        status: 'live',
        streamKey: `sk_${Math.random().toString(36).slice(2, 10)}`,
        rtmpUrl: 'rtmp://live.khelsetu.com/live/',
        viewers: 0,
        startedAt: new Date().toISOString(),
        duration: 0,
      },
      isLive: true,
    }),
  stopStream: () =>
    set((state) => ({
      stream: state.stream ? { ...state.stream, status: 'offline' } : null,
      isLive: false,
    })),
  addOverlay: (type, content) =>
    set((state) => {
      const preset = OVERLAY_PRESETS[type];
      const overlay: Overlay = {
        id: `overlay-${Date.now()}`,
        type,
        visible: true,
        position: preset.position ?? 'center',
        content,
        animation: preset.animation ?? 'none',
      };
      return { overlays: [...state.overlays, overlay] };
    }),
  removeOverlay: (id) =>
    set((state) => ({
      overlays: state.overlays.filter((o) => o.id !== id),
    })),
  toggleOverlay: (id) =>
    set((state) => ({
      overlays: state.overlays.map((o) =>
        o.id === id ? { ...o, visible: !o.visible } : o,
      ),
    })),
  updateOverlayPosition: (id, position) =>
    set((state) => ({
      overlays: state.overlays.map((o) =>
        o.id === id ? { ...o, position } : o,
      ),
    })),
  setViewers: (viewers) => set({ viewers }),
  resetBroadcast: () => set({ stream: null, overlays: [], isLive: false, viewers: 0 }),
}));
