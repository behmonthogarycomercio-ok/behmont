import { z } from 'zod';
import type { StaffName } from './push';

export const STAFF: readonly StaffName[] = ['lucas', 'luz', 'lito'];
export const STAFF_LABELS: Record<StaffName, string> = { lucas: 'Lucas', luz: 'Luz', lito: 'Lito' };

export const staffSchema = z.enum(STAFF as [StaffName, ...StaffName[]]);

export const visitSchema = z.object({
  attendedBy: staffSchema,
  regularOf: staffSchema.nullable(),
});
