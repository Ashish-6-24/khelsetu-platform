import { CursorGlow } from '@shared/components/animations';
import { Hero } from './sections/Hero';
import { SocialProof } from './sections/SocialProof';
import { Features } from './sections/Features';
import { Sports } from './sections/Sports';
import { HowItWorks } from './sections/HowItWorks';
import { Metrics } from './sections/Metrics';
import { Testimonials } from './sections/Testimonials';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { CTA } from './sections/CTA';

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
