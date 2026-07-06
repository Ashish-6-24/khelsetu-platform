import { Reveal } from '@shared/components/animations';
import { FloatingOrb } from '@shared/components/ui/FloatingOrb';
import { Logo } from '@shared/components/ui/Logo';
import { ROUTES } from '@shared/utils/constants';
import {
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';

import { Link } from 'react-router-dom';

export const CTA = () => (
  <Reveal intensity="bold">
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-16 gradient-animate"
          style={{
            background:
              'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-active) 50%, var(--bg-surface-raised) 100%)',
            backgroundSize: '400% 400%',
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <FloatingOrb
            color="var(--brand-accent)"
            size={280}
            delay={0}
            duration={18}
            className="-left-20 -top-20"
          />
          <FloatingOrb
            color="var(--brand-primary)"
            size={220}
            delay={3}
            duration={22}
            className="-right-16 -bottom-16"
          />
          <div className="relative">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{
                background:
                  'linear-gradient(135deg, var(--brand-accent) 0%, var(--brand-accent-hover) 100%)',
              }}
            >
              <Zap className="h-7 w-7" />
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold -tracking-[0.02em] text-white sm:text-5xl">
              Ready to run your{' '}
              <span className="italic text-yellow-300">
                best tournament
              </span>{' '}
              yet?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base font-medium text-white sm:text-lg">
              Join 1,200+ organizers who trust KhelSetu to deliver unforgettable
              sporting moments across Nepal.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to={ROUTES.REGISTER}>
                <button className="shine inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[var(--brand-primary)] shadow-lg transition-all hover:shadow-xl">
                  Start a tournament — free
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to={ROUTES.LOGIN}>
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20">
                  <ShieldCheck className="h-4 w-4" />
                  Sign in
                </button>
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'No credit card', icon: CheckCircle2 },
                { label: 'Free under 8 teams', icon: Trophy },
                { label: '24/7 Nepali support', icon: ShieldCheck },
                { label: 'Cancel anytime', icon: Sparkles },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur"
                >
                  <chip.icon className="h-3.5 w-3.5 text-yellow-300" />
                  {chip.label}
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-white/90">
              <Logo size="sm" variant="white" withWordmark={false} />
              Made with care in Nepal
            </div>
          </div>
        </div>
      </div>
    </section>
  </Reveal>
);
