import { env } from '@lib/env';
import { logger } from '@lib/logger';
import type { WebSocketEvent } from '@shared/types/websocket';
import { Socket, io } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private listeners: Map<WebSocketEvent, Set<(data: unknown) => void>> =
    new Map();

  connect(accessToken?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve();
        return;
      }

      this.socket = io(env.wsUrl, {
        transports: ['websocket', 'polling'],
        auth: accessToken ? { token: accessToken } : undefined,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 30000,
        reconnectionAttempts: this.maxReconnectAttempts,
        timeout: 10000,
      });

      this.socket.on('connect', () => {
        logger.info('WebSocket connected');
        this.reconnectAttempts = 0;
        this.emit('connect', null);
        resolve();
      });

      this.socket.on('disconnect', (reason) => {
        logger.warn('WebSocket disconnected:', reason);
        this.emit('disconnect', reason);
      });

      this.socket.on('connect_error', (error) => {
        logger.error('WebSocket connection error:', error);
        this.reconnectAttempts++;

        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          reject(error);
        }
      });

      this.socket.onAny((event: string, data: unknown) => {
        if (this.isValidEvent(event)) {
          this.emit(event as WebSocketEvent, data);
        }
      });
    });
  }

  private isValidEvent(event: string): boolean {
    const knownEvents: WebSocketEvent[] = [
      'connect', 'disconnect', 'score_update', 'match_start', 'match_end',
      'tournament_update', 'standings_update', 'notification',
      'user_join', 'user_leave', 'error',
    ];
    return (knownEvents as string[]).includes(event);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      logger.info('WebSocket disconnected by user');
    }
  }

  on(event: WebSocketEvent, callback: (data: unknown) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
  }

  off(event: WebSocketEvent, callback: (data: unknown) => void): void {
    this.listeners.get(event)?.delete(callback);
  }

  emit(event: WebSocketEvent, data: unknown): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => cb(data));
    }
  }

  send(event: string, data: unknown): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      logger.warn('Cannot send message: WebSocket not connected');
    }
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  subscribeToMatch(matchId: string): void {
    this.send('join_match', { matchId });
  }

  unsubscribeFromMatch(matchId: string): void {
    this.send('leave_match', { matchId });
  }
}

export const wsService = new WebSocketService();
