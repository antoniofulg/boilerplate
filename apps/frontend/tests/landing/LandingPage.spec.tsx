import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingPage from '../../../app/(marketing)/page';

/**
 * Component Test: Landing Page
 * 
 * Tests:
 * - Hero section with title and subtitle
 * - Benefits section (3 benefits)
 * - How It Works section (3 steps)
 * - Sticky/floating CTA button
 * - Footer
 */
describe('LandingPage', () => {
  it('should render hero section with title and CTA', () => {
    render(<LandingPage />);

    expect(screen.getByText(/votação inteligente/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should render benefits section with 3 benefits', () => {
    render(<LandingPage />);

    expect(screen.getByText(/segurança/i)).toBeInTheDocument();
    expect(screen.getByText(/gestão/i)).toBeInTheDocument();
    expect(screen.getByText(/resultados em tempo real/i)).toBeInTheDocument();
  });

  it('should render how it works section with 3 steps', () => {
    render(<LandingPage />);

    // Should have step indicators or numbered items
    const steps = screen.getAllByText(/passo|step/i);
    expect(steps.length).toBeGreaterThanOrEqual(3);
  });

  it('should have sticky/floating CTA button', () => {
    render(<LandingPage />);

    const ctaButtons = screen.getAllByRole('button', { name: /entrar/i });
    expect(ctaButtons.length).toBeGreaterThan(0);

    // Check if at least one CTA has sticky/floating classes
    const stickyCTA = ctaButtons.find((button) =>
      button.className.includes('fixed') || button.className.includes('sticky')
    );
    expect(stickyCTA).toBeDefined();
  });

  it('should render institutional footer', () => {
    render(<LandingPage />);

    expect(screen.getByText(/câmara/i)).toBeInTheDocument();
  });
});

