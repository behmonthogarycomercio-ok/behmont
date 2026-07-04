import { clsx } from 'clsx';
import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none',
        className
      )}
      {...props}
    />
  );
}
