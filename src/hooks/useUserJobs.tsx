
import { useQuery } from "@tanstack/react-query";
import { Job, JobStatus } from "@/types/jobs";
import { baseURL } from "@/components/api/base";


export const fetchMyAssignedJobs = async (): Promise<Job[]> => {
  const token = localStorage.getItem("token") || sessionStorage.getItem('token');
  const response = await fetch(`${baseURL}/api/v1/jobs/my-assigned`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch assigned jobs");
  return response.json();
};

export const useUserJobs = () => {
  return useQuery({
    queryKey: ['userAssignedJobs'],
    queryFn: fetchMyAssignedJobs,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};
