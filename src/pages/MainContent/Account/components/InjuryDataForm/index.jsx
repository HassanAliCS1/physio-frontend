import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import DropDownMenu from "../../../../../components/DropDownMenu";
import CheckBox from "../../../../../components/CheckBox";
import RatingSlider from "../../../../../components/RatingSlider";
import CustomTextField from "../../../../../components/CustomTextField";

const InjuryDataForm = ({ injuryDetails }) => {
  const injuryOptions = [
    { value: "Rotator cuff injury (shoulder)", label: "Rotator cuff injury (shoulder)" },
    { value: "Meniscus tear (knee)", label: "Meniscus tear (Knee)" },
  ];
  const formattedSurgeryDate = injuryDetails?.surgery_date ? injuryDetails?.surgery_date.split('T')[0] : '';

  const selectedInjuryType = injuryDetails?.type_of_injury || "None";
  return (
    <Grid className="container">
      <Grid width={'50%'} className="injury-details-col">
        <div className="section">
          <Typography className="injury-header-1">
            Injury type you are healing from
          </Typography>
          <div className="injury-header">
            <DropDownMenu
              options={injuryOptions}
              width="420px"
              value={selectedInjuryType}
              disabled
              className="disabled-field"
            />
          </div>
        </div>
        <div className="section">
          <Typography className="injury-header-1">
            The injury occurred
          </Typography>
          <Box>
            <CheckBox
              disabled
              label="Less than 2 weeks"
              checked={injuryDetails?.injury_occured === "LESS_THAN_2_WEEKS"}
              className={
                injuryDetails?.injury_occured === "LESS_THAN_2_WEEKS" ? "" : "unselected-option"
              }
              name={injuryDetails?.injury_occured === "LESS_THAN_2_WEEKS" ? "" : "disable-label"}
            />
            <CheckBox
              disabled
              label="2 weeks to 1 month"
              checked={injuryDetails?.injury_occured === "TWO_WEEKS_TO_1_MONTH"}
              className={
                injuryDetails?.injury_occured === "TWO_WEEKS_TO_1_MONTH" ? "" : "unselected-option"
              }
              name={injuryDetails?.injury_occured === "TWO_WEEKS_TO_1_MONTH" ? "" : "disable-label"}
            />
            <CheckBox
              disabled
              label="1 to 3 months"
              checked={injuryDetails?.injury_occured === "ONE_TO_3_MONTHS"}
              className={
                injuryDetails?.injury_occured === "ONE_TO_3_MONTHS" ? "" : "unselected-option"
              }
              name={injuryDetails?.injury_occured === "ONE_TO_3_MONTHS" ? "" : "disable-label"}
            />
            <CheckBox
              disabled
              label="3 to 6 months "
              checked={injuryDetails?.injury_occured === "THREE_TO_6_MONTHS"}
              className={
                injuryDetails?.injury_occured === "THREE_TO_6_MONTHS" ? "" : "unselected-option"
              }
              name={injuryDetails?.injury_occured === "THREE_TO_6_MONTHS" ? "" : "disable-label"}
            />
            <CheckBox
              disabled
              label="More than 6 months"
              checked={injuryDetails?.injury_occured === "SIX_PLUS_MONTHS"}
              className={
                injuryDetails?.injury_occured === "SIX_PLUS_MONTHS" ? "" : "unselected-option"
              }
              name={injuryDetails?.injury_occured === "SIX_PLUS_MONTHS" ? "" : "disable-label"}
            />
          </Box>
        </div>
        <div className="section">
          <Typography className="injury-header">
            Have you been diagnosed by a medical professional?
          </Typography>
          <Box>
            <CheckBox
              label="Yes"
              checked={injuryDetails?.diagnosed_by_medical_professional === true}
              disabled
              className={
                injuryDetails?.diagnosed_by_medical_professional === true ? "" : "unselected-option"
              }
              name={injuryDetails?.diagnosed_by_medical_professional === true ? "" : "disable-label"}
            />
            <CheckBox
              label="No"
              checked={injuryDetails?.diagnosed_by_medical_professional === false}
              disabled
              className={injuryDetails?.diagnosed_by_medical_professional === false ? "" : "unselected-option"}
              name={injuryDetails?.diagnosed_by_medical_professional === false ? "" : "disable-label"}
            />
          </Box>
        </div>
        <div className="section">
          <Typography className="injury-header">
            Does it hurt during daily tasks?
          </Typography>
          <Box>
            <CheckBox
              label="Yes"
              checked={injuryDetails?.has_pain_during_daily_activities === true}
              disabled
              className={
                injuryDetails?.has_pain_during_daily_activities === true ? "" : "unselected-option"
              }
              name={injuryDetails?.has_pain_during_daily_activities === true ? "" : "disable-label"}
            />
            <CheckBox
              label="No"
              checked={injuryDetails?.has_pain_during_daily_activities === false}
              disabled
              className={injuryDetails?.has_pain_during_daily_activities === false ? "" : "unselected-option"}
              name={injuryDetails?.has_pain_during_daily_activities === false ? "" : "disable-label"}
            />
          </Box>
        </div>
        <div className="section">
          <Typography className="injury-header">
            Have you done any physiotherapy for this injury before?
          </Typography>
          <Box className="checkbox-section2">
            <div className="box-container">
              <CheckBox
                label="Yes"
                checked={injuryDetails?.is_get_physiotherapy_before === true}
                disabled
                className={
                  injuryDetails?.is_get_physiotherapy_before === true ? "" : "unselected-option"
                }
                name={injuryDetails?.is_get_physiotherapy_before === true ? "" : "disable-label"}
              />
              <CheckBox
                label="No"
                checked={injuryDetails?.is_get_physiotherapy_before === false}
                disabled
                className={
                  injuryDetails?.is_get_physiotherapy_before === false ? "" : "unselected-option"
                }
                name={injuryDetails?.is_get_physiotherapy_before === false ? "" : "disable-label"}
              />
            </div>
            {injuryDetails?.is_get_physiotherapy_before && injuryDetails?.physiothrtapy_description?.trim() && (
              <CustomTextField
                label="Please specify the type of exercises or therapy"
                width="420px"
                value={injuryDetails?.physiothrtapy_description}
                disabled
                className="disabled-field"
              />
            )}

          </Box>
        </div>
      </Grid>
      <Grid width={'50%'}  className="injury-details-col">
        <div className="section">
          <Typography className="injury-header-1">
            Your initial pain rate (1-10)
          </Typography>
          <RatingSlider
            value={injuryDetails?.pain_level || 1}
            marks
            min={0}
            max={10}
            width="420px"
            disabled
            className="disabled-field"
          />
        </div>

        <div className="section">
          <Typography className="injury-header">
            Your initial stiffness rate (1-10)
          </Typography>
          <RatingSlider
            value={injuryDetails?.stiffness || 1}
            marks
            min={0}
            max={10}
            width="420px"
            disabled
            className="disabled-field"
          />
        </div>

        <div className="section">
          <Typography className="injury-header">
            Your initial swelling rate (1-10)
          </Typography>
          <RatingSlider
            value={injuryDetails?.swelling || 1}
            marks
            min={0}
            max={10}
            width="420px"
            disabled
            className="disabled-field"
          />
        </div>

        <div className="section">
          <Typography className="injury-header">
            Have you had surgery related to this injury?
          </Typography>
          <Box className="checkbox-section2">
            <div className="box-container">
              <CheckBox
                label="Yes"
                checked={injuryDetails?.had_surgery === true}
                disabled
                className={
                  injuryDetails?.had_surgery === true ? "" : "unselected-option"
                }
                name={injuryDetails?.had_surgery === true ? "" : "disable-label"}
              />
              <CheckBox
                label="No"
                checked={injuryDetails?.had_surgery === false}
                disabled
                className={injuryDetails?.had_surgery === false ? "" : "unselected-option"}
                name={injuryDetails?.had_surgery === false ? "" : "disable-label"}
              />
            </div>
            {injuryDetails?.had_surgery && (
              <>
                <Typography className="injury-header text-hint">
                  Surgery date
                </Typography>
                <CustomTextField
                  type="date"
                  width="420px"
                  value={formattedSurgeryDate}
                  disabled
                  className="disabled-field"
                />
              </>
            )}
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default InjuryDataForm;
