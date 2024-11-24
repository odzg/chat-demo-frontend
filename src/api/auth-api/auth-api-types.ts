import type { User } from '@/schemas/user-schemas';

export type SignInQueryArgument = Pick<User, 'email' | 'password'>;
export interface SignInQueryResult {
  token: string;
  user: User;
}
