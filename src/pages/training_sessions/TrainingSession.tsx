import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SessionFilters from '@/components/training_sessions/SearchFilters';
import SessionList from '@/components/training_sessions/SessionList';
import { projects,  models, mockTrainingSessions } from '@/components/training_sessions/mockData';
import { TrainingSession } from '@/types/training_session';

const SessionsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredSessions = useMemo(() => {
    return mockTrainingSessions.filter((session) => {
      // Filter by search query
      const matchesSearch =
        searchQuery === '' ||
        session.modelName.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by project
      const matchesProject =
        selectedProject === '' || session.projectName === projects.find(p => p.id === selectedProject)?.name;

      // Filter by model
      const matchesModel =
        selectedModel === '' || session.modelName === models.find(m => m.id === selectedModel)?.name;

      // Filter by status
      const matchesStatus = selectedStatus === '' || session.status === selectedStatus;

      return matchesSearch && matchesProject && matchesModel && matchesStatus;
    });
  }, [searchQuery, selectedProject, selectedModel, selectedStatus]);

  const isFiltered = searchQuery !== '' || selectedProject !== '' || selectedModel !== '' || selectedStatus !== '';


  const handleViewSession = (session: TrainingSession) => {
    navigate(`/projects/${projectId}/sessions/${session.id}`)
  }
  return (
    <div className="space-y-6 p-6 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Training Sessions</h1>
        <SessionFilters
          projects={projects}
          models={models}
          searchQuery={searchQuery}
          selectedProject={selectedProject}
          selectedModel={selectedModel}
          selectedStatus={selectedStatus}
          onSearchChange={setSearchQuery}
          onProjectChange={setSelectedProject}
          onModelChange={setSelectedModel}
          onStatusChange={setSelectedStatus}
        />
      </div>

      <SessionList sessions={filteredSessions} isFiltered={isFiltered} onViewSession={handleViewSession} />
    </div>
  );
};

export default SessionsPage;