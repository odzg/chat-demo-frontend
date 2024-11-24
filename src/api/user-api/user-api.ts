import type {
  GetMyUserQueryArgument,
  GetMyUserQueryResult,
} from './user-api-types';

import { api } from '../api';

const USERS_PATH = '/users';
const MY_USER_PATH = `${USERS_PATH}/me`;

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyUser: build.query<GetMyUserQueryResult, GetMyUserQueryArgument>({
      query: () => MY_USER_PATH,
    }),
  }),
});

export const { useGetMyUserQuery, useLazyGetMyUserQuery } = userApi;
