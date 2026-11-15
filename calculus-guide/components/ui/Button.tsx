import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex min-h-11 cursor-pointer items-center justify-center font-sans font-semibold rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantStyles = {
    primary:
      'bg-brand-primary text-ink-inverse hover:bg-brand-primary-hover shadow-sm focus-visible:outline-brand-accent',
    secondary:
      'bg-surface-2 text-ink-primary border border-hairline hover:bg-paper-edge focus-visible:outline-brand-accent',
    outline:
      'border border-specular bg-surface-1 text-ink-primary hover:bg-surface-2 focus-visible:outline-brand-accent',
    ghost:
      'text-ink-secondary hover:bg-surface-2 hover:text-ink-primary focus-visible:outline-brand-accent',
  };

  const combinedClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
