import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({
  variant = "contained",
  className = "",
  type = "button",
  width = "auto",
  height = "auto",
  ...rest
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      className="custom-button"
      sx={{
        width: width,
        height: height
      }}
      {...rest}

    >
    </Button>
  );
};
export default CustomButton;