import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Client from '@infra-weigh/client';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './styles.scss';
import App from './app/App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContextInjector from './context';
const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ContextInjector>
      <ToastContainer />
      <Client>
        <App />
      </Client>
    </ContextInjector>
  </BrowserRouter>
);
