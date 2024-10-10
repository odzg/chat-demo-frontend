import type { FC } from 'react';

import { Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { capitalize } from 'remeda';
import { twJoin } from 'tailwind-merge';

import {
  useGetThreadMessagesQuery,
  useGetThreadUsersQuery,
} from '@/api/thread-api';
import { useGetMyUserQuery } from '@/api/user-api';

import type { MessageBubbleProps } from './message-bubble-types';

export const MessageBubble: FC<MessageBubbleProps> = ({
  threadId,
  threadMessageId,
}) => {
  const { message } = useGetThreadMessagesQuery(
    { threadId },
    {
      selectFromResult: ({ data: threadMessages }) => ({
        message: threadMessages?.find(({ id }) => id === threadMessageId),
      }),
    },
  );
  const { data: user } = useGetMyUserQuery();
  const { sender } = useGetThreadUsersQuery(
    { threadId },
    {
      selectFromResult: ({ data: threadUsers }) => ({
        sender: threadUsers?.find(({ userId }) => userId === message?.userId),
      }),
    },
  );

  const wasSentByCurrentUser = sender?.userId === user?.id;
  const senderName = wasSentByCurrentUser
    ? 'You'
    : sender && `${sender.user.firstName} ${sender.user.lastName}`;

  return (
    message && (
      <div
        className={twJoin(
          'mb-4 flex flex-col',
          wasSentByCurrentUser ? 'items-end' : 'items-start',
        )}
      >
        <Typography className="mb-1 text-purple-950" variant="caption">
          {senderName}
        </Typography>
        <div
          className={twJoin(
            'max-w-xs rounded-lg px-4 py-2 text-white',
            wasSentByCurrentUser ? 'bg-purple-400' : 'bg-purple-700',
          )}
        >
          <Typography>{message.content}</Typography>
        </div>
        <Typography className="mt-1 text-purple-950" variant="caption">
          {capitalize(formatDistanceToNow(new Date(message.createdAt)))}
        </Typography>
      </div>
    )
  );
};
