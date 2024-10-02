import type { FC } from 'react';

import { useGetThreadsQuery } from '@/api/thread-api';

import type { ThreadListItemProps } from './thread-list-item-types';

export const ThreadListItem: FC<ThreadListItemProps> = ({ threadId }) => {
  const { thread } = useGetThreadsQuery(undefined, {
    selectFromResult: ({ data: threads }) => ({
      thread: threads?.find(({ id }) => id === threadId),
    }),
  });

  return (
    thread && (
      <li className="flex">
        {thread.threadUsers.map(
          ({ user }) => `${user.firstName} ${user.lastName}`,
        )}
      </li>
    )
  );
};
