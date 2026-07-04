import { clsx } from 'clsx';
import type { TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={clsx(
        'w-full rounded-lg border border-plate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none',
        className
      )}
      {...props}
    />
  );
}
