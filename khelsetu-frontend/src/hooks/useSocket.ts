import { logger } from '@lib/logger';
import { wsService } from '@services/websocket';
import { useScoringStore } from '@store/scoringStore';
import type { WebSocketEvent } from '@types-domain/websocket';

import { useCallback, useEffect, useState } from 'react';

export const useSocket = (events: WebSocketEvent[] = []) => {
  const setScoring = useScoringStore((state) => state.setScoring);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await wsService.connect();
        if (mounted) {
          setIsConnected(true);
        }
      } catch (error) {
        logger.error('Failed to connect WebSocket:', error);
      }
    };

    void init();

    return () => {
      mounted = false;
      wsService.disconnect();
      setIsConnected(false);
    };
  }, []);

  useEffect(() => {
    const handleScoreUpdate = (_data: unknown) => {
      setScoring(true);
    };

    events.forEach((event) => {
      if (event === 'score_update') {
        wsService.on(event, handleScoreUpdate);
      }
    });

    return () => {
      events.forEach((event) => {
        if (event === 'score_update') {
          wsService.off(event, handleScoreUpdate);
        }
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
