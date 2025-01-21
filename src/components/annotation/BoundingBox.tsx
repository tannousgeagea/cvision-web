import React, { useState, useEffect } from 'react';
import { useCoordinates } from '@/hooks/annotation/useCoordinates';
import './BoundingBox.css';

interface Box {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
}

interface Props {
  box: Box;
  canvasWidth: number;
  canvasHeight: number;
  isSelected: boolean;
  tool: 'draw' | 'move';
  onSelect: () => void;
  onUpdate: (id: string, updates: Partial<Box>) => void;
}

const BoundingBox: React.FC<Props> = ({ box, canvasWidth, canvasHeight, isSelected, tool, onSelect, onUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState<string | null>(null);
  const { getScaledCoordinates } = useCoordinates();

  const handleMouseDown = (e: React.MouseEvent, type: string | null = null) => {
    if (tool !== 'move') return;
    
    e.stopPropagation();
    onSelect();

    const { x, y} = getScaledCoordinates(e.clientX, e.clientY);

    if (type) {
      setResizing(type);
    } else {
      setIsDragging(true);
    }

    setDragStart({
      x: x - box.x,
      y: y - box.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging && !resizing) return;

    const { x, y } = getScaledCoordinates(e.clientX, e.clientY);

    console.log("X ", x)
    console.log("Y", y)

    if (isDragging) {
      onUpdate(box.id, {
        x: x - dragStart.x,
        y: y - dragStart.y
      });
    } else if (resizing) {
      switch (resizing) {
        case 'nw':
          onUpdate(box.id, {
            x: x,
            y: y,
            width: box.width + (box.x - x),
            height: box.height + (box.y - y)
          });
          break;
        case 'ne':
          onUpdate(box.id, {
            y: y,
            width: x - box.x,
            height: box.height + (box.y - y)
          });
          break;
        case 'sw':
          onUpdate(box.id, {
            x: x,
            width: box.width + (box.x - x),
            height: y - box.y
          });
          break;
        case 'se':
          onUpdate(box.id, {
            width: x - box.x,
            height: y - box.y
          });
          break;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(null);
  };

  useEffect(() => {
    if (isDragging || resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, resizing]);

  const boxClasses = [
    'bounding-box',
    isSelected ? 'selected' : 'not-selected',
    tool === 'move' ? 'move-mode' : 'draw-mode',
    isSelected ? 'selected-bg' : ''
  ].filter(Boolean).join(' ');

  const pixelX = Math.max(0, Math.min(box.x * canvasWidth, canvasWidth - box.width * canvasWidth));
  const pixelY = Math.max(0, Math.min(box.y * canvasHeight, canvasHeight - box.height * canvasHeight));
  const pixelWidth = Math.min(box.width * canvasWidth, canvasWidth - pixelX);
  const pixelHeight = Math.min(box.height * canvasHeight, canvasHeight - pixelY);

  return (
    <div
      className={boxClasses}
      style={{
        left: `${pixelX}px`,
        top: `${pixelY}px`,
        width: `${pixelWidth}px`,
        height: `${pixelHeight}px`,
        borderColor: `${box.color}`,
      }}
      onMouseDown={handleMouseDown}
    >
      {isSelected && tool === 'move' && (
        <>
          <div className="resize-handle nw" onMouseDown={(e) => handleMouseDown(e, 'nw')} />
          <div className="resize-handle ne" onMouseDown={(e) => handleMouseDown(e, 'ne')} />
          <div className="resize-handle sw" onMouseDown={(e) => handleMouseDown(e, 'sw')} />
          <div className="resize-handle se" onMouseDown={(e) => handleMouseDown(e, 'se')} />
        </>
      )}
      {box.label && (
        <div className="box-label" style={{background: `${box.color}`}}>
          {box.label}
        </div>
      )}
    </div>
  );
};

export default BoundingBox;