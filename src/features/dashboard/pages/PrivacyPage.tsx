import { Link } from 'react-router-dom';

import { ROUTES } from '@shared/utils/constants';

export const PrivacyPage = () => (
  <div className="mx-auto max-w-3xl px-4 py-16">
    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Privacy Policy</h1>
    <p className="mt-2 text-sm text-[var(--text-tertiary)]">Last updated: July 9, 2026</p>

    <div className="prose prose-sm mt-8 space-y-6 text-[var(--text-secondary)]">
      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">1. Information We Collect</h2>
        <p>We collect information you provide directly:</p>
        <ul className="list-disc pl-5">
          <li>Account information (name, email, phone, role)</li>
          <li>Tournament and team data you create</li>
          <li>Match data, scores, and statistics</li>
          <li>Communications you send us</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">2. How We Use Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-5">
          <li>Provide and improve the Service</li>
          <li>Send you service-related communications</li>
          <li>Process transactions and send billing communications</li>
          <li>Detect and prevent fraud or abuse</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">3. Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share data with service providers
          who assist in operating the Service, and as required by law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">4. Data Security</h2>
        <p>
          We implement industry-standard security measures including encryption in transit (TLS)
          and at rest, access controls, and regular security audits.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-5">
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Export your data in a portable format</li>
          <li>Opt out of non-essential communications</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">6. Data Retention</h2>
        <p>
          We retain your data for as long as your account is active or as needed to provide
          the Service. We may retain certain information as required by law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">7. Contact</h2>
        <p>
          For privacy-related requests, email{' '}
          <a href="mailto:privacy@khelsetu.app" className="text-[var(--text-link)] hover:underline">
            privacy@khelsetu.app
          </a>.
        </p>
      </section>
    </div>

    <Link
      to={ROUTES.REGISTER}
      className="mt-8 inline-block text-sm font-semibold text-[var(--text-link)] hover:underline"
    >
      Back to registration
    </Link>
  </div>
);
