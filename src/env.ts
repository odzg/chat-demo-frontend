import { z } from 'zod/v4';

const Env = z.object({
  VITE_API_BASE_URL: z.url(),
});

export const env = Env.parse(import.meta.env);
