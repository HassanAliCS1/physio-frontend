import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import CustomButton from "../../../components/CustomButton";
import CustomTextField from "../../../components/CustomTextField";

const ForgotPasswordMain = ({ handleSubmit, handleChange, email, emailLoading, emailError, emptyEmailError }) => {
    return (
        <Grid className="fogotpassword-main-section">
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>
            <Typography variant="h6" gutterBottom>
                Reset using your email
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
                        value={email}
                        onChange={handleChange}
                    />
                    {emailError || emptyEmailError && <Typography color="error">{emailError || emptyEmailError}</Typography>}
                    <CustomButton
                        type="submit"
                        className="create-button"
                        disabled={emailLoading}
                    >
                        {emailLoading ? "Submitting..." : "Reset Password"}
                    </CustomButton>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ForgotPasswordMain;