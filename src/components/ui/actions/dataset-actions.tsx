import React, { FC, useState } from "react";
import { useRequestFeedback } from "../../../hooks/use-request-feedback";
import feedbackIcon from "../../../assets/icons/feedback.png";
import SplitDatasetButton from "../button/actions/split-dataset-btn";
import GenerateDatasetVersion from "../button/actions/generate-version-btn";
import LoadingPopup from "../popup/loading-popup";
import SuccessPopup from "../popup/success-popup";
import ErrorPopup from "../popup/error-popup";
import './dataset-actions.css'

interface DatasetActionsProps {
  projectId: string;
  refetch: () => void;
  onFeedbackSuccess: () => void;
}

const DatasetActions: FC<DatasetActionsProps> = ({ projectId, refetch, onFeedbackSuccess }) => {
  const { requestFeedback, loading: feedbackLoading, error: feedbackError } = useRequestFeedback();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const handleRequestFeedback = async (): Promise<void> => {
    try {
      await requestFeedback(projectId);
      setSuccessMessage("Feedback request was successful!");
      onFeedbackSuccess();
      refetch();
    } catch (err) {
      console.error(err);
      setShowError(true)
    }
  };

  const handleCloseSuccessPopup = (): void => setSuccessMessage(null);

  return (
    <>
      <div className="actions">
        <GenerateDatasetVersion 
          projectId={projectId}
        />

        <div className="split-btn">
          <SplitDatasetButton 
            projectId={projectId}
          />
        </div>

        <div className="request-feedback" onClick={handleRequestFeedback}>
          <img src={feedbackIcon} alt="feedback-icon" />
          <span>{feedbackLoading ? "Requesting Feedback..." : "Request Feedback"}</span>
        </div>
      </div>

      {feedbackLoading && <LoadingPopup />}
      {showError && <ErrorPopup message={feedbackError} onClose={() => setShowError(false)} />}
      {successMessage && <SuccessPopup message={successMessage} onClose={handleCloseSuccessPopup} />}
    </>
  );
};

export default DatasetActions;