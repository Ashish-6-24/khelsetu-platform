export type CertificateType =
  | 'champion'
  | 'runner-up'
  | 'mvp'
  | 'top-scorer'
  | 'best-goalkeeper'
  | 'participation'
  | 'volunteer'
  | 'organizer';

export interface CertificateData {
  id: string;
  type: CertificateType;
  playerName: string;
  teamName: string;
  tournamentName: string;
  date: string;
  organizer: string;
  certificateId: string;
  verificationUrl: string;
}

export interface CertificateTemplate {
  type: CertificateType;
  title: string;
  subtitle: string;
  icon: string;
  primaryColor: string;
  accentColor: string;
  gradient: string;
}

export const CERTIFICATE_TEMPLATES: Record<
  CertificateType,
  CertificateTemplate
> = {
  champion: {
    type: 'champion',
    title: 'Champion',
    subtitle: 'Winner of the Tournament',
    icon: '🏆',
    primaryColor: '#b8860b',
    accentColor: '#d4a017',
    gradient: 'linear-gradient(135deg, #b8860b, #d4a017, #f59e0b)',
  },
  'runner-up': {
    type: 'runner-up',
    title: 'Runner Up',
    subtitle: 'Second Place',
    icon: '🥈',
    primaryColor: '#9ca3af',
    accentColor: '#d1d5db',
    gradient: 'linear-gradient(135deg, #9ca3af, #d1d5db, #e5e7eb)',
  },
  mvp: {
    type: 'mvp',
    title: 'Most Valuable Player',
    subtitle: 'Outstanding Performance',
    icon: '⭐',
    primaryColor: '#7f1d1d',
    accentColor: '#b8860b',
    gradient: 'linear-gradient(135deg, #7f1d1d, #991b1b, #b8860b)',
  },
  'top-scorer': {
    type: 'top-scorer',
    title: 'Top Scorer',
    subtitle: 'Highest Goal Scorer',
    icon: '⚽',
    primaryColor: '#15803d',
    accentColor: '#22c55e',
    gradient: 'linear-gradient(135deg, #15803d, #16a34a, #22c55e)',
  },
  'best-goalkeeper': {
    type: 'best-goalkeeper',
    title: 'Best Goalkeeper',
    subtitle: 'Outstanding Defensive Performance',
    icon: '🧤',
    primaryColor: '#1e40af',
    accentColor: '#3b82f6',
    gradient: 'linear-gradient(135deg, #1e40af, #2563eb, #3b82f6)',
  },
  participation: {
    type: 'participation',
    title: 'Certificate of Participation',
    subtitle: 'Active Participation in the Tournament',
    icon: '🤝',
    primaryColor: '#6b7280',
    accentColor: '#9ca3af',
    gradient: 'linear-gradient(135deg, #6b7280, #9ca3af)',
  },
  volunteer: {
    type: 'volunteer',
    title: 'Volunteer Award',
    subtitle: 'Dedicated Service',
    icon: '❤️',
    primaryColor: '#dc2626',
    accentColor: '#f87171',
    gradient: 'linear-gradient(135deg, #dc2626, #ef4444, #f87171)',
  },
  organizer: {
    type: 'organizer',
    title: 'Organizer Award',
    subtitle: 'Outstanding Organizational Contribution',
    icon: '⚙️',
    primaryColor: '#374151',
    accentColor: '#6b7280',
    gradient: 'linear-gradient(135deg, #374151, #4b5563, #6b7280)',
  },
};
