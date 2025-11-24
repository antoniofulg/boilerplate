import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Voting - Sistema de Votação Inteligente',
  description: 'Sistema moderno e seguro para gestão de sessões, pautas e votações em câmaras municipais',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

