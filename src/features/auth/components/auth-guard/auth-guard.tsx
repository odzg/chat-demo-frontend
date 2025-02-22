import type { FC, PropsWithChildren } from 'react';

import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router';

import { useGetMyUserQuery } from '#api/user-api/index.ts';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, userId } = useGetMyUserQuery(undefined, {
    selectFromResult: ({ data: user, ...result }) => ({
      ...result,
      userId: user?.id,
    }),
  });

  if (isLoading) {
    return <CircularProgress className="m-auto" />;
  }

  if (!userId) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};
