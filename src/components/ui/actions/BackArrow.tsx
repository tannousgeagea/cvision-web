import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BackArrow.css';

const BackArrow: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams()

  const handleGoBack = () => {
    navigate(`/projects/${projectId}/dataset`); // Navigate to the previous page
  };

  return (
    <div className="back-arrow" onClick={handleGoBack}>
      <span>&larr;</span>
    </div>
  );
};

export default BackArrow;
