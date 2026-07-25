'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { ActionResult } from '@/lib/actions';

export default function AdminActionForm({
  action,
  className,
  children,
  redirectTo,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
  className?: string;
  children: React.ReactNode;
  /** Si se pasa, navega ahí después de guardar con éxito (ej. para salir del modo edición). */
  redirectTo?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) {
        setError(result.error);
        return;
      }
      if (redirectTo) {
        router.push(redirectTo);
        return;
      }
      formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className={className}>
      <fieldset disabled={pending} className="contents">
        {children}
      </fieldset>
      {error && <p role="alert" className="mt-2 text-xs font-medium text-danger-600">{error}</p>}
    </form>
  );
}
