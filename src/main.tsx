import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { App } from './app';
import { AuthGuard } from './features/auth/components/auth-guard';
import './index.css';
import { IndexPage } from './pages/index';
import { SignInPage } from './pages/sign-in';
import { ThreadPage } from './pages/thread';
import { store } from './store';
import { theme } from './theme';

const router = createBrowserRouter([
  {
    children: [
      {
        element: (
          <AuthGuard>
            <IndexPage />
          </AuthGuard>
        ),
        index: true,
      },
      {
        element: (
          <AuthGuard>
            <ThreadPage />
          </AuthGuard>
        ),
        path: '/threads/:threadId',
      },
      {
        element: <SignInPage />,
        path: '/sign-in',
      },
      {
        element: <Navigate to="/" />,
        path: '*',
      },
    ],
    element: <App />,
  },
]);

const rootElement = document.querySelector('#root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </StrictMode>,
  );
}
