import React, { createContext, useContext, useState } from 'react';

interface Box {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

interface AnnotationContextType {
  boxes: Box[];
  selectedBox: string | null;
  tool: 'draw' | 'move';
  setBoxes: (boxes: Box[]) => void;
  setSelectedBox: (id: string | null) => void;
  setTool: (tool: 'draw' | 'move') => void;
}

const AnnotationContext = createContext<AnnotationContextType | undefined>(undefined);

export const AnnotationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [tool, setTool] = useState<'draw' | 'move'>('draw');

  return (
    <AnnotationContext.Provider
      value={{
        boxes,
        selectedBox,
        tool,
        setBoxes,
        setSelectedBox,
        setTool,
      }}
    >
      {children}
    </AnnotationContext.Provider>
  );
};

export const useAnnotation = () => {
  const context = useContext(AnnotationContext);
  if (context === undefined) {
    throw new Error('useAnnotation must be used within an AnnotationProvider');
  }
  return context;
};