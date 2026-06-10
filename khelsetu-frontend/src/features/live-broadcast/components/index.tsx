import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card, CardBody, CardHeader } from '@components/ui/Card';
import type { OverlayType } from '@features/live-broadcast/types';
import {
  Circle,
  Eye,
  Layers,
  Monitor,
  Plus,
  Trash2,
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
              <Circle className="w-4 h-4 text-gray-400" />
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
                variant="primary"
                className="w-full"
                onClick={() => onStart('match-1')}
              >
                <Video className="w-4 h-4 mr-2" />
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
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Overlays
          </h3>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {overlayTypes.map((type) => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => onAdd(type)}
                className="capitalize"
              >
                <Plus className="w-4 h-4 mr-1" />
                {type}
              </Button>
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
