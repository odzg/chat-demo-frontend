import { z } from 'zod';

const Env = z.object({
  VITE_API_BASE_URL: z.url(),
});

export const env = Env.parse(import.meta.env);
