import type { FC } from 'react';

import { Avatar, ButtonBase, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router';
import { capitalize } from 'remeda';

import { useGetThreadsQuery } from '@/api/thread-api';
import { useGetMyUserQuery } from '@/api/user-api';

import type { ThreadsListItemProps } from './threads-list-item-types';

export const ThreadsListItem: FC<ThreadsListItemProps> = ({ threadId }) => {
  const { thread } = useGetThreadsQuery(undefined, {
    selectFromResult: ({ data: threads }) => ({
      thread: threads?.find(({ id }) => id === threadId),
    }),
  });
  const { myUserId } = useGetMyUserQuery(undefined, {
    selectFromResult: ({ data: user }) => ({
      myUserId: user?.id,
    }),
  });

  const lastMessage = thread?.lastMessages.at(-1);
  const lastMessageUser =
    lastMessage &&
    thread?.threadUsers.find(({ userId }) => userId === lastMessage.userId);

  const threadUser = thread?.threadUsers.find(
    ({ userId }) => userId !== myUserId,
  );
  const threadUserFirstNameInitial = threadUser?.user.firstName.at(0);
  const threadUserLastNameInitial = threadUser?.user.lastName.at(0);
  const threadUserNameInitials =
    threadUserFirstNameInitial &&
    threadUserLastNameInitial &&
    `${threadUserFirstNameInitial}${threadUserLastNameInitial}`;

  return (
    thread &&
    threadUser && (
      <li>
        <ButtonBase
          className="flex h-[5rem] w-full items-center justify-between border-b border-solid border-purple-500 p-2"
          component={Link}
          to={`/threads/${thread.id.toString()}`}
        >
          <div className="flex items-center gap-4">
            <Avatar className="bg-purple-400 text-white">
              {threadUserNameInitials}
            </Avatar>
            {lastMessage && lastMessageUser && (
              <div>
                <Typography className="font-semibold text-purple-900">
                  {threadUser.user.firstName}&nbsp;
                  {threadUser.user.lastName}
                </Typography>
                <Typography className="text-purple-800">
                  {lastMessage.content}
                </Typography>
              </div>
            )}
          </div>
          {lastMessage && (
            <Typography>
              {capitalize(formatDistanceToNow(new Date(lastMessage.createdAt)))}
            </Typography>
          )}
        </ButtonBase>
      </li>
    )
  );
};
