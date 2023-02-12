import { z } from 'zod';

export const ConfigSchema = z.object({
  authentication: z.optional(
    z.object({
      accessToken: z.string().min(1),
    }),
  ),
});
export type ConfigSchema = z.infer<typeof ConfigSchema>;
