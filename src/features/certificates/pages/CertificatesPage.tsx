import { CertificateGenerator } from '@features/certificates/components';

export function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Certificate Generator
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Generate professional certificates for tournament participants
          </p>
        </div>

        {/* Generator */}
        <CertificateGenerator />
      </div>
    </div>
  );
}
