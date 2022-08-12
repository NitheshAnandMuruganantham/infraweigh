import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

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

import Loader from '../../components/loading';

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
  React.useEffect(
    () => (!window.location.search.slice(7) ? () => navigate('/') : () => {}),
    []
  );
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Loader open={loading} setOpen={() => null} />
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
              Change Password
            </Typography>
            <Formik
              onSubmit={async ({ password }) => {
                setLoading(true);
                await fetch(
                  import.meta.env.VITE_SERVER_URL +
                    '/auth/forgot/' +
                    window.location.search.slice(7),
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                      password,
                    }),
                  }
                )
                  .then((res) => {
                    if (res.ok) {
                      toast.success('Password has been reset');
                      navigate('/login');
                    } else {
                      toast.error('something went wrong');
                    }
                  })
                  .catch(() => toast.error('something went wrong'));

                setLoading(false);
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .required('Password is required')
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
                  ),
                confirmPassword: Yup.string()
                  .required('Please retype your password.')
                  .oneOf([Yup.ref('password')], 'Passwords must match'),
              })}
              initialValues={{
                password: '',
                ConfirmPassword: '',
              }}
            >
              {({ isValid }) => (
                <Form>
                  <Box sx={{ mt: 1 }}>
                    <Field
                      component={TextField}
                      margin="normal"
                      fullWidth
                      name="password"
                      label="password"
                      type="password"
                      autoComplete="off"
                      autoFocus
                    />
                    <Field
                      component={TextField}
                      margin="normal"
                      fullWidth
                      name="confirmPassword"
                      label="confirm password"
                      type="password"
                      autoComplete="off"
                    />
                    <Button
                      disabled={!isValid}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      change
                    </Button>
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
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
