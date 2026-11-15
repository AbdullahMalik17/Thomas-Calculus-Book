import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
}

export function Card({ children, className = '', title, subtitle, footer }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-1 rounded-xl border border-specular shadow-sm overflow-hidden hover:shadow-md transition-shadow',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-hairline bg-surface-0/60">
          {title && <h3 className="font-reading text-lg font-bold tracking-display text-ink-primary">{title}</h3>}
          {subtitle && <p className="text-sm font-sans text-ink-muted mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className="p-4 sm:p-6">{children}</div>
      {footer && (
        <div className="px-6 py-3 bg-surface-2 border-t border-hairline">
          {footer}
        </div>
      )}
    </div>
  );
}
