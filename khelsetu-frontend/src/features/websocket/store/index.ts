import { create } from 'zustand';

interface WebSocketState {
  isConnected: boolean;
  lastMessage: Record<string, unknown> | null;
  messageCount: number;
  setConnected: (connected: boolean) => void;
  addMessage: (message: Record<string, unknown>) => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  isConnected: false,
  lastMessage: null,
  messageCount: 0,
  setConnected: (connected) => set({ isConnected: connected }),
  addMessage: (message) =>
    set((state) => ({
      lastMessage: message,
      messageCount: state.messageCount + 1,
    })),
}));
