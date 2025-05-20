import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { Model, Dataset } from "@/types/models";
import { mockDatasets } from "@/components/models/mockModels";
import TrainingTabs from "./TrainingTabs";
import TrainingProgress from "./TrainingProgress";
import { ModelService } from "@/components/models/ModelService";

interface TrainingFormProps {
  model: Model;
  projectId: string;
}

const TrainingForm: React.FC<TrainingFormProps> = ({ model, projectId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const { data: datasets = mockDatasets } = useQuery({
    queryKey: ["datasets"],
    queryFn: () => Promise.resolve(mockDatasets),
    initialData: mockDatasets,
  });

  const form = useForm({
    defaultValues: {
      baseVersion: model.versions.length > 0 ? model.versions[0].id : "",
      datasetId: "dataset-001",
      epochs: 10,
      batchSize: 32,
      learningRate: 0.001,
      advancedConfig: false,
    },
  });


  const [trainingStatus, setTrainingStatus] = useState<{
    active: boolean;
    log: string[];
    progress: number;
  }>({
    active: false,
    log: [],
    progress: 0,
  });

  const handleDatasetChange = (datasetId: string) => {
    const dataset = datasets.find((d) => d.id === datasetId) || null;
    setSelectedDataset(dataset);
    form.setValue("datasetId", datasetId);
  };

  const trainMutation = useMutation({
    mutationFn: async (formValues: any) => {
      await ModelService.trainNewVersion(model.id, {
        ...formValues,
        dataset: datasets.find((d) => d.id === formValues.datasetId),
      });

      setTrainingStatus({
        active: true,
        log: ["Initializing training environment..."],
        progress: 0,
      });

      return new Promise<void>((resolve) => {
        const logMessages = [
          "Loading dataset...",
          "Preprocessing...",
          "Building model...",
          "Epoch 1 completed",
          "Epoch 2 completed",
          "Training finished",
        ];

        let index = 0;
        const interval = setInterval(() => {
          if (index < logMessages.length) {
            setTrainingStatus((prev) => ({
              active: true,
              log: [...prev.log, logMessages[index]],
              progress: Math.round(((index + 1) / logMessages.length) * 100),
            }));
            index++;
          } else {
            clearInterval(interval);
            setTimeout(() => resolve(), 1000);
          }
        }, 1000);
      });
    },
    onSuccess: () => {
      toast.success("Training completed successfully!");
      setTimeout(() => navigate(`/projects/${projectId}/models/${model.id}`), 1500);
    },
    onError: (error) => {
      toast.error("Training failed", { description: error.message });
      setTrainingStatus({ active: false, log: [], progress: 0 });
    },
  });

  const onSubmit = (data: any) => {
    trainMutation.mutate(data);
  };

  const isTraining = trainingStatus.active || trainMutation.isPending;

  return (
    <div className="space-y-6">
      <TrainingTabs
        model={model}
        form={form}
        isTraining={isTraining}
        datasets={datasets}
        selectedDataset={selectedDataset}
        onDatasetChange={handleDatasetChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSubmit={onSubmit}
        projectId={projectId}
      />

      {trainingStatus.active && (
        <TrainingProgress
          log={trainingStatus.log}
          progress={trainingStatus.progress}
          isTraining={isTraining}
        />
      )}
    </div>
  );
};

export default TrainingForm;
