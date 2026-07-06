import type { OverlayType } from '@features/broadcast/types';
import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Card, CardBody, CardHeader } from '@shared/ui/Card';
import {
  Circle,
  Eye,
  Layers,
  Maximize2,
  Megaphone,
  Monitor,
  PanelBottom,
  Plus,
  Trash2,
  Trophy,
  Video,
  VideoOff,
} from 'lucide-react';

interface StreamControlProps {
  isLive: boolean;
  viewers: number;
  streamKey?: string;
  onStart: (matchId: string) => void;
  onStop: () => void;
}

export const StreamControl = ({
  isLive,
  viewers,
  streamKey,
  onStart,
  onStop,
}: StreamControlProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isLive ? (
              <Circle className="w-4 h-4 text-red-500 animate-pulse" />
            ) : (
              <Circle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            )}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {isLive ? 'Live Stream' : 'Stream Offline'}
            </h3>
          </div>
          <Badge variant={isLive ? 'error' : 'default'}>
            {isLive ? 'LIVE' : 'OFFLINE'}
          </Badge>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Eye className="w-4 h-4" />
            <span>{viewers.toLocaleString()} viewers</span>
          </div>

          {streamKey && (
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
              <span className="text-gray-500 dark:text-gray-400">
                Stream Key:
              </span>
              <p className="text-gray-900 dark:text-white mt-1">{streamKey}</p>
            </div>
          )}

          <div className="flex gap-2">
            {!isLive ? (
              <Button
                variant="live"
                size="lg"
                className="w-full"
                leftIcon={<Video className="h-4 w-4" />}
                onClick={() => onStart('match-1')}
              >
                Go Live
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400"
                onClick={onStop}
              >
                <VideoOff className="w-4 h-4 mr-2" />
                End Stream
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

interface OverlayControlProps {
  overlays: { id: string; type: OverlayType; visible: boolean }[];
  onAdd: (type: OverlayType) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

const overlayIcons: Record<OverlayType, React.ReactNode> = {
  scoreboard: <Trophy className="w-5 h-5" />,
  'lower-third': <PanelBottom className="w-5 h-5" />,
  'full-screen': <Maximize2 className="w-5 h-5" />,
  ticker: <Megaphone className="w-5 h-5" />,
};

export const OverlayControl = ({
  overlays,
  onAdd,
  onRemove,
  onToggle,
}: OverlayControlProps) => {
  const overlayTypes: OverlayType[] = [
    'scoreboard',
    'lower-third',
    'full-screen',
    'ticker',
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[var(--brand-primary)] dark:text-[var(--brand-primary)]" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Overlays
          </h3>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Add Overlay
            </span>
          </div>
          <div className="space-y-2">
            {overlayTypes.map((type) => (
              <button
                key={type}
                onClick={() => onAdd(type)}
                className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-sunken)] border border-[var(--border-subtle)] hover:bg-[var(--brand-primary-soft)] hover:border-[var(--brand-primary)]/30 hover:shadow-[0_0_20px_-4px_rgba(127,29,29,0.2)] active:bg-[#FEE2E2] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out cursor-pointer dark:bg-[var(--bg-surface)] dark:border-white/[0.06] dark:hover:bg-[var(--bg-surface-raised)] dark:hover:border-[var(--brand-primary)]/30 dark:hover:shadow-[0_0_20px_-4px_rgba(127,29,29,0.2)] dark:active:bg-[var(--bg-canvas)]"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)]/20 group-hover:text-[var(--brand-primary-hover)] dark:bg-[var(--brand-primary)]/10 dark:text-[var(--brand-primary)] dark:group-hover:bg-[var(--brand-primary)]/20 dark:group-hover:text-white transition-all duration-200">
                  {overlayIcons[type]}
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)] capitalize dark:text-[var(--text-primary)]">
                  {type.replace('-', ' ')}
                </span>
                <Plus className="w-4 h-4 ml-auto text-[var(--text-tertiary)] group-hover:text-[var(--brand-primary)] dark:text-[var(--text-tertiary)] dark:group-hover:text-[var(--brand-primary)] transition-colors duration-200" />
              </button>
            ))}
          </div>

          {overlays.length > 0 && (
            <div className="space-y-2">
              {overlays.map((overlay) => (
                <div
                  key={overlay.id}
                  className="flex items-center justify-between p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    <span className="text-sm capitalize text-gray-700 dark:text-gray-300">
                      {overlay.type}
                    </span>
                    <Badge variant={overlay.visible ? 'success' : 'default'}>
                      {overlay.visible ? 'On' : 'Off'}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggle(overlay.id)}
                    >
                      {overlay.visible ? 'Hide' : 'Show'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(overlay.id)}
                      className="text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
