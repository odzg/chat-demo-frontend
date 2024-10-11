import type { FC } from 'react';

import { Typography } from '@mui/material';

import { useGetThreadMessagesQuery } from '@/api/thread-api';

import type { ThreadProps } from './thread-types';

import { MessageBubble } from './message-bubble';
import { ThreadFooter } from './thread-footer';

export const Thread: FC<ThreadProps> = ({ threadId }) => {
  const { data: threadMessages } = useGetThreadMessagesQuery({ threadId });

  return (
    <div className="flex h-full w-full max-w-[44rem] flex-col justify-between gap-4">
      {threadMessages?.length ? (
        <ul className="flex h-full max-h-full flex-col overflow-y-auto">
          {threadMessages.map(({ id }) => (
            <MessageBubble key={id} threadId={threadId} threadMessageId={id} />
          ))}
        </ul>
      ) : (
        <div>
          <Typography>No messages yet</Typography>
        </div>
      )}
      <ThreadFooter threadId={threadId} />
    </div>
  );
};
