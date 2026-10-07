import React from 'react';

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
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    secondary: 'bg-purple-50 text-purple-700 border-purple-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold border ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
