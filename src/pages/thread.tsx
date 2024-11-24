import type { FC } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Link, Navigate, useParams } from 'react-router-dom';

import { useGetThreadUsersQuery } from '@/api/thread-api';
import { useGetMyUserQuery } from '@/api/user-api';
import { Thread } from '@/features/chat/components/thread';

type ThreadPageUrlParams = Record<'threadId', string>;

export const ThreadPage: FC = () => {
  const { threadId } = useParams<ThreadPageUrlParams>();

  const numericThreadId = Number(threadId);
  const isValidThreadId = !Number.isNaN(numericThreadId);

  const { myUserId } = useGetMyUserQuery(undefined, {
    selectFromResult: ({ data: user }) => ({
      myUserId: user?.id,
    }),
  });
  const { otherThreadUser } = useGetThreadUsersQuery(
    { threadId: numericThreadId },
    {
      selectFromResult: ({ data: threadUsers }) => ({
        otherThreadUser: threadUsers?.find(({ userId }) => userId !== myUserId),
      }),
      skip: !isValidThreadId,
    },
  );

  return isValidThreadId ? (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 pb-8">
      <AppBar className="bg-purple-200" elevation={0} position="static">
        <Toolbar className="gap-7">
          <IconButton component={Link} to="/">
            <ArrowBackIcon />
          </IconButton>
          {otherThreadUser && (
            <Typography className="font-bold text-purple-900" variant="h6">
              {otherThreadUser.user.firstName} {otherThreadUser.user.lastName}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Thread threadId={numericThreadId} />
    </div>
  ) : (
    <Navigate replace to="/" />
  );
};
