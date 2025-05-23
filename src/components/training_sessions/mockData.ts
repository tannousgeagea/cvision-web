import { TrainingSession, Project, Model } from '@/types/training_session';

export const projects: Project[] = [
  { id: '1', name: 'Customer Sentiment Analysis' },
  { id: '2', name: 'Image Classification' },
  { id: '3', name: 'Fraud Detection' },
  { id: '4', name: 'Text Generation' },
];

export const models: Model[] = [
  { id: '1', name: 'BERT-base' },
  { id: '2', name: 'ResNet-50' },
  { id: '3', name: 'XGBoost' },
  { id: '4', name: 'GPT-2' },
  { id: '5', name: 'RandomForest' },
];

export const mockTrainingSessions: TrainingSession[] = [
  {
    id: '1',
    modelName: 'BERT-base',
    projectName: 'Customer Sentiment Analysis',
    status: 'completed',
    createdAt: '2025-03-15T14:30:00Z',
    updatedAt: '2025-03-15T16:45:00Z',
    progress: 100,
    metrics: {
      accuracy: 0.92,
      f1Score: 0.89,
      precision: 0.88,
      recall: 0.91,
    },
    configuration: {
      epochs: 10,
      batchSize: 32,
      learningRate: 0.001,
      optimizer: 'Adam',
    },
    logs: [
      '[2025-03-15 14:30:22] Starting training...',
      '[2025-03-15 14:45:13] Epoch 1/10 completed. Loss: 0.723',
      '[2025-03-15 15:00:45] Epoch 2/10 completed. Loss: 0.534',
      '[2025-03-15 16:44:30] Training completed successfully.',
    ],
  },
  {
    id: '2',
    modelName: 'ResNet-50',
    projectName: 'Image Classification',
    status: 'running',
    createdAt: '2025-03-16T09:15:00Z',
    updatedAt: '2025-03-16T11:30:00Z',
    progress: 65,
    metrics: {
      accuracy: 0.86,
      f1Score: 0.84,
    },
    configuration: {
      epochs: 20,
      batchSize: 64,
      learningRate: 0.0005,
      optimizer: 'SGD',
    },
    logs: [
      '[2025-03-16 09:15:10] Starting training...',
      '[2025-03-16 09:30:22] Epoch 1/20 completed. Loss: 0.872',
      '[2025-03-16 09:45:45] Epoch 2/20 completed. Loss: 0.764',
      '[2025-03-16 11:30:12] Epoch 13/20 completed. Loss: 0.421',
    ],
  },
  {
    id: '3',
    modelName: 'XGBoost',
    projectName: 'Fraud Detection',
    status: 'failed',
    createdAt: '2025-03-14T11:00:00Z',
    updatedAt: '2025-03-14T11:15:00Z',
    progress: 23,
    configuration: {
      epochs: 100,
      batchSize: 128,
      learningRate: 0.01,
      optimizer: 'N/A',
    },
    logs: [
      '[2025-03-14 11:00:05] Starting training...',
      '[2025-03-14 11:10:30] Error: Out of memory error',
      '[2025-03-14 11:15:22] Training failed.',
    ],
  },
  {
    id: '4',
    modelName: 'GPT-2',
    projectName: 'Text Generation',
    status: 'pending',
    createdAt: '2025-03-16T13:45:00Z',
    updatedAt: '2025-03-16T13:45:00Z',
    progress: 0,
    configuration: {
      epochs: 5,
      batchSize: 16,
      learningRate: 0.0002,
      optimizer: 'AdamW',
    },
  },
  {
    id: '5',
    modelName: 'BERT-base',
    projectName: 'Customer Sentiment Analysis',
    status: 'running',
    createdAt: '2025-03-16T10:30:00Z',
    updatedAt: '2025-03-16T12:15:00Z',
    progress: 42,
    metrics: {
      accuracy: 0.83,
    },
    configuration: {
      epochs: 15,
      batchSize: 32,
      learningRate: 0.001,
      optimizer: 'Adam',
    },
    logs: [
      '[2025-03-16 10:30:10] Starting training...',
      '[2025-03-16 10:45:22] Epoch 1/15 completed. Loss: 0.791',
      '[2025-03-16 11:00:45] Epoch 2/15 completed. Loss: 0.653',
      '[2025-03-16 12:15:12] Epoch 6/15 completed. Loss: 0.501',
    ],
  },
  {
    id: '6',
    modelName: 'RandomForest',
    projectName: 'Fraud Detection',
    status: 'completed',
    createdAt: '2025-03-13T15:20:00Z',
    updatedAt: '2025-03-13T15:45:00Z',
    progress: 100,
    metrics: {
      accuracy: 0.95,
      f1Score: 0.94,
      precision: 0.96,
      recall: 0.93,
    },
    configuration: {
      epochs: 1,
      batchSize: 0,
      learningRate: 0,
      optimizer: 'N/A',
    },
    logs: [
      '[2025-03-13 15:20:05] Starting training...',
      '[2025-03-13 15:30:30] Training classifier with 100 trees',
      '[2025-03-13 15:45:22] Training completed successfully.',
    ],
  },
];