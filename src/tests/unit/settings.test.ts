import { describe, expect, it } from 'vitest';
import { z } from 'zod';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{7,15}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

describe('Settings Form Validation', () => {
  describe('Profile Schema', () => {
    it('should validate valid profile data', () => {
      const result = profileSchema.safeParse({
        name: 'John Doe',
        phone: '+1234567890',
      });
      expect(result.success).toBe(true);
    });

    it('should reject name shorter than 2 characters', () => {
      const result = profileSchema.safeParse({ name: 'J' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]!.message).toBe(
          'Name must be at least 2 characters',
        );
      }
    });

    it('should reject name longer than 50 characters', () => {
      const result = profileSchema.safeParse({ name: 'A'.repeat(51) });
      expect(result.success).toBe(false);
    });

    it('should accept optional phone', () => {
      const result = profileSchema.safeParse({ name: 'John Doe' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid phone number', () => {
      const result = profileSchema.safeParse({
        name: 'John Doe',
        phone: 'abc',
      });
      expect(result.success).toBe(false);
    });

    it('should accept valid phone formats', () => {
      const validPhones = [
        '+1234567890',
        '123-456-7890',
        '1234567890',
        '+977 9841234567',
      ];
      validPhones.forEach((phone) => {
        const result = profileSchema.safeParse({ name: 'John Doe', phone });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Password Schema', () => {
    it('should validate matching passwords', () => {
      const result = passwordSchema.safeParse({
        currentPassword: 'oldpass123',
        newPassword: 'newpass123',
        confirmPassword: 'newpass123',
      });
      expect(result.success).toBe(true);
    });

    it('should reject passwords shorter than 8 characters', () => {
      const result = passwordSchema.safeParse({
        currentPassword: 'oldpass123',
        newPassword: 'short',
        confirmPassword: 'short',
      });
      expect(result.success).toBe(false);
    });

    it('should reject mismatched passwords', () => {
      const result = passwordSchema.safeParse({
        currentPassword: 'oldpass123',
        newPassword: 'newpass123',
        confirmPassword: 'different',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some(
            (e: { message: string }) => e.message === 'Passwords do not match',
          ),
        ).toBe(true);
      }
    });

    it('should require current password', () => {
      const result = passwordSchema.safeParse({
        currentPassword: '',
        newPassword: 'newpass123',
        confirmPassword: 'newpass123',
      });
      expect(result.success).toBe(false);
    });
  });
});
