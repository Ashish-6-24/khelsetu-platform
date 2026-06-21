import { clsx } from 'clsx';
import { motion } from 'framer-motion';

import type { FormationPlayer } from '../types/index';
import { POSITION_COLORS } from '../utils/formations';

interface DraggablePlayerProps {
  player: FormationPlayer;
  isSelected: boolean;
  onSelect: (playerId: string) => void;
  onDragEnd: (playerId: string, x: number, y: number) => void;
}

export const DraggablePlayer = ({
  player,
  isSelected,
  onSelect,
  onDragEnd,
}: DraggablePlayerProps) => {
  const color = POSITION_COLORS[player.position] ?? '#6b7280';

  const handleDragEnd = (
    _: unknown,
    info: { point: { x: number; y: number } },
  ) => {
    const pitchEl = (info.point as unknown as HTMLElement).closest?.(
      '[data-pitch]',
    ) as HTMLElement | null;
    if (!pitchEl) return;

    const rect = pitchEl.getBoundingClientRect();
    const x = ((info.point.x - rect.left) / rect.width) * 100;
    const y = ((info.point.y - rect.top) / rect.height) * 100;

    onDragEnd(
      player.playerId,
      Math.max(0, Math.min(100, x)),
      Math.max(0, Math.min(100, y)),
    );
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onClick={() => onSelect(player.playerId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(player.playerId);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${player.playerName}, ${player.position}${player.isCaptain ? ', Captain' : ''}, jersey ${player.jerseyNumber}`}
      className={clsx(
        'absolute z-10 flex cursor-grab flex-col items-center',
        'active:cursor-grabbing',
        'select-none touch-none',
      )}
      style={{
        left: `${player.x}%`,
        top: `${player.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      whileTap={{ scale: 1.1 }}
    >
      <div
        className={clsx(
          'relative flex h-10 w-10 items-center justify-center rounded-full',
          'text-xs font-bold text-white shadow-lg transition-all duration-200',
          'sm:h-11 sm:w-11',
          isSelected && 'ring-3 ring-white ring-offset-2 ring-offset-green-700',
        )}
        style={{ backgroundColor: color }}
      >
        {player.isCaptain && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-black">
            C
          </span>
        )}
        {player.jerseyNumber}
      </div>
      <span className="mt-0.5 max-w-[70px] truncate rounded bg-black/50 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
        {player.playerName}
      </span>
    </motion.div>
  );
};
