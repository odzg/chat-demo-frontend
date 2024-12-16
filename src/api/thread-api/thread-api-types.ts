import type { Except, SimplifyDeep } from 'type-fest';

import type {
  Thread,
  ThreadMessage,
  ThreadUser,
} from '@/schemas/thread-schemas';
import type { User } from '@/schemas/user-schemas';

export interface CreateThreadMessageQueryArgument {
  threadId: number;
  threadMessage: Pick<ThreadMessage, 'content' | 'userId'>;
}
export interface CreateThreadMessageQueryResult extends ThreadMessage {}
export interface GetThreadMessagesQueryArgument {
  threadId: number;
}

export type GetThreadMessagesQueryResult = Array<ThreadMessage>;
export interface GetThreadQueryArgument {
  threadId: number;
}

export interface GetThreadQueryResult extends Thread {}

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
