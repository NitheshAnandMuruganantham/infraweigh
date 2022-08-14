import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material';

import Loading from './components/loading';
import Bills from './pages/bills';
import RequireAuth from './pages/requireAuth';

const Login = React.lazy(() => import('./pages/login'));

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      {window.ononline ? (
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Bills />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <h1>offile</h1>
      )}
    </ThemeProvider>
  );
}

export default App;
