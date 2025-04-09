import { useState, useEffect } from "react";
import axios from "axios";

const useGetExerciseReport = () => {
  const [reportData, setReportData] = useState([]);
  const [reportDataByTime, setReportDataByTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseReport = async () => {
      const token =
        localStorage.getItem("user_token") ||
        sessionStorage.getItem("user_token");
        
      if (!token) return;

      const apiUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${apiUrl}/api/exercise-report`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.status === 200) {
          setReportData(response.data?.data?.report_data || []);
          setReportDataByTime(response.data?.data?.report_data_by_time || []);
        } else {
          throw new Error(
            response?.data?.message || "Failed to fetch exercise report"
          );
        }
      } catch (error) {
        console.error("Exercise Report Fetch Error:", error);
        setError(
          error?.response?.data?.error || "Failed to fetch exercise report"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseReport();
  }, []);

  return { reportData, reportDataByTime, loading, error };
};

export default useGetExerciseReport;
