import type { CertificateData, CertificateType } from '../types';
import { CERTIFICATE_TEMPLATES } from '../types';

export function generateCertificateId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `KHS-${timestamp}-${random}`;
}

export function generateVerificationUrl(id: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/certificates/verify/${id}`;
}

export function getTemplate(type: CertificateType) {
  return CERTIFICATE_TEMPLATES[type];
}

export function getFormattedDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function renderCertificateToPng(): Promise<string> {
  const { default: html2canvas } = await import('html2canvas');
  const element = document.getElementById('certificate-preview');
  if (!element) throw new Error('Certificate preview element not found');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#fef3c7',
  });

  return canvas.toDataURL('image/png');
}

export async function renderCertificateToPdf(
  data: CertificateData,
): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const { default: html2canvas } = await import('html2canvas');
  const element = document.getElementById('certificate-preview');
  if (!element) throw new Error('Certificate preview element not found');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#fef3c7',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`certificate-${data.certificateId}.pdf`);
}

export async function downloadPng(data: CertificateData): Promise<void> {
  const dataUrl = await renderCertificateToPng();
  const link = document.createElement('a');
  link.download = `certificate-${data.certificateId}.png`;
  link.href = dataUrl;
  link.click();
}
