
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface RangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ 
  value, 
  onChange, 
  label,
  min = 0,
  max = 10 
}) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-warm-text/70 dark:text-warm-text/70">{label}</span>
        <span className="text-lg font-medium text-warm-text dark:text-warm-text">{value}/{max}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={max}
        min={min}
        step={1}
        className="w-full"
      />
    </div>
  );
};

export default RangeSlider;
