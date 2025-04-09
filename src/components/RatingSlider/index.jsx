import React from "react";
import { Slider, Box } from "@mui/material";

const marks = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}));

const RatingSlider = ({ min = 0, max = 10, value = 1, defaultValue = 1, width = "auto", disabled = false, className, onChange }) => {
  return (
    <Box className={`rating-slider ${className}`}>
      <Slider
        defaultValue={defaultValue}
        value={value}
        step={1}
        marks={marks}
        min={min}
        max={max}
        disabled={disabled}
        sx={{ width: width }}
        onChange={onChange}
      />
    </Box>
  );
};

export default RatingSlider;
