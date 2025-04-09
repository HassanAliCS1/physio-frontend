import { useState } from "react";
import axios from "axios";

const useVerifyResetPasswordOtp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyResetPasswordOtp = async (otp) => {
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

    try {
      const response = await axios.post(`${apiUrl}/api/auth/verify-reset-password-otp`, {
        otp,
      });

    } catch (error) {
      console.error("Verify OTP Error:", error?.response?.data?.error);
      setError(error?.response?.data?.error || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { verifyResetPasswordOtp, loading, error };
};

export default useVerifyResetPasswordOtp;
