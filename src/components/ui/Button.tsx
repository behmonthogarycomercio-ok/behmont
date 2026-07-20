import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'whatsapp' | 'outline' | 'tactile-navy' | 'tactile-red';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-steel-900 text-white hover:bg-steel-800',
  whatsapp: 'bg-whatsapp-600 text-white hover:bg-whatsapp-700',
  outline: 'border border-plate-200 bg-white text-steel-800 hover:bg-plate-100',
  'tactile-navy':
    'bg-gradient-to-b from-[#182548] to-[#111C38] hover:from-[#213262] hover:to-[#182548] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_16px_-6px_rgba(10,18,38,0.5)] hover:-translate-y-px active:translate-y-px',
  'tactile-red':
    'bg-gradient-to-b from-[#F15458] to-[#ED3237] hover:to-[#D62A2F] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_20px_-6px_rgba(237,50,55,0.5)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_16px_28px_-6px_rgba(237,50,55,0.55)] active:translate-y-px',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-5 py-3 text-sm gap-2',
};

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return clsx(
    'inline-flex items-center justify-center rounded-lg font-semibold transition active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}
