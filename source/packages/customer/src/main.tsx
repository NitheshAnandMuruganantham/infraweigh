import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Auth from '@infra-weigh/auth';

import App from './app/app';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Auth>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth>
  </StrictMode>
);
