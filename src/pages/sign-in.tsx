import type { FC } from 'react';

import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useLazySignInQuery } from '@/api/auth-api';
import { useGetMyUserQuery } from '@/api/user-api';

export const SignInPage: FC = () => {
  const { refetch, userId } = useGetMyUserQuery(undefined, {
    selectFromResult: ({ data: user, ...result }) => ({
      ...result,
      userId: user?.id,
    }),
  });
  const [signIn] = useLazySignInQuery();

  if (userId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="m-auto flex gap-2">
      <Button
        onClick={() => {
          void (async () => {
            await signIn({
              email: 'user1@example.com',
              password: 'password123',
            });

            void refetch();
          })();
        }}
      >
        Sign-In as John Doe
      </Button>
      <Button
        onClick={() => {
          void (async () => {
            await signIn({
              email: 'user2@example.com',
              password: 'password456',
            });

            void refetch();
          })();
        }}
      >
        Sign-In as Jane Smith
      </Button>
    </div>
  );
};
