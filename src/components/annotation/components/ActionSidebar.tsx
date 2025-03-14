
import React from 'react';
import { useAnnotation } from '@/contexts/AnnotationContext';
import ApproveButton from './ApproveButton';
import DeleteButton from './DeleteButton';
import MarkAsNullButton from './MarkAsNullButton';

interface Image {
  image_id: string;
  project_id: string;
  url: string;
}

interface ActionSidebarProps {
  currentImage: Image;
  goToNextImage: () => void;
}

const ActionSidebar:React.FC<ActionSidebarProps> = ({ currentImage, goToNextImage }) => {
  const { boxes } = useAnnotation();

  return (
    <div className="w-60 border-l border-border bg-card">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-6">Actions</h2>
        
        <div className="space-y-4">
          <ApproveButton currentImage={currentImage} goToNextImage={goToNextImage} className="w-full" />
          <DeleteButton currentImage={currentImage} goToNextImage={goToNextImage} className="w-full" />
          <MarkAsNullButton currentImage={currentImage} goToNextImage={goToNextImage} className="w-full bg-red-400 text-white" />
        </div>
        
        <div className="mt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Image Info</h3>
          <p className="text-sm truncate text-white">{currentImage.image_id}</p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Annotations</h3>
          <p className="text-sm text-white">{boxes.length} bounding boxes</p>
        </div>
      </div>
    </div>
  );
};

export default ActionSidebar;