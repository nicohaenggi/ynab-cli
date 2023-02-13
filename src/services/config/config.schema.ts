import { z } from 'zod';

export const ConfigSchema = z.object({
  authentication: z.nullable(
    z.object({
      accessToken: z.string().min(1),
    }),
  ),
  connections: z.array(
    z.object({
      name: z.string(),
      provider: z.string(),
      budget: z.string(),
      account: z.string(),
      lastSynced: z.nullable(z.date()),
      config: z.object({
        path: z.string(),
      }),
    }),
  ),
});
export type ConfigSchema = z.infer<typeof ConfigSchema>;
