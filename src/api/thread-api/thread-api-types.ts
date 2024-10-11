import type { Except, SimplifyDeep } from 'type-fest';

import type {
  Thread,
  ThreadMessage,
  ThreadUser,
} from '@/schemas/thread-schemas';
import type { User } from '@/schemas/user-schemas';
import type { RtkqVoidQueryArg } from '@/types/utility-types';

export type GetThreadsQueryArg = RtkqVoidQueryArg;
export type GetThreadsQueryRawResult = SimplifyDeep<
  Array<
    {
      lastMessage: null | ThreadMessage;
      threadUsers: Array<
        {
          user: User;
        } & ThreadUser
      >;
    } & Thread
  >
>;
export type GetThreadsQueryTransformedResult = SimplifyDeep<
  Array<
    {
      lastMessages: Array<ThreadMessage>;
    } & Except<GetThreadsQueryRawResult[number], 'lastMessage'>
  >
>;

export type GetThreadQueryArg = {
  threadId: number;
};
export type GetThreadQueryResult = Thread;

export type GetThreadUsersQueryArg = {
  threadId: number;
};
export type GetThreadUsersQueryResult = SimplifyDeep<
  Array<
    {
      user: User;
    } & ThreadUser
  >
>;

export type GetThreadMessagesQueryArg = {
  threadId: number;
};
export type GetThreadMessagesQueryResult = Array<ThreadMessage>;

export type CreateThreadMessageQueryArg = {
  threadId: number;
  threadMessage: Pick<ThreadMessage, 'content' | 'userId'>;
};
export type CreateThreadMessageQueryResult = ThreadMessage;
