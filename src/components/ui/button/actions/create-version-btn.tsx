import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateVersion } from '../../../../hooks/use-create-version';
import ErrorPopup from '../../popup/error-popup';
import SuccessPopup from '../../popup/success-popup';
import LoadingPopup from '../../popup/loading-popup';
import './create-version-btn.css';

interface CreateDatasetVersionProps {
    projectId: string;
}

const CreateDatasetVersion: FC<CreateDatasetVersionProps> = ({ projectId }) => {
    const { createVersion, loading, error } = useCreateVersion();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate()
    
    const handleCreateVersion = async (): Promise<void> => {
        try {
            const newVersion = await createVersion(projectId);
            if (newVersion) {
                console.log(newVersion)
                setSuccessMessage("Version created successfully!");
                setTimeout(() => {
                  navigate(`/projects/${projectId}/versions/${newVersion.version_number}`);
                }, 2000);
              }
        } catch (err) {
            console.error(err);
            setShowError(true);
        }
    };

    return (
        <>
            <button className="create-btn" onClick={handleCreateVersion}>
                Create Version
            </button>

            {loading && <LoadingPopup />}
            {showError && <ErrorPopup message={error} onClose={() => setShowError(false)} />}
            {successMessage && (
                <SuccessPopup
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            )}
        </>
    );
};

export default CreateDatasetVersion;