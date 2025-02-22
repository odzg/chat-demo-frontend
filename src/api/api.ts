import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '#constants/env.ts';

import { apiToken } from './api-token';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      if (apiToken.value) {
        headers.set('Authorization', `Bearer ${apiToken.value}`);
      }
    },
  }),
  endpoints: () => ({}),
});
