import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import CustomTextField from "../../../components/CustomTextField";
import RatingSlider from "../../../components/RatingSlider";
import DropDownMenu from "../../../components/DropDownMenu";
import CheckBox from "../../../components/CheckBox";
import CustomButton from "../../../components/CustomButton";
import SignUpImage from "../../../assets/signup-cover.png";
import useInjuryDetails from "../../../hooks/useInjuryDetails";
import { useNavigate } from "react-router-dom";

const InjuryDetailForm = () => {
  const navigate = useNavigate();
  const [injuryType, setInjuryType] = useState("");
  const [injuryTime, setInjuryTime] = useState("");
  const [diagnosed, setDiagnosed] = useState("");
  const [dailyPain, setDailyPain] = useState("");
  const [surgery, setSurgery] = useState("");
  const [physiotherapy, setPhysiotherapy] = useState("");
  const [errors, setErrors] = useState({});
  const [painLevel, setPainLevel] = useState(0);
  const [stiffnessLevel, setStiffnessLevel] = useState(0);
  const [swellingLevel, setSwellingLevel] = useState(0);
  const [physiotherapyStatus, setPhysiotherapyStatus] = useState("");

  const validateForm = () => {
    let newErrors = {};
    if (!injuryType) newErrors.injuryType = "Please select an injury type";
    if (!injuryTime)
      newErrors.injuryTime = "Please select when the injury occurred";
    if (!diagnosed)
      newErrors.diagnosed = "Please specify if you have been diagnosed";
    if (!dailyPain)
      newErrors.dailyPain =
        "Please specify if you feel pain during daily tasks";
    if (!painLevel == 0) newErrors.painLevel = "Please specify pain level";
    if (!stiffnessLevel == 0)
      newErrors.stiffnessLevel = "Please specify stiffness level";
    if (!swellingLevel == 0)
      newErrors.swellingLevel = "Please specdssify swelling level";
    if (!surgery) newErrors.surgery = "Please specify if you have had surgery";
    if (!physiotherapy)
      newErrors.physiotherapy = "Please specify if you have had physiotherapy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { submitInjuryDetails, loading, error } = useInjuryDetails();

  const [formData, setFormData] = useState({
    injuryType: "",
    injuryTime: "",
    diagnosed: "",
    painLevel: 0,
    stiffnessLevel: 0,
    swellingLevel: 0,
    dailyPain: "",
    surgery: "",
    surgeryDate: "",
    physiotherapy: "",
    physiotherapyDetails: "",
    physiotherapyStatus: "",
  });

  const injuryOptions = [
    { value: "shoulder", label: "Shoulder" },
    { value: "knee", label: "Knee" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    submitInjuryDetails(formData, () => {
      console.log("Injury details submitted successfully!");
      navigate("/dashboard");
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Grid className="injury-detail">
      <Grid container className="main-side-wrapper">
        <Grid item xs={12} md={6} className="left-section">
          <img src={SignUpImage} alt="Background" height={"100%"}/>
        </Grid>
        <Grid item xs={12} md={6} className="right-section">
          <Box className="injury-detail-wrapper">
            <Box className="title-wrapper">
              <Typography variant="h4" gutterBottom>
                Get Started
              </Typography>
              <div className="divider-wrapper">
                <span className="line"></span>
                <span className="line"></span>
              </div>
            </Box>

            <form className="injury-details-form">
              <Typography className="question">
                Which injury are you healing from?
              </Typography>
              <DropDownMenu
                options={injuryOptions}
                label="Select"
                name="injuryType"
                value={formData.injuryType}
                onChange={(e) => {
                  const { value } = e.target;
                  setInjuryType(value);
                  setFormData((prevData) => ({
                    ...prevData,
                    injuryType: value,
                  }));
                }}
                width="420px"
              />
              {errors?.injuryType && (
                <Typography color="error">{errors?.injuryType}</Typography>
              )}

              <Typography className="question">
                How long ago did the injury occur?
              </Typography>
              <Box className="checkbox-section2">
                <CheckBox
                  label="Less than 2 weeks"
                  checked={formData.injuryTime === "LESS_THAN_2_WEEKS"}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      injuryTime: "LESS_THAN_2_WEEKS",
                    });
                    setInjuryTime("LESS_THAN_2_WEEKS");
                  }}
                />
                <CheckBox
                  label="2 weeks to 1 month"
                  checked={formData.injuryTime === "TWO_WEEKS_TO_1_MONTH"}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      injuryTime: "TWO_WEEKS_TO_1_MONTH",
                    });
                    setInjuryTime("TWO_WEEKS_TO_1_MONTH");
                  }}
                />
                <CheckBox
                  label="1 to 3 months"
                  checked={formData.injuryTime === "ONE_TO_3_MONTHS"}
                  onChange={() => {
                    setFormData({ ...formData, injuryTime: "ONE_TO_3_MONTHS" });
                    setInjuryTime("ONE_TO_3_MONTHS");
                  }}
                />
                <CheckBox
                  label="3 to 6 months "
                  checked={formData.injuryTime === "THREE_TO_6_MONTHS"}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      injuryTime: "THREE_TO_6_MONTHS",
                    });
                    setInjuryTime("THREE_TO_6_MONTHS");
                  }}
                />
                <CheckBox
                  label="More than 6 months"
                  checked={formData.injuryTime === "SIX_PLUS_MONTHS"}
                  onChange={() => {
                    setFormData({ ...formData, injuryTime: "SIX_PLUS_MONTHS" });
                    setInjuryTime("SIX_PLUS_MONTHS");
                  }}
                />
                {errors?.injuryTime && (
                  <Typography color="error">{errors?.injuryTime}</Typography>
                )}
              </Box>

              <Typography className="question">
                Have you been diagnosed by a medical professional?
              </Typography>
              <Box>
                <CheckBox
                  label="Yes"
                  checked={formData.diagnosed === "Yes"}
                  onChange={() => {
                    setFormData({ ...formData, diagnosed: "Yes" });
                    setDiagnosed("Yes");
                  }}
                />
                <CheckBox
                  label="No"
                  checked={formData.diagnosed === "No"}
                  onChange={() => {
                    setFormData({ ...formData, diagnosed: "No" });
                    setDiagnosed("No");
                  }}
                />
                {errors?.diagnosed && (
                  <Typography color="error">{errors?.diagnosed}</Typography>
                )}
              </Box>

              <Typography className="question">
                Rate your pain (1-10)
              </Typography>
              <RatingSlider
                defaultValue={0}
                marks
                min={0}
                max={10}
                value={formData.painLevel}
                onChange={(e, value) => {
                  setFormData({ ...formData, painLevel: value });
                }}
                width="420px"
              />
              {errors?.painLevel && (
                <Typography color="error">{errors?.painLevel}</Typography>
              )}

              <Typography className="question">
                Rate your stiffness level (1-10)
              </Typography>
              <RatingSlider
                defaultValue={0}
                marks
                min={0}
                max={10}
                width="420px"
                value={formData.stiffnessLevel}
                onChange={(e, value) => {
                  setFormData({ ...formData, stiffnessLevel: value });
                }}
              />
              {errors?.stiffnessLevel && (
                <Typography color="error">{errors?.stiffnessLevel}</Typography>
              )}

              <Typography className="question">
                Rate your swelling level (1-10)
              </Typography>
              <RatingSlider
                defaultValue={0}
                marks
                min={0}
                max={10}
                width="420px"
                value={formData.swellingLevel}
                onChange={(e, value) => {
                  setFormData({ ...formData, swellingLevel: value });
                }}
              />
              {errors?.swellingLevel && (
                <Typography color="error">{errors?.swellingLevel}</Typography>
              )}

              <Typography className="question">
                Does it hurt during daily tasks?
              </Typography>
              <Box>
                <CheckBox
                  label="Yes"
                  checked={formData.dailyPain === "Yes"}
                  onChange={() => {
                    setFormData({ ...formData, dailyPain: "Yes" });
                    setDailyPain("Yes");
                  }}
                />
                <CheckBox
                  label="No"
                  checked={formData.dailyPain === "No"}
                  onChange={() => {
                    setFormData({ ...formData, dailyPain: "No" });
                    setDailyPain("No");
                  }}
                />
                {errors?.dailyPain && (
                  <Typography color="error">{errors?.dailyPain}</Typography>
                )}
              </Box>

              <Typography className="question">
                Have you had surgery related to this injury?
              </Typography>
              <Box className="checkbox-section2">
                <CheckBox
                  label="Yes"
                  checked={formData.surgery === "Yes"}
                  onChange={() => {
                    setFormData({ ...formData, surgery: "Yes" });
                    setSurgery("Yes");
                  }}
                />
                {formData?.surgery === "Yes" && (
                  <CustomTextField
                    type="date"
                    width="320px"
                    value={formData?.surgeryDate}
                    onChange={handleChange}
                    name="surgeryDate"
                  />
                )}
                <CheckBox
                  label="No"
                  checked={formData.surgery === "No"}
                  onChange={() => {
                    setFormData({ ...formData, surgery: "No" });
                    setSurgery("No");
                  }}
                />
                {errors?.surgery && (
                  <Typography color="error">{errors?.surgery}</Typography>
                )}
              </Box>

              <Typography className="question">
                Have you done any physiotherapy for this injury before?
              </Typography>
              <Box className="checkbox-section2">
                <CheckBox
                  label="Yes"
                  checked={formData.physiotherapy === "Yes"}
                  onChange={() => {
                    setFormData({ ...formData, physiotherapy: "Yes" });
                    setPhysiotherapy("Yes");
                  }}
                />
                {formData?.physiotherapy === "Yes" && (
                  <div className="exercise-status">
                    <div className="status">
                      <CheckBox
                        label="Completed successfully"
                        checked={formData.physiotherapyStatus === "Yes"}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            physiotherapyStatus: "Yes",
                          });
                          setPhysiotherapyStatus("Yes");
                        }}
                      />
                      <CheckBox
                        label="Did therapy but still has issues"
                        checked={formData.physiotherapyStatus === "No"}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            physiotherapyStatus: "No",
                          });
                          setPhysiotherapyStatus("No");
                        }}
                      />
                    </div>
                    <CustomTextField
                      label="Please specify the type of exercises or therapy"
                      width="420px"
                      value={formData?.physiotherapyDetails}
                      onChange={handleChange}
                      name="physiotherapyDetails"
                    />
                    {errors?.physiotherapyStatus && (
                      <Typography color="error">
                        {errors?.physiotherapyStatus}
                      </Typography>
                    )}
                  </div>
                )}
                <CheckBox
                  label="No"
                  checked={formData.physiotherapy === "No"}
                  onChange={() => {
                    setFormData({ ...formData, physiotherapy: "No" });
                    setPhysiotherapy("No");
                  }}
                />
                {errors?.physiotherapy && (
                  <Typography color="error">{errors?.physiotherapy}</Typography>
                )}
              </Box>

              <Typography color="error">{error}</Typography>

              <Grid xs={11} className="button-container">
                <CustomButton
                  type="submit"
                  className="start-button-wrapper"
                  width="220px"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Get started!"}
                </CustomButton>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InjuryDetailForm;
