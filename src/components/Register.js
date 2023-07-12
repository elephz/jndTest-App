import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import * as yup from "yup";
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import { register } from "../functions/auth";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function Register() {

  const navigate = useNavigate()

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Emai is Required"),
    name: yup.string().required("Name Required"),
    password: yup
      .string('Enter your password')
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required'),
    passwordConfirmation : yup.string().required('Password is required').oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const onSubmit = async (values, actions) => {

    try {

      await register(values)
      actions.resetForm();
      navigate('/login')

    } catch (error) {
      console.log({error})

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        showConfirmButton: false,
        text: error.response.data.data,
      })

      console.log(error)
    }

  };

  const initialValues = {
    email: "",
    name: "",
    password: "",
    passwordConfirmation: ""
  }

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });



  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={9}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
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
              Sign Up
            </Typography>
            <Box component="form" autoComplete="off"  onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                onChange={handleChange}
                label="Email Address"
                name="email"
                value={values.email}
                error={errors.email && touched.email}
                autoFocus
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <span className="error">{errors.email}</span>
              )}
              <TextField
                margin="normal"
                onChange={handleChange}
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={values.name}
                error={errors.name && touched.name}
                onBlur={handleBlur}
              />
               {errors.name && touched.name && (
                <span className="error">{errors.name}</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                onChange={handleChange}
                type="password"
                value={values.password}
                id="password"
                error={errors.password && touched.password}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <span className="error">{errors.password}</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                label="Confirm Password"
                onChange={handleChange}
                name="passwordConfirmation"
                type="password"
                value={values.passwordConfirmation}
                id="confirm-password"
                onBlur={handleBlur}
                error={errors.passwordConfirmation && touched.passwordConfirmation}
              />
               {errors.passwordConfirmation && touched.passwordConfirmation && (
                <span className="error">{errors.passwordConfirmation}</span>
              )}
              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Grid container >
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}