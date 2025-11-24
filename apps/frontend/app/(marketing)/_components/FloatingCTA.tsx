'use client';

import Link from 'next/link';
import { Button } from '@shared/ui';
import { trackEvent } from '../../../lib/telemetry/events';

/**
 * Floating CTA Component
 * 
 * Sticky/floating CTA button that stays visible while scrolling
 */
export function FloatingCTA() {
  const handleCTAClick = () => {
    trackEvent({ type: 'landing_cta_click' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 md:block hidden">
      <Link href="/login" onClick={handleCTAClick}>
        <Button
          size="lg"
          className="shadow-lg hover:shadow-xl transition-shadow bg-primary-600 hover:bg-primary-700"
        >
          Entrar
        </Button>
      </Link>
    </div>
  );
}

