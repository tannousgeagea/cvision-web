import React from 'react';
import { TrainingSession } from '@/types/training_session'
import Badge from './ui/Badge';
import ProgressBar from './ui/ProgressBar';
import MetricCard from './ui/MetricCard';
import { ArrowLeft, Calendar, Clock, Download, RefreshCw } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface SessionDetailProps {
  session: TrainingSession | undefined;
}

const SessionDetail: React.FC<SessionDetailProps> = ({ session }) => {
  const { projectId, sessionId } = useParams<{ projectId: string; sessionId: string }>();
  
  if (!session) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center py-8">
          <p className="text-gray-500">Session with ID {sessionId} not found</p>
          <Link to="/" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to sessions list
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link to={`/projects/${projectId}/sessions`} className="inline-flex items-center text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to sessions
        </Link>
        <Badge status={session.status} />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{session.modelName}</h2>
          <p className="text-gray-600 mt-1">{session.projectName}</p>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Created: {formatDate(session.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Time: {formatTime(session.createdAt)}</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 mb-2">Progress</p>
            <ProgressBar progress={session.progress} status={session.status} />
            <p className="text-xs text-gray-500 mt-1 text-right">{session.progress}% complete</p>
          </div>

          {session.metrics && Object.keys(session.metrics).length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {session.metrics.accuracy && (
                  <MetricCard label="Accuracy" value={session.metrics.accuracy} suffix="%" />
                )}
                {session.metrics.f1Score && (
                  <MetricCard label="F1 Score" value={session.metrics.f1Score} suffix="%" />
                )}
                {session.metrics.precision && (
                  <MetricCard label="Precision" value={session.metrics.precision} suffix="%" />
                )}
                {session.metrics.recall && (
                  <MetricCard label="Recall" value={session.metrics.recall} suffix="%" />
                )}
              </div>
            </div>
          )}

          {session.configuration && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Configuration</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(session.configuration).map(([key, value]) => (
                    <div key={key} className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {session.logs && session.logs.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Logs</h3>
              <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
                {session.logs.map((log, index) => (
                  <div key={index} className="py-1">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            {session.status === 'failed' && (
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <RefreshCw className="w-4 h-4 mr-1" /> Retry Training
              </button>
            )}
            {session.status === 'completed' && (
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <Download className="w-4 h-4 mr-1" /> Download Model
              </button>
            )}
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Download className="w-4 h-4 mr-1" /> Export Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;