import React, { useState } from 'react';
import './TrainValidSlider.css';

interface TrainValidSliderProps {
  defaultTrain?: number; // Default percentage for train split
  onChange: (trainPercentage: number) => void; // Callback when the slider changes
  onClick: () => void;
}

const TrainValidSlider: React.FC<TrainValidSliderProps> = ({ defaultTrain = 70, onChange, onClick }) => {
  const [trainPercentage, setTrainPercentage] = useState<number>(defaultTrain);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const train = parseInt(e.target.value, 10);
    setTrainPercentage(train);
    onChange(train / 100);
  };

  const validPercentage = 100 - trainPercentage;

  return (
    <div className='slider-container-overlay'>
        <div className="slider-container">
            <div className="labels">
                <div className="label train">Train<br />{trainPercentage}%</div>
                <div className="label valid">Valid<br />{validPercentage}%</div>
            </div>

            <input
                type="range"
                min="10"
                max="90"
                value={trainPercentage}
                onChange={handleSliderChange}
                className="slider"
            />

            <div className="slider-bar">
                <div
                className="train-bar"
                style={{ width: `${trainPercentage}%`, backgroundColor: 'purple' }}
                />
                <div
                className="valid-bar"
                style={{ width: `${validPercentage}%`, backgroundColor: 'blue' }}
                />
            </div>

            <button onClick={onClick}>Split</button>
        </div>
    </div>
  );
};

export default TrainValidSlider;
