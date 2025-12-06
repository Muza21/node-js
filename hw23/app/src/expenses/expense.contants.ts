export const KNOW_CATEGORIES = [
  'food',
  'gym',
  'electronics',
  'shopping',
] as const;
export type ExpenseCategory = (typeof KNOW_CATEGORIES)[number];
