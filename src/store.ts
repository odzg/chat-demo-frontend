import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  reducer: {
    [api.reducerPath]: api.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export interface RootState extends ReturnType<typeof store.getState> {}
