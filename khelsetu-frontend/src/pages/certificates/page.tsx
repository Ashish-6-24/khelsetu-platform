import { CertificateGenerator } from '@features/certificates/components';

export function CertificatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Certificate Generator
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Generate professional certificates for tournament participants
          </p>
        </div>

        {/* Generator */}
        <CertificateGenerator />
      </div>
    </div>
  );
}
