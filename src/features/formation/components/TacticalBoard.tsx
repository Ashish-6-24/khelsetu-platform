import { clsx } from 'clsx';

import { useState } from 'react';

import type { TacticalDrawing } from '../types/index';
import { TACTICAL_COLORS } from '../utils/formations';

interface TacticalBoardProps {
  drawings: TacticalDrawing[];
  onAddDrawing: (drawing: Omit<TacticalDrawing, 'id'>) => void;
  onClearDrawings: () => void;
}

const TOOL_TYPES = [
  { type: 'arrow' as const, label: 'Arrow', icon: '→' },
  { type: 'movement' as const, label: 'Movement', icon: '⤴' },
  { type: 'passing' as const, label: 'Passing', icon: '⋯' },
  { type: 'defensive' as const, label: 'Defensive', icon: '◁' },
  { type: 'attacking' as const, label: 'Attacking', icon: '▷' },
];

export const TacticalBoard = ({
  drawings,
  onAddDrawing,
  onClearDrawings,
}: TacticalBoardProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] =
    useState<TacticalDrawing['type']>('arrow');
  const [activeColor, setActiveColor] = useState('#ffffff');
  const [currentPoints, setCurrentPoints] = useState<
    Array<{ x: number; y: number }>
  >([]);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCurrentPoints([{ x, y }]);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing || currentPoints.length === 0) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCurrentPoints((prev) => [...prev.slice(0, -1), { x, y }]);
  };

  const handlePointerUp = () => {
    if (!isDrawing || currentPoints.length < 2) {
      setCurrentPoints([]);
      return;
    }
    onAddDrawing({
      type: activeTool,
      points: currentPoints,
      color: activeColor,
    });
    setCurrentPoints([]);
  };

  const buildPath = (points: Array<{ x: number; y: number }>) => {
    if (points.length < 2) return '';
    const first = points[0]!;
    let d = `M ${first.x} ${first.y}`;
    for (let i = 1; i < points.length; i++) {
      const p = points[i]!;
      d += ` L ${p.x} ${p.y}`;
    }
    return d;
  };

  return (
    <div className="absolute bottom-3 left-3 right-3 z-20">
      <div className="flex flex-wrap items-center gap-2 rounded-xl bg-[var(--bg-surface)]/90 px-3 py-2 shadow-lg backdrop-blur-xl dark:bg-[var(--bg-surface)]/90">
        <button
          onClick={() => setIsDrawing(!isDrawing)}
          aria-pressed={isDrawing}
          className={clsx(
            'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
            isDrawing
              ? 'bg-gradient-to-r from-[var(--brand-primary-bg)] to-[var(--brand-primary-bg-hover)] text-white'
              : 'bg-[var(--bg-surface-sunken)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)] dark:text-[var(--text-secondary)] dark:hover:bg-[var(--bg-surface-3)]',
          )}
        >
          {isDrawing ? 'Drawing ON' : 'Draw'}
        </button>

        {isDrawing && (
          <>
            <div className="h-5 w-px bg-[var(--border-strong)] dark:bg-[var(--bg-surface-3)]" />

            <div className="flex gap-1">
              {TOOL_TYPES.map((tool) => (
                <button
                  key={tool.type}
                  onClick={() => setActiveTool(tool.type)}
                  aria-label={tool.label}
                  aria-pressed={activeTool === tool.type}
                  className={clsx(
                    'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-sm transition-all',
                    activeTool === tool.type
                      ? 'bg-[var(--brand-primary-bg)] text-white'
                      : 'bg-[var(--bg-surface-sunken)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)] dark:text-[var(--text-tertiary)] dark:hover:bg-[var(--bg-surface-3)]',
                  )}
                >
                  {tool.icon}
                </button>
              ))}
            </div>

            <div className="h-5 w-px bg-[var(--border-strong)] dark:bg-[var(--bg-surface-3)]" />

            <div className="flex gap-1">
              {TACTICAL_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setActiveColor(color)}
                  aria-label={`Color: ${color}`}
                  aria-pressed={activeColor === color}
                  className={clsx(
                    'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-all',
                    activeColor === color
                      ? 'bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-3)]'
                      : 'hover:bg-[var(--bg-surface-sunken)] dark:hover:bg-[var(--bg-surface-raised)]',
                  )}
                >
                  <span
                    className={clsx(
                      'h-5 w-5 rounded-full border-2',
                      activeColor === color
                        ? 'border-[var(--bg-inverse)] scale-110 dark:border-white'
                        : 'border-[var(--border-strong)] dark:border-[var(--border-strong)]',
                    )}
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>

            <div className="h-5 w-px bg-[var(--border-strong)] dark:bg-[var(--bg-surface-3)]" />

            <button
              onClick={onClearDrawings}
              aria-label="Clear all drawings"
              className="rounded-lg bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 transition-all hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
            >
              Clear
            </button>
          </>
        )}

        {drawings.length > 0 && (
          <span className="ml-auto text-[11px] text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            {drawings.length} drawing{drawings.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {isDrawing && (
        <svg
          className="pointer-events-auto absolute inset-0 h-full w-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {drawings.map((drawing) => (
            <path
              key={drawing.id}
              d={buildPath(drawing.points)}
              fill="none"
              stroke={drawing.color}
              strokeWidth="2"
              strokeDasharray={
                drawing.type === 'passing'
                  ? '6 4'
                  : drawing.type === 'defensive'
                    ? '4 4'
                    : 'none'
              }
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          ))}

          {currentPoints.length >= 2 && (
            <path
              d={buildPath(currentPoints)}
              fill="none"
              stroke={activeColor}
              strokeWidth="2"
              strokeDasharray={
                activeTool === 'passing'
                  ? '6 4'
                  : activeTool === 'defensive'
                    ? '4 4'
                    : 'none'
              }
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
          )}
        </svg>
      )}
    </div>
  );
};
