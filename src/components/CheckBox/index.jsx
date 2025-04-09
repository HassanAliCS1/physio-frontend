import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckBox = ({ label, checked, onChange, className, name }) => {
  return (
    <FormControlLabel className={name}
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          className={`check-box ${className}`}
        />
      }
      label={label}
    />
  );
};

export default CheckBox;
