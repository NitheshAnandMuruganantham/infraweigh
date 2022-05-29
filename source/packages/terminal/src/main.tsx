import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Client from '@infra-weigh/client';
import './styles.scss';
import Routes from './app/routes';
import Auth from '@infra-weigh/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ToastContainer />
    <Auth>
      <Client>
        <Routes />
      </Client>
    </Auth>
  </BrowserRouter>
);
