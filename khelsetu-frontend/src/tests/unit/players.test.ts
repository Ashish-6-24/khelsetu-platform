import { describe, expect, it } from 'vitest';

import { z } from 'zod';

const playerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  jerseyNumber: z.string().optional(),
  position: z.string().optional(),
});

describe('Player Form Validation', () => {
  describe('Player Schema', () => {
    it('should validate valid player data', () => {
      const result = playerSchema.safeParse({
        name: 'John Doe',
        jerseyNumber: '10',
        position: 'Batsman',
      });
      expect(result.success).toBe(true);
    });

    it('should reject name shorter than 2 characters', () => {
      const result = playerSchema.safeParse({ name: 'J' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]!.message).toBe('Name must be at least 2 characters');
      }
    });

    it('should reject name longer than 50 characters', () => {
      const result = playerSchema.safeParse({ name: 'A'.repeat(51) });
      expect(result.success).toBe(false);
    });

    it('should accept optional jersey number', () => {
      const result = playerSchema.safeParse({ name: 'John Doe' });
      expect(result.success).toBe(true);
    });

    it('should accept optional position', () => {
      const result = playerSchema.safeParse({ name: 'John Doe', position: 'Bowler' });
      expect(result.success).toBe(true);
    });

    it('should accept empty jersey number', () => {
      const result = playerSchema.safeParse({ name: 'John Doe', jerseyNumber: '' });
      expect(result.success).toBe(true);
    });

    it('should accept string jersey number', () => {
      const result = playerSchema.safeParse({ name: 'John Doe', jerseyNumber: '42' });
      expect(result.success).toBe(true);
    });
  });
});
