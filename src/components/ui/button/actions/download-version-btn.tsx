import { FC, useState } from 'react';
import { useDownloadVersion } from '../../../../hooks/useDownloadVersion';
import ErrorPopup from '../../popup/error-popup';
import SuccessPopup from '../../popup/success-popup';
import LoadingPopup from '../../popup/loading-popup';
import splitIcon from '../../../../assets/icons/actions/download.png';
import './download-version-btn.css';

interface DownloadVersionBtnProps {
    projectId: string;
    versionID: number;
}

const DownloadVersionBtn: FC<DownloadVersionBtnProps> = ({ projectId, versionID }) => {
    const { downloadVersion, loading, error } = useDownloadVersion();
    const [showError, setShowError] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleDownload = async (): Promise<void> => {
        try {
            await downloadVersion(versionID);
            setSuccessMessage("Dataset Successfully downloaded !");
        } catch (error) {
            console.log(error);
            setShowError(true);
        }
    };

    return (
        <div className='download-btn-container'>
            <button
                className="download-btn"
                onClick={handleDownload}
                disabled={loading}
            >   
                <img src={splitIcon} alt="generate-icon" />
                Download Dataset
            </button>
            

            {loading && <LoadingPopup />}
            {showError && <ErrorPopup message={error as string} onClose={() => setShowError(false)} />}
            {successMessage && (
                <SuccessPopup
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            )}
        </div>
    );
};

export default DownloadVersionBtn;