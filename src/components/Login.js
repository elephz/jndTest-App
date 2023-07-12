import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { login } from "../functions/auth";
import { setLogin } from "../store";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Emai is Required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const onSubmit = async (values, actions) => {
    try {
      const request = await login(values);

      const {data} = request.data

      const storeData = {
        token: data.token,
        user: data.name,
      };

      dispatch(setLogin(storeData));

      navigate("/")
    } catch (error) {
   
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        showConfirmButton: false,
        text: error.response.data.data,
      })
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

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
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={9}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
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
              Sign In
            </Typography>
            <Box
              component="form"
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={values.email}
                error={errors.email && touched.email}
                autoFocus
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.email && touched.email && (
                <span className="error">{errors.email}</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                name="password"
                onChange={handleChange}
                value={values.password}
                error={errors.password && touched.password}
                label="Password"
                type="password"
                id="password"
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <span className="error">{errors.password}</span>
              )}
              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
