import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackArrow.css';

const BackArrow: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
    // navigate(`/projects/${projectId}/dataset`); // Navigate to the previous page
  };

  return (
    <div className="back-arrow" onClick={handleGoBack}>
      <p>&larr;</p>
    </div>
  );
};

export default BackArrow;
