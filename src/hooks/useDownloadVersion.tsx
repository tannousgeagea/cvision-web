import { useState, useCallback } from 'react';
import { baseURL } from '@/components/api/base';

interface UseDownloadVersionResult {
  downloadVersion: (versionId: number, format?: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useDownloadVersion = (): UseDownloadVersionResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const downloadVersion = useCallback(async (versionId: number, format: string = 'yolo') => {
    setLoading(true);
    setError(null);
    try {
      // Construct the URL
      const url = `${baseURL}/api/v1/versions/${versionId}/download?format=${format}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download version: ${response.statusText}`);
      }
      // Get the response as a blob
      const blob = await response.blob();
      // Create a temporary download URL
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      // Set a default file name
      link.download = `version_${versionId}.${format}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err: any) {
      setError(err.message || 'Error downloading version');
    } finally {
      setLoading(false);
    }
  }, []);

  return { downloadVersion, loading, error };
};
