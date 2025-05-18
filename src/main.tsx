import {
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles.css';
import { App } from './app.tsx';
import { AuthProvider } from './features/auth/contexts/auth/provider.tsx';
import { store } from './store';
import { theme } from './theme';

const rootElement = document.querySelector('#app');

if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <StyledEngineProvider enableCssLayer>
          <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </StrictMode>,
  );
}
