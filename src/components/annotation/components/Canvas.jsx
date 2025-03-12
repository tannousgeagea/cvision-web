import React, { useState, useRef, useEffect } from 'react';
import { useAnnotation } from '@/contexts/AnnotationContext';
import useFetchAnnotations from "@/hooks/annotation/useFecthAnnotations"
import BoundingBox from '../BoundingBox';
import AnnotationEditor from './AnnotationEditor'
import { useDraw } from '../../../hooks/annotation/useDraw';
import useSaveAnnotation from '@/hooks/annotation/useSaveAnnotation';
import useDeleteAnnotation from "../../../hooks/annotation/useDeleteAnnotation";
import useFetchAnnotationClasses from "@/hooks/annotation/useFetchAnnotationClasses"
import './Canvas.css'

const Canvas = ({ image }) => {
  const {
    boxes,
    selectedBox,
    tool,
    setBoxes,
    setSelectedBox
  } = useAnnotation();
  const canvasRef = useRef(null);
  const { startDrawing, draw, stopDrawing, currentBox, handleMouseMove, handleMouseEnter, handleMouseLeave, mousePosition, showGuideLines } = useDraw(boxes, setBoxes, setSelectedBox);
  // const { fetchAnnotations, loading: annotationLoading, error: annotationError } = useFetchAnnotations();
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  const { classes, loading: classesLoading, error: classerError } = useFetchAnnotationClasses(image.project_id)
  const { saveAnnotation, loading: saveLoading, error: saveError, success: saveSuccess } = useSaveAnnotation();
  const { deleteAnnotation, loading: deleteLoading, error: deleteError, success: deleteSuccess  } = useDeleteAnnotation();

  const updateCanvasDimensions = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCanvasDimensions({ width: rect.width, height: rect.height });
    }
  };

  const fetchAnnotations = async (imageID, projectId) => {
    const response = await fetch(`http://localhost:29085/api/v1/annotations/${projectId}/${imageID}`);
    const data = await response.json();
    if (data) {
      setBoxes(data.map(box =>
        box.data
      ));
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSave = async () => {
    if (image) {
      const annotation = boxes.find((b) => b.id === selectedBox);
      if (!annotation.color){
        const color = getRandomColor()
        annotation.color = color
      }
      await saveAnnotation(annotation, image.project_id, image.image_id);
    };
  };

  const handleDelete = async (id) => {
    if (id) {
      await deleteAnnotation(id)
    }
  }

  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);
    if (image) fetchAnnotations(image.image_id, image.project_id);
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, [image]);

  const updateBoxPosition = (id, updates) => {
    setBoxes(boxes.map(box => 
      box.id === id ? { ...box, ...updates } : box
    ));
  };

  return (
    <div className="canvas-container">
      {selectedBox &&
        <AnnotationEditor
          classes={classes}
          onSaveClass={handleSave}
          onDeleteClass={handleDelete}
        />
      }

      <div
        ref={canvasRef}
        className="annotation-canvas"
        onMouseDown={(e) => startDrawing(e, tool)}
        onMouseMove={(e) => handleMouseMove(e, tool)}
        onMouseUp={stopDrawing}
        // onMouseLeave={stopDrawing}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={image.image_url}
          alt="Sample image"
          className="canvas-image"
          onDragStart={(e) => e.preventDefault()}
        />
        
        {canvasRef.current && 
          boxes.map((box) => {
            return (
              <BoundingBox
                key={box.id}
                box={box}
                canvasWidth={canvasRef.current?.offsetWidth}
                canvasHeight={canvasRef.current?.offsetHeight}
                isSelected={selectedBox === box.id}
                tool={tool}
                onSelect={() => setSelectedBox(box.id)}
                onUpdate={updateBoxPosition}
              />
            )
          })}

        
        {currentBox && canvasRef.current && (
          <div
            style={{
              position: 'absolute',
              left: `${currentBox.width < 0 ? (currentBox.x + currentBox.width) *  canvasRef.current.getBoundingClientRect().width: currentBox.x * canvasRef.current.getBoundingClientRect().width}px`,
              top: `${currentBox.height < 0 ? (currentBox.y + currentBox.height) *  canvasRef.current.getBoundingClientRect().height: currentBox.y * canvasRef.current.getBoundingClientRect().height}px`,
              width: `${Math.abs(currentBox.width * canvasRef.current.getBoundingClientRect().width)}px`,
              height: `${Math.abs(currentBox.height * canvasRef.current.getBoundingClientRect().height)}px`,
              border: '2px dashed #3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              pointerEvents: 'cursor'
            }}
          />
        )}
        {showGuideLines && canvasRef.current && (
          <>
            {/* Vertical guide line */}
            <div
              style={{
                position: 'absolute',
                left: `${canvasRef.current ? mousePosition.x * canvasRef.current.getBoundingClientRect().width : mousePosition.x}px`,
                top: '0',
                width: '1px',
                height: '100%',
                borderLeft: '2px dashed rgb(255, 255, 255)',
                pointerEvents: 'none',
                zIndex: 10
              }}
            />
            {/* Horizontal guide line */}
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: `${canvasRef.current ? mousePosition.y * canvasRef.current.getBoundingClientRect().height : mousePosition.y}px`,
                width: '100%',
                height: '1px',
                borderTop: '2px dashed rgb(255, 255, 255)',
                pointerEvents: 'none',
                zIndex: 10
              }}
            />
          </>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default Canvas;