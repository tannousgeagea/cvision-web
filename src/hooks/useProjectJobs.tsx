import { Job } from '@/types/jobs';
import { User } from '@/types/membership';
import { useQuery } from '@tanstack/react-query';
import { baseURL } from '@/components/api/base';

export async function fetchProjectJobs(projectId: string): Promise<Job[]> {
  const token = localStorage.getItem("token") || sessionStorage.getItem('token');
  const response = await fetch(`${baseURL}/api/v1/projects/${projectId}/jobs`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch project jobs');
  }

  const data = await response.json();
  return data.map((job: any) => ({
    id: String(job.id),
    name: job.name,
    description: job.description,
    status: job.status,
    imageCount: job.imageCount,
    assignedUser: job.assignedUser ? {
      id: String(job.assignedUser.id),
      username: job.assignedUser.username,
      email: job.assignedUser.email,
      avatar: job.assignedUser.avatar || undefined,
    } as User : null,
    createdAt: new Date(job.createdAt),
    updatedAt: new Date(job.updatedAt),
  })) as Job[];
}

export function useProjectJobs(projectId: string) {
  return useQuery({
    queryKey: ['project-jobs', projectId],
    queryFn: () => fetchProjectJobs(projectId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}