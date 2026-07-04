import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export type BadgeVariant = 'amber' | 'plate';

const variantClasses: Record<BadgeVariant, string> = {
  amber: 'bg-amber-500 text-white',
  plate: 'bg-plate-200 text-steel-800',
};

export default function Badge({
  children,
  variant = 'amber',
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'badge-plate inline-block rounded-full px-2.5 py-1 text-[11px] font-bold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
