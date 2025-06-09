import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import SessionDetail from '@/components/training_sessions/SessionDetails';
import SessionHeader from '@/components/training_sessions/SessionHeader';
import { Loader2 } from 'lucide-react';
import { useTrainingSessionDetail } from '@/hooks/useTrainingSessionDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/ui/tabs";
import ValidationImages from '@/components/validation/ValidationImages';
import ConfigurationLogs from '@/components/training_sessions/ConfigurationLogs';
import { validationImages } from '@/components/training_sessions/mockData';

const SessionDetailPage: React.FC = () => {
  const { projectId, sessionId } = useParams<{ projectId: string, sessionId: string }>();
  

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
      <SessionHeader session={session} projectId={projectId || ''}/>
      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="metrics">Training Metrics</TabsTrigger>
            <TabsTrigger value="images">Validation Images</TabsTrigger>
            <TabsTrigger value="logs">Logs & Config</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <SessionDetail session={session} />
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <ValidationImages validationImages={validationImages} />
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <ConfigurationLogs session={session}  />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SessionDetailPage;