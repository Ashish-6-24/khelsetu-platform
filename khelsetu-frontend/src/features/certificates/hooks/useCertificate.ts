import { useState, useCallback } from 'react';
import type { CertificateData, CertificateType } from '../types';
import {
  generateCertificateId,
  generateVerificationUrl,
  renderCertificateToPdf,
  downloadPng,
} from '../utils/certificateRenderer';

export function useCertificate() {
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCertificate = useCallback(
    (params: {
      type: CertificateType;
      playerName: string;
      teamName: string;
      tournamentName: string;
      date: string;
      organizer: string;
    }) => {
      setIsGenerating(true);
      const id = generateCertificateId();
      const verificationUrl = generateVerificationUrl(id);

      const data: CertificateData = {
        id,
        ...params,
        certificateId: id,
        verificationUrl,
      };

      setCertificateData(data);
      setTimeout(() => setIsGenerating(false), 300);
      return data;
    },
    [],
  );

  const downloadPdf = useCallback(async () => {
    if (!certificateData) return;
    await renderCertificateToPdf(certificateData);
  }, [certificateData]);

  const downloadPngFile = useCallback(async () => {
    if (!certificateData) return;
    await downloadPng(certificateData);
  }, [certificateData]);

  const reset = useCallback(() => {
    setCertificateData(null);
    setIsGenerating(false);
  }, []);

  return {
    certificateData,
    isGenerating,
    generateCertificate,
    downloadPdf,
    downloadPng: downloadPngFile,
    reset,
  };
}
