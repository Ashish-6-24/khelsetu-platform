import type { ConnectionStatus } from '@features/websocket/useSocket';
import { Badge } from '@shared/ui/Badge';

interface ConnectionStatusIndicatorProps {
  status: ConnectionStatus;
  reconnectAttempts?: number;
  maxReconnectAttempts?: number;
  className?: string;
}

const config: Record<
  ConnectionStatus,
  { variant: 'success' | 'warning' | 'error'; label: string; pulse?: boolean }
> = {
  connected: { variant: 'success', label: 'Connected' },
  reconnecting: { variant: 'warning', label: 'Reconnecting', pulse: true },
  disconnected: { variant: 'error', label: 'Disconnected' },
};

export const ConnectionStatusIndicator = ({
  status,
  reconnectAttempts,
  maxReconnectAttempts,
  className,
}: ConnectionStatusIndicatorProps) => {
  const { variant, label, pulse } = config[status];

  return (
    <div className={className}>
      <Badge variant={variant} pulse={pulse}>
        {label}
        {status === 'reconnecting' &&
          reconnectAttempts !== undefined &&
          maxReconnectAttempts !== undefined && (
            <span className="ml-1 text-xs opacity-70">
              ({reconnectAttempts}/{maxReconnectAttempts})
            </span>
          )}
      </Badge>
    </div>
  );
};
