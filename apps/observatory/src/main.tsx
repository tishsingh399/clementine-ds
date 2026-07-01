import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClementineDSProvider } from '@clementine-ds/ui';
import { App } from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClementineDSProvider>
      <App />
    </ClementineDSProvider>
  </StrictMode>,
);
