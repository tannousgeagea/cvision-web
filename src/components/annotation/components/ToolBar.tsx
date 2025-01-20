import React from 'react';
import { useAnnotation } from '@/contexts/AnnotationContext';
import { Button } from '../ui/button';
import { Square, Move } from 'lucide-react';

const ToolBar: React.FC = () => {
  const { tool, setTool } = useAnnotation();

  return (
    <div className="toolbar">
      <Button
        variant={tool === 'draw' ? 'default' : 'outline'}
        onClick={() => setTool('draw')}
        className="tool-button"
      >
        <Square className="icon" />
        Draw
      </Button>
      <Button
        variant={tool === 'move' ? 'default' : 'outline'}
        onClick={() => setTool('move')}
        className="tool-button"
      >
        <Move className="icon" />
        Move
      </Button>
    </div>
  );
};

export default ToolBar;
