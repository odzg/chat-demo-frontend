import type { TextFieldProps } from '@mui/material';
import type { Except } from 'type-fest';

export type ThreadFooterProps = {
  threadId: number;
} & Except<TextFieldProps, 'value'>;
