import { useState } from "react";
import axios from "axios";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitEmail = async (email) => {
    setLoading(true);
    setError(null);
    const apiUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
    try {
      const response = await axios.post(`${apiUrl}/api/auth/forgot-password`, { email });

    } catch (err) {
      console.error("Error submitting email:", err?.response?.data?.error);
      setError(err?.response?.data?.error || "An error occurred while submitting your email.");
    } finally {
      setLoading(false);
    }
  };

  return { submitEmail, loading, error };
};

export default useForgotPassword;
