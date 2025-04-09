import React from "react";
import { TextField, MenuItem } from "@mui/material";

const DropDownMenu = ({ label, options, width="auto" ,...props }) => {
  return (
    <TextField select label={label} 
    sx={{ width: width }}  
    {...props}
    className="drop-down"
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DropDownMenu;
