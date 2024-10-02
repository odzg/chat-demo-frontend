import type { SignInQueryArg, SignInQueryResult } from './auth-api-types';

import { api } from '../api';
import { apiToken } from '../api-token';

const SIGN_IN_ROUTE = '/sign-in';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.query<SignInQueryResult, SignInQueryArg>({
      async onQueryStarted(_arg, { queryFulfilled }) {
        const { data } = await queryFulfilled;

        apiToken.value = data.token;
      },
      query: (args) => ({
        body: args,
        method: 'POST',
        url: SIGN_IN_ROUTE,
      }),
    }),
  }),
});

export const { useLazySignInQuery } = authApi;
