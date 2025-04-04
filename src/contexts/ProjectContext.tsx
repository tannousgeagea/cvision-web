// ProjectContext.tsx
import React, { createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';

const ProjectContext = createContext<string | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    throw new Error('Project ID is missing from route parameters');
  }

  return (
    <ProjectContext.Provider value={projectId}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectId = (): string => {
  const projectId = useContext(ProjectContext);
  if (!projectId) {
    throw new Error('useProjectId must be used within a ProjectProvider');
  }
  return projectId;
};
