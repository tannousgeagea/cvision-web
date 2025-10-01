import { useQuery, useQueries } from "@tanstack/react-query";
import { UserAnalytics, AnalyticsKPIs, AnalyticsFilters } from "@/types/analytics";
import axios from "axios";
import { baseURL } from "@/components/api/base";

// API client
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token if available (adjust based on your auth implementation)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // or get from your auth context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API response types
interface AnalyticsResponse {
  data: UserAnalytics[];
  kpis: AnalyticsKPIs;
}

interface UserInfo {
  id: string;
  name: string;
  role: string;
}

interface ProjectInfo {
  id: string;
  name: string;
}

// API functions
const fetchAnalytics = async (filters: AnalyticsFilters): Promise<AnalyticsResponse> => {
  const params = new URLSearchParams();
  params.append("timeFrame", filters.timeFrame);
  
  if (filters.role) {
    params.append("role", filters.role);
  }
//   if (filters.selectedUsers) {
//     params.append("userId", filters.selectedUsers);
//   }
  if (filters.projectId) {
    params.append("projectId", filters.projectId);
  }

  const { data } = await apiClient.get<AnalyticsResponse>(
    `/api/v1/analytics?${params.toString()}`
  );
  return data;
};

const fetchUsers = async (): Promise<UserInfo[]> => {
  const { data } = await apiClient.get<UserInfo[]>("/api/v1/analytics/users");
  return data;
};

const fetchRoles = async (): Promise<string[]> => {
  const { data } = await apiClient.get<string[]>("/api/v1/analytics/roles");
  return data;
};

const fetchProjects = async (): Promise<ProjectInfo[]> => {
  const { data } = await apiClient.get<ProjectInfo[]>("/api/v1/analytics/projects");
  return data;
};

// Main hook for team analytics
export const useTeamAnalytics = (filters: AnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", filters],
    queryFn: () => fetchAnalytics(filters),
    staleTime: 60000, // Consider data stale after 1 minute
    refetchInterval: 300000, // Refetch every 5 minutes
    refetchOnWindowFocus: true, // Refetch when user focuses window
    retry: 2, // Retry failed requests twice
    select: (data) => ({
      data: data.data,
      kpis: data.kpis,
    }),
  });
};

// Hook for fetching available users
export const useAnalyticsUsers = () => {
  return useQuery({
    queryKey: ["analytics", "users"],
    queryFn: fetchUsers,
    staleTime: 300000, // 5 minutes - users don't change often
    retry: 2,
  });
};

// Hook for fetching available roles
export const useAnalyticsRoles = () => {
  return useQuery({
    queryKey: ["analytics", "roles"],
    queryFn: fetchRoles,
    staleTime: 300000, // 5 minutes - roles don't change often
    retry: 2,
  });
};

// Hook for fetching available projects
export const useAnalyticsProjects = () => {
  return useQuery({
    queryKey: ["analytics", "projects"],
    queryFn: fetchProjects,
    staleTime: 300000, // 5 minutes - projects don't change often
    retry: 2,
  });
};

// Combined hook for all filter options (useful for filter dropdowns)
export const useAnalyticsFilterOptions = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["analytics", "users"],
        queryFn: fetchUsers,
        staleTime: 300000,
      },
      {
        queryKey: ["analytics", "roles"],
        queryFn: fetchRoles,
        staleTime: 300000,
      },
      {
        queryKey: ["analytics", "projects"],
        queryFn: fetchProjects,
        staleTime: 300000,
      },
    ],
  });

  return {
    users: queries[0].data || [],
    roles: queries[1].data || [],
    projects: queries[2].data || [],
    isLoading: queries.some((query) => query.isLoading),
    isError: queries.some((query) => query.isError),
    errors: queries.map((query) => query.error),
  };
};

// Hook for analytics with multiple filters (returns all combinations)
export const useMultipleAnalytics = (filtersList: AnalyticsFilters[]) => {
  const queries = useQueries({
    queries: filtersList.map((filters) => ({
      queryKey: ["analytics", filters],
      queryFn: () => fetchAnalytics(filters),
      staleTime: 60000,
      refetchInterval: 300000,
    })),
  });

  return {
    results: queries.map((query) => query.data),
    isLoading: queries.some((query) => query.isLoading),
    isError: queries.some((query) => query.isError),
    errors: queries.map((query) => query.error),
  };
};

// Hook for comparing analytics between two time periods
export const useAnalyticsComparison = (
  currentFilters: AnalyticsFilters,
  previousFilters: AnalyticsFilters
) => {
  const currentQuery = useQuery({
    queryKey: ["analytics", "current", currentFilters],
    queryFn: () => fetchAnalytics(currentFilters),
    staleTime: 60000,
  });

  const previousQuery = useQuery({
    queryKey: ["analytics", "previous", previousFilters],
    queryFn: () => fetchAnalytics(previousFilters),
    staleTime: 60000,
  });

  // Calculate percentage changes
  const comparison = {
    annotationsChange: 0,
    reviewsChange: 0,
    completionsChange: 0,
  };

  if (currentQuery.data && previousQuery.data) {
    const current = currentQuery.data.kpis;
    const previous = previousQuery.data.kpis;

    if (previous.totalAnnotationsThisWeek > 0) {
      comparison.annotationsChange =
        ((current.totalAnnotationsThisWeek - previous.totalAnnotationsThisWeek) /
          previous.totalAnnotationsThisWeek) *
        100;
    }

    if (previous.totalReviewsThisWeek > 0) {
      comparison.reviewsChange =
        ((current.totalReviewsThisWeek - previous.totalReviewsThisWeek) /
          previous.totalReviewsThisWeek) *
        100;
    }

    if (previous.totalCompletionsThisWeek > 0) {
      comparison.completionsChange =
        ((current.totalCompletionsThisWeek - previous.totalCompletionsThisWeek) /
          previous.totalCompletionsThisWeek) *
        100;
    }
  }

  return {
    current: currentQuery.data,
    previous: previousQuery.data,
    comparison,
    isLoading: currentQuery.isLoading || previousQuery.isLoading,
    isError: currentQuery.isError || previousQuery.isError,
    errors: [currentQuery.error, previousQuery.error],
  };
};

// Utility function to prefetch analytics data (useful for optimistic navigation)
export const prefetchAnalytics = async (
  queryClient: any,
  filters: AnalyticsFilters
) => {
  await queryClient.prefetchQuery({
    queryKey: ["analytics", filters],
    queryFn: () => fetchAnalytics(filters),
    staleTime: 60000,
  });
};

// Hook for real-time analytics updates (polls more frequently)
export const useRealtimeAnalytics = (filters: AnalyticsFilters, enabled = true) => {
  return useQuery({
    queryKey: ["analytics", "realtime", filters],
    queryFn: () => fetchAnalytics(filters),
    staleTime: 10000, // 10 seconds
    refetchInterval: enabled ? 30000 : false, // Poll every 30 seconds when enabled
    refetchOnWindowFocus: true,
    enabled,
  });
};

// Export types for convenience
export type { AnalyticsResponse, UserInfo, ProjectInfo };