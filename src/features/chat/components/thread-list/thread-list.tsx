import type { FC } from 'react';

import { useGetThreadsQuery } from '@/api/thread-api';

import { ThreadListItem } from './thread-list-item';

export const ThreadList: FC = () => {
  const { data: threads, isLoading } = useGetThreadsQuery();

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div>
      {threads?.length ? (
        <ul>
          {threads.map(({ id }) => (
            <ThreadListItem key={id} threadId={id} />
          ))}
        </ul>
      ) : (
        'No chats yet.'
      )}
    </div>
  );
};
