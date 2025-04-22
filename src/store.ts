import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    /* eslint-disable-next-line unicorn/prefer-spread
        --------
        `.concat()` used here is a custom method of the utility `Tuple` class,
        not the standard built-in method of `Array`. */
    getDefaultMiddleware().concat(api.middleware),
  reducer: {
    [api.reducerPath]: api.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export interface RootState extends ReturnType<typeof store.getState> {}
