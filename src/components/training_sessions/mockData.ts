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

export const validationImages = [
    { 
      id: 1, 
      original: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop", 
      confidence: 0.94,
      boundingBoxes: [
        { x: 50, y: 30, width: 120, height: 80, label: "car", confidence: 0.94, type: 'prediction' as const },
        { x: 45, y: 25, width: 130, height: 90, label: "car", confidence: 1.0, type: 'groundTruth' as const },
        { x: 200, y: 100, width: 60, height: 40, label: "pedestrian", confidence: 0.87, type: 'prediction' as const },
        { x: 195, y: 95, width: 70, height: 50, label: "pedestrian", confidence: 1.0, type: 'groundTruth' as const }
      ]
    },
    { 
      id: 2, 
      original: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop", 
      confidence: 0.89,
      boundingBoxes: [
        { x: 80, y: 50, width: 100, height: 70, label: "truck", confidence: 0.89, type: 'prediction' as const },
        { x: 75, y: 45, width: 110, height: 80, label: "truck", confidence: 1.0, type: 'groundTruth' as const }
      ]
    },
    { 
      id: 3, 
      original: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop", 
      confidence: 0.92,
      boundingBoxes: [
        { x: 30, y: 40, width: 90, height: 60, label: "cyclist", confidence: 0.92, type: 'prediction' as const },
        { x: 25, y: 35, width: 100, height: 70, label: "cyclist", confidence: 1.0, type: 'groundTruth' as const },
        { x: 180, y: 20, width: 80, height: 50, label: "car", confidence: 0.85, type: 'prediction' as const },
        { x: 175, y: 15, width: 90, height: 60, label: "car", confidence: 1.0, type: 'groundTruth' as const }
      ]
    },
    { 
      id: 4, 
      original: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop", 
      confidence: 0.87,
      boundingBoxes: [
        { x: 100, y: 60, width: 110, height: 80, label: "pedestrian", confidence: 0.87, type: 'prediction' as const },
        { x: 95, y: 55, width: 120, height: 90, label: "pedestrian", confidence: 1.0, type: 'groundTruth' as const }
      ]
    },
    { 
      id: 5, 
      original: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop", 
      confidence: 0.95,
      boundingBoxes: [
        { x: 40, y: 70, width: 140, height: 90, label: "car", confidence: 0.95, type: 'prediction' as const },
        { x: 35, y: 65, width: 150, height: 100, label: "car", confidence: 1.0, type: 'groundTruth' as const },
        { x: 220, y: 30, width: 70, height: 45, label: "truck", confidence: 0.91, type: 'prediction' as const },
        { x: 215, y: 25, width: 80, height: 55, label: "truck", confidence: 1.0, type: 'groundTruth' as const }
      ]
    },
    { 
      id: 6, 
      original: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop", 
      confidence: 0.91,
      boundingBoxes: [
        { x: 60, y: 80, width: 120, height: 70, label: "cyclist", confidence: 0.91, type: 'prediction' as const },
        { x: 55, y: 75, width: 130, height: 80, label: "cyclist", confidence: 1.0, type: 'groundTruth' as const }
      ]
    }
  ];