export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  type: "prediction" | "groundTruth";
}

export interface ValidationImage {
  id: number;
  original: string;
  confidence: number;
  width: number;
  height: number;
  boundingBoxes: BoundingBox[];
}