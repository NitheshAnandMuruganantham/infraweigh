import './App.css';

import React, { FunctionComponent, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material';

import Bills from './pages/bills';
import RequireAuth from './pages/requireAuth';

const Login = React.lazy(() => import('./pages/login'));

const App: FunctionComponent = () => {
  const [offline, SetOffline] = useState(!navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => SetOffline(false));
    window.addEventListener('offline', () => SetOffline(true));

    return () => {
      window.removeEventListener('online', () => SetOffline(false));
      window.removeEventListener('offline', () => SetOffline(true));
    };
  }, []);
  const theme = createTheme({
    palette: {
      mode:
        (new Date().getHours() > 18 || new Date().getHours()) < 7
          ? 'dark'
          : 'light',
    },
    typography: {
      fontFamily: 'Poppins',
    },
  });
  if (offline) {
    return (
      <>
        <h1>you are offline now hit f5 to refresh.</h1>
      </>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Bills />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    );
  }
};

export default App;
