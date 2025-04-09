import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, IconButton, InputAdornment, Switch, FormControlLabel } from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomButton from "../../components/CustomButton";
import SignInImage from "../../assets/signin1.png";
import LogoImage from "../../../public/logo.svg";
import useSignIn from "../../hooks/useSignIn";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email") || "";
    const storedRememberMe = localStorage.getItem("remember_me") === "true"; 
    setFormData({ email: storedEmail, password: "" });
    setRememberMe(storedRememberMe);
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const { signIn, loading, error } = useSignIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target?.name]: e.target.value });
    setErrors({ ...errors, [e.target?.name]: "" });
  };

  const handleSwitchChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      signIn(formData, rememberMe, (isFirstTime) => {
        console.log("Sign-in successful!");
        if (rememberMe) {
          localStorage.setItem("user_email", formData.email);
          localStorage.setItem("remember_me", true);
        } else {
          localStorage.removeItem("user_email");
          localStorage.setItem("remember_me", false);
        }

        navigate(isFirstTime ? "/injury" : "/dashboard");
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid className="signin-paper">
      <Grid container className="main-side-wrapper">
        <Grid item xs={12} md={7} className="left-section">
          <Grid className="heading">
            <Grid className="logo-section">
              <img src={LogoImage} alt="Logo" />
              <Typography variant="h5" className="logo-text">Physiotherapy Online</Typography>
            </Grid>
            <Typography className="signin-wrapper">
              Don't have an account?{" "}
              <span className="signin-link">
                <a href="/signup"> Sign up!</a>
              </span>
            </Typography>
          </Grid>
          <Typography variant="h4" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="h6" gutterBottom>
            Log in to your account
          </Typography>
          <div className="divider-wrapper">
            <span className="line"></span>
            <span className="line"></span>
          </div>
          <Grid item xs={12} className="form-wrapper">
            <Box component="form" className="form-detail-wrapper" onSubmit={handleSubmit}>
              <CustomTextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <CustomTextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
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
              />
              <Grid container className="middle-content">
                <FormControlLabel
                  control={<Switch checked={rememberMe} onChange={handleSwitchChange} className="custom-switch" />}
                  label="Remember me"
                />
                <Typography className="recover-password">
                  <a href="/forgot-password">Recover Password</a>
                </Typography>
              </Grid>
              {error && <Typography color="error">{error}</Typography>}
              <CustomButton type="submit" className="create-button">
                {loading ? "Logging In..." : "Log In"}
              </CustomButton>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} className="right-section">
            <Grid className="image-container">
                <img src={SignInImage} alt="Background" className="background-image" />
                <Grid className="text-box">
                    <Typography variant="body2" className="badge">⭐ Top Notch Rehab Programs</Typography>
                    <Typography variant="body1">
                        Today, we create innovative solutions to the challenges that consumers face in both their everyday lives and events.
                    </Typography>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
};

export default SignIn;
