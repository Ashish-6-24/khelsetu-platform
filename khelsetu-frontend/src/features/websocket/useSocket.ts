import { wsService } from '@lib/websocket-client';
import type { WebSocketEvent } from '@shared/types/websocket';
import { useScoringStore } from '@store/scoringStore';

import { useCallback, useEffect, useRef, useState } from 'react';

export const useSocket = (events: WebSocketEvent[] = []) => {
  const setScoring = useScoringStore((state) => state.setScoring);
  const [isConnected, setIsConnected] = useState(false);
  const isConnectedRef = useRef(false);

  useEffect(() => {
    const handleConnect = () => {
      isConnectedRef.current = true;
      setIsConnected(true);
    };
    const handleDisconnect = () => {
      isConnectedRef.current = false;
      setIsConnected(false);
    };

    wsService.on('connect', handleConnect);
    wsService.on('disconnect', handleDisconnect);

    const connected = wsService.isConnected();
    if (connected !== isConnectedRef.current) {
      isConnectedRef.current = connected;
      setIsConnected(connected);
    }

    return () => {
      wsService.off('connect', handleConnect);
      wsService.off('disconnect', handleDisconnect);
    };
  }, []);

  useEffect(() => {
    const handlers = new Map<WebSocketEvent, (data: unknown) => void>();

    events.forEach((event) => {
      const handler =
        event === 'score_update'
          ? (_data: unknown) => {
              setScoring(true);
            }
          : (_data: unknown) => {
              // Events are forwarded via wsService listeners
            };
      handlers.set(event, handler);
      wsService.on(event, handler);
    });

    return () => {
      handlers.forEach((handler, event) => {
        wsService.off(event, handler);
      });
    };
  }, [events, setScoring]);

  const connect = useCallback(async () => {
    await wsService.connect();
    setIsConnected(true);
  }, []);

  const disconnect = useCallback(() => {
    wsService.disconnect();
    setIsConnected(false);
  }, []);

  return {
    isConnected,
    connect,
    disconnect,
    send: wsService.send.bind(wsService),
    subscribeToMatch: wsService.subscribeToMatch.bind(wsService),
    unsubscribeFromMatch: wsService.unsubscribeFromMatch.bind(wsService),
  };
};
