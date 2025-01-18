import React, { useState, FC } from "react";
import TextLabel from "@/components/ui/input/label-text";
import useSelectFile from "@/hooks/use-select-file";
import SubmitButton from "@/components/ui/button/submit-button";
import FileSelectButton from "@/components/ui/button/file-select-button";
import FolderSelectButton from "@/components/ui/button/folder-select-button";
import ImagePreview from "@/components/feature/image-preview";
import handleUpload from "@/components/api/upload";
import "./upload-page.css"

import uploadIcon from "@/assets/icons/upload-center.png";
import checkIcon from '@/assets/icons/check.png';

interface MetaInfo {
    source: string;
}

const UploadPage: FC = () => {
    const { files, images, handleFileSelect } = useSelectFile();
    const [uploadPercentage, setUploadPercentage] = useState<number>(0);
    const [uploading, setUploading] = useState<boolean>(false);
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const [uploadComplete, setUploadComplete] = useState<boolean>(false);

    const meta_info: MetaInfo = {
        source: "",
    }

    const [metaInfo, setMetaInfo] = useState<MetaInfo>(meta_info)

    const handleChange = (name: string, value: string): void => {
        setMetaInfo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUploadClick = (): void => {
        setOverlayVisible(true);
        handleUpload({
          files: files,
          setUploading,
          setUploadPercentage,
          setUploadComplete
        });
      };

    return (
        <div className="upload-container">
            <div className="upload-content">
                {/* <div className='section-header'>
                    <div className="section-title">
                        <img src={uploadHeader} alt="upload-icon" className="header-icon"></img>
                        <span>Upload</span>
                    </div>
                    {files.length > 0 && 
                        <div className="subumit-upload">
                            <SubmitButton onSubmit={handleUploadClick} />
                        </div>
                    }

                </div> */}

                <div className='upload-page-section'>
                    <div className="upload-page-input">
                        <TextLabel 
                            label='Source'
                            placeholder='Enter Source ...'
                            name='source'
                            value={metaInfo['source']}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="upload-page-content">
                        {images.length === 0 ? (
                            <div className="uplaod-content-before">
                                <img src={uploadIcon} alt="upload-icon" className="upload-content-icon"></img>
                                <span className="drag-and-drop">Drag and drop to upload, or:</span>
                                <div className="select-button-section">
                                    <div className="select-button-after">
                                        <FileSelectButton onChange={handleFileSelect} />
                                        <FolderSelectButton onChange={handleFileSelect} />
                                    </div>
                                </div>
                            </div>
                    ) : (
                        <div className="upload-content-after">
                            <div className="select-button-section">
                                <div className="select-button-after">
                                    <FileSelectButton onChange={handleFileSelect} />
                                    <FolderSelectButton onChange={handleFileSelect} />
                                </div>
                            </div>
                            <ImagePreview images={images}/>
                            {overlayVisible && (
                                <div className={`progress-overlay ${uploadComplete ? 'checkmark-overlay' : ''}`}>
                                    {uploadComplete ? (
                                        <div className="checkmark">
                                            <img src={checkIcon} className="header-icon"></img>
                                        </div>
                                    ) : (
                                        <div className="progress-bar">
                                            <progress value={uploadPercentage} max="100">{uploadPercentage}%</progress>
                                            <span>{uploadPercentage}%</span>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;