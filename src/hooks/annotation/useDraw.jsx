import { useState } from 'react';
import { useCoordinates } from '@/hooks/annotation/useCoordinates';

export const useDraw = (boxes, setBoxes, setSelectedBox) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentBox, setCurrentBox] = useState(null);
  const { getScaledCoordinates } = useCoordinates();

  const startDrawing = (e, tool) => {
    if (tool !== 'draw') return;
    const { x, y } = getScaledCoordinates(e.clientX, e.clientY);

    const newBox = {
      id: Date.now().toString(),
      x,
      y,
      width: 0,
      height: 0,
      label: '',
    };

    setCurrentBox(newBox);
    setIsDrawing(true);
  };

  const draw = (e, tool) => {
    if (!isDrawing || !currentBox || tool !== 'draw') return;
    const { x, y } = getScaledCoordinates(e.clientX, e.clientY);

    setCurrentBox({
      ...currentBox,
      width: x - currentBox.x,
      height: y - currentBox.y,
    });
  };

  const stopDrawing = () => {
    if (isDrawing && currentBox && Math.abs(currentBox.width) > 0.00625 && Math.abs(currentBox.height) > 0.00625) {
      const normalizedBox = {
        ...currentBox,
        x: Math.min(currentBox.x, currentBox.x + currentBox.width),
        y: Math.min(currentBox.y, currentBox.y + currentBox.height),
        width: Math.abs(currentBox.width),
        height: Math.abs(currentBox.height),
      };
      setBoxes([...boxes, normalizedBox]);
      setSelectedBox(normalizedBox.id);
    }
    setIsDrawing(false);
    setCurrentBox(null);
  };

  return { startDrawing, draw, stopDrawing, currentBox };
};
