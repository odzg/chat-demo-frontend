import { type PropsWithChildren, useMemo } from 'react';

import { useLazySignInQuery } from '#api/auth-api/auth-api.ts';
import { useGetMyUserQuery } from '#api/user-api/user-api.ts';

import { AuthContext, type AuthContextType } from './context';

export function AuthProvider({
  children,
}: Readonly<Required<PropsWithChildren>>) {
  const { isLoading, userId } = useGetMyUserQuery(undefined, {
    selectFromResult: ({ data: user, ...result }) => ({
      ...result,
      userId: user?.id,
    }),
  });
  const [signIn] = useLazySignInQuery();

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: !!userId,
      isLoading,
      signIn,
      userId,
    }),
    [isLoading, signIn, userId],
  );

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}
