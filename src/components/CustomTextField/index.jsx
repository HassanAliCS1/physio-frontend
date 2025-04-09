import { TextField } from "@mui/material";

const CustomTextField = ({ type, label,width="auto", ...props }) => {
  return (
    <TextField
    className="custom-text-field"
      type={type} 
      label={label}
      sx={{ width: width }}
      InputLabelProps={type === "date" ? { shrink: true } : {}}
      {...props}
    />
  );
};

export default CustomTextField;
