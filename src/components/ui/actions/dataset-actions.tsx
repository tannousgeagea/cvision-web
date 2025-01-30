import React, { FC, useState } from "react";
import { useRequestFeedback } from "../../../hooks/use-request-feedback";
import SplitDatasetButton from "../button/actions/split-dataset-btn";
import GenerateDatasetVersion from "../button/actions/generate-version-btn";
import LoadingPopup from "../popup/loading-popup";
import SuccessPopup from "../popup/success-popup";
import ErrorPopup from "../popup/error-popup";
import './dataset-actions.css'

interface DatasetActionsProps {
  projectId: string;
}

const DatasetActions: FC<DatasetActionsProps> = ({ projectId }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);


  const handleCloseSuccessPopup = (): void => setSuccessMessage(null);

  return (
    <>
      <div className="actions">
        <GenerateDatasetVersion 
          projectId={projectId}
        />
      </div>

      {successMessage && 
        <SuccessPopup 
          message={successMessage} 
          onClose={handleCloseSuccessPopup} 
        />
      }
    </>
  );
};

export default DatasetActions;