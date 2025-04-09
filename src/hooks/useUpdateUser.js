import { useState } from "react";
import axios from "axios";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (formData, onSuccess) => {
    setLoading(true);
    setError(null);

    const token =
      localStorage.getItem("user_token") ||
      sessionStorage.getItem("user_token");

    if (!token) {
      setError("User is not authenticated.");
      setLoading(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

    const payload = {};
    if (formData.oldPassword) payload.old_password = formData.oldPassword;
    if (formData.firstName) payload.first_name = formData.firstName;
    if (formData.lastName) payload.last_name = formData.lastName;
    if (formData.email) payload.email = formData.email;
    if (formData.newPassword) payload.new_password = formData.newPassword;

    try {
      const response = await axios.post(
        `${apiUrl}/api/user-info/update-details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update Response:", response?.data?.message);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Update Error:", error?.response?.data?.error);
      setError(
        error?.response?.data?.error || "Update failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export default useUpdateUser;
