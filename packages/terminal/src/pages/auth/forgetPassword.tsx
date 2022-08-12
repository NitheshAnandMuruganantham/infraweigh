import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Loading from '../../components/loading';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://infraweigh.co/">
        infraweigh.co
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Loading open={loading} setOpen={() => null} />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/?office)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              password reset request
            </Typography>
            <Formik
              onSubmit={async ({ email }) => {
                setLoading(true);
                toast.clearWaitingQueue();
                await fetch(import.meta.env.VITE_SERVER_URL + '/auth/forgot', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                  body: JSON.stringify({
                    email,
                  }),
                })
                  .then((res) => {
                    if (res.ok) {
                      toast.success(
                        'Password reset link has been sent to your email'
                      );
                      navigate('/login');
                    } else {
                      toast.error('something went wrong');
                    }
                  })
                  .catch(() => toast.error('something went wrong'));
                setLoading(false);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Invalid email address')
                  .required('Email is required'),
              })}
              initialValues={{
                email: '',
              }}
            >
              {() => (
                <Box sx={{ mt: 1 }}>
                  <Form>
                    <Field
                      component={TextField}
                      margin="normal"
                      fullWidth
                      name="email"
                      label="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      SEND LINK
                    </Button>
                  </Form>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/login" variant="body2">
                        Remember password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2"></Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
