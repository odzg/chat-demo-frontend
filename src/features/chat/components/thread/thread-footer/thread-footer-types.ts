import type { TextFieldProps } from '@mui/material';
import type { Except } from 'type-fest';

export type ThreadFooterProps = Except<TextFieldProps, 'value'> & {
  threadId: number;
};
