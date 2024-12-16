import type { User } from '@/schemas/user-schemas';

export interface SignInQueryArgument extends Pick<User, 'email' | 'password'> {}
export interface SignInQueryResult {
  token: string;
  user: User;
}
