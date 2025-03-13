
import { useState } from 'react';
import { toast } from './use-toast';

export const useImageDeletion = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteImage = async (imageId: string, projectId: string) => {
    setIsDeleting(true);
    
    try {
      const response = await fetch(
        `http://localhost:29085/api/v1/projects/${projectId}/delete-image?image_id=${imageId}`,
        {
          method: 'DELETE',
          headers: {
            'accept': 'application/json',
          },
        }
      );
      const data = await response.json();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsDeleting(false);
      
      return data;
    } catch (error) {
      setIsDeleting(false);
      console.error("Error deleting image:", error);
      
      return {
        success: false,
        message: "Failed to delete image"
      };
    }
  };

  return { deleteImage, isDeleting };
};