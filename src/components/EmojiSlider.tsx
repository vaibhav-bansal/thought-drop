
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { useConfig } from '@/hooks/useConfig';

interface EmojiSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const EmojiSlider: React.FC<EmojiSliderProps> = ({ value, onChange }) => {
  const { config, loading, error } = useConfig();

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">⏳</div>
          <div className="text-sm text-warm-text/70 dark:text-warm-text/70">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !config) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">❌</div>
          <div className="text-sm text-red-500">Config Error</div>
        </div>
      </div>
    );
  }

  const emojis = config.personalization.emotionEmojis;
  const labels = config.personalization.emotionLabels;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl mb-2">{emojis[value]}</div>
        <div className="text-sm text-warm-text/70 dark:text-warm-text/70">{labels[value]}</div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={emojis.length - 1}
        min={0}
        step={1}
        className="w-full"
      />
    </div>
  );
};

export default EmojiSlider;
