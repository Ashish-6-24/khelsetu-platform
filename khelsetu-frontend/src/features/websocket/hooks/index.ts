export { useSocket } from '@features/websocket/useSocket';
export const useWebSocket = () => {
  return {
    isConnected: false,
    messages: [],
    send: (_event: string, _data: unknown) => {},
  };
};
