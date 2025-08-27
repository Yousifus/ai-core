
import React from 'react';
import { Tooltip } from './Tooltip';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  tooltipText?: string;
}

export const Slider: React.FC<SliderProps> = ({ label, value, min, max, step, onChange, tooltipText }) => (
  <div>
    <label className="flex justify-between items-center text-sm font-medium text-gray-300">
      <div className="flex items-center gap-2">
        <span>{label}</span>
        {tooltipText && <Tooltip text={tooltipText} />}
      </div>
      <span className="text-blue-400 font-bold">{value}</span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2 accent-blue-500"
    />
  </div>
);
