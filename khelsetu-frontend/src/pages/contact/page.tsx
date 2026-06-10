import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { useToast } from '@components/ui/toast-context';
import { APP_NAME } from '@utils/constants';
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
    <div className="bg-[#FAFAF9] dark:bg-[#0A0A0F]">
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
  <section className="border-b border-[#E7E5E4] py-20 dark:border-[#27272A] sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#7F1D1D]/15 bg-white px-3 py-1 text-xs font-semibold text-[#7F1D1D] dark:border-[#FCA5A5]/20 dark:bg-[#13131A] dark:text-[#FCA5A5]">
          <MessageCircle className="h-3.5 w-3.5" />
          Get in touch
        </div>
        <h1 className="mt-6 text-balance font-display text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl dark:text-white">
          We read every message.
        </h1>
        <p className="mt-4 text-pretty text-lg text-[#475569] dark:text-[#CBD5E1]">
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
    className="rounded-3xl border border-[#E7E5E4] bg-white p-8 shadow-[0_12px_24px_-6px_rgb(15_23_42/0.06)] dark:border-[#27272A] dark:bg-[#13131A] sm:p-10"
    noValidate
  >
    <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
      Send us a message
    </h2>
    <p className="mt-2 text-sm text-[#475569] dark:text-[#CBD5E1]">
      Or email us directly at{' '}
      <a
        href="mailto:hello@khelsetu.app"
        className="font-semibold text-[#7F1D1D] hover:underline dark:text-[#FCA5A5]"
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
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A] dark:text-[#F1F5F9]">
          Topic
        </label>
        <select
          value={form.topic}
          onChange={(e) =>
            setForm({
              ...form,
              topic: e.target.value as (typeof topics)[number],
            })
          }
          className="h-10 w-full rounded-lg border border-[#D6D3D1] bg-white px-3 text-sm text-[#0F172A] focus:border-[#7F1D1D] focus:outline-none focus:ring-2 focus:ring-[#7F1D1D]/30 dark:border-[#3F3F46] dark:bg-[#1A1A23] dark:text-white"
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
      <label className="mb-1.5 block text-sm font-medium text-[#0F172A] dark:text-[#F1F5F9]">
        Message
        <span className="ml-2 text-xs font-normal text-[#94A3B8]">
          {form.message.length} / 500
        </span>
      </label>
      <textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        rows={6}
        maxLength={500}
        placeholder="Tell us what you need…"
        className={clsx(
          'w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 dark:bg-[#1A1A23] dark:text-white',
          errors.message
            ? 'border-[#B91C1C] focus:ring-[#B91C1C]/30'
            : 'border-[#D6D3D1] focus:border-[#7F1D1D] focus:ring-[#7F1D1D]/30 dark:border-[#3F3F46]',
        )}
        required
      />
      {errors.message && (
        <p className="mt-1 text-xs text-[#B91C1C] dark:text-[#FCA5A5]">
          {errors.message}
        </p>
      )}
    </div>

    <fieldset className="mt-4">
      <legend className="mb-2 text-sm font-medium text-[#0F172A] dark:text-[#F1F5F9]">
        Preferred language
      </legend>
      <div className="inline-flex rounded-full border border-[#E7E5E4] bg-[#F5F5F4] p-1 dark:border-[#27272A] dark:bg-[#1A1A23]">
        {(['en', 'ne'] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setForm({ ...form, language: lang })}
            className={clsx(
              'h-8 rounded-full px-4 text-sm font-semibold transition-all',
              form.language === lang
                ? 'bg-white text-[#0F172A] shadow-sm dark:bg-[#13131A] dark:text-white'
                : 'text-[#475569] hover:text-[#0F172A] dark:text-[#CBD5E1] dark:hover:text-white',
            )}
          >
            {lang === 'en' ? 'English' : 'नेपाली'}
          </button>
        ))}
      </div>
    </fieldset>

    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
        By submitting, you agree to our{' '}
        <a href="#" className="underline hover:text-[#7F1D1D]">
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
    <div className="rounded-3xl border border-[#E7E5E4] bg-white p-8 dark:border-[#27272A] dark:bg-[#13131A]">
      <h2 className="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">
        Other ways to reach us
      </h2>
      <ul className="mt-6 space-y-4">
        {infoItems.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #991B1B 0%, #7F1D1D 100%)',
              }}
            >
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm font-medium text-[#0F172A] hover:text-[#7F1D1D] dark:text-white dark:hover:text-[#FCA5A5]"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-[#0F172A] dark:text-white">
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
      className="group flex items-center justify-between gap-3 rounded-3xl border border-[#15803D]/30 bg-gradient-to-br from-[#F0FDF4] via-white to-[#FAFAF9] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-6px_rgb(21_128_61/0.15)] dark:border-[#15803D]/30 dark:from-[#15803D]/15 dark:via-[#13131A] dark:to-[#0A0A0F]"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm"
          style={{
            background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
          }}
        >
          <MessageCircle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0F172A] dark:text-white">
            Chat on WhatsApp
          </p>
          <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
            Fastest way to reach a human
          </p>
        </div>
      </div>
      <span className="text-[#15803D] transition-transform group-hover:translate-x-0.5 dark:text-[#4ADE80]">
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
      <h2 className="text-center font-display text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
        Quick answers
      </h2>
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <div
            key={i.q}
            className="rounded-2xl border border-[#E7E5E4] bg-white p-5 dark:border-[#27272A] dark:bg-[#13131A]"
          >
            <h3 className="flex items-start gap-2 text-sm font-semibold text-[#0F172A] dark:text-white">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" />
              {i.q}
            </h3>
            <p className="mt-2 pl-6 text-sm text-[#475569] dark:text-[#CBD5E1]">
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
