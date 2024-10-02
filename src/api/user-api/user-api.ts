import type { GetMyUserQueryArg, GetMyUserQueryResult } from './user-api-types';

import { api } from '../api';

const USERS_ROUTE = '/users';
const MY_USER_ROUTE = `${USERS_ROUTE}/me`;

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyUser: build.query<GetMyUserQueryResult, GetMyUserQueryArg>({
      query: () => MY_USER_ROUTE,
    }),
  }),
});

export const { useGetMyUserQuery, useLazyGetMyUserQuery } = userApi;
