import SendIcon from '@mui/icons-material/Send';
import { IconButton, TextField } from '@mui/material';
import { type FC, useState } from 'react';
import { Navigate } from 'react-router';

import { useCreateThreadMessageMutation } from '#api/thread-api/index.ts';
import { useGetMyUserQuery } from '#api/user-api/index.ts';

import type { ThreadFooterProps } from './thread-footer-types';

export const ThreadFooter: FC<ThreadFooterProps> = ({
  onChange,
  threadId,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [createThreadMessage] = useCreateThreadMessageMutation();
  const { userId } = useGetMyUserQuery(undefined, {
    selectFromResult: ({ data }) => ({
      userId: data?.id,
    }),
  });

  if (!userId) {
    return <Navigate replace to="/" />;
  }

  return (
    <form
      className="flex w-full items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();

        void createThreadMessage({
          threadId,
          threadMessage: {
            content: value,
            userId,
          },
        });

        setValue('');
      }}
    >
      <TextField
        {...props}
        className="flex-1"
        onChange={(event) => {
          setValue(event.target.value);
          onChange?.(event);
        }}
        value={value}
      />
      <IconButton disabled={!value.trim()} type="submit">
        <SendIcon />
      </IconButton>
    </form>
  );
};
