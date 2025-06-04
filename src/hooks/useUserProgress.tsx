import { useQuery } from "@tanstack/react-query";
import { UserProgress, ProgressSummary } from "@/types/progress";

// Mock API function - replace with actual API call
const fetchUserProgress = async (): Promise<UserProgress[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock progress data for active users
  const mockProgressData: UserProgress[] = [
    {
      userId: "user-1",
      userName: "Alice Johnson",
      userRole: "Senior Annotator",
      avatarUrl: undefined,
      totalImages: 425,
      annotatedImages: 320,
      reviewedImages: 280,
      completedImages: 250,
      progressPercentage: 75.3,
      lastUpdated: new Date("2024-06-04T14:30:00Z"),
      assignedJobs: [
        {
          jobId: "job-1",
          jobName: "Product Photos Batch A",
          totalImages: 150,
          annotatedImages: 120,
          reviewedImages: 100,
          completedImages: 90,
        },
        {
          jobId: "job-3",
          jobName: "Traffic Camera Analysis",
          totalImages: 200,
          annotatedImages: 150,
          reviewedImages: 130,
          completedImages: 110,
        },
        {
          jobId: "job-5",
          jobName: "Medical Scans Review",
          totalImages: 75,
          annotatedImages: 50,
          reviewedImages: 50,
          completedImages: 50,
        },
      ],
    },
    {
      userId: "user-2",
      userName: "Bob Smith",
      userRole: "Annotator",
      avatarUrl: undefined,
      totalImages: 280,
      annotatedImages: 180,
      reviewedImages: 120,
      completedImages: 100,
      progressPercentage: 64.3,
      lastUpdated: new Date("2024-06-04T13:15:00Z"),
      assignedJobs: [
        {
          jobId: "job-2",
          jobName: "Retail Product Classification",
          totalImages: 180,
          annotatedImages: 120,
          reviewedImages: 80,
          completedImages: 60,
        },
        {
          jobId: "job-4",
          jobName: "Document Analysis",
          totalImages: 100,
          annotatedImages: 60,
          reviewedImages: 40,
          completedImages: 40,
        },
      ],
    },
    {
      userId: "user-3",
      userName: "Carol Davis",
      userRole: "Lead Reviewer",
      avatarUrl: undefined,
      totalImages: 320,
      annotatedImages: 290,
      reviewedImages: 270,
      completedImages: 260,
      progressPercentage: 90.6,
      lastUpdated: new Date("2024-06-04T15:45:00Z"),
      assignedJobs: [
        {
          jobId: "job-6",
          jobName: "Satellite Imagery Analysis",
          totalImages: 220,
          annotatedImages: 200,
          reviewedImages: 190,
          completedImages: 180,
        },
        {
          jobId: "job-7",
          jobName: "Quality Control Review",
          totalImages: 100,
          annotatedImages: 90,
          reviewedImages: 80,
          completedImages: 80,
        },
      ],
    },
    {
      userId: "user-4",
      userName: "David Wilson",
      userRole: "Junior Annotator",
      avatarUrl: undefined,
      totalImages: 150,
      annotatedImages: 60,
      reviewedImages: 30,
      completedImages: 25,
      progressPercentage: 40.0,
      lastUpdated: new Date("2024-06-04T12:00:00Z"),
      assignedJobs: [
        {
          jobId: "job-8",
          jobName: "Basic Object Detection",
          totalImages: 150,
          annotatedImages: 60,
          reviewedImages: 30,
          completedImages: 25,
        },
      ],
    },
  ];
  
  return mockProgressData.sort((a, b) => b.progressPercentage - a.progressPercentage);
};

const fetchProgressSummary = async (): Promise<ProgressSummary> => {
  const progressData = await fetchUserProgress();
  
  const summary: ProgressSummary = {
    totalActiveUsers: progressData.length,
    averageProgress: progressData.reduce((sum, user) => sum + user.progressPercentage, 0) / progressData.length,
    totalImagesInProgress: progressData.reduce((sum, user) => sum + user.totalImages, 0),
    totalImagesCompleted: progressData.reduce((sum, user) => sum + user.completedImages, 0),
  };
  
  return summary;
};

export const useUserProgress = () => {
  return useQuery({
    queryKey: ['userProgress'],
    queryFn: fetchUserProgress,
    refetchInterval: 60000, // Refetch every minute for real-time updates
    staleTime: 30000, // Consider data stale after 30 seconds
  });
};

export const useProgressSummary = () => {
  return useQuery({
    queryKey: ['progressSummary'],
    queryFn: fetchProgressSummary,
    refetchInterval: 60000,
    staleTime: 30000,
  });
};