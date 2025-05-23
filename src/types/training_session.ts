export type Status = 'running' | 'completed' | 'failed' | 'pending';

export interface TrainingSession {
  id: string;
  modelName: string;
  projectName: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  progress: number;
  metrics?: {
    accuracy?: number;
    f1Score?: number;
    precision?: number;
    recall?: number;
    [key: string]: number | undefined;
  };
  configuration?: {
    epochs: number;
    batchSize: number;
    learningRate: number;
    optimizer: string;
    [key: string]: number | string;
  };
  logs?: string[];
}

export interface Project {
  id: string;
  name: string;
}

export interface Model {
  id: string;
  name: string;
}