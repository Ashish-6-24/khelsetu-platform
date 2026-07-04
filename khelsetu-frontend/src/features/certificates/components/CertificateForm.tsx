import { Button } from '@shared/components/ui/Button';

import { useState } from 'react';

import type { CertificateType } from '../types';
import { CERTIFICATE_TEMPLATES } from '../types';

interface CertificateFormProps {
  onSubmit: (data: {
    type: CertificateType;
    playerName: string;
    teamName: string;
    tournamentName: string;
    date: string;
    organizer: string;
  }) => void;
  isGenerating: boolean;
}

const certificateTypes = Object.values(CERTIFICATE_TEMPLATES);

export function CertificateForm({
  onSubmit,
  isGenerating,
}: CertificateFormProps) {
  const [type, setType] = useState<CertificateType>('champion');
  const [playerName, setPlayerName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [tournamentName, setTournamentName] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0] ?? '',
  );
  const [organizer, setOrganizer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type, playerName, teamName, tournamentName, date, organizer });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="cert-type"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Certificate Type
        </label>
        <select
          id="cert-type"
          value={type}
          onChange={(e) => setType(e.target.value as CertificateType)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          {certificateTypes.map((t) => (
            <option key={t.type} value={t.type}>
              {t.icon} {t.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="cert-player"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Recipient Name
        </label>
        <input
          id="cert-player"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter recipient name"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="cert-team"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Team Name
        </label>
        <input
          id="cert-team"
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="cert-tournament"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Tournament Name
        </label>
        <input
          id="cert-tournament"
          type="text"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
          placeholder="Enter tournament name"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="cert-date"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Date
        </label>
        <input
          id="cert-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="cert-organizer"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Organizer
        </label>
        <input
          id="cert-organizer"
          type="text"
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          placeholder="Enter organizer name"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isGenerating}
        className="w-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-hover)] text-white hover:from-[var(--brand-primary-hover)] hover:to-[var(--color-danger)]"
      >
        Generate Certificate
      </Button>
    </form>
  );
}
