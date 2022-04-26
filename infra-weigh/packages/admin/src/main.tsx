import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Auth from '@infra-weigh/auth';
import App from './app/App';
import Client from '@infra-weigh/client';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Client>
        {/* eslint-disable-next-line jsx-a11y/aria-role */}
        <Auth role="admin">
          <App />
        </Auth>
      </Client>
    </BrowserRouter>
  </StrictMode>
);
