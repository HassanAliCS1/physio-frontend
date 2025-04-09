import { useState } from "react";
import axios from "axios";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (formData, onSuccess) => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

    try {
      const response = await axios.post(`${apiUrl}/api/auth/signup`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      console.log("Response:", response?.data?.message);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Signup Error:", error?.response?.data?.error);
      setError(
        error?.response?.data?.error || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return { signUp, loading, error };
};

export default useSignup;
