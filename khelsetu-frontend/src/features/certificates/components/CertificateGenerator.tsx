import { Button } from '@components/ui/Button';

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
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Certificate Details
            </h3>
            <CertificateForm
              onSubmit={generateCertificate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Download & Info Section */}
          {certificateData && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Certificate Info
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Certificate ID
                  </label>
                  <p className="font-mono text-sm text-gray-900 dark:text-white">
                    {certificateData.certificateId}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Verification URL
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 truncate rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">
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
                      className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
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
                    className="flex-1 bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] text-white hover:from-[#991b1b] hover:to-[#b91c1c]"
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
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
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
            <div className="flex h-[560px] w-full items-center justify-center rounded-xl border-2 border-dashed border-accent-700/30 bg-accent-50/50">
              <div className="text-center text-gray-400">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-3xl">
                  🏆
                </div>
                <p className="text-lg font-medium text-gray-500">
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
