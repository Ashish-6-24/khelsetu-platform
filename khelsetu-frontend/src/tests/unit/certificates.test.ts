import {
  generateCertificateId,
  generateVerificationUrl,
} from '@features/certificates/utils/certificateRenderer';
import { describe, expect, it, vi } from 'vitest';

describe('Certificate Utils', () => {
  describe('generateCertificateId', () => {
    it('should generate a certificate ID with correct format', () => {
      const id = generateCertificateId();
      expect(id).toMatch(/^KHS-[A-Z0-9]+-[A-Z0-9]+$/);
    });

    it('should generate unique IDs', () => {
      const id1 = generateCertificateId();
      const id2 = generateCertificateId();
      expect(id1).not.toBe(id2);
    });

    it('should start with KHS prefix', () => {
      const id = generateCertificateId();
      expect(id.startsWith('KHS-')).toBe(true);
    });
  });

  describe('generateVerificationUrl', () => {
    it('should generate verification URL', () => {
      // Mock window.location.origin
      vi.stubGlobal('window', {
        location: {
          origin: 'https://khelsetu.com',
        },
      });

      const url = generateVerificationUrl('CERT-123');
      expect(url).toBe('https://khelsetu.com/certificates/verify/CERT-123');
    });

    it('should include certificate ID in URL', () => {
      vi.stubGlobal('window', {
        location: {
          origin: 'https://example.com',
        },
      });

      const certId = 'TEST-456';
      const url = generateVerificationUrl(certId);
      expect(url).toContain(certId);
    });
  });
});
