import type { SignInQueryArgument, SignInQueryResult } from './auth-api-types';

import { api } from '../api';
import { apiToken } from '../api-token';

const SIGN_IN_PATH = '/sign-in';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.query<SignInQueryResult, SignInQueryArgument>({
      async onQueryStarted(_argument, { queryFulfilled }) {
        const { data } = await queryFulfilled;

        apiToken.value = data.token;
      },
      query: (argument) => ({
        body: argument,
        method: 'POST',
        url: SIGN_IN_PATH,
      }),
    }),
  }),
});

export const { useLazySignInQuery } = authApi;
