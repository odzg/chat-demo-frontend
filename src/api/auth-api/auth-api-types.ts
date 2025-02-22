import type { User } from '#schemas/user-schemas.ts';

export interface SignInQueryArgument extends Pick<User, 'email' | 'password'> {}
export interface SignInQueryResult {
  token: string;
  user: User;
}
