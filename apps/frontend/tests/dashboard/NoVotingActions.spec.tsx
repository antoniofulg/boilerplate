import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardPage } from '../../../app/dashboard/page';

/**
 * Component Test: No Voting Actions
 * 
 * Ensures MVP dashboard does NOT render any voting/management buttons
 */
describe('Dashboard - No Voting Actions', () => {
  it('should NOT render vote button', () => {
    render(<DashboardPage />);

    expect(screen.queryByRole('button', { name: /votar/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /aprovar/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /rejeitar/i })).not.toBeInTheDocument();
  });

  it('should NOT render management buttons', () => {
    render(<DashboardPage />);

    expect(screen.queryByRole('button', { name: /criar/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /editar/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /excluir/i })).not.toBeInTheDocument();
  });

  it('should only render static content (read-only)', () => {
    render(<DashboardPage />);

    // Should render static content
    expect(screen.getByText(/sessão atual/i)).toBeInTheDocument();
    expect(screen.getByText(/pauta em votação/i)).toBeInTheDocument();
    expect(screen.getByText(/membros presentes/i)).toBeInTheDocument();
    expect(screen.getByText(/resultados recentes/i)).toBeInTheDocument();
  });
});

