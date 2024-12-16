import { z } from 'zod';

export const ThreadMessage = z.object({
  content: z.string(),
  createdAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
  id: z.number(),
  threadId: z.number(),
  updatedAt: z.string().datetime(),
  userId: z.number(),
});

export interface ThreadMessage extends z.infer<typeof ThreadMessage> {}

export const Thread = z.object({
  createdAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
  id: z.number(),
  updatedAt: z.string().datetime(),
});

export interface Thread extends z.infer<typeof Thread> {}

export const ThreadUser = z.object({
  createdAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
  id: z.number(),
  threadId: z.number(),
  updatedAt: z.string().datetime(),
  userId: z.number(),
  viewedThreadLastAt: z.string().datetime(),
});

export interface ThreadUser extends z.infer<typeof ThreadUser> {}
