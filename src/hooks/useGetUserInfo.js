import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { dislocations } from "../assets/assets";

const useGetUserInfo = () => {
  const [user, setUser] = useState(null);
  const [injuryImages, setInjuryImages] = useState([]);
  const [error, setError] = useState(null);
  const [injuryDetails, setInjuryDetails] = useState(null);
  const apiUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

  const fetchUserInfo = useCallback(async () => {
    const token =
      localStorage.getItem("user_token") ||
      sessionStorage.getItem("user_token");
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/api/user-info`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.status === 200) {
        const userProfile = response?.data?.data?.user_profile_details;
        const injuryDetails = response?.data?.data?.initial_pain_details;

        setUser(userProfile);
        setInjuryDetails(injuryDetails);

        if (injuryDetails) {
          const type_of_injury = injuryDetails?.type_of_injury;
          const pain_level = userProfile?.level;

          let selectedImages = [];
          if (dislocations[type_of_injury]) {
            if (pain_level >= 1 && pain_level <= 3) {
              selectedImages = dislocations[type_of_injury].low;
            } else if (pain_level >= 4 && pain_level <= 7) {
              selectedImages = dislocations[type_of_injury].medium;
            } else if (pain_level >= 8) {
              selectedImages = dislocations[type_of_injury].high;
            }
          }
          setInjuryImages(selectedImages);
        }
      } else {
        throw new Error(response?.data?.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.error("User Info Fetch Error:", error);
      setError(error?.response?.data?.error || "Failed to fetch user info");
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return { user, injuryImages, error, injuryDetails, refetchUser: fetchUserInfo };
};

export default useGetUserInfo;
