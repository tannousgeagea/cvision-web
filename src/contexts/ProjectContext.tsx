// ProjectContext.tsx
import React, { createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '@/components/api/base';
import { useQuery } from '@tanstack/react-query';

interface Project {
  id: number;
  name: string;
  description?: string;
  thumbnail_url?: string;
  // Add other fields as needed
}

interface ProjectContextValue {
  projectId: string;
  project: Project | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    throw new Error('Project ID is missing from route parameters');
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/api/v1/projects/${projectId}`);
      return response.data; 
    },
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
  });

  const contextValue: ProjectContextValue = {
    projectId,
    project: data || null,
    isLoading,
    error: error ? (error as Error) : null,
    refetch,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextValue => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
