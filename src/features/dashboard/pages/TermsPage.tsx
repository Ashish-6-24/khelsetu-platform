import { ROUTES } from '@shared/utils/constants';

import { Link } from 'react-router-dom';

export const TermsPage = () => (
  <div className="mx-auto max-w-3xl px-4 py-16">
    <h1 className="text-3xl font-bold text-[var(--text-primary)]">
      Terms of Service
    </h1>
    <p className="mt-2 text-sm text-[var(--text-tertiary)]">
      Last updated: July 9, 2026
    </p>

    <div className="prose prose-sm mt-8 space-y-6 text-[var(--text-secondary)]">
      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          1. Acceptance
        </h2>
        <p>
          By accessing or using KhelSetu ("the Service"), you agree to be bound
          by these Terms. If you do not agree, do not use the Service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          2. Description
        </h2>
        <p>
          KhelSetu is a sports tournament management platform that enables
          organizers to manage tournaments, teams, players, matches, scoring,
          and related activities.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          3. Accounts
        </h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities under your account. You
          must provide accurate information during registration and keep it up
          to date.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          4. Acceptable Use
        </h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5">
          <li>Use the Service for any unlawful purpose</li>
          <li>
            Attempt to gain unauthorized access to any part of the Service
          </li>
          <li>Interfere with or disrupt the Service or servers</li>
          <li>Transmit harmful code, spam, or excessive automated requests</li>
          <li>Impersonate another person or entity</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          5. Intellectual Property
        </h2>
        <p>
          The Service and its original content, features, and functionality are
          owned by KhelSetu and are protected by copyright, trademark, and other
          intellectual property laws.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          6. Termination
        </h2>
        <p>
          We may suspend or terminate your access to the Service at any time,
          with or without cause, with or without notice. Upon termination, your
          right to use the Service ceases immediately.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          7. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, KhelSetu shall not be liable
          for any indirect, incidental, special, consequential, or punitive
          damages arising from your use of the Service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          8. Changes
        </h2>
        <p>
          We reserve the right to modify these Terms at any time. Continued use
          of the Service after changes constitutes acceptance of the new Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          9. Contact
        </h2>
        <p>
          Questions about these Terms? Email us at{' '}
          <a
            href="mailto:legal@khelsetu.app"
            className="text-[var(--text-link)] hover:underline"
          >
            legal@khelsetu.app
          </a>
          .
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
