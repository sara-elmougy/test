import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './lib/i18n/i18n';
import App from './app/app';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
