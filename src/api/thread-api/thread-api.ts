import { CreateThreadMessageSchema } from '@/schemas/event-schemas';

import type {
  CreateThreadMessageQueryArg,
  CreateThreadMessageQueryResult,
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
    createThreadMessage: build.mutation<
      CreateThreadMessageQueryResult,
      CreateThreadMessageQueryArg
    >({
      query: ({ threadId, threadMessage }) => ({
        body: threadMessage,
        method: 'POST',
        url: getThreadMessagesRoute(threadId),
      }),
    }),
    getThread: build.query<GetThreadQueryResult, GetThreadQueryArg>({
      query: ({ threadId }) => getThreadRoute(threadId),
    }),
    getThreadMessages: build.query<
      GetThreadMessagesQueryResult,
      GetThreadMessagesQueryArg
    >({
      async onCacheEntryAdded(_arg, api) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket('ws://localhost:4000');
        try {
          // wait for the initial query to resolve before proceeding
          await api.cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            const { data } = CreateThreadMessageSchema.safeParse(
              JSON.parse(event.data as string) as unknown,
            );

            if (data) {
              api.updateCachedData((draft) => {
                draft.push(data.data);
              });
            }
          };

          ws.addEventListener('message', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await api.cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
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
  useCreateThreadMessageMutation,
  useGetThreadMessagesQuery,
  useGetThreadQuery,
  useGetThreadsQuery,
  useGetThreadUsersQuery,
} = threadApi;
