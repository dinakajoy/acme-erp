import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { postOrPutData } from "../utils/apiRequests";
import { PasswordInput } from "../components/FormElements";

const theme = createTheme();

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = searchParams.get("token");
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirmpassword = data.get("confirmpassword");
    if (password !== confirmpassword) {
      setResponse("");
      setError("Password mismatch, try again!");
      return;
    }
    const response = await postOrPutData(
      "auth/reset-password",
      {
        password,
        token,
      },
      "PUT"
    );
    if (response.status === "error") {
      setResponse("");
      Array.isArray(response.errors || response.error)
        ? setError(response.errors[0].msg || response.error[0].msg)
        : setError(response.errors || response.error);
    } else {
      setError("");
      setResponse("Password reset successful");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setResponse("");
      setError("Invalid link");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [navigate, searchParams]);

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
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <PasswordInput
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              required
              fullWidth
            />
            <PasswordInput
              id="confirmpassword"
              label="Confirm Password"
              name="confirmpassword"
              autoComplete="current-password"
              required
              fullWidth
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography
                  variant="subtitle2"
                  component="p"
                  color={error ? "error" : "success"}
                >
                  {error || response}
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
