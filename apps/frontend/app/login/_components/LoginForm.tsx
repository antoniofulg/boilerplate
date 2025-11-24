'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLoginRequestSchema, type AuthLoginRequest } from '../../../lib/contracts';
import { apiFetch } from '../../../lib/http/client';
import { trackEvent } from '../../../lib/telemetry/events';
import { Button, Input } from '@shared/ui';

/**
 * Login Form Component (Client Component)
 * 
 * Handles form submission, validation, and error display
 */
export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate form data
    const formData: AuthLoginRequest = {
      emailInstitucional: email,
      senha: password,
    };

    try {
      // Validate with Zod schema
      AuthLoginRequestSchema.parse(formData);

      // Track login attempt
      trackEvent({ type: 'login_attempt', email });

      // Submit login
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        body: formData,
      });

      // Track success
      trackEvent({ type: 'login_success', email });

      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      // Handle validation errors
      if (err instanceof Error && err.message.includes('ZodError')) {
        setError('Por favor, preencha todos os campos corretamente.');
      } else if (err instanceof Error) {
        setError(err.message || 'Credenciais inválidas');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }

      // Track failure
      trackEvent({
        type: 'login_failure',
        email,
        reason: error || 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="E-mail Institucional"
        type="email"
        name="emailInstitucional"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        required
        disabled={loading}
      />

      <Input
        label="Senha"
        type="password"
        name="senha"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        required
        disabled={loading}
      />

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}

