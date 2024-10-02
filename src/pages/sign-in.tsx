import type { FC } from 'react';

import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useLazySignInQuery } from '@/api/auth-api';
import { useLazyGetMyUserQuery } from '@/api/user-api';

export const SignInPage: FC = () => {
  const [triggerSignIn] = useLazySignInQuery();
  const [triggerGetMyUser, { userId }] = useLazyGetMyUserQuery({
    selectFromResult: ({ data: user, ...result }) => ({
      ...result,
      userId: user?.id,
    }),
  });

  if (userId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="m-auto">
      <Button
        onClick={() => {
          void (async () => {
            await triggerSignIn({
              email: 'user1@example.com',
              password: 'password123',
            });

            void triggerGetMyUser();
          })();
        }}
      >
        Mock Sign-In
      </Button>
    </div>
  );
};
