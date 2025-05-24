import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import SessionDetail from '@/components/training_sessions/SessionDetails';
import { Loader2 } from 'lucide-react';
import { useTrainingSessionDetail } from '@/hooks/useTrainingSessionDetail';

const SessionDetailPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  

  const {
    data: session,
    isLoading,
    isError,
    error,
  } = useTrainingSessionDetail(sessionId || '');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10 text-muted-foreground">
        <Loader2 className="animate-spin mr-2 h-5 w-5" />
        Loading session...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 py-10 text-center">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 w-full sm:px-6 lg:px-8 py-8">
      <SessionDetail session={session} />
    </div>
  );
};

export default SessionDetailPage;