import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Loader from '../components/loading';
import { auth } from '../utils/firebase';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      sx={{
        marginTop: '50px',
      }}
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https:infraweigh.co/">
        Infraweigh.co
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide() {
  const [user, userLoading] = useAuthState(auth);
  if (!userLoading) {
    if (!user) {
      return (
        <>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  'url(https://source.unsplash.com/random/?industry)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light'
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid
              position={'relative'}
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <GoogleButton />
                <Copyright />
              </Box>
            </Grid>
          </Grid>
        </>
      );
    } else {
      return <Navigate to="/" replace />;
    }
  } else {
    return <Loader open={true} setOpen={() => null} />;
  }
}

const GoogleButton = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <Loader open={loading} setOpen={() => {}} />
      <div
        onClick={() =>
          signInWithPopup(auth, new GoogleAuthProvider()).then(async () => {
            auth?.currentUser?.getIdToken().then(async (token) => {
              try {
                setLoading(true);
                const dat = await fetch(
                  import.meta.env['VITE_SERVER_URL'] + '/auth/refresh/firebase',
                  {
                    headers: {
                      authorization: token,
                    },
                    method: 'post',
                  }
                );
                if (!dat.ok) {
                  throw new Error('Error');
                }
                const data = await dat.text();
                sessionStorage.setItem('token', data);
                setLoading(false);
                navigate('/', { replace: true });
              } catch (error) {
                console.log(error);
                await auth.signOut();
                setLoading(false);
                sessionStorage.clear();
                window.location.replace('/login');
                return;
              }
            });
          })
        }
        className="google-btn"
      >
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p className="btn-text">Sign in with google</p>
      </div>
    </>
  );
};
