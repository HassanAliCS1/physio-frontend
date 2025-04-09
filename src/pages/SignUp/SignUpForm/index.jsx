import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomTextField from "../../../components/CustomTextField";
import CustomButton from "../../../components/CustomButton";
import SignUpImage from "../../../assets/signup-cover.png";
import useSignup from "../../../hooks/useSignUp";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp, loading, error } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({});

      await signUp(formValues, () => {
        navigate("/sign-in");
      });
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Grid className="signup-paper">
      <Grid container className="main-side-wrapper">
        <Grid item xs={12} md={6} className="left-section">
          <img src={SignUpImage} alt="Background" />
        </Grid>
        <Grid item xs={12} md={6} className="right-section">
          <Typography className="signin-wrapper">
            Have an account?{" "}
            <span className="signin-link">
              <a href="/sign-in">Sign in!</a>
            </span>
          </Typography>

          <Typography variant="h4" gutterBottom>
            Get Started
          </Typography>

          <div className="divider-wrapper">
            <span className="line"></span>
            <span className="line"></span>
          </div>
          <Grid item xs={12} className="form-wrapper">
            <Box
              component="form"
              className="form-detail-wrapper"
              onSubmit={handleSubmit}
            >
              <CustomTextField
                label="First Name"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />

              <CustomTextField
                label="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />

              <CustomTextField
                label="Email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />

              <CustomTextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formValues.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        className="visibility"
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <CustomTextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formValues.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="visibility"
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && <Typography color="error">{error}</Typography>}

              <CustomButton
                type="submit"
                className="create-button"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </CustomButton>
            </Box>
          </Grid>
          <Grid className="bottom">
            <Typography className="bottom-text">
              By continuing, you indicate that you have read and agreed to the
              Terms of Use.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
