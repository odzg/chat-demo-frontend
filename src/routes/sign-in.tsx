import { Button } from '@mui/material';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { z } from 'zod';

import { useLazySignInQuery } from '#api/auth-api/index.ts';
import { useGetMyUserQuery } from '#api/user-api/index.ts';

export const Route = createFileRoute('/sign-in')({
  component: SignIn,
  validateSearch: z.object({
    redirectTo: z.string().optional(),
  }),
});

function SignIn() {
  const { refetch, userId } = useGetMyUserQuery(undefined, {
    selectFromResult: ({ data: user, ...result }) => ({
      ...result,
      userId: user?.id,
    }),
  });
  const [signIn] = useLazySignInQuery();
  const search = Route.useSearch();

  if (userId) {
    return <Navigate to={search.redirectTo ?? ''} />;
  }

  return (
    <div className="m-auto flex gap-2">
      <Button
        onClick={() => {
          void (async () => {
            await signIn({
              email: 'user1@example.com',
              // eslint-disable-next-line sonarjs/no-hardcoded-passwords -- Is hardcoded for demo purposes
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
              // eslint-disable-next-line sonarjs/no-hardcoded-passwords -- Is hardcoded for demo purposes
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
}
