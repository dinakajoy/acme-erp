import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useAuthContext } from "../utils/auth/AuthContext";
import { EmailInput, PasswordInput } from "../components/FormElements";
import { postOrPutData } from "../utils/apiRequests";

const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();
  let location = useLocation();
  const { setAuthToken, setCurrentUser } = useAuthContext();

  const [error, setError] = useState("");

  let from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (email === "" || password === "") {
      setError("Please fill in all fields");
    } else {
      try {
        const userJson = await postOrPutData(
          "auth/login",
          { email, password },
          "POST"
        );
        if (userJson.status === "error") {
          Array.isArray(userJson.errors || userJson.error)
            ? setError(userJson.errors[0].msg || userJson.error[0].msg)
            : setError(userJson.errors || userJson.error);
        } else {
          setAuthToken(userJson.token);
          setCurrentUser(userJson.payload);
          navigate(from, { replace: true });
        }
      } catch (error: any) {
        console.log("error", error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <EmailInput
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <PasswordInput
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              required
              fullWidth
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="subtitle2" component="p" color="error">
                  {error}
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
