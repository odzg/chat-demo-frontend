import { RouterProvider } from '@tanstack/react-router';

import { useAuth } from '#features/auth/contexts/auth/use-auth.ts';

import { router } from './router';

export function App() {
  const auth = useAuth();

  return <RouterProvider context={{ auth }} router={router} />;
}
