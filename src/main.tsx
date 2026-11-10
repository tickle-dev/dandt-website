import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The DOM RouterProvider wires in react-dom's flushSync for synchronous navigations.
import { RouterProvider } from 'react-router/dom';
// Fonts are bundled from npm, so no runtime request leaves the site origin (Req 1.3).
import '@fontsource-variable/cinzel';
import '@fontsource-variable/inter';
import './styles/tokens.css';
import './styles/global.css';
// Imported after the global styles so component CSS Modules come later in the cascade.
import { router } from './app/router.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element "#root" not found in index.html.');
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
