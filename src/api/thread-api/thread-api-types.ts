import type { Except, SimplifyDeep } from 'type-fest';

import type {
  Thread,
  ThreadMessage,
  ThreadUser,
} from '@/schemas/thread-schemas';
import type { User } from '@/schemas/user-schemas';
import type { RtkqVoidQueryArgument } from '@/types/utility-types';

export interface CreateThreadMessageQueryArgument {
  threadId: number;
  threadMessage: Pick<ThreadMessage, 'content' | 'userId'>;
}
export type CreateThreadMessageQueryResult = ThreadMessage;
export interface GetThreadMessagesQueryArgument {
  threadId: number;
}

export type GetThreadMessagesQueryResult = Array<ThreadMessage>;
export interface GetThreadQueryArgument {
  threadId: number;
}

export type GetThreadQueryResult = Thread;
export type GetThreadsQueryArgument = RtkqVoidQueryArgument;

export type GetThreadsQueryRawResult = SimplifyDeep<
  Array<
    Thread & {
      lastMessage: null | ThreadMessage;
      threadUsers: Array<
        ThreadUser & {
          user: User;
        }
      >;
    }
  >
>;
export type GetThreadsQueryTransformedResult = SimplifyDeep<
  Array<
    Except<GetThreadsQueryRawResult[number], 'lastMessage'> & {
      lastMessages: Array<ThreadMessage>;
    }
  >
>;

export interface GetThreadUsersQueryArgument {
  threadId: number;
}
export type GetThreadUsersQueryResult = SimplifyDeep<
  Array<
    ThreadUser & {
      user: User;
    }
  >
>;
