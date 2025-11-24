import { HeroSection } from './_components/HeroSection';
import { BenefitsSection } from './_components/BenefitsSection';
import { HowItWorksSection } from './_components/HowItWorksSection';
import { Footer } from './_components/Footer';
import { FloatingCTA } from './_components/FloatingCTA';
import { StickyCTA } from './_components/StickyCTA';

/**
 * Landing Page (SSG - Static Site Generation)
 * 
 * Pre-rendered at build time for optimal performance.
 * Includes:
 * - Hero section with CTA
 * - Benefits section (3 benefits)
 * - How It Works section (3 steps)
 * - Institutional footer
 * - Sticky/floating CTA (always visible)
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky CTA for mobile */}
      <StickyCTA />

      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Footer */}
      <Footer />

      {/* Floating CTA for desktop */}
      <FloatingCTA />
    </div>
  );
}

// SSG: Static Site Generation
// This page is pre-rendered at build time
export const dynamic = 'force-static';
