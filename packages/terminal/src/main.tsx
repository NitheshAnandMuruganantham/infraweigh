import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./styles.scss";
import App from "./App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextInjector from "./context";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <ContextInjector>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ContextInjector>
    </BrowserRouter>
  </React.StrictMode>
);
