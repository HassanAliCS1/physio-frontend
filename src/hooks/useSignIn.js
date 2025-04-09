import { useState } from "react";
import axios from "axios";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (formData, rememberMe, onSuccess) => {
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

    try {
      const response = await axios.post(`${apiUrl}/api/auth/signin`, {
        email: formData.email,
        password: formData.password,
      });

      console.log("Response:", response?.data);

      const { access_token, is_first_time_login } = response?.data?.data || {};

      if (access_token) {
        if (rememberMe) {
          localStorage.setItem("user_token", access_token);
        } else {
          sessionStorage.setItem("user_token", access_token);
        }
      }

      if (onSuccess) onSuccess(is_first_time_login);
    } catch (error) {
      console.error("SignIn Error:", error?.response?.data?.error);
      setError(error?.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
};

export default useSignIn;