import * as React from 'react';
import { useEffect, useState, FunctionComponent } from 'react';
import { auth } from '@infra-weigh/firebase';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from 'formik-mui';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

const theme = createTheme();

const App: FunctionComponent<{
  children: React.ReactNode;
  role: 'admin' | 'terminal' | 'tenantAdmin' | 'user';
}> = (props): React.ReactElement => {
  const [isSignedIn, setIsSignedIn] = useState<any>(false);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      await user?.getIdToken().then(async (token) => {
        localStorage.setItem('x-firebase-token', token);
        const idTokenResult = await user?.getIdTokenResult();
        // eslint-disable-next-line prefer-const
        let clm: any = idTokenResult.claims['https://hasura.io/jwt/claims'];
        console.log(clm);
        if (clm['x-hasura-default-role'] !== props.role) {
          alert('You are not authorized to access this page');
          await auth.signOut();
          window.location.reload();
        } else {
          localStorage.setItem('x-tenent-id', clm['x-hasura-tenent-id']);
          setIsSignedIn(user);
        }
      });
    });
    return () => unregisterAuthObserver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isSignedIn) {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
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
            <Formik
              onSubmit={async (
                values,
                { setSubmitting, setErrors, resetForm }
              ) => {
                console.log(values);
                setSubmitting(true);
                await signInWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password
                ).catch((error) => {
                  setErrors({
                    email: error.message,
                  });
                  resetForm();
                });
                setSubmitting(false);
              }}
              initialValues={{ email: '', password: '' }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Invalid email').required('Required'),
                password: Yup.string().required('No password provided.'),
              })}
            >
              {({ submitForm }) => {
                return (
                  <Box
                    component="form"
                    onSubmit={(e: any) => {
                      e.preventDefault();
                      submitForm();
                    }}
                    sx={{ mt: 1 }}
                  >
                    <Field
                      component={TextField}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <Field
                      component={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => {
                        signInWithPopup(auth, new GoogleAuthProvider());
                      }}
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In with Google
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                );
              }}
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
    );
  } else return <>{props.children};</>;
};

export default App;
