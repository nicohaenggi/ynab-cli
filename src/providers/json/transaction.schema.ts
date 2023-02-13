import { z } from 'zod';

export const TransactionSchema = z.object({
  date: z.date(),
});
export type Transaction = z.infer<typeof TransactionSchema>;
