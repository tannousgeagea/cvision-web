import React from 'react';
import BackArrow from '../../ui/actions/BackArrow';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './AnnotationControl.css';

interface AnnotationControlsProps {
  current: number;
  total: number;
  title: string;
  onPrevious: () => void;
  onNext: () => void;
}

const AnnotationControls: React.FC<AnnotationControlsProps> = ({ current, total, title, onPrevious, onNext }) => {
  return (
    <div className="annotation-controls">
      <div className='annotation-controls-title'>
        <BackArrow />
        <p>{title}</p>
      </div>
      <div className='annotation-controls-button'>
        <button onClick={onPrevious} disabled={current === 1}>
          <ChevronLeft />
        </button>
        <span>{`${current} / ${total}`}</span>
        <button onClick={onNext} disabled={current === total}>
          <ChevronRight />
        </button>
      </div>

      <div></div>
    </div>
  );
};

export default AnnotationControls;
