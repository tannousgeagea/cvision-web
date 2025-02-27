import { FC } from "react";
import './pagination-control.css'

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({ currentPage, totalPages, onNext, onPrevious }) => (
  <div className="pagination-controls">
    <button onClick={onPrevious} disabled={currentPage === 1}>
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button onClick={onNext} disabled={currentPage === totalPages}>
      Next
    </button>
  </div>
);

export default PaginationControls;