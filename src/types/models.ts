
export type ModelType = 
  | 'classification' 
  | 'object-detection' 
  | 'segmentation' 
  | 'llm' 
  | 'vlm';

export type ModelStatus = 
  | 'draft' 
  | 'training' 
  | 'trained' 
  | 'failed' 
  | 'deployed';

export type VersionTag = 
  | 'production' 
  | 'staging' 
  | 'baseline' 
  | 'experimental';

export interface ModelVersion {
  id: string;
  versionNumber: number;
  createdAt: string;
  createdBy: string;
  status: ModelStatus;
  metrics: Record<string, number>;
  tags: VersionTag[];
  config?: Record<string, any>;
  artifacts?: {
    onnx?: string;
    weights?: string;
    logs?: string;
  };
}

export interface Model {
  id: string;
  name: string;
  description: string;
  type: ModelType;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  projectId: string;
  versions: ModelVersion[];
  currentProductionVersion?: string;
  tags: string[];
}