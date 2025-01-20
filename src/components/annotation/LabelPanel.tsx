import React from 'react';
import { useAnnotation } from '@/contexts/AnnotationContext';
import "./LabelPanel.css"


const LabelPanel: React.FC = () => {
  const { boxes, selectedBox, setSelectedBox, setBoxes } = useAnnotation();

  const updateLabel = (id: string, label: string) => {
    setBoxes(
      boxes.map((box) =>
        box.id === id ? { ...box, label } : box
      )
    );
  };

  const deleteBox = (id: string) => {
    setBoxes(boxes.filter((box) => box.id !== id));
    setSelectedBox(null);
  };

  return (
    <div className="label-panel">
      <h3>Labels</h3>
      {boxes.map((box) => (
        <div
          key={box.id}
          className={`label-item ${selectedBox === box.id ? 'selected' : ''}`}
          onClick={() => setSelectedBox(box.id)}
        >
          <input
            type="text"
            value={box.label}
            onChange={(e) => updateLabel(box.id, e.target.value)}
            placeholder="Enter label"
          />
          <button onClick={() => deleteBox(box.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default LabelPanel;
