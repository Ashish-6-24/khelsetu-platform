import { FormationBuilder } from '@features/formation/components/FormationBuilder';
import { useFormation } from '@features/formation/hooks/useFormation';
import { matchService } from '@features/tournaments/services/tournament';
import { Card, CardBody } from '@shared/ui/Card';
import { ErrorState } from '@shared/ui/ErrorState';
import { Skeleton } from '@shared/ui/Skeleton';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

const DEMO_BENCH = [
  {
    playerId: 'b1',
    playerName: 'Rai Sub',
    jerseyNumber: 13,
    position: 'CM' as const,
    status: 'substitute' as const,
  },
  {
    playerId: 'b2',
    playerName: 'Tamang Res',
    jerseyNumber: 14,
    position: 'CB' as const,
    status: 'reserve' as const,
  },
  {
    playerId: 'b3',
    playerName: 'Gurung Res',
    jerseyNumber: 15,
    position: 'LW' as const,
    status: 'reserve' as const,
  },
  {
    playerId: 'b4',
    playerName: 'Magar Inj',
    jerseyNumber: 16,
    position: 'ST' as const,
    status: 'injured' as const,
  },
  {
    playerId: 'b5',
    playerName: 'Sharma Sus',
    jerseyNumber: 17,
    position: 'RB' as const,
    status: 'suspended' as const,
  },
];

export const FormationPage = () => {
  const { matchId } = useParams<{ matchId: string }>();

  const {
    data: match,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => matchService.getById(matchId!),
    enabled: !!matchId,
  });

  const {
    formationType,
    players,
    bench,
    drawings,
    selectedPlayerId,
    setBench,
    setSelectedPlayerId,
    applyFormation,
    movePlayer,
    addDrawing,
    clearDrawings,
    saveFormation,
    resetFormation,
  } = useFormation(matchId);

  const handleApplyFormation = (type: Parameters<typeof applyFormation>[0]) => {
    applyFormation(type);
    setBench(DEMO_BENCH);
  };

  const handleSave = () => {
    saveFormation();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="h-[500px] w-full rounded-2xl" />
          </div>
          <Skeleton className="h-[500px] w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load match"
        message="Could not fetch match data. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Team Formation
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {match
              ? `${match.teamA.name} vs ${match.teamB.name}`
              : 'Match Formation Builder'}
          </p>
        </div>
      </div>

      <FormationBuilder
        formationType={formationType}
        players={players}
        bench={bench}
        drawings={drawings}
        selectedPlayerId={selectedPlayerId}
        onFormationChange={handleApplyFormation}
        onPlayerSelect={setSelectedPlayerId}
        onPlayerDragEnd={movePlayer}
        onAddDrawing={addDrawing}
        onClearDrawings={clearDrawings}
        onSave={handleSave}
        onReset={resetFormation}
      />

      <Card glass>
        <CardBody>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            How to use
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>• Select a formation template above to arrange players</li>
            <li>• Drag players on the pitch to fine-tune positions</li>
            <li>
              • Use the tactical drawing tools to sketch plays and movements
            </li>
            <li>• Click a player to select/deselect</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};
