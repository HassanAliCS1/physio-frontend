import React, { useState } from "react";
import { Typography, Box, Grid, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton";

const NewPassword = ({ handlePasswordReset, handleChange, newPassword, confirmPassword, resetLoading, resetError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (value) => {
    const hasMinLength = value.length >= 8;
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);
    return {
      valid: hasMinLength && hasNumber && hasSpecialChar,
      messages: [
        !hasMinLength && "At least 8 characters",
        !hasNumber && "Contains a number",
        !hasSpecialChar && "Contains a special character",
      ].filter(Boolean),
    };
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Grid className="new-password-paper">
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="h6" gutterBottom>
        Enter new Password
      </Typography>

      <div className="divider-wrapper">
        <span className="line"></span>
        <span className="line"></span>
      </div>

      <Grid item xs={12} className="form-wrapper">
        <Box component="form" className="form-detail-wrapper" onSubmit={handlePasswordReset}>
          <CustomTextField
            label="New Password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            value={newPassword}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} className="visibility" edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className={errors.password ? "error-border" : ""}
          />

          <CustomTextField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            onChange={handleChange}
            value={confirmPassword}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} className="visibility" edge="end">
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className={errors.confirmPassword ? "error-border" : ""}
          />
          {resetError && <Typography color="error">{resetError}</Typography>}
          <CustomButton type="submit" className="create-button" disabled={resetLoading}>
            {resetLoading ? "Resetting..." : "Reset Password"}
          </CustomButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NewPassword;