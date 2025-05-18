import type { TypedLazyQueryTrigger } from '@reduxjs/toolkit/query/react';

import { createContext } from 'react';

import type { authApi } from '#api/auth-api/auth-api.ts';
import type { User } from '#schemas/user-schemas.ts';

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: SignIn;
  userId: undefined | User['id'];
}

interface SignIn
  extends TypedLazyQueryTrigger<
    SignInEndpointTypes['ResultType'],
    SignInEndpointTypes['QueryArg'],
    SignInEndpointTypes['BaseQuery']
  > {}

type SignInEndpointTypes = typeof authApi.endpoints.signIn.Types;

export const AuthContext = createContext<AuthContextType | null>(null);
