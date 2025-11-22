import * as React from 'react';

export type CardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

/**
 * Card Component
 * Design system card container
 */
export function Card({ children, title, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-neutral-200 p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>}
      {children}
    </div>
  );
}

