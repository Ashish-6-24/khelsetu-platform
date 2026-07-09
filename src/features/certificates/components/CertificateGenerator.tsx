import { Button } from '@shared/ui/Button';

import { useCallback, useState } from 'react';

import { useCertificate } from '../hooks/useCertificate';
import { CertConfetti } from './CertConfetti';
import { CertificateForm } from './CertificateForm';
import { CertificatePreview } from './CertificatePreview';

export function CertificateGenerator() {
  const {
    certificateData,
    isGenerating,
    generateCertificate,
    downloadPdf,
    downloadPng,
    reset,
  } = useCertificate();
  const [confettiKey, setConfettiKey] = useState(0);

  const handleDownload = useCallback(async (fn: () => Promise<void>) => {
    await fn();
    setConfettiKey((k) => k + 1);
  }, []);

  return (
    <>
      <CertConfetti
        key={confettiKey}
        trigger={confettiKey > 0}
        onComplete={() => {}}
      />
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
              Certificate Details
            </h3>
            <CertificateForm
              onSubmit={generateCertificate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Download & Info Section */}
          {certificateData && (
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
                Certificate Info
              </h3>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="cert-id"
                    className="text-xs font-medium text-[var(--text-tertiary)]"
                  >
                    Certificate ID
                  </label>
                  <p
                    id="cert-id"
                    className="font-mono text-sm text-[var(--text-primary)]"
                  >
                    {certificateData.certificateId}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="cert-verify-url"
                    className="text-xs font-medium text-[var(--text-tertiary)]"
                  >
                    Verification URL
                  </label>
                  <div className="flex items-center gap-2">
                    <code
                      id="cert-verify-url"
                      className="flex-1 truncate rounded bg-[var(--bg-surface-sunken)] px-2 py-1 text-xs"
                    >
                      {certificateData.verificationUrl}
                    </code>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          certificateData.verificationUrl,
                        )
                      }
                      aria-label="Copy verification URL"
                      className="rounded bg-[var(--bg-surface-sunken)] px-2 py-1 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleDownload(downloadPdf)}
                    className="flex-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-hover)] text-white hover:from-[var(--brand-primary-hover)] hover:to-[var(--color-danger)]"
                  >
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => handleDownload(downloadPng)}
                    className="flex-1 border-accent-700 text-accent-700 hover:bg-accent-50"
                  >
                    Download PNG
                  </Button>
                </div>

                <button
                  type="button"
                  onClick={reset}
                  className="w-full text-center text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                >
                  Create Another Certificate
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="flex items-start justify-center">
          {certificateData ? (
            <CertificatePreview data={certificateData} />
          ) : (
            <div className="flex h-[560px] w-full items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)]">
              <div className="text-center text-[var(--text-tertiary)]">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-primary)]/10 text-3xl">
                  🏆
                </div>
                <p className="text-lg font-medium text-[var(--text-secondary)]">
                  No Certificate Generated
                </p>
                <p className="mt-1 text-sm">
                  Fill out the form to create a premium certificate
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
