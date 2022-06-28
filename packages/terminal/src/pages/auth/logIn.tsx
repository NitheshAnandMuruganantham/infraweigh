import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "formik-mui";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  getIdTokenResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import * as Yup from "yup";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { Field, Formik } from "formik";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Infraweigh.co
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/?office,company)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          position={"relative"}
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          {loading && <LinearProgress />}
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string().email("Invalid email").required("Required"),
                password: Yup.string().required("Required"),
              })}
              onSubmit={async (values, { setSubmitting, setFieldError }) => {
                setLoading(true);
                setSubmitting(true);
                await signInWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password
                ).catch((error: any) => {
                  console.log(JSON.stringify(error));
                  if (error.code === "auth/user-not-found") {
                    setFieldError("email", "User not found");
                  } else if (error.code === "auth/wrong-password") {
                    setFieldError("password", "Wrong password");
                  } else if (error.code === "auth/too-many-requests") {
                    toast.error("Too many requests");
                  } else if (error.code === "auth/user-disabled") {
                    toast.error("User disabled");
                  } else {
                    toast.error("Something went wrong");
                  }
                  setLoading(false);
                  setSubmitting(true);
                });

                setLoading(false);
                setSubmitting(true);
              }}
            >
              {({ handleSubmit, handleReset, handleBlur }) => (
                <Box
                  onSubmit={handleSubmit}
                  onBlur={handleBlur}
                  onReset={handleReset}
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <Field
                    component={TextField}
                    margin="normal"
                    fullWidth
                    disabled={loading}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <Field
                    component={TextField}
                    margin="normal"
                    fullWidth
                    disabled={loading}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    signIn
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                  </Grid>
                  or
                  <GoogleButton />
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

const GoogleButton = () => {
  return (
    <div
      onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
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
  );
};
