import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import CustomButton from "../../../components/CustomButton";
import CustomTextField from "../../../components/CustomTextField";

const CodeVerification = ({ handleCodeVerification, handleChange, formData }) => {
  return (
    <Grid className="code-paper">
      <Typography variant="h4" gutterBottom>
        Get Your Code
      </Typography>
      <Typography variant="h6" gutterBottom>
        Enter 4-digit code
      </Typography>
      <div className="divider-wrapper">
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <Grid item xs={12} className="form-wrapper">
        <Box component="form" className="form-detail-wrapper" onSubmit={handleCodeVerification}>
          <Grid className="code-set-wrapper">
            <Grid xs={8} className="code-set">
              <CustomTextField
                label="C"
                name="code1"
                type="text"
                value={formData.code1}
                onChange={handleChange}
              />
              <CustomTextField
                label="O"
                name="code2"
                type="text"
                value={formData.code2}
                onChange={handleChange}
              />
              <CustomTextField
                label="D"
                name="code3"
                type="text"
                value={formData.code3}
                onChange={handleChange}
              />
              <CustomTextField
                label="E"
                name="code4"
                type="text"
                value={formData.code4}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid className="resend-content">
            <Typography variant="h6">
              If You don't receive code!{" "}
              <span className="resend-link">Resend</span>
            </Typography>
          </Grid>
          <CustomButton type="submit" className="create-button">
            Verify and Proceed
          </CustomButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CodeVerification;
