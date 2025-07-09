import { z } from 'zod';

export const ThreadMessage = z.object({
  content: z.string(),
  createdAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  id: z.number(),
  threadId: z.number(),
  updatedAt: z.iso.datetime(),
  userId: z.number(),
});

export interface ThreadMessage extends z.infer<typeof ThreadMessage> {}

export const Thread = z.object({
  createdAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  id: z.number(),
  updatedAt: z.iso.datetime(),
});

export interface Thread extends z.infer<typeof Thread> {}

export const ThreadUser = z.object({
  createdAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  id: z.number(),
  threadId: z.number(),
  updatedAt: z.iso.datetime(),
  userId: z.number(),
  viewedThreadLastAt: z.iso.datetime(),
});

export interface ThreadUser extends z.infer<typeof ThreadUser> {}
