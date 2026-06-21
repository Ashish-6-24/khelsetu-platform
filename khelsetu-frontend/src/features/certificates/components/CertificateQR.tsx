import QRCode from 'qrcode';

import { useEffect, useState } from 'react';

interface CertificateQRProps {
  value: string;
  size?: number;
}

export function CertificateQR({ value, size = 56 }: CertificateQRProps) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    QRCode.toDataURL(value, {
      width: size * 2,
      margin: 1,
      color: { dark: '#1f2937', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    }).then(setSrc);
  }, [value, size]);

  if (!src) {
    return (
      <div
        className="flex items-center justify-center rounded border border-gray-200 bg-white"
        style={{ width: size, height: size }}
      >
        <span className="text-[8px] text-gray-400">QR</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`QR code for ${value}`}
      width={size}
      height={size}
      className="rounded border border-gray-200 bg-white"
      style={{ width: size, height: size }}
    />
  );
}
