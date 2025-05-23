
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface EmojiSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const EmojiSlider: React.FC<EmojiSliderProps> = ({ value, onChange }) => {
  const emojis = ['😢', '😔', '😕', '😠', '😐', '😊', '😄', '😍', '🥰', '😈'];
  const labels = ['Very Sad', 'Sad', 'Down', 'Angry', 'Neutral', 'Happy', 'Joyful', 'Loving', 'Adoring', 'Naughty'];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl mb-2">{emojis[value]}</div>
        <div className="text-sm text-warm-text/70 dark:text-warm-text/70">{labels[value]}</div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={9}
        min={0}
        step={1}
        className="w-full"
      />
    </div>
  );
};

export default EmojiSlider;
