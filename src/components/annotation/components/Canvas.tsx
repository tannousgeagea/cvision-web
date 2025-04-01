import React, { useState, useRef, useEffect } from 'react';
import { useAnnotation } from '@/contexts/AnnotationContext';
import { useDraw } from '@/hooks/useDraw';
import useSaveAnnotation from '@/hooks/annotation/useSaveAnnotation';
import useDeleteAnnotation from "@/hooks/annotation/useDeleteAnnotation";
import useFetchAnnotationClasses from "@/hooks/annotation/useFetchAnnotationClasses";
import { toast } from '@/hooks/use-toast';
import AnnotationEditor from './AnnotationEditor';
import GuideLines from './GuideLines';
import CurrentPolygon from './CurrentPolygon';
import DrawingBox from './DrawingBox';
import AnnotationLayer from './AnnotationLayer';
import { baseURL } from '@/components/api/base';

interface Image {
  image_id: string;
  image_url: string;
  project_id: string;
}

interface CanvasProps {
  image: Image;
}

interface Box {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    color: string;
  }
  

const Canvas: React.FC<CanvasProps> = ({ image }) => {
  const {
    boxes,
    polygons,
    selectedBox,
    selectedPolygon,
    tool,
    currentPolygon,
    setBoxes,
    setSelectedBox,
    setSelectedPolygon,
    addPointToCurrentPolygon,
  } = useAnnotation();

  const canvasRef = useRef<HTMLDivElement>(null);
  const { 
    startDrawing, 
    stopDrawing, 
    currentBox, 
    handleMouseMove, 
    handleMouseEnter, 
    handleMouseLeave, 
    mousePosition, 
    showGuideLines, 
    handleCanvasClick, 
    handleContextMenu 
  } = useDraw();
  const { classes } = useFetchAnnotationClasses(image.project_id);
  const { saveAnnotation } = useSaveAnnotation();
  const { deleteAnnotation } = useDeleteAnnotation();

  const fetchAnnotations = async (imageID: string, projectId: string) => {
    const response = await fetch(`${baseURL}/api/v1/annotations/${projectId}/${imageID}`);
    const data = await response.json();
    if (data) {
      // Assuming the API returns an array of objects with a "data" property containing the box.
      setBoxes(data.map((box: any) => box.data));
    }
  };

  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSave = async () => {
    if (image) {
      const annotation = boxes.find((b: Box) => b.id === selectedBox);
      if (annotation) {
        if (!annotation.color) {
          const color = getRandomColor();
          annotation.color = color;
        }
        await saveAnnotation(annotation, image.project_id, image.image_id);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (id) {
      await deleteAnnotation(id);
    }
  };

  useEffect(() => {
    if (image) fetchAnnotations(image.image_id, image.project_id);
  }, [image]);

  const updateBoxPosition = (id: string, updates: Partial<Box>) => {
    setBoxes(boxes.map((box: Box) => 
      box.id === id ? { ...box, ...updates } : box
    ));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && tool === 'polygon' && currentPolygon) {
        toast({
            title: 'Polygon drawing cancelled'
      });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tool, currentPolygon, addPointToCurrentPolygon]);

  // Zoom functionality
  const [scale, setScale] = useState(1);
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Adjust zoom sensitivity and clamp scale between 0.5 and 3
    let newScale = e.deltaY < 0 ? scale * 1.1 : scale / 1.1;
    newScale = Math.min(Math.max(newScale, 0.5), 3);
    setScale(newScale);
  };

  return (
    <div className="flex relative p-4 flex-1 justify-center items-center w-full">
      {selectedBox && (
        <AnnotationEditor
          classes={classes}
          onSaveClass={handleSave}
          onDeleteClass={handleDelete}
        />
      )}

      <div
        ref={canvasRef}
        onWheel={handleWheel}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
        className="annotation-canvas relative bg-[beige] justify-center items-center max-w-[1000px] cursor-crosshair"
        onMouseDown={(e) => startDrawing(e, tool)}
        onMouseMove={(e) => handleMouseMove(e, tool)}
        onMouseUp={stopDrawing}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => handleCanvasClick(e, tool)}
        onContextMenu={(e) => handleContextMenu(e, tool)}
      >
        <img 
          src={image.image_url}
          alt="Sample image"
          className="object-contain select-none w-full h-full"
          onDragStart={(e) => e.preventDefault()}
        />

        <AnnotationLayer
          boxes={boxes}
          polygons={polygons}
          selectedBox={selectedBox}
          selectedPolygon={selectedPolygon}
          tool={tool}
          setSelectedBox={setSelectedBox}
          setSelectedPolygon={setSelectedPolygon}
          updateBoxPosition={updateBoxPosition}
        />
        
        <DrawingBox currentBox={currentBox} />
        <CurrentPolygon currentPolygon={currentPolygon} mousePosition={mousePosition} />
        <GuideLines mousePosition={mousePosition} showGuideLines={showGuideLines} />
      </div>
    </div>
  );
};

export default Canvas;
