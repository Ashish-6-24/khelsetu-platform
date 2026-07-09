import QRCode from 'qrcode';

import { useEffect, useState } from 'react';

interface CertificateQRProps {
  readonly value: string;
  readonly size?: number;
}

export function CertificateQR({ value, size = 56 }: CertificateQRProps) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    QRCode.toDataURL(value, {
      width: size * 2,
      margin: 1,
      color: {
        dark: '#1f2937',
        light: '#ffffff',
      } /* QR code colors — not theme-dependent */,
      errorCorrectionLevel: 'M',
    }).then(setSrc);
  }, [value, size]);

  if (!src) {
    return (
      <div
        className="flex items-center justify-center rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
        style={{ width: size, height: size }}
      >
        <span className="text-[8px] text-[var(--text-muted)]">QR</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`QR code for ${value}`}
      loading="lazy"
      width={size}
      height={size}
      className="rounded border border-[var(--border-subtle)] bg-white dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]"
      style={{ width: size, height: size }}
    />
  );
}
