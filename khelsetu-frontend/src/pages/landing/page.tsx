import { CursorGlow } from '@shared/components/animations';

import { CTA } from './sections/CTA';
import { FAQ } from './sections/FAQ';
import { Features } from './sections/Features';
import { Hero } from './sections/Hero';
import { HowItWorks } from './sections/HowItWorks';
import { Metrics } from './sections/Metrics';
import { Pricing } from './sections/Pricing';
import { SocialProof } from './sections/SocialProof';
import { Sports } from './sections/Sports';
import { Testimonials } from './sections/Testimonials';

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
