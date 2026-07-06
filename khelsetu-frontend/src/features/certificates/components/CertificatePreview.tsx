import type { CertificateData } from '../types';
import { CERTIFICATE_TEMPLATES } from '../types';
import { getFormattedDate } from '../utils/certificateRenderer';
import { CertificateQR } from './CertificateQR';

interface CertificatePreviewProps {
  data: CertificateData;
}

export function CertificatePreview({ data }: CertificatePreviewProps) {
  const template = CERTIFICATE_TEMPLATES[data.type];

  return (
    <div
      id="certificate-preview"
      className="cert-paper cert-border-ornate relative mx-auto w-full max-w-[800px] overflow-hidden rounded-lg"
      style={{ aspectRatio: '1.414 / 1' }}
    >
      {/* Watermark */}
      <div className="cert-watermark">{template.icon}</div>

      {/* Corner flourishes */}
      <div className="cert-corner cert-corner--tl">
        <div className="cert-corner-dot" />
      </div>
      <div className="cert-corner cert-corner--tr">
        <div className="cert-corner-dot" />
      </div>
      <div className="cert-corner cert-corner--bl">
        <div className="cert-corner-dot" />
      </div>
      <div className="cert-corner cert-corner--br">
        <div className="cert-corner-dot" />
      </div>

      {/* Content */}
      <div className="flex h-full flex-col items-center justify-between p-8 md:p-12">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-700 to-accent-500 shadow-md">
            <span className="text-2xl">{template.icon}</span>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-900/60">
            KhelSetu Sports Management
          </p>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="cert-gold-text font-championship text-4xl font-bold md:text-5xl">
            {template.title}
          </h1>
          <div className="cert-divider my-2">
            <span className="text-xs text-accent-700">✦</span>
          </div>
          <p className="font-display text-lg italic text-gray-600 dark:text-gray-300">
            {template.subtitle}
          </p>
        </div>

        {/* Recipient */}
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            This certificate is proudly presented to
          </p>
          <h2 className="my-1 font-display text-4xl font-bold text-brand-900 md:text-5xl">
            {data.playerName}
          </h2>
          <div className="mx-auto h-px w-56 bg-gradient-to-r from-transparent via-accent-700/40 to-transparent" />
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-6 text-center text-sm">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Team
            </p>
            <p className="mt-0.5 font-medium text-gray-700 dark:text-gray-200">
              {data.teamName}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Tournament
            </p>
            <p className="mt-0.5 font-medium text-gray-700 dark:text-gray-200">
              {data.tournamentName}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Date
            </p>
            <p className="mt-0.5 font-medium text-gray-700 dark:text-gray-200">
              {getFormattedDate(data.date)}
            </p>
          </div>
        </div>

        {/* Signatures + Seal */}
        <div className="flex w-full items-end justify-between">
          {/* Left signature */}
          <div className="cert-signature text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {data.organizer}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              Organizer
            </p>
          </div>

          {/* Center seal */}
          <div className="cert-seal mx-8 flex items-center justify-center">
            <span className="relative z-10 text-2xl font-bold text-accent-950/70">
              KS
            </span>
          </div>

          {/* Right signature */}
          <div className="cert-signature text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              KhelSetu
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              Platform
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex w-full items-end justify-between border-t border-accent-700/20 pt-3">
          <div className="text-[10px] text-gray-400 dark:text-gray-500">
            <p>Certificate ID: {data.certificateId}</p>
          </div>
          <CertificateQR value={data.verificationUrl} size={56} />
        </div>
      </div>
    </div>
  );
}
