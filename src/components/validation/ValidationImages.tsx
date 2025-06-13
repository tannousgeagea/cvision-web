import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/ui/card";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import ImageControls from "./ImageControls";
import ValidationImageCard from "./ValidationImageCard";
import { ValidationImage } from "@/types/validation";
import TriggerValidationButton from "./TriggerValidationButton";

interface ValidationImagesProps {
  validationImages: ValidationImage[]
  modelVersionId: number | undefined;
  onValidationComplete?: () => void;
}

const ValidationImages = ({ validationImages, modelVersionId, onValidationComplete }: ValidationImagesProps) => {
  if (!modelVersionId) return null
  const [showPredictions, setShowPredictions] = useState(true);
  const [showGroundTruth, setShowGroundTruth] = useState(true);

  if (validationImages.length == 0){
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center text-muted-foreground border border-dashed border-gray-300 rounded-xl bg-muted/50">
      <AlertTriangle className="w-10 h-10 text-yellow-500" />
      <div>
        <p className="text-lg font-medium text-foreground">No Validation Results Found</p>
        <p className="text-sm mt-1 text-muted-foreground">
          This model version has not been validated yet. Run validation to generate predictions.
        </p>
      </div>

      <TriggerValidationButton modelVersionId={modelVersionId} onValidationComplete={onValidationComplete}/>
    </div>
  );
  }

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
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
