import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../../../app/login/_components/LoginForm';

/**
 * Component Test: Login Form
 * 
 * Tests:
 * - Form validation (email, password)
 * - Error message display
 * - Accessibility (labels, ARIA)
 * - Loading states
 */
describe('LoginForm', () => {
  it('should render login form with all fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/e-mail institucional/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/e-mail institucional é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/a senha deve ter no mínimo 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('should show error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/e-mail institucional/i);
    await user.type(emailInput, 'invalid-email');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    });
  });

  it('should display error message on login failure', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/e-mail institucional/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    await user.type(emailInput, 'invalid@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
    });
  });
});

