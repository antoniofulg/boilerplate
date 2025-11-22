import * as React from 'react';

export type TypographyProps = {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'caption';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Typography Component
 * Design system typography with semantic variants
 */
export function Typography({
  children,
  variant = 'body',
  className = '',
  as,
}: TypographyProps) {
  const variantClasses = {
    h1: 'text-4xl font-bold text-neutral-900',
    h2: 'text-3xl font-bold text-neutral-900',
    h3: 'text-2xl font-semibold text-neutral-900',
    h4: 'text-xl font-semibold text-neutral-900',
    body: 'text-base text-neutral-700',
    small: 'text-sm text-neutral-600',
    caption: 'text-xs text-neutral-500',
  };

  const Component = as || (variant.startsWith('h') ? variant : 'p');

  return <Component className={`${variantClasses[variant]} ${className}`}>{children}</Component>;
}

