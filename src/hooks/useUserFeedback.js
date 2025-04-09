import { useState } from "react";
import axios from "axios";

const useUserFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const submitFeedback = async (feedback, onSuccess) => {
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

    try {
      const token =
        localStorage.getItem("user_token") ||
        sessionStorage.getItem("user_token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      if (Object.values(feedback).includes(0)) {
        throw new Error("Please complete all questions before submitting.");
      }

      const response = await axios.post(
        `${apiUrl}/api/user-feedback`,
        feedback,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Feedback Response:", response?.data);

      if (response?.data?.status === 201) {
        if (onSuccess)
          onSuccess(
            response?.data?.message || "Feedback submitted successfully!"
          );
        setFeedbackSubmitted(true);
      } else {
        throw new Error(
          response?.data?.message || "Feedback submission failed"
        );
      }
    } catch (error) {
      console.error(
        "Feedback Submission Error:",
        error?.response?.data?.error || error.message
      );
      setError(
        error?.response?.data?.error ||
          error.message ||
          "Failed to submit feedback"
      );
    } finally {
      setLoading(false);
    }
  };

  return { submitFeedback, loading, error, feedbackSubmitted };
};

export default useUserFeedback;
