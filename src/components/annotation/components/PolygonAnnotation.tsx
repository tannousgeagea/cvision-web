import React, { useState, useEffect } from 'react';
import './PolygonAnnotation.css';

interface Point {
  x: number;
  y: number;
}

interface Polygon {
  id: string;
  points: Point[];
  label: string;
}

interface Props {
  polygon: Polygon;
  isSelected: boolean;
  tool: 'draw' | 'move' | 'polygon';
  onSelect: () => void;
}

const PolygonAnnotation: React.FC<Props> = ({ polygon, isSelected, tool, onSelect }) => {
  const pointsString = polygon.points.map(p => `${p.x},${p.y}`).join(' ');
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (tool !== 'move') return;
    e.stopPropagation();
    onSelect();
  };

  const classNames = [
    'polygon-annotation',
    isSelected ? 'selected' : '',
    tool === 'draw' || tool === 'polygon' ? 'draw-mode' : ''
  ].filter(Boolean).join(' ');
  
  return (
    <svg 
      className="polygon-svg-container" 
      onClick={handleMouseDown}
      viewBox="0 0 1 1"
      preserveAspectRatio='none'
    >
      <polygon 
        points={pointsString} 
        className={classNames}
        style={{
          stroke: '#3B82F6',
          strokeWidth: 0.002,
        }}
      />
      {polygon.points.map((point, index) => (
        <circle 
          key={index}
          cx={point.x} 
          cy={point.y} 
          r={0.005} 
          className={`polygon-point ${isSelected ? 'selected' : ''}`}
          style={{
            fill: '#3B82F6',
            stroke: 'white',
            strokeWidth: 0.001,
          }}
        />
      ))}
      {isSelected && polygon.label && (
        <foreignObject 
          x={polygon.points[0].x} 
          y={polygon.points[0].y - 0.03} 
          width="0.2" 
          height="0.06"
        >
          <div className="box-label">{polygon.label}</div>
        </foreignObject>
      )}
    </svg>
  );
};

export default PolygonAnnotation;