import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Layout from "../layout/Layout";
import { login } from "../services/authServices";
import { LoginInfo } from "../types/Auth";

const inputs = [
  {
    title: "Email Address",
    name: "email",
    type: "email",
    autoComplete: "email",
    rules: { required: true, pattern: /\S+@\S+\.\S+/ },
    error: "Valid Email is Required",
  },
  {
    title: "Password",
    name: "password",
    type: "password",
    autoComplete: "password",
    rules: { required: true, minLength: 6 },
    error: "Password is Required Minimum 6 Characters",
  },
] as const;

const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInfo>();

  const { mutate, auth } = useAuth();

  const onSubmit = (info: LoginInfo) => mutate(login(info));

  if (auth?.email) {
    return <Navigate to="/billing" replace />;
  }

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 500,
          margin: "8px auto",
          marginTop: 10,
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Typography>
          Not Have an account ?{" "}
          <Link style={{ color: "#1976d2" }} to="/register">
            Register
          </Link>
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {inputs.map(({ name, title, type, autoComplete, rules, error }) => (
              <Grid key={name} item xs={12} sm={name.includes("Name") && 6}>
                <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={title}
                      autoFocus={name === inputs[0].name}
                      {...field}
                      type={type || "text"}
                      error={!!errors[name]}
                      autoComplete={autoComplete}
                    />
                  )}
                />
                {errors[name] && (
                  <Typography sx={{ color: "red", mt: 1 }}>{error}</Typography>
                )}
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
