'use client';

import Link from 'next/link';
import { Button } from '@shared/ui';
import { Typography } from '@shared/ui';
import { trackEvent } from '../../../lib/telemetry/events';

/**
 * Hero Section Component
 * 
 * Main hero section with title, subtitle, and CTA button
 */
export function HeroSection() {
  const handleCTAClick = () => {
    trackEvent({ type: 'landing_cta_click' });
  };

  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Typography variant="h1" className="mb-6 text-white">
          Votação Inteligente para Câmaras Municipais
        </Typography>
        <Typography variant="body" className="mb-8 text-primary-100 text-lg max-w-2xl mx-auto">
          Sistema moderno e seguro para gestão de sessões, pautas e votações.
          Simplifique os processos legislativos com tecnologia de ponta.
        </Typography>
        <Link href="/login" onClick={handleCTAClick}>
          <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
            Entrar
          </Button>
        </Link>
      </div>
    </section>
  );
}

