import type { User } from '@/schemas/user-schemas';

export type SignInQueryArg = Pick<User, 'email' | 'password'>;
export type SignInQueryResult = {
  token: string;
  user: User;
};
