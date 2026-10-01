import { z } from 'zod';
import type { StaffName } from './push';

export const STAFF: readonly StaffName[] = ['lucas', 'luz', 'lito'];
export const STAFF_LABELS: Record<StaffName, string> = { lucas: 'Lucas', luz: 'Luz', lito: 'Lito' };

export const staffSchema = z.enum(STAFF as [StaffName, ...StaffName[]]);

export const RELATIONS = ['same', 'other', 'social', 'new'] as const;
export type Relation = (typeof RELATIONS)[number];
export const relationSchema = z.enum(RELATIONS);

export const RELATION_LABELS: Record<Relation, string> = {
  same: 'Ya era cliente de esa persona',
  other: 'Ya era cliente, de otra persona',
  social: 'Consultó antes por redes',
  new: 'Primera vez en BEHMONT',
};

export const visitSchema = z.object({
  attendedBy: staffSchema,
  relation: relationSchema,
});
