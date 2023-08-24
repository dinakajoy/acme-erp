import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";

export const UsernameInput = (props: any) => {
  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel htmlFor={props.id}>Username</InputLabel>
      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="username" edge="end">
              <PersonIcon />
            </IconButton>
          </InputAdornment>
        }
        {...props}
      />
    </FormControl>
  );
};

export const EmailInput = (props: any) => {
  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel htmlFor={props.id}>Email</InputLabel>
      <OutlinedInput
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="username" edge="end">
              <PersonIcon />
            </IconButton>
          </InputAdornment>
        }
        {...props}
      />
    </FormControl>
  );
};

export const PasswordInput = (props: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel htmlFor={props.id}>Password</InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...props}
      />
    </FormControl>
  );
};
