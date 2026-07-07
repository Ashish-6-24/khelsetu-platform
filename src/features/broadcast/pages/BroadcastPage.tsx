import { OverlayControl, StreamControl } from '@features/broadcast/components';
import { useBroadcast } from '@features/broadcast/hooks';
import type { OverlayType } from '@features/broadcast/types';
import { Card, CardBody } from '@shared/ui/Card';

export const LiveBroadcastPage = () => {
  const {
    stream,
    overlays,
    isLive,
    viewers,
    startStream,
    stopStream,
    addOverlay,
    removeOverlay,
    toggleOverlay,
    resetBroadcast,
  } = useBroadcast();

  const handleAddOverlay = (type: OverlayType) => {
    addOverlay(type, { text: 'KhelSetu Live' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
          Live Broadcast
        </h1>
        <p className="text-[var(--text-tertiary)] dark:text-[var(--text-muted)] mt-1">
          Manage live streams, overlays, and broadcast settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreamControl
          isLive={isLive}
          viewers={viewers}
          streamKey={stream?.streamKey}
          onStart={startStream}
          onStop={stopStream}
        />

        <Card>
          <CardBody>
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
                Preview
              </h2>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                {isLive ? (
                  <>
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                    <div className="absolute top-4 right-4 text-white text-xs">
                      {viewers.toLocaleString()} viewers
                    </div>
                    {overlays
                      .filter((o) => o.visible)
                      .map((overlay) => (
                        <div
                          key={overlay.id}
                          className={`absolute bg-black/70 text-white px-3 py-1 rounded text-sm ${
                            overlay.position === 'top'
                              ? 'top-12 left-1/2 -translate-x-1/2'
                              : overlay.position === 'bottom'
                                ? 'bottom-4 left-4'
                                : overlay.position === 'left'
                                  ? 'left-4 top-1/2 -translate-y-1/2'
                                  : overlay.position === 'right'
                                    ? 'right-4 top-1/2 -translate-y-1/2'
                                    : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                          }`}
                        >
                          {overlay.type}
                        </div>
                      ))}
                    <p className="text-[var(--text-muted)]">Stream Preview</p>
                  </>
                ) : (
                  <p className="text-[var(--text-tertiary)]">
                    Stream is offline
                  </p>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <OverlayControl
        overlays={overlays}
        onAdd={handleAddOverlay}
        onRemove={removeOverlay}
        onToggle={toggleOverlay}
      />

      {isLive && (
        <div className="flex justify-end">
          <button
            onClick={resetBroadcast}
            className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            Reset Broadcast
          </button>
        </div>
      )}
    </div>
  );
};
