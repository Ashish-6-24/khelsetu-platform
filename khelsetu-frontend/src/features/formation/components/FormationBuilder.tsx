import { Button } from '@components/ui/Button';
import { Card, CardBody } from '@components/ui/Card';

import type {
  BenchPlayer,
  FormationPlayer,
  FormationType,
  TacticalDrawing,
} from '../types/index';
import { DraggablePlayer } from './DraggablePlayer';
import { FootballPitch } from './FootballPitch';
import { FormationSelector } from './FormationSelector';
import { PlayerBench } from './PlayerBench';
import { TacticalBoard } from './TacticalBoard';

interface FormationBuilderProps {
  formationType: FormationType;
  players: FormationPlayer[];
  bench: BenchPlayer[];
  drawings: TacticalDrawing[];
  selectedPlayerId: string | null;
  onFormationChange: (type: FormationType) => void;
  onPlayerSelect: (playerId: string) => void;
  onPlayerDragEnd: (playerId: string, x: number, y: number) => void;
  onAddDrawing: (drawing: Omit<TacticalDrawing, 'id'>) => void;
  onClearDrawings: () => void;
  onSave: () => void;
  onReset: () => void;
}

export const FormationBuilder = ({
  formationType,
  players,
  bench,
  drawings,
  selectedPlayerId,
  onFormationChange,
  onPlayerSelect,
  onPlayerDragEnd,
  onAddDrawing,
  onClearDrawings,
  onSave,
  onReset,
}: FormationBuilderProps) => {
  return (
    <div className="space-y-6">
      <Card glass>
        <CardBody padding="sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Formation Builder
              </h2>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                Drag players to adjust positions. Use tactical tools to draw
                plays.
              </p>
            </div>
            <FormationSelector
              value={formationType}
              onChange={onFormationChange}
            />
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card elevated>
            <CardBody padding="none">
              <div className="relative" data-pitch>
                <FootballPitch>
                  {players.map((player) => (
                    <DraggablePlayer
                      key={player.playerId}
                      player={player}
                      isSelected={selectedPlayerId === player.playerId}
                      onSelect={onPlayerSelect}
                      onDragEnd={onPlayerDragEnd}
                    />
                  ))}
                </FootballPitch>

                <TacticalBoard
                  drawings={drawings}
                  onAddDrawing={onAddDrawing}
                  onClearDrawings={onClearDrawings}
                />
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-4">
          <PlayerBench players={bench} />

          <div className="flex gap-3">
            <Button variant="primary" onClick={onSave} className="flex-1">
              Save Formation
            </Button>
            <Button variant="outline" onClick={onReset} className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
