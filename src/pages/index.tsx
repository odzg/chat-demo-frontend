import type { FC } from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

import { ThreadsList } from '@/features/chat/components/threads-list';

export const IndexPage: FC = () => (
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
