import { env } from '@/constants/env';
import { CreateThreadMessageSchema } from '@/schemas/event-schemas';
import { parseJson } from '@/utils/parse-json-string';

import type {
  CreateThreadMessageQueryArg,
  CreateThreadMessageQueryResult,
  GetThreadMessagesQueryArg,
  GetThreadMessagesQueryResult,
  GetThreadQueryArg,
  GetThreadQueryResult,
  GetThreadsQueryArg,
  GetThreadsQueryRawResult,
  GetThreadsQueryTransformedResult,
  GetThreadUsersQueryArg,
  GetThreadUsersQueryResult,
} from './thread-api-types';

import { api } from '../api';

const THREADS_PATH = '/threads';

const getThreadRoute = (threadId: number) =>
  `${THREADS_PATH}/${threadId.toString()}` as const;
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
      async onCacheEntryAdded({ threadId }, api) {
        const ws = new WebSocket(`${env.VITE_API_BASE_URL}/websocket`);

        try {
          // wait for the initial query to resolve before proceeding
          await api.cacheDataLoaded;

          ws.addEventListener('message', (event) => {
            if (typeof event.data === 'string') {
              const { data } = CreateThreadMessageSchema.safeParse(
                parseJson(event.data),
              );
              const isSameThread = data?.payload.threadId === threadId;

              if (data && isSameThread) {
                api.updateCachedData((draft) => {
                  const isMessageAlreadyCached = draft.some(
                    ({ id }) => id === data.payload.id,
                  );

                  if (!isMessageAlreadyCached) {
                    draft.push(data.payload);
                  }
                });
              }
            }
          });
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
    getThreads: build.query<
      GetThreadsQueryTransformedResult,
      GetThreadsQueryArg
    >({
      async onCacheEntryAdded(_arg, api) {
        const ws = new WebSocket(`${env.VITE_API_BASE_URL}/websocket`);

        try {
          // wait for the initial query to resolve before proceeding
          await api.cacheDataLoaded;

          ws.addEventListener('message', (event) => {
            if (typeof event.data === 'string') {
              const { data } = CreateThreadMessageSchema.safeParse(
                parseJson(event.data),
              );

              if (data) {
                api.updateCachedData((draft) => {
                  const associatedThread = draft.find(
                    ({ id }) => id === data.payload.threadId,
                  );
                  const isMessageAlreadyCached =
                    !!associatedThread?.lastMessages.some(
                      ({ id }) => id === data.payload.id,
                    );

                  if (associatedThread && !isMessageAlreadyCached) {
                    associatedThread.lastMessages.push(data.payload);
                  }
                });
              }
            }
          });
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await api.cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
      query: () => THREADS_PATH,
      transformResponse: (threads: GetThreadsQueryRawResult) =>
        threads.map<GetThreadsQueryTransformedResult[number]>(
          ({ lastMessage, ...thread }) => ({
            ...thread,
            lastMessages: lastMessage ? [lastMessage] : [],
          }),
        ),
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
