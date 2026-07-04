import { Radio, Trophy, Tv, Users } from 'lucide-react';

export type Sport = 'cricket' | 'football' | 'volleyball' | 'basketball';

export interface TickerItem {
  id: string;
  label: string;
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  status: 'live' | 'completed' | 'upcoming';
}

export interface Plan {
  name: string;
  monthly: number | 'free' | 'custom';
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export const liveScores: TickerItem[] = [
  {
    id: '1',
    label: 'T20',
    teamA: 'Tigers',
    teamB: 'Eagles',
    scoreA: '142/3',
    scoreB: '128/5',
    status: 'live',
  },
  {
    id: '2',
    label: 'ODI',
    teamA: 'Rhinos',
    teamB: 'Lions',
    scoreA: '245/6',
    scoreB: '198/4',
    status: 'live',
  },
  {
    id: '3',
    label: 'T10',
    teamA: 'Hawks',
    teamB: 'Wolves',
    scoreA: '87/2',
    scoreB: '64/4',
    status: 'live',
  },
  {
    id: '4',
    label: 'T20',
    teamA: 'Kings',
    teamB: 'Knights',
    scoreA: '156/4',
    scoreB: '156/8',
    status: 'completed',
  },
  {
    id: '5',
    label: 'League',
    teamA: 'Phoenix',
    teamB: 'Dragons',
    scoreA: '—',
    scoreB: '—',
    status: 'upcoming',
  },
  {
    id: '6',
    label: 'T20',
    teamA: 'Strikers',
    teamB: 'Warriors',
    scoreA: '178/5',
    scoreB: '162/7',
    status: 'live',
  },
];

export const sports: {
  name: string;
  sport: Sport;
  count: string;
  accent: string;
}[] = [
  {
    name: 'Cricket',
    sport: 'cricket',
    count: '340+ tournaments',
    accent: 'from-[var(--color-success)] to-[var(--color-success)]',
  },
  {
    name: 'Football',
    sport: 'football',
    count: '520+ tournaments',
    accent: 'from-[var(--sport-football)] to-[var(--sport-football)]',
  },
  {
    name: 'Volleyball',
    sport: 'volleyball',
    count: '180+ tournaments',
    accent: 'from-[var(--sport-volleyball)] to-[var(--sport-volleyball)]',
  },
  {
    name: 'Basketball',
    sport: 'basketball',
    count: '210+ tournaments',
    accent: 'from-[var(--sport-basketball)] to-[var(--sport-basketball)]',
  },
];

export const steps = [
  {
    icon: Trophy,
    title: 'Create your tournament',
    description:
      'Set the format, add teams, configure rules — done in under 5 minutes.',
  },
  {
    icon: Users,
    title: 'Onboard teams & players',
    description:
      'Bulk import via CSV or add one at a time. Players get a complete profile.',
  },
  {
    icon: Radio,
    title: 'Run live scoring',
    description:
      'Score from any device. Brackets, standings, and stats update instantly.',
  },
  {
    icon: Tv,
    title: 'Broadcast like a pro',
    description:
      'Connect OBS to broadcast-ready overlays and share the action with the world.',
  },
];

export const metrics = [
  {
    target: 1250,
    suffix: '+',
    label: 'Tournaments run',
    sub: 'Across all 7 provinces',
  },
  {
    target: 18500,
    suffix: '',
    label: 'Players scored',
    sub: 'Cricket, football, VB, BB',
  },
  {
    target: 42000,
    suffix: '',
    label: 'Matches scored live',
    sub: 'In the last 12 months',
  },
  {
    target: 9997,
    suffix: '%',
    label: 'Uptime SLA',
    sub: 'Mumbai + Singapore regions',
    format: (n: number) => (n / 100).toFixed(2),
  },
];

export const plans: Plan[] = [
  {
    name: 'Starter',
    monthly: 'free',
    description: 'For small clubs and first-time organizers.',
    features: [
      '1 tournament',
      'Up to 4 teams',
      'Live scoring',
      'Community support',
    ],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Club',
    monthly: 2500,
    description: 'For leagues and competitive organizers.',
    features: [
      '5 tournaments',
      'Up to 24 teams',
      'OBS broadcast overlays',
      'Custom branding',
      'eSewa / Khalti payments',
      'Priority support',
    ],
    cta: 'Start with Club',
    highlight: true,
  },
  {
    name: 'District',
    monthly: 9500,
    description: 'For federations & multi-org platforms.',
    features: [
      'Unlimited tournaments',
      'Unlimited teams',
      'Custom domain',
      'Multi-club sub-accounts',
      'Dedicated account manager',
      'API access',
    ],
    cta: 'Contact sales',
    highlight: false,
  },
];

export const formatNPR = (amount: number) =>
  new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(amount);

export const renderPrice = (monthly: Plan['monthly'], annual: boolean) => {
  if (monthly === 'free') return { amount: 'Free', suffix: 'forever' };
  if (monthly === 'custom') return { amount: 'Custom', suffix: '' };
  const value = annual ? monthly * 10 : monthly;
  return { amount: formatNPR(value), suffix: annual ? '/ year' : '/ month' };
};

export const faqItems = [
  {
    id: 'faq-trial',
    title: 'Is there really a free trial? Do I need a credit card?',
    content: (
      <p>
        Yes — 14 days, full access to every Club feature. We don&apos;t ask for
        a credit card upfront. When the trial ends, you can keep using the free
        Starter plan or upgrade. No surprises.
      </p>
    ),
  },
  {
    id: 'faq-payments',
    title: 'Which Nepali payment methods do you accept?',
    content: (
      <p>
        We accept eSewa, Khalti, Fonepay, ConnectIPS, direct bank transfer, and
        (for District plan) invoiced annual contracts in NPR. Invoices in
        English or Nepali.
      </p>
    ),
  },
  {
    id: 'faq-sports',
    title: 'Which sports are supported?',
    content: (
      <p>
        Cricket (T20, ODI, T10), football (11-a-side &amp; 5-a-side), volleyball
        (indoor &amp; beach), and basketball. Each sport has its own scoring
        engine, validation rules, and stat categories.
      </p>
    ),
  },
  {
    id: 'faq-broadcast',
    title: 'Do the OBS overlays cost extra?',
    content: (
      <p>
        OBS broadcast overlays are included on the Club and District plans. You
        connect OBS via a browser source URL, and we stream pixel-perfect
        scoreboards, lower-thirds, and live stats.
      </p>
    ),
  },
  {
    id: 'faq-offline',
    title: 'What happens if my internet drops during a match?',
    content: (
      <p>
        KhelSetu has offline-first scoring built in. Scorekeepers can keep
        scoring without internet — events are queued locally and synced the
        moment connectivity returns. Crucial for grounds in the hills.
      </p>
    ),
  },
  {
    id: 'faq-schools',
    title: 'Do you offer discounts for schools and youth clubs?',
    content: (
      <p>
        Yes. Schools and registered youth clubs get 50% off the Club plan.
        Contact our team with your school registration to apply.
      </p>
    ),
  },
  {
    id: 'faq-data',
    title: 'Where is my data stored? Can I export it?',
    content: (
      <p>
        All data is stored on encrypted Postgres databases with backups in
        ap-south-1 (Mumbai). You can export tournaments, players, scoring
        history, and analytics as CSV or JSON at any time.
      </p>
    ),
  },
  {
    id: 'faq-support',
    title: 'How do I get help if something goes wrong?',
    content: (
      <p>
        Email and chat support in English and Nepali. Club customers get 24-hour
        response. District customers get a dedicated account manager and a
        private WhatsApp group for fast turnaround.
      </p>
    ),
  },
];

export const partners = [
  { code: 'CAN', name: 'Cricket Association of Nepal' },
  { code: 'ANFA', name: 'All Nepal Football Association' },
  { code: 'NVA', name: 'Nepal Volleyball Association' },
  { code: 'NSC', name: 'Nepal Sports Council' },
  { code: 'NSJF', name: 'Nepal Sports Journalists Forum' },
  { code: 'TU', name: 'Tribhuvan University' },
  { code: 'KU', name: 'Kathmandu University' },
  { code: 'NPL', name: 'Nepal Premier League' },
];

export const testimonials = [
  {
    quote:
      'KhelSetu cut our tournament ops time in half. Live scoring and overlays are unmatched for the Nepali circuit.',
    name: 'Sita Rana',
    role: 'Operations Lead',
    org: 'Pokhara Premier League',
    initials: 'SR',
    accent: 'from-[var(--brand-primary)] to-[var(--brand-primary-hover)]',
  },
  {
    quote:
      'We run 50+ school tournaments a year. KhelSetu is the only tool that scales with us — and the bulk import saves hours every season.',
    name: 'Bibek Shrestha',
    role: 'Athletic Director',
    org: 'Kathmandu Model College',
    initials: 'BS',
    accent: 'from-[var(--brand-accent)] to-[var(--brand-accent-hover)]',
  },
  {
    quote:
      'Our broadcast quality jumped overnight. The OBS overlays are simply gorgeous, and the OBS browser source never drops a frame.',
    name: 'Prakash Joshi',
    role: 'Producer',
    org: 'NSJF',
    initials: 'PJ',
    accent: 'from-[var(--text-primary)] to-[var(--bg-surface-raised)]',
  },
];
