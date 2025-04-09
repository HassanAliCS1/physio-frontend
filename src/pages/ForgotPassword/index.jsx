import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import SignInImage from "../../assets/signin1.png";
import LogoImage from "../../../public/logo.svg";
import ForgotPasswordMain from "./ForgotPasswordMain";
import CodeVerification from "./CodeVerification";
import NewPassword from "./NewPassword";
import useForgotPassword from "../../hooks/useForgotPassword";
import useResetPassword from "../../hooks/useResetPassword";
import useVerifyResetPasswordOtp from "../../hooks/useVerifyResetPasswordOtp";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "", otp: "", newPassword: "", confirmPassword: "", code1: "", code2: "", code3: "", code4: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const { submitEmail, loading: emailLoading, error: emailError } = useForgotPassword();
  const { verifyResetPasswordOtp, loading: otpLoading, error: otpError } = useVerifyResetPasswordOtp();
  const { resetPassword, loading: resetLoading, error: resetError } = useResetPassword();
  const navigate = useNavigate();
  const [emptyEmailError, setEmptyEmailError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setEmptyEmailError("");
    if (!formData.email) {
      setEmptyEmailError("Email cannot be empty.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmptyEmailError("Please enter a valid email.");
      return;
    }

    try {
      await submitEmail(formData.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  };


  const handleCodeVerification = async (e) => {
    e.preventDefault();

    const otp = `${formData.code1}${formData.code2}${formData.code3}${formData.code4}`;
    console.log("Constructed OTP:", otp);

    if (otp.length === 4) {
      try {
        await verifyResetPasswordOtp(otp);
        setIsCodeVerified(true);
      } catch (error) {
        console.error("OTP verification failed:", error);
      }
    } else {
      console.error("OTP is invalid: OTP length is not 4.");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (formData.newPassword === formData.confirmPassword) {
      const otp = `${formData.code1}${formData.code2}${formData.code3}${formData.code4}`;
      if (otp) {
        await resetPassword(formData.newPassword, otp);
        navigate('/sign-in');
      } else {
        console.error("OTP is required for password reset.");
      }
    } else {
      alert("Passwords do not match.");
    }
  };


  return (
    <Grid className="forgot-paper">
      <Grid container className="main-side-wrapper">
        <Grid item xs={12} md={7} className="left-section">
          <Grid className="heading">
            <Grid className="logo-section">
              <img src={LogoImage} alt="Logo" />
              <Typography variant="h5">Physiotherapy</Typography>
            </Grid>
            <Typography className="signin-wrapper">
              Don't you have an account?{" "}
              <span className="signin-link">
                <a href="/signup"> Sign up!</a>
              </span>
            </Typography>
          </Grid>
          {!isSubmitted ? (
            <ForgotPasswordMain handleSubmit={handleSubmitEmail} handleChange={handleChange} emptyEmailError={emptyEmailError} />
          ) : !isCodeVerified ? (
            <CodeVerification handleCodeVerification={handleCodeVerification} handleChange={handleChange} formData={formData} />
          ) : (
            <NewPassword handlePasswordReset={handlePasswordReset} handleChange={handleChange} />
          )}
        </Grid>
        <Grid item xs={12} md={5} className="right-section">
          <img src={SignInImage} alt="Background" />
        </Grid>
      </Grid>
    </Grid>
  );

};

export default ForgotPassword;
