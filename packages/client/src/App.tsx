import './App.css';

import React, { FunctionComponent, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material';

import Bills from './pages/bills';
import Dashboard from './pages/dashboard';
import RequireAuth from './pages/requireAuth';
import NoInternet from './pages/NoInternet';

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
    typography: {
      fontFamily: 'Poppins',
    },
  });
  if (offline) {
    return (
      <>
        <NoInternet />
      </>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    );
  }
};

export default App;
