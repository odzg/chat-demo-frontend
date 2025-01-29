import type { GetMyUserQueryResult } from './user-api-types';

import { api } from '../api';

const USERS_PATH = '/users';
const MY_USER_PATH = `${USERS_PATH}/me`;

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- `void` is required so that the query would not require arguments
    getMyUser: build.query<GetMyUserQueryResult, void>({
      query: () => MY_USER_PATH,
    }),
  }),
});

export const { useGetMyUserQuery, useLazyGetMyUserQuery } = userApi;
