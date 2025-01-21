import React from 'react';
import { useState } from 'react';
import { AnnotationProvider } from '@/contexts/AnnotationContext';
import ToolBar from './components/ToolBar';
import Canvas from './components/Canvas';
import LabelPanel from './LabelPanel';
import AnnotationControls from './components/AnnotationControl';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './AnnotationTool.css';

interface ImageResponse {
  data?: Array<{ image_id: string, image_url: string, image_name: string }>;
}

const AnnotationTool = () => {
  const { projectId, imageID }: {projectId: string, imageID: number} = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  const { images, currentIndex = 0 } = location.state || {};
  const totalImages = images?.data.length

  const handlePrevious = () => {
    const prevIndex: number = (imageID - 1 + totalImages) % totalImages;
    navigate(`/projects/${projectId}/annotate/${prevIndex}`,  { state: { images: images, currentIndex: prevIndex } });
  };

  const handleNext = () => {
    if (currentIndex < totalImages) {
      const nextIndex: number = (currentIndex + 1) % totalImages;
      navigate(`/projects/${projectId}/annotate/${nextIndex}`,  { state: { images: images, currentIndex: nextIndex } });
    };
  };

  const image = images?.data[imageID];
  if (!image) {
      return <p>Image not found</p>;
  }

  const image_name = image.image_name
  return (
    <AnnotationProvider>
      <div className='annotation'>
        <AnnotationControls
          title={image_name}
          current={currentIndex + 1}
          total={totalImages}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
        <div className="annotation-container">
          <div className="annotation-sidebar">
            <ToolBar />
            <LabelPanel />
          </div>
          {totalImages === 0? (
            <p>No Image Found</p>
          ) : (
            <Canvas image={image}/>
          )}
        </div>
      </div>
    </AnnotationProvider>
  );
};

export default AnnotationTool;
