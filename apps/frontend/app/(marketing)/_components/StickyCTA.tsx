'use client';

import Link from 'next/link';
import { Button } from '@shared/ui';
import { trackEvent } from '../../../lib/telemetry/events';

/**
 * Sticky CTA Component
 * 
 * Sticky CTA bar that appears at the top when scrolling (mobile-friendly)
 */
export function StickyCTA() {
  const handleCTAClick = () => {
    trackEvent({ type: 'landing_cta_click' });
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm md:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center">
        <Link href="/login" onClick={handleCTAClick} className="w-full">
          <Button size="md" className="w-full bg-primary-600 hover:bg-primary-700">
            Entrar
          </Button>
        </Link>
      </div>
    </div>
  );
}

