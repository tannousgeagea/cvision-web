
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/project"
import { baseURL } from "@/components/api/base";


export const fetchMyAssignedProjects = async (): Promise<Project[]> => {
  const token = localStorage.getItem("token") || sessionStorage.getItem('token');
  const response = await fetch(`${baseURL}/api/v1/projects/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch assigned jobs");
  return response.json();
};

export const useUserProjects = () => {
  return useQuery({
    queryKey: ['userAssignedProjects'],
    queryFn: fetchMyAssignedProjects,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};
