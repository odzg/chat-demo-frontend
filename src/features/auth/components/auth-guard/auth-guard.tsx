import type { FC, PropsWithChildren } from 'react';

import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useGetMyUserQuery } from '@/api/user-api';

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

  return children;
};
