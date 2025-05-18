import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import {
  createFileRoute,
  Link,
  Navigate,
  redirect,
} from '@tanstack/react-router';

import { useGetThreadUsersQuery } from '#api/thread-api/index.ts';
import { useGetMyUserQuery } from '#api/user-api/index.ts';
import { Thread as ThreadComponent } from '#features/chat/components/thread/index.ts';

export const Route = createFileRoute('/threads/$threadId')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        search: { redirectTo: location.pathname },
        to: '/sign-in',
      });
    }
  },
  component: Thread,
});

function Thread() {
  const { threadId } = Route.useParams();

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
      <ThreadComponent threadId={numericThreadId} />
    </div>
  ) : (
    <Navigate replace to="/" />
  );
}
