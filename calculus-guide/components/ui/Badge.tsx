import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'secondary';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-surface-2 text-ink-primary border-specular',
    secondary: 'bg-callout-example-bg text-callout-example-ink border-specular',
    primary: 'bg-callout-definition-bg text-callout-definition-ink border-specular',
    success: 'bg-callout-theorem-bg text-callout-theorem-ink border-specular',
    warning: 'bg-callout-misconception-bg text-callout-misconception-ink border-specular',
    info: 'bg-brand-accent-subtle text-brand-accent border-specular',
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-sans font-semibold tabular-nums border',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
