import { redirect } from 'next/navigation';
import { getSession } from '../../lib/auth/session';
import { LoginForm } from './_components/LoginForm';
import { ForgotPasswordNotice } from './_components/ForgotPasswordNotice';
import { Typography } from '@shared/ui';

/**
 * Login Page (Server Component)
 * 
 * Redirects to dashboard if already authenticated
 */
export default async function LoginPage() {
  // Check if user is already logged in
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <Typography variant="h2" className="mb-6 text-center">
          Acesso ao Sistema
        </Typography>

        <LoginForm />

        <div className="mt-4 text-center">
          <ForgotPasswordNotice />
        </div>
      </div>
    </div>
  );
}
