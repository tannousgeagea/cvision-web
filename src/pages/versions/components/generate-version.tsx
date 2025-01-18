import React, { FC } from 'react';
import useFetchData from '@/hooks/use-fetch-data';
import Spinner from '@/components/ui/animation/spinner';
import ImageCard from '@/components/ui/card/image-card';
import SplitCard from '@/components/ui/card/split-card';
import CreateDatasetVersion from '@/components/ui/button/actions/create-version-btn';

interface GenerateVersionSectionProps {
  projectId: string;
}

const GenerateVersionSection: FC<GenerateVersionSectionProps> = ({ projectId }) => {
  const {
    data: datasetInfo,
    loading: datasetLoading,
    error: datasetError,
  }: {
    data: { 
      total_images: number; 
      count_train: number; 
      count_val: number; 
      data?: Array<{ image_url: string, image_name: string }> 
    };
    loading: boolean;
    error: Error | null;
  } = useFetchData(`/api/v1/projects/${projectId}/dataset-info`);

  return (
    <div className="generate-version">
      {datasetLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="version-content-header">
            <p>Create New Version</p>
          </div>

          <div className="version-content-images">
            <h3>
              {datasetInfo.total_images} 
              <p>Images</p>
            </h3>
            <div className="version-images">
              {datasetInfo?.data?.map((image, index) => (
                <ImageCard key={index} image={image} />
              ))}
            </div>
          </div>

          <div className="version-content-dataset-split">
            <h3>Dataset Split</h3>
            <div className="split-cards-container">
              <SplitCard
                key="0"
                title="Train Set"
                count={datasetInfo.count_train}
                color="#ffa500"
                percentage={Math.round((datasetInfo.count_train / datasetInfo.total_images) * 100)}
              />

              <SplitCard
                key="1"
                title="Valid Set"
                count={datasetInfo.count_val}
                color="#00bfff"
                percentage={Math.round((datasetInfo.count_val / datasetInfo.total_images) * 100)}
              />
            </div>
          </div>

          <div className="version-content-preprocessing">
            <h3>Preprocessing</h3>
            <p>No preprocessing were applied</p>
          </div>

          <div className="version-content-augmentation">
            <h3>Augmentation</h3>
            <p>No augmentation were applied</p>
          </div>

          <div className="create-version-btn">
            <CreateDatasetVersion 
              projectId={projectId}
            />
          </div>

        </>
      )}
    </div>
  );
};

export default GenerateVersionSection;