import { createTheme, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';

export default function SignInSide() {
  const [loading, setLoading] = React.useState(true);
  const [isLogedIn, setIsLogedIn] = React.useState<boolean | undefined>();
  React.useEffect(() => {
    const refreshToken = async () => {
      try {
        setLoading(true);
        if (!localStorage.getItem('refresh_token')) {
          throw new Error('no tokens exists in not req auth');
        } else {
          const request = await fetch(
            import.meta.env['VITE_SERVER_URL'] + '/auth/refresh',
            {
              headers: {
                authorization:
                  'Bearer ' + localStorage.getItem('refresh_token'),
              },
              method: 'post',
            }
          );
          if (request.ok) {
            const data = await request.json();
            sessionStorage.setItem('token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            setIsLogedIn(true);
            setLoading(false);
          } else {
            throw new Error('un authorized');
          }
        }
      } catch (err) {
        sessionStorage.clear();
        localStorage.clear();
        setIsLogedIn(false);
        setLoading(false);
      }
      return;
    };
    refreshToken();
  }, []);

  const theme = createTheme({
    palette: {
      mode:
        (new Date().getHours() > 18 || new Date().getHours()) < 7
          ? 'dark'
          : 'light',
    },
  });

  return loading ? (
    <Loading open={loading} setOpen={setLoading} />
  ) : !loading && !isLogedIn ? (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  ) : (
    <Navigate
      to={'/'}
      replace
      state={{
        from: location.pathname,
      }}
    />
  );
}
