import type { User } from '@/schemas/user-schemas';
import type { RtkqVoidQueryArgument } from '@/types/utility-types';

export type GetMyUserQueryArgument = RtkqVoidQueryArgument;
export interface GetMyUserQueryResult extends User {}
