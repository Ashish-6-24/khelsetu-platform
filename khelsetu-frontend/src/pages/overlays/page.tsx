import { BroadcastScoreOverlay } from '@features/overlays/components';

export const OverlaysPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Broadcast Overlays
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          OBS and streaming overlays
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Score Overlay
        </h2>
        <BroadcastScoreOverlay
          teamA={{ name: 'Team A', score: 150, wickets: 3, overs: '18.4' }}
          teamB={{ name: 'Team B', score: 145, wickets: 5, overs: '20' }}
          status="live"
          runRate={8.03}
        />
      </div>
    </div>
  );
};
