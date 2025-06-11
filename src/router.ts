import { createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen.ts';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const router = createRouter({
  // @ts-expect-error `context` is expected to be initially empty and is populated by `<RouterProvider />` later on
  context: {},
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultStructuralSharing: true,
  routeTree,
  scrollRestoration: true,
});
