import { AppBar, Toolbar, Typography } from '@mui/material';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { ThreadsList } from '#features/chat/components/threads-list/index.ts';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        search: { redirectTo: location.pathname },
        to: '/sign-in',
      });
    }
  },
  component: Index,
});

function Index() {
  return (
    <div className="flex w-full flex-col items-center">
      <AppBar className="bg-purple-200" elevation={0} position="static">
        <Toolbar>
          <Typography className="font-bold text-purple-900" variant="h6">
            Chat App Demo
          </Typography>
        </Toolbar>
      </AppBar>
      <ThreadsList />
    </div>
  );
}
