import Client from '@infra-weigh/client';
import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Auth from '@infra-weigh/auth';

import App from './app/App';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Auth role="terminal">
      <Client>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Client>
    </Auth>
  </StrictMode>
);
