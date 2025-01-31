import { useState } from "react";
import axios, { AxiosError } from "axios";
import { baseURL } from "@/components/api/base";

interface ErrorResponse {
  detail: string;
}

export const useDownloadVersion = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const downloadVersion = async (projectId: string, versionId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Blob>(
        `${baseURL}/api/v1/projects/${projectId}/versions/${versionId}/download`,
        { responseType: "blob" }
      );

      const url: string = window.URL.createObjectURL(new Blob([response.data]));
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${projectId}.v${versionId}.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      const errorResponse = err as AxiosError<ErrorResponse>;
      setError(errorResponse.response?.data?.detail || "Failed to download version.");
    } finally {
      setLoading(false);
    }
  };

  return { downloadVersion, loading, error };
};