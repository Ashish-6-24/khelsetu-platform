import { secureRandomId } from '@shared/utils/crypto-random';

import { useCallback, useState } from 'react';

import type {
  BenchPlayer,
  FormationPlayer,
  FormationType,
  Position,
  TacticalDrawing,
} from '../types/index';
import { FORMATION_TEMPLATES } from '../utils/formations';

const generateId = () => secureRandomId(8);

export function useFormation(initialMatchId?: string) {
  const [formationType, setFormationType] = useState<FormationType>('4-3-3');
  const [players, setPlayers] = useState<FormationPlayer[]>([]);
  const [bench, setBench] = useState<BenchPlayer[]>([]);
  const [drawings, setDrawings] = useState<TacticalDrawing[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const applyFormation = useCallback(
    (type: FormationType) => {
      setFormationType(type);
      const template = FORMATION_TEMPLATES.find((t) => t.type === type);
      if (!template) return;

      const newPlayers: FormationPlayer[] = template.positions.map((pos, i) => {
        const existing = players[i];
        return {
          playerId: existing?.playerId ?? generateId(),
          playerName: existing?.playerName ?? `Player ${i + 1}`,
          jerseyNumber: existing?.jerseyNumber ?? i + 1,
          position: pos.position,
          x: pos.x,
          y: pos.y,
          isCaptain: existing?.isCaptain ?? false,
        };
      });

      setPlayers(newPlayers);
    },
    [players],
  );

  const movePlayer = useCallback((playerId: string, x: number, y: number) => {
    setPlayers((prev) =>
      prev.map((p) => (p.playerId === playerId ? { ...p, x, y } : p)),
    );
  }, []);

  const changePlayerPosition = useCallback(
    (playerId: string, position: Position) => {
      setPlayers((prev) =>
        prev.map((p) => (p.playerId === playerId ? { ...p, position } : p)),
      );
    },
    [],
  );

  const substitute = useCallback(
    (pitchPlayerId: string, benchPlayerId: string) => {
      const pitchPlayer = players.find((p) => p.playerId === pitchPlayerId);
      const benchPlayer = bench.find((b) => b.playerId === benchPlayerId);
      if (!pitchPlayer || !benchPlayer) return;

      setPlayers((prev) =>
        prev.map((p) =>
          p.playerId === pitchPlayerId
            ? {
                ...p,
                playerName: benchPlayer.playerName,
                jerseyNumber: benchPlayer.jerseyNumber,
                position: benchPlayer.position,
              }
            : p,
        ),
      );

      setBench((prev) =>
        prev.map((b) =>
          b.playerId === benchPlayerId
            ? {
                ...b,
                playerName: pitchPlayer.playerName,
                jerseyNumber: pitchPlayer.jerseyNumber,
                position: pitchPlayer.position,
              }
            : b,
        ),
      );
    },
    [players, bench],
  );

  const addDrawing = useCallback((drawing: Omit<TacticalDrawing, 'id'>) => {
    setDrawings((prev) => [...prev, { ...drawing, id: generateId() }]);
  }, []);

  const removeDrawing = useCallback((drawingId: string) => {
    setDrawings((prev) => prev.filter((d) => d.id !== drawingId));
  }, []);

  const clearDrawings = useCallback(() => {
    setDrawings([]);
  }, []);

  const saveFormation = useCallback(() => {
    return {
      matchId: initialMatchId,
      formationType,
      players,
      bench,
      drawings,
      updatedAt: new Date().toISOString(),
    };
  }, [formationType, players, bench, drawings, initialMatchId]);

  const resetFormation = useCallback(() => {
    applyFormation(formationType);
    setBench([]);
    setDrawings([]);
    setSelectedPlayerId(null);
  }, [formationType, applyFormation]);

  return {
    formationType,
    setFormationType,
    players,
    setPlayers,
    bench,
    setBench,
    drawings,
    setDrawings,
    selectedPlayerId,
    setSelectedPlayerId,
    applyFormation,
    movePlayer,
    changePlayerPosition,
    substitute,
    addDrawing,
    removeDrawing,
    clearDrawings,
    saveFormation,
    resetFormation,
  };
}
