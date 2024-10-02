import type { User } from '@/schemas/user-schemas';
import type { RtkqVoidQueryArg } from '@/types/utility-types';

export type GetMyUserQueryArg = RtkqVoidQueryArg;
export type GetMyUserQueryResult = User;
