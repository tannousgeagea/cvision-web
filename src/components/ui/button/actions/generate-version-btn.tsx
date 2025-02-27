import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import generateIcon from "../../../../assets/icons/actions/plus.png";
import './generate-version-btn.css';

interface GenerateDatasetVersionProps {
  projectId: string;
}

const GenerateDatasetVersion: FC<GenerateDatasetVersionProps> = ({ projectId }) => {
    const navigate = useNavigate();
    
    const handleGenerateVersion = (projectId: string): void => {
        navigate(`/projects/${projectId}/versions/generate`);
    }

    return (
        <>
            <button className="generate-btn" onClick={() => handleGenerateVersion(projectId)}>
                <img src={generateIcon} alt="generate-icon" />
                Generate Version
            </button>
        </>
    );
};

export default GenerateDatasetVersion;