import React from 'react';
import { Button } from '@/components/ui/ui/button';
import { Trash2 } from 'lucide-react';
import { useImageDeletion } from '@/hooks/useDeleteImage';
import { useImage } from '@/contexts/ImageContext';
import { toast } from '@/hooks/use-toast';

interface Image {
  image_id: string;
  project_id: string;
  url: string;
}

interface DeleteButtonProps {
  currentImage: Image;
  goToNextImage: () => void;
}

const DeleteButton:React.FC<DeleteButtonProps> = ( {currentImage, goToNextImage} ) => {
  const { deleteImage, isDeleting } = useImageDeletion();

  const handleDelete = async () => {
    try {
      const response = await deleteImage(currentImage.image_id);
      
      if (response.success) {
        toast({
          title: "Deleted",
          description: "Image deleted successfully",
          variant: "warning"
        });
        
        // Move to the next image after deletion
        goToNextImage();
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="absolute bottom-24 right-4 z-10"
      variant="destructive"
    >
      <Trash2 className="mr-2 h-4 w-4" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;