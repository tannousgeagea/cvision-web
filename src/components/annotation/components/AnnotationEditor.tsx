import React, { useState, useEffect } from "react";
import { useAnnotation } from '@/contexts/AnnotationContext';
import './AnnotationEditor.css'

interface AnnotationClass {
  id: string;
  label: string;
  color: string;
  name: string;
}

interface AnnotationEditorProps {
  classes: AnnotationClass[];
  onDeleteClass: (id: string) => void;
  onSaveClass: () => void;
}

const AnnotationEditor: React.FC<AnnotationEditorProps> = ({
  classes,
  onDeleteClass,
  onSaveClass,
}) => {
  const [className, setClassName] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<AnnotationClass | null>(null);
  const { boxes, selectedBox, setSelectedBox, setBoxes } = useAnnotation();

  useEffect(() => {
    if (selectedBox) {
      const box = boxes.find((box) => box.id === selectedBox);
      if (box) {
        setClassName(box.label || '');
        setSelectedClass(box)
      } else {
        setClassName('');
      }
    } else {
      setClassName('');
    }
  }, [selectedBox, boxes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the "Delete" key was pressed
      console.log(e.key)
      if (e.key === 'Delete' && selectedBox) {
        deleteBox(selectedBox);
      }
    };

    // Attach the event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts or when selectedBox changes
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBox, boxes]);

  const handleSaveClass = () => {
    if (selectedClass) {
      onSaveClass();
      setSelectedClass(null);
      setClassName("");
      setSelectedBox(null)
    }
  };

  const updateLabel = (id: string, label: string) => {
    setBoxes(
      boxes.map((box) =>
        box.id === id ? { ...box, label } : box
      )
    );
  };

  const updateLabelAndColor = (id: string, label: string, color:string) => {
    setBoxes(
      boxes.map((box) =>
        box.id === id ? { ...box, label, color } : box
      )
    );
  };

  const deleteBox = (id: string) => {
    setBoxes(boxes.filter((box) => box.id !== id));
    onDeleteClass(id);
    setSelectedBox(null);
  };

  if (!selectedBox) {
    return null;
  }

  return (
    <div className="annotation-editor">
      <h3 className="editor-title">Annotation Editor</h3>

      <div className="editor-input">
        <input
          type="text"
          value={className || ""}
          onChange={(e) => updateLabel(selectedBox, e.target.value,)}
          placeholder="Enter annotation name"
          className="class-input"
          required
        />
      </div>

      <div className="editor-buttons">
        <button onClick={() => deleteBox(selectedBox)} className="delete-button">
          Delete
        </button>
        <button onClick={handleSaveClass} className="save-button">
          Save
        </button>
      </div>

      <div className="class-list">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className={`class-item ${selectedClass?.label === cls.name ? "selected" : ""}`}
            onClick={
              () => updateLabelAndColor(selectedBox, cls.name, cls.color)
            }
          >
            <span
              className="class-color"
              style={{ backgroundColor: cls.color || "#ccc" }}
            />
            <span>{cls.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnotationEditor;
