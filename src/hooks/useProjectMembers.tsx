import { ProjectMember } from "@/types/membership";
import { baseURL } from "@/components/api/base";
import { useQuery } from '@tanstack/react-query';

export const getProjectMembers = async (projectId: string): Promise<ProjectMember[]> => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${baseURL}/api/v1/projects/${projectId}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch organization members");
  }

  return response.json();
};


export function useProjectMembers(projectId: string) {
  return useQuery({
    queryKey: ['project-members', projectId],
    queryFn: () => getProjectMembers(projectId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}