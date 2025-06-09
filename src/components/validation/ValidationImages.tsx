import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/ui/card";
import { useState } from "react";
import ImageControls from "./ImageControls";
import ValidationImageCard from "./ValidationImageCard";

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  type: 'prediction' | 'groundTruth';
}

interface ValidationImagesProps {
  validationImages: Array<{
    id: number;
    original: string;
    confidence: number;
    boundingBoxes: BoundingBox[];
  }>;
}

const ValidationImages = ({ validationImages }: ValidationImagesProps) => {
  const [showPredictions, setShowPredictions] = useState(true);
  const [showGroundTruth, setShowGroundTruth] = useState(true);

  return (
    <div className="space-y-6">
      <ImageControls 
        showPredictions={showPredictions}
        showGroundTruth={showGroundTruth}
        onTogglePredictions={setShowPredictions}
        onToggleGroundTruth={setShowGroundTruth}
      />

      <Card>
        <CardHeader>
          <CardTitle>Validation Results</CardTitle>
          <CardDescription>Sample predictions with overlays</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validationImages.map((image) => (
              <ValidationImageCard
                key={image.id}
                image={image}
                showPredictions={showPredictions}
                showGroundTruth={showGroundTruth}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidationImages;
