import { useState } from "react";
import axios from "axios";

const useInjuryDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitInjuryDetails = async (formData, onSuccess) => {
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

    const token =
      localStorage.getItem("user_token") ||
      sessionStorage.getItem("user_token");

    if (!token) {
      setError("Access token is required.");
      setLoading(false);
      return;
    }

    let injuryOccuredValue = "";
    if (formData.injuryTime === "LESS_THAN_2_WEEKS") {
      injuryOccuredValue = "LESS_THAN_2_WEEKS";
    } else if (formData.injuryTime === "TWO_WEEKS_TO_1_MONTH") {
      injuryOccuredValue = "TWO_WEEKS_TO_1_MONTH";
    } else if (formData.injuryTime === "ONE_TO_3_MONTHS") {
      injuryOccuredValue = "ONE_TO_3_MONTHS";
    }else if (formData.injuryTime === "THREE_TO_6_MONTHS") {
      injuryOccuredValue = "THREE_TO_6_MONTHS";
    } else if (formData.injuryTime === "SIX_PLUS_MONTHS") {
      injuryOccuredValue = "SIX_PLUS_MONTHS";
    }

    const surgeryDate = formData.surgeryDate
      ? new Date(formData.surgeryDate).toISOString().split("T")[0]
      : null;

    try {
      const requestBody = {
        type_of_injury: formData.injuryType,
        injury_occured: injuryOccuredValue,
        diagnosed_by_medical_professional: formData.diagnosed === "Yes",
        pain_level: formData.painLevel,
        stiffness:formData.stiffnessLevel,
        swelling:formData.swellingLevel,
        has_pain_during_daily_activities: formData.dailyPain === "Yes",
        had_surgery: formData.surgery === "Yes",
        surgery_date: surgeryDate,
        is_get_physiotherapy_before: formData.physiotherapy === "Yes",
        is_previous_physiotherapy_completed:formData.physiotherapyStatus === "Yes",
        physiothrtapy_description: formData.physiotherapyDetails || null,
      };

      const response = await axios.post(
        `${apiUrl}/api/auth/get-started`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response?.data?.message);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Injury Details Error:", error?.response?.data?.error);
      setError(
        error?.response?.data?.error ||
          "Failed to submit injury details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { submitInjuryDetails, loading, error };
};

export default useInjuryDetails;
