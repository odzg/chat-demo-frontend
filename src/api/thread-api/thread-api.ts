import type {
  GetThreadMessagesQueryArg,
  GetThreadMessagesQueryResult,
  GetThreadQueryArg,
  GetThreadQueryResult,
  GetThreadsQueryArg,
  GetThreadsQueryResult,
  GetThreadUsersQueryArg,
  GetThreadUsersQueryResult,
} from './thread-api-types';

import { api } from '../api';

const THREADS_ROUTE = '/threads';

const getThreadRoute = (threadId: number) =>
  `${THREADS_ROUTE}/${threadId.toString()}` as const;
const getThreadMessagesRoute = (threadId: number) =>
  `${getThreadRoute(threadId)}/messages` as const;
const getThreadUsersRoute = (threadId: number) =>
  `${getThreadRoute(threadId)}/users` as const;

export const threadApi = api.injectEndpoints({
  endpoints: (build) => ({
    getThread: build.query<GetThreadQueryResult, GetThreadQueryArg>({
      query: ({ threadId }) => getThreadRoute(threadId),
    }),
    getThreadMessages: build.query<
      GetThreadMessagesQueryResult,
      GetThreadMessagesQueryArg
    >({
      query: ({ threadId }) => getThreadMessagesRoute(threadId),
    }),
    getThreads: build.query<GetThreadsQueryResult, GetThreadsQueryArg>({
      query: () => THREADS_ROUTE,
    }),
    getThreadUsers: build.query<
      GetThreadUsersQueryResult,
      GetThreadUsersQueryArg
    >({
      query: ({ threadId }) => getThreadUsersRoute(threadId),
    }),
  }),
});

export const {
  useGetThreadMessagesQuery,
  useGetThreadQuery,
  useGetThreadsQuery,
  useGetThreadUsersQuery,
} = threadApi;
