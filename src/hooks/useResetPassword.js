import { useState } from "react";
import axios from "axios";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetPassword = async (newPassword, otp) => {
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

    try {
      const response = await axios.post(`${apiUrl}/api/auth/reset-password/`, {
        new_password: newPassword,
        otp: otp,
      });

    } catch (error) {
      console.error("Reset Password Error:", error?.response?.data?.error);
      setError(error?.response?.data?.error || "Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error };
};

export default useResetPassword;