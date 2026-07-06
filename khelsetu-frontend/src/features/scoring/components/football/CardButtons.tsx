import type { FootballEvent } from '@shared/types/scoring';
import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';

import { useState } from 'react';

interface CardButtonsProps {
  teamAPlayers: { id: string; name: string }[];
  teamBPlayers: { id: string; name: string }[];
  onCard: (event: Omit<FootballEvent, 'id' | 'timestamp'>) => void;
  teamAId: string;
  teamBId: string;
}

export const CardButtons = ({
  teamAPlayers,
  teamBPlayers,
  onCard,
  teamAId,
  teamBId,
}: CardButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<'teamA' | 'teamB'>('teamA');
  const [playerId, setPlayerId] = useState('');
  const [cardType, setCardType] = useState<
    'yellow_card' | 'red_card' | 'second_yellow'
  >('yellow_card');

  const players = selectedTeam === 'teamA' ? teamAPlayers : teamBPlayers;
  const teamId = selectedTeam === 'teamA' ? teamAId : teamBId;
  const teamName = selectedTeam === 'teamA' ? 'Team A' : 'Team B';

  const player = players.find((p) => p.id === playerId);

  const handleSubmit = () => {
    if (!player) return;

    onCard({
      matchId: '',
      minute: 0,
      period: 'first_half',
      type: cardType,
      teamId,
      teamName,
      playerId: player.id,
      playerName: player.name,
    });

    setIsOpen(false);
    setPlayerId('');
    setCardType('yellow_card');
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="h-12 bg-yellow-50 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300 font-semibold"
          onClick={() => {
            setCardType('yellow_card');
            setIsOpen(true);
          }}
        >
          🟨 Yellow
        </Button>
        <Button
          variant="outline"
          className="h-12 bg-red-50 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 font-semibold"
          onClick={() => {
            setCardType('red_card');
            setIsOpen(true);
          }}
        >
          🟥 Red
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Record Card"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={selectedTeam === 'teamA' ? 'primary' : 'outline'}
              onClick={() => {
                setSelectedTeam('teamA');
                setPlayerId('');
              }}
            >
              Team A
            </Button>
            <Button
              variant={selectedTeam === 'teamB' ? 'primary' : 'outline'}
              onClick={() => {
                setSelectedTeam('teamB');
                setPlayerId('');
              }}
            >
              Team B
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={cardType === 'yellow_card' ? 'primary' : 'outline'}
              onClick={() => setCardType('yellow_card')}
            >
              Yellow
            </Button>
            <Button
              variant={cardType === 'red_card' ? 'primary' : 'outline'}
              onClick={() => setCardType('red_card')}
            >
              Red
            </Button>
            <Button
              variant={cardType === 'second_yellow' ? 'primary' : 'outline'}
              onClick={() => setCardType('second_yellow')}
            >
              2nd Yellow
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Player *
            </label>
            <select
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
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
              disabled={!playerId}
              className="flex-1"
              aria-label="Record card"
            >
              Record Card
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
