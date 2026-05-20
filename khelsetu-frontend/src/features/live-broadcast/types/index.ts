export type BroadcastStatus = 'offline' | 'live' | 'ending' | 'reconnecting';
export type OverlayType = 'scoreboard' | 'lower-third' | 'full-screen' | 'ticker';

export interface BroadcastStream {
  id: string;
  matchId: string;
  status: BroadcastStatus;
  streamKey: string;
  rtmpUrl: string;
  viewers: number;
  startedAt?: string;
  duration: number;
}

export interface Overlay {
  id: string;
  type: OverlayType;
  visible: boolean;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  content: Record<string, unknown>;
  animation?: 'fade' | 'slide' | 'none';
}

export interface BroadcastState {
  stream: BroadcastStream | null;
  overlays: Overlay[];
  isLive: boolean;
  viewers: number;
}

export const OVERLAY_PRESETS: Record<OverlayType, Partial<Overlay>> = {
  scoreboard: { position: 'top', animation: 'slide' },
  'lower-third': { position: 'bottom', animation: 'slide' },
  'full-screen': { position: 'center', animation: 'fade' },
  ticker: { position: 'bottom', animation: 'none' },
};
