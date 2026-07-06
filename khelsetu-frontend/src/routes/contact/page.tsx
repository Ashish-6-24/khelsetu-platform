import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { useToast } from '@shared/ui/toast-context';
import { APP_NAME } from '@shared/utils/constants';
import { clsx } from 'clsx';
import { type Variants, motion } from 'framer-motion';
import {
  CheckCircle2,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';

import { useState } from 'react';

const topics = [
  'General',
  'Sales',
  'Support',
  'Press',
  'Partnership',
  'Bug report',
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const ContactPage = () => {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General' as (typeof topics)[number],
    message: '',
    language: 'en' as 'en' | 'ne',
  });
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    if (form.message.length > 500)
      e.message = 'Message must be 500 characters or less';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSending(false);
    addToast({
      type: 'success',
      title: 'Message sent!',
      message: `We&apos;ll get back to you within 24 hours${
        form.language === 'ne' ? ' in Nepali' : ''
      }.`,
    });
    setForm({
      name: '',
      email: '',
      phone: '',
      topic: 'General',
      message: '',
      language: 'en',
    });
  };

  return (
    <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-canvas)]">
      <Hero />
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm
            form={form}
            setForm={setForm}
            errors={errors}
            isSending={isSending}
            onSubmit={onSubmit}
          />
          <ContactInfo />
        </div>
        <FaqStrip />
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="border-b border-[var(--border-subtle)] py-20 dark:border-[var(--border-strong)] sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-primary)]/15 bg-white px-3 py-1 text-xs font-semibold text-[var(--brand-primary)] dark:border-[var(--brand-primary)]/20 dark:bg-[var(--bg-surface-raised)] dark:text-[var(--brand-primary)]">
          <MessageCircle className="h-3.5 w-3.5" />
          Get in touch
        </div>
        <h1 className="mt-6 text-balance font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl dark:text-white">
          We read every message.
        </h1>
        <p className="mt-4 text-pretty text-lg text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
          Replies within 24 hours, in English or Nepali.
        </p>
      </motion.div>
    </div>
  </section>
);

interface FormProps {
  form: {
    name: string;
    email: string;
    phone: string;
    topic: (typeof topics)[number];
    message: string;
    language: 'en' | 'ne';
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      phone: string;
      topic: (typeof topics)[number];
      message: string;
      language: 'en' | 'ne';
    }>
  >;
  errors: Record<string, string>;
  isSending: boolean;
  onSubmit: (ev: React.FormEvent) => void;
}

const ContactForm = ({
  form,
  setForm,
  errors,
  isSending,
  onSubmit,
}: FormProps) => (
  <form
    onSubmit={onSubmit}
    className="rounded-3xl border border-[var(--border-subtle)] bg-white p-8 shadow-[0_12px_24px_-6px_rgb(15_23_42/0.06)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] sm:p-10"
    noValidate
  >
    <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] dark:text-white">
      Send us a message
    </h2>
    <p className="mt-2 text-sm text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
      Or email us directly at{' '}
      <a
        href="mailto:hello@khelsetu.app"
        className="font-semibold text-[var(--brand-primary)] hover:underline dark:text-[var(--brand-primary)]"
      >
        hello@khelsetu.app
      </a>
    </p>

    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <Input
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={errors.name}
        placeholder="Sita Rana"
        required
      />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
        placeholder="you@organizer.com"
        required
      />
    </div>

    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <Input
        label="Phone (optional)"
        type="tel"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="+977 98XXXXXXXX"
        inputMode="tel"
      />
      <div>
        <label
          htmlFor="contact-topic"
          className="mb-1.5 block text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-primary)]"
        >
          Topic
        </label>
        <select
          id="contact-topic"
          value={form.topic}
          onChange={(e) =>
            setForm({
              ...form,
              topic: e.target.value as (typeof topics)[number],
            })
          }
          className="h-10 w-full rounded-lg border border-[var(--border-strong)] bg-white px-3 text-sm text-[var(--text-primary)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] dark:text-white"
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="mt-4">
      <label
        htmlFor="contact-message"
        className="mb-1.5 block text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-primary)]"
      >
        Message
        <span className="ml-2 text-xs font-normal text-[var(--text-tertiary)]">
          {form.message.length} / 500
        </span>
      </label>
      <textarea
        id="contact-message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        rows={6}
        maxLength={500}
        placeholder="Tell us what you need…"
        className={clsx(
          'w-full rounded-lg border bg-white px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 dark:bg-[var(--bg-surface-raised)] dark:text-white',
          errors.message
            ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]/30'
            : 'border-[var(--border-strong)] focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/30 dark:border-[var(--border-strong)]',
        )}
        required
      />
      {errors.message && (
        <p className="mt-1 text-xs text-[var(--color-danger)] dark:text-[var(--brand-primary)]">
          {errors.message}
        </p>
      )}
    </div>

    <fieldset className="mt-4">
      <legend className="mb-2 text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-primary)]">
        Preferred language
      </legend>
      <div className="inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)] p-1 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]">
        {(['en', 'ne'] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            role="radio"
            aria-checked={form.language === lang}
            onClick={() => setForm({ ...form, language: lang })}
            className={clsx(
              'h-8 rounded-full px-4 text-sm font-semibold transition-all',
              form.language === lang
                ? 'bg-white text-[var(--text-primary)] shadow-sm dark:bg-[var(--bg-surface-raised)] dark:text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-[var(--text-muted)] dark:hover:text-white',
            )}
          >
            {lang === 'en' ? 'English' : 'नेपाली'}
          </button>
        ))}
      </div>
    </fieldset>

    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
        By submitting, you agree to our{' '}
        <a href="#" className="underline hover:text-[var(--brand-primary)]">
          privacy policy
        </a>
        .
      </p>
      <Button
        type="submit"
        size="lg"
        isLoading={isSending}
        rightIcon={<Send className="h-4 w-4" />}
      >
        {isSending ? 'Sending…' : 'Send message'}
      </Button>
    </div>
  </form>
);

const infoItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@khelsetu.app',
    href: 'mailto:hello@khelsetu.app',
  },
  {
    icon: Mail,
    label: 'Support',
    value: 'support@khelsetu.app',
    href: 'mailto:support@khelsetu.app',
  },
  {
    icon: Mail,
    label: 'Press',
    value: 'press@khelsetu.app',
    href: 'mailto:press@khelsetu.app',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+977 1 4XXX XXXX · 10am–6pm NPT',
  },
  {
    icon: Globe,
    label: 'Office',
    value: 'Kathmandu, Nepal',
  },
];

const ContactInfo = () => (
  <aside className="space-y-6">
    <div className="rounded-3xl border border-[var(--border-subtle)] bg-white p-8 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]">
      <h2 className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)] dark:text-white">
        Other ways to reach us
      </h2>
      <ul className="mt-6 space-y-4">
        {infoItems.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
              style={{
                background:
                  'linear-gradient(135deg, var(--brand-primary-hover) 0%, var(--brand-primary) 100%)',
              }}
            >
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--brand-primary)] dark:text-white dark:hover:text-[var(--brand-primary)]"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-[var(--text-primary)] dark:text-white">
                  {item.value}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>

    <a
      href="https://wa.me/9779800000000"
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-3 rounded-3xl border border-[var(--color-success)]/30 bg-gradient-to-br from-[var(--color-success)]/10 via-white to-[var(--bg-surface)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-6px_rgb(21_128_61/0.15)] dark:border-[var(--color-success)]/30 dark:from-[var(--color-success)]/15 dark:via-[var(--bg-surface-raised)] dark:to-[var(--bg-canvas)]"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm"
          style={{
            background:
              'linear-gradient(135deg, var(--color-success) 0%, var(--color-success-darker) 100%)',
          }}
        >
          <MessageCircle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)] dark:text-white">
            Chat on WhatsApp
          </p>
          <p className="text-xs text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
            Fastest way to reach a human
          </p>
        </div>
      </div>
      <span className="text-[var(--color-success)] transition-transform group-hover:translate-x-0.5 dark:text-[var(--color-success)]">
        →
      </span>
    </a>
  </aside>
);

const FaqStrip = () => {
  const items = [
    {
      q: 'How do I report a bug?',
      a: 'Email support@khelsetu.app or use the form above with topic "Bug report". We triage within 24 hours.',
    },
    {
      q: 'How do I become a partner?',
      a: 'We work with schools, federations, and sports media. Email partners@khelsetu.app with a 2-line intro.',
    },
    {
      q: 'Do you offer phone support?',
      a: 'Yes, 10am-6pm NPT on weekdays. District customers have a dedicated account manager.',
    },
    {
      q: 'Can I visit your office?',
      a: 'By appointment. We are based in Kathmandu. Email hello@khelsetu.app to schedule.',
    },
  ];
  return (
    <section className="mt-20">
      <h2 className="text-center font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] dark:text-white">
        Quick answers
      </h2>
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <div
            key={i.q}
            className="rounded-2xl border border-[var(--border-subtle)] bg-white p-5 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]"
          >
            <h3 className="flex items-start gap-2 text-sm font-semibold text-[var(--text-primary)] dark:text-white">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" />
              {i.q}
            </h3>
            <p className="mt-2 pl-6 text-sm text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
              {i.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

ContactPage.displayName = 'ContactPage';
void APP_NAME;
