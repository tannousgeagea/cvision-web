import { useState } from "react";
import axios, { AxiosError } from "axios";
import { baseURL } from "@/components/api/base";

interface ErrorResponse {
  detail: string;
}

export const useCreateVersion = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const createVersion = async (projectId: string): Promise<any> => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(`${baseURL}/api/v1/projects/${projectId}/versions`);
      setSuccessMessage("Version created successfully!");
      return response.data;
    } catch (err) {
      const errorResponse = err as AxiosError<ErrorResponse>;
      setError(errorResponse.response?.data?.detail || "Failed to create a version.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createVersion, loading, error, successMessage };
};