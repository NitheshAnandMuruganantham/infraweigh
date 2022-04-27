import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Client from '@infra-weigh/client';
import Routes from './app/routes';
import Auth from '@infra-weigh/auth';
const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Auth>
      <Client>
        <Routes />
      </Client>
    </Auth>
  </BrowserRouter>
);
