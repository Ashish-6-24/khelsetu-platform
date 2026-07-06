import type {
  CricketBatsmanScore,
  CricketWicketType,
} from '@shared/types/scoring';
import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';
import { clsx } from 'clsx';

import { useState } from 'react';

const WICKET_TYPES: { value: CricketWicketType; label: string }[] = [
  { value: 'bowled', label: 'Bowled' },
  { value: 'caught', label: 'Caught' },
  { value: 'lbw', label: 'LBW' },
  { value: 'run-out', label: 'Run Out' },
  { value: 'stumped', label: 'Stumped' },
  { value: 'hit-wicket', label: 'Hit Wicket' },
];

interface WicketModalProps {
  isOpen: boolean;
  batsmen: CricketBatsmanScore[];
  currentStrikerId: string;
  onConfirm: (
    wicketType: CricketWicketType,
    dismissedPlayerId: string,
    newBatsmanId?: string,
  ) => void;
  onCancel: () => void;
}

export const WicketModal = ({
  isOpen,
  batsmen,
  currentStrikerId,
  onConfirm,
  onCancel,
}: WicketModalProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [wicketType, setWicketType] = useState<CricketWicketType | null>(null);
  const [dismissedPlayerId, setDismissedPlayerId] =
    useState<string>(currentStrikerId);
  const [newBatsmanId, setNewBatsmanId] = useState<string>('');

  const handleWicketTypeSelect = (type: CricketWicketType) => {
    setWicketType(type);
    setStep(2);
  };

  const handleDismissedPlayerSelect = (playerId: string) => {
    setDismissedPlayerId(playerId);
    setStep(3);
  };

  const handleConfirm = () => {
    if (wicketType && dismissedPlayerId) {
      onConfirm(wicketType, dismissedPlayerId, newBatsmanId || undefined);
      setStep(1);
      setWicketType(null);
      setDismissedPlayerId(currentStrikerId);
      setNewBatsmanId('');
    }
  };

  const handleCancel = () => {
    setStep(1);
    setWicketType(null);
    setDismissedPlayerId(currentStrikerId);
    setNewBatsmanId('');
    onCancel();
  };

  const availableBatsmen = batsmen.filter(
    (b) => !b.isOut && b.playerId !== currentStrikerId,
  );

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Wicket">
      <div className="space-y-4">
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Select Wicket Type
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {WICKET_TYPES.map(({ value, label }) => (
                <Button
                  key={value}
                  variant="outline"
                  className="h-12 text-sm font-medium"
                  onClick={() => handleWicketTypeSelect(value)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Who is out?
            </h3>
            <div className="space-y-2">
              {batsmen
                .filter((b) => !b.isOut)
                .map((batsman) => (
                  <Button
                    key={batsman.playerId}
                    variant="outline"
                    className={clsx(
                      'w-full h-12 text-left justify-start',
                      dismissedPlayerId === batsman.playerId &&
                        'bg-blue-50 border-blue-500 dark:bg-blue-900/20',
                    )}
                    onClick={() =>
                      handleDismissedPlayerSelect(batsman.playerId)
                    }
                  >
                    <span className="font-medium">{batsman.playerName}</span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      ({batsman.runs} runs)
                    </span>
                  </Button>
                ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              New Batsman (optional)
            </h3>
            {availableBatsmen.length > 0 ? (
              <div className="space-y-2">
                {availableBatsmen.map((batsman) => (
                  <Button
                    key={batsman.playerId}
                    variant="outline"
                    className={clsx(
                      'w-full h-12 text-left justify-start',
                      newBatsmanId === batsman.playerId &&
                        'bg-blue-50 border-blue-500 dark:bg-blue-900/20',
                    )}
                    onClick={() => setNewBatsmanId(batsman.playerId)}
                  >
                    <span className="font-medium">{batsman.playerName}</span>
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No available batsmen. Select manually later.
              </p>
            )}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button variant="create" onClick={handleConfirm}>
                Confirm Wicket
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
