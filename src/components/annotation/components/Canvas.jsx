import React, { useState, useRef, useEffect } from 'react';
import { useAnnotation } from '@/contexts/AnnotationContext';
import { useCoordinates } from '@/hooks/useCoordinates';
import BoundingBox from '../BoundingBox';
import './Canvas.css'
import { da } from 'date-fns/locale';

const Canvas = ({ image }) => {
  const {
    boxes,
    selectedBox,
    tool,
    setBoxes,
    setSelectedBox
  } = useAnnotation();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentBox, setCurrentBox] = useState(null);
  const canvasRef = useRef(null);
  const { getScaledCoordinates } = useCoordinates();
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  const updateCanvasDimensions = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCanvasDimensions({ width: rect.width, height: rect.height });
    }
  };

  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);
    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, []);

  const startDrawing = (e) => {
    if (tool !== 'draw') return;
    const { x, y } = getScaledCoordinates(e.clientX, e.clientY);

    const newBox = {
      id: Date.now().toString(),
      x,
      y,
      width: 0,
      height: 0,
      label: ''
    };
    
    setCurrentBox(newBox);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !currentBox || tool !== 'draw') return;
    const { x, y } = getScaledCoordinates(e.clientX, e.clientY);

    setCurrentBox({
      ...currentBox,
      width: x - currentBox.x,
      height: y - currentBox.y
    });
  };

  const stopDrawing = () => {
    if (isDrawing && currentBox && Math.abs(currentBox.width) > 0.00625 && Math.abs(currentBox.height) > 0.00625) {
      const normalizedBox = {
        ...currentBox,
        x: currentBox.width < 0 ? currentBox.x + currentBox.width : currentBox.x,
        y: currentBox.height < 0 ? currentBox.y + currentBox.height : currentBox.y,
        width: Math.abs(currentBox.width),
        height: Math.abs(currentBox.height),
      };
      setBoxes([...boxes, normalizedBox]);
      setSelectedBox(normalizedBox.id);
    }
    setIsDrawing(false);
    setCurrentBox(null);
  };

  const updateBoxPosition = (id, updates) => {
    setBoxes(boxes.map(box => 
      box.id === id ? { ...box, ...updates } : box
    ));
  };

  const denormalizeBox = (box, rect) => ({
    id: box.id,
    x: box.x * rect.width,
    y: box.y * rect.height,
    width: box.width * rect.width,
    height: box.height * rect.height,
    label: box.label,
  });

  return (
    <div className="canvas-container">

      {/* {loading ? (
        <Spinner />
      ): image.lenght === 0 ? (
        <p>No Image Found</p>
      ) : ( */}
      <div
        ref={canvasRef}
        className="annotation-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
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
      </div>
      {/* )} */}
    </div>
  );
};

export default Canvas;