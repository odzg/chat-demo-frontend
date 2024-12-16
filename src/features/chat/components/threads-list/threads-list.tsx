import type { FC } from 'react';

import { useGetThreadsQuery } from '@/api/thread-api';

import { ThreadsListItem } from './threads-list-item';

export const ThreadsList: FC = () => {
  const { data: threads, isLoading } = useGetThreadsQuery();

  if (isLoading) {
    return <>Loading...</>;
  }

  return threads?.length ? (
    <ul className="flex w-full max-w-[44rem] flex-col overflow-y-auto">
      {threads.map(({ id }) => (
        <ThreadsListItem key={id} threadId={id} />
      ))}
    </ul>
  ) : (
    <span>No chats yet.</span>
  );
};
