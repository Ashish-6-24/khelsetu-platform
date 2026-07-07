import { CursorGlow } from '@shared/ui/animations';

import { CTA } from '../components/landing/CTA';
import { FAQ } from '../components/landing/FAQ';
import { Features } from '../components/landing/Features';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Metrics } from '../components/landing/Metrics';
import { Pricing } from '../components/landing/Pricing';
import { SocialProof } from '../components/landing/SocialProof';
import { Sports } from '../components/landing/Sports';
import { Testimonials } from '../components/landing/Testimonials';

export const LandingPage = () => (
  <div className="relative overflow-hidden">
    <CursorGlow />
    <Hero />
    <SocialProof />
    <Sports />
    <Features />
    <Metrics />
    <HowItWorks />
    <Testimonials />
    <Pricing />
    <FAQ />
    <CTA />
  </div>
);
