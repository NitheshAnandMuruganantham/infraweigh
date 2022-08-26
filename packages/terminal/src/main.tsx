import 'react-confirm-alert/src/react-confirm-alert.css';
import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ApolloProvider } from '@apollo/client';

import App from './App';
import client from './utils/client';
import ColorModeWrapper from './context/colorMode';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeWrapper>
      <BrowserRouter>
        <ToastContainer />
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </ColorModeWrapper>
  </React.StrictMode>
);
