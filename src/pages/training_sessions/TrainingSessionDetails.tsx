import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import SessionDetail from '@/components/training_sessions/SessionDetails';
import { mockTrainingSessions } from '@/components/training_sessions/mockData';

const SessionDetailPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  
  const session = useMemo(() => {
    return mockTrainingSessions.find((s) => s.id === sessionId);
  }, [sessionId]);

  return (
    <div className="space-y-6 p-6 w-full sm:px-6 lg:px-8 py-8">
      <SessionDetail session={session} />
    </div>
  );
};

export default SessionDetailPage;