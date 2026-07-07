import {
  FORMATION_TEMPLATES,
  POSITION_COLORS,
  POSITION_LABELS,
  getFormationByType,
} from '@features/formation/utils/formations';
import {
  clampPosition,
  getPositionLabel,
  snapToGrid,
} from '@features/formation/utils/pitchPositions';
import { describe, expect, it } from 'vitest';

describe('Formation Utils', () => {
  describe('FORMATION_TEMPLATES', () => {
    it('should contain at least one formation template', () => {
      expect(FORMATION_TEMPLATES.length).toBeGreaterThan(0);
    });

    it('should have correct structure for each template', () => {
      FORMATION_TEMPLATES.forEach((template) => {
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('type');
        expect(template).toHaveProperty('positions');
        expect(template.positions.length).toBeGreaterThan(0);
      });
    });

    it('should include 4-3-3 formation', () => {
      const template = FORMATION_TEMPLATES.find((t) => t.type === '4-3-3');
      expect(template).toBeDefined();
      expect(template?.positions.length).toBe(11);
    });
  });

  describe('getFormationByType', () => {
    it('should return correct formation for valid type', () => {
      const formation = getFormationByType('4-3-3');
      expect(formation).toBeDefined();
      expect(formation?.type).toBe('4-3-3');
    });

    it('should return undefined for invalid type', () => {
      const formation = getFormationByType('invalid');
      expect(formation).toBeUndefined();
    });
  });

  describe('POSITION_COLORS', () => {
    it('should have color for each position', () => {
      const positions = [
        'GK',
        'LB',
        'RB',
        'CB',
        'LWB',
        'RWB',
        'CDM',
        'CM',
        'CAM',
        'LW',
        'RW',
        'ST',
      ];
      positions.forEach((pos) => {
        expect(POSITION_COLORS).toHaveProperty(pos);
      });
    });
  });

  describe('POSITION_LABELS', () => {
    it('should have label for each position', () => {
      const positions = [
        'GK',
        'LB',
        'RB',
        'CB',
        'LWB',
        'RWB',
        'CDM',
        'CM',
        'CAM',
        'LW',
        'RW',
        'ST',
      ];
      positions.forEach((pos) => {
        expect(POSITION_LABELS).toHaveProperty(pos);
      });
    });
  });
});

describe('Pitch Positions', () => {
  describe('snapToGrid', () => {
    it('should snap to nearest grid point', () => {
      expect(snapToGrid(12, 13)).toEqual({ x: 10, y: 15 });
      expect(snapToGrid(7, 8)).toEqual({ x: 5, y: 10 });
    });

    it('should use default grid size of 5', () => {
      expect(snapToGrid(3, 3)).toEqual({ x: 5, y: 5 });
      expect(snapToGrid(2, 2)).toEqual({ x: 0, y: 0 });
    });

    it('should accept custom grid size', () => {
      expect(snapToGrid(12, 13, 10)).toEqual({ x: 10, y: 10 });
    });
  });

  describe('clampPosition', () => {
    it('should clamp values to 0-100 range', () => {
      expect(clampPosition(-10, 110)).toEqual({ x: 0, y: 100 });
      expect(clampPosition(50, 50)).toEqual({ x: 50, y: 50 });
    });

    it('should handle edge cases', () => {
      expect(clampPosition(0, 0)).toEqual({ x: 0, y: 0 });
      expect(clampPosition(100, 100)).toEqual({ x: 100, y: 100 });
    });
  });

  describe('getPositionLabel', () => {
    it('should return correct label for position', () => {
      expect(getPositionLabel('GK')).toBe('GK');
      expect(getPositionLabel('ST')).toBe('ST');
    });

    it('should handle unknown position', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(getPositionLabel('UNKNOWN' as any)).toBe('UNKNOWN');
    });
  });
});
