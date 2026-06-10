import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Modal } from '@components/ui/Modal';
import type { FootballEvent } from '@types-domain/scoring';

import { useState } from 'react';

interface GoalButtonProps {
  teamAPlayers: { id: string; name: string }[];
  teamBPlayers: { id: string; name: string }[];
  onGoal: (event: Omit<FootballEvent, 'id' | 'timestamp'>) => void;
  teamAId: string;
  teamBId: string;
}

export const GoalButton = ({
  teamAPlayers,
  teamBPlayers,
  onGoal,
  teamAId,
  teamBId,
}: GoalButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<'teamA' | 'teamB'>('teamA');
  const [scorerId, setScorerId] = useState('');
  const [assistId, setAssistId] = useState('');
  const [isOwnGoal, setIsOwnGoal] = useState(false);

  const players = selectedTeam === 'teamA' ? teamAPlayers : teamBPlayers;
  const teamId = selectedTeam === 'teamA' ? teamAId : teamBId;
  const teamName = selectedTeam === 'teamA' ? 'Team A' : 'Team B';

  const scorer = players.find((p) => p.id === scorerId);
  const assist = players.find((p) => p.id === assistId);

  const handleSubmit = () => {
    if (!scorer) return;

    onGoal({
      matchId: '',
      minute: 0,
      period: 'first_half',
      type: isOwnGoal ? 'own_goal' : 'goal',
      teamId,
      teamName,
      playerId: scorer.id,
      playerName: scorer.name,
      assistPlayerId: assist?.id,
      assistPlayerName: assist?.name,
    });

    setIsOpen(false);
    setScorerId('');
    setAssistId('');
    setIsOwnGoal(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="h-14 bg-green-50 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 font-bold text-lg"
        onClick={() => setIsOpen(true)}
      >
        ⚽ Goal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Record Goal"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={selectedTeam === 'teamA' ? 'primary' : 'outline'}
              onClick={() => {
                setSelectedTeam('teamA');
                setScorerId('');
                setAssistId('');
              }}
            >
              Team A
            </Button>
            <Button
              variant={selectedTeam === 'teamB' ? 'primary' : 'outline'}
              onClick={() => {
                setSelectedTeam('teamB');
                setScorerId('');
                setAssistId('');
              }}
            >
              Team B
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="own-goal"
              checked={isOwnGoal}
              onChange={(e) => setIsOwnGoal(e.target.checked)}
              className="rounded"
            />
            <label
              htmlFor="own-goal"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Own Goal
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Scorer *
            </label>
            <select
              value={scorerId}
              onChange={(e) => setScorerId(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select player</option>
              {players.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Assist (optional)"
            value={assistId}
            onChange={(e) => setAssistId(e.target.value)}
          />

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!scorerId}
              className="flex-1"
            >
              Record Goal
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
