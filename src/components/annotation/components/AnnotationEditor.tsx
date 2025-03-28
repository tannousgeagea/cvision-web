import React, { useState, useEffect } from "react";
import { useAnnotation } from "@/contexts/AnnotationContext";

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
        setSelectedClass({
          id: box.id,
          label: box.label,
          color: box.color,
          name: box.label, // using box.label as the name
        });
      } else {
        setClassName('');
      }
    } else {
      setClassName('');
    }
  }, [selectedBox, boxes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedBox) {
        deleteBox(selectedBox);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBox, boxes]);

  const handleSaveClass = () => {
    if (selectedClass) {
      onSaveClass();
      setSelectedClass(null);
      setClassName("");
      setSelectedBox(null);
    }
  };

  const updateLabel = (id: string, label: string) => {
    setBoxes(
      boxes.map((box) =>
        box.id === id ? { ...box, label } : box
      )
    );
  };

  const updateLabelAndColor = (id: string, label: string, color: string) => {
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


  console.log(selectedBox)
  return (
    <div className="absolute top-4 left-4 z-10 w-[300px] p-4 rounded-lg bg-[#06101d] text-white font-sans">
      <h3 className="text-[1.2rem] mb-4">Annotation Editor</h3>
      
      <div className="mb-4">
        <input
          type="text"
          value={className}
          onChange={(e) => updateLabel(selectedBox, e.target.value)}
          placeholder="Enter annotation name"
          required
          className="w-full p-2 mb-4 border border-[#333] rounded bg-[#0d1f34] text-white"
        />
      </div>
      
      <div className="flex justify-between gap-2 mb-4">
        <button 
          onClick={() => deleteBox(selectedBox)} 
          className="flex-1 p-1 rounded cursor-pointer bg-[#ff4d4f] text-white"
        >
          Delete
        </button>
        <button 
          onClick={handleSaveClass} 
          className="flex-1 p-1 rounded cursor-pointer bg-[#4caf50] text-white"
        >
          Save
        </button>
      </div>
      
      <div className="max-h-[200px] overflow-y-auto">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className={`flex items-center p-2 mb-2 cursor-pointer rounded hover:bg-[#0d1f34] ${selectedClass?.label === cls.name ? "bg-[#1a324d]" : ""}`}
            onClick={() => updateLabelAndColor(selectedBox, cls.name, cls.color)}
          >
            <span
              className="w-[12px] h-[12px] rounded-full mr-2"
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
