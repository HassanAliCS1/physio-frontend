import React, { useState, useEffect } from "react";
import { experienceQuestions } from "../../../assets/experienceQuestion";
import CustomButton from "../../../components/CustomButton";
import RatingSlider from "../../../components/RatingSlider";
import { Grid, Typography } from "@mui/material";
import useUserFeedback from "../../../hooks/useUserFeedback";
import useGetUserInfo from "../../../hooks/useGetUserInfo";

const Experience = ({onDoneClick}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState({});
  const { submitFeedback } = useUserFeedback();
  const { refetchUser } = useGetUserInfo();

  const feedbackMapping = {
    1: "pain_level",
    2: "swelling",
    3: "stiffness",
    4: "fatigue_level",
    5: "strength_perception",
    6: "functional_improvement",
    7: "exercise_tolerance"
  };

  useEffect(() => {
    setRating(0);
  }, [currentQuestion]);

  const handleRatingChange = (e, newValue) => {
    setRating(newValue);
    const questionKey = feedbackMapping[experienceQuestions[currentQuestion]?.id];

    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [questionKey]: newValue
    }));
  };

  const handleNext = () => {
    if (currentQuestion < experienceQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    submitFeedback(feedback);
    refetchUser();
    onDoneClick();
  };

  return (
    <Grid container item xs={12} md={11} className="question-container-wrapper">
      <h2 className="title">Exercise</h2>
      <Grid container item className="question-container-wrapper">
        <Grid container item xs={10} md={6} className="question-container">
          <Grid item xs={12}>
            <Typography variant="h5" className="question-header">
              Rate Your Experiences
            </Typography>
          </Grid>
          {experienceQuestions?.map((question, index) => (
            index === currentQuestion && (
              <Grid container item xs={12} key={question.id} spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" className="question-title">
                    {question?.id}. {question?.title || "No Question"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" className="question-description">
                    {question?.description || "No Description"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <RatingSlider
                    value={rating}
                    onChange={handleRatingChange}
                    marks
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                    width="720px"
                    disabled={false}
                  />
                </Grid>
                <Grid xs={12} className="button-wrapper">
                  {currentQuestion === experienceQuestions.length - 1 ? (
                    <CustomButton
                      type="submit"
                      className="submit-button"
                      onClick={handleSubmit}
                      width="220px"
                    >
                      Done
                    </CustomButton>
                  ) : (
                    <CustomButton
                      type="button"
                      className="next-button"
                      onClick={handleNext}
                      width="220px"
                    >
                      Next
                    </CustomButton>
                  )}
                </Grid>
              </Grid>
            )
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Experience;