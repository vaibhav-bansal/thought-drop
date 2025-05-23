
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import EmojiSlider from './EmojiSlider';
import RangeSlider from './RangeSlider';
import { Heart } from 'lucide-react';

interface FormData {
  feeling: number;
  name: string;
  missYou: number;
  horny: number;
  angry: number;
  events: string[];
  message: string;
  responseType: string;
}

interface ThoughtDropFormProps {
  onSubmit: (data: FormData) => void;
}

const ThoughtDropForm: React.FC<ThoughtDropFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    feeling: 4,
    name: 'Pari',
    missYou: 5,
    horny: 5,
    angry: 1,
    events: [],
    message: '',
    responseType: 'Listen only'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameOptions = [
    'Pari',
    'Baby girl',
    'Princess',
    'Strong independent woman',
    "Daddy's girl",
    'Little demon',
    'Man-hater'
  ];

  const eventOptions = [
    { id: 'small-win', label: 'Small win 🌟' },
    { id: 'tough-moment', label: 'Tough moment 💭' },
    { id: 'need-hug', label: 'Need a hug 🤗' },
    { id: 'proud', label: 'Proud of myself ✨' },
    { id: 'other', label: 'Other' }
  ];

  const responseOptions = [
    'Listen only',
    'Advice welcome',
    'Hype me up',
    'Check on me later'
  ];

  const handleEventChange = (eventId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      events: checked 
        ? [...prev.events, eventId]
        : prev.events.filter(e => e !== eventId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  const isFormValid = formData.message.trim().length > 0;

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-soft-pink" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-warm-text dark:text-warm-text">Thought Drop</h1>
            <p className="text-sm text-warm-text/60 dark:text-warm-text/60">A safe space for your heart</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-8 max-w-md mx-auto w-full">
        {/* Question 1: How do you feel? */}
        <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
          <h3 className="text-lg font-medium mb-4 text-warm-text dark:text-warm-text">
            How do you feel right now? *
          </h3>
          <EmojiSlider
            value={formData.feeling}
            onChange={(value) => setFormData(prev => ({ ...prev, feeling: value }))}
          />
        </Card>

        {/* Question 2: Pick your name */}
        <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
          <h3 className="text-lg font-medium mb-4 text-warm-text dark:text-warm-text">
            Pick your name *
          </h3>
          <Select value={formData.name} onValueChange={(value) => setFormData(prev => ({ ...prev, name: value }))}>
            <SelectTrigger className="bg-white/50 dark:bg-white/10 border-warm-text/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              {nameOptions.map(name => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Question 3-5: Meters */}
        <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10 space-y-6">
          <RangeSlider
            label="Miss You Meter"
            value={formData.missYou}
            onChange={(value) => setFormData(prev => ({ ...prev, missYou: value }))}
          />
          <RangeSlider
            label="Horny Meter"
            value={formData.horny}
            onChange={(value) => setFormData(prev => ({ ...prev, horny: value }))}
          />
          <RangeSlider
            label="Angry Meter"
            value={formData.angry}
            onChange={(value) => setFormData(prev => ({ ...prev, angry: value }))}
          />
        </Card>

        {/* Question 6: Events */}
        <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
          <h3 className="text-lg font-medium mb-4 text-warm-text dark:text-warm-text">
            Any bumps or wins you'd like to note?
          </h3>
          <div className="space-y-3">
            {eventOptions.map(option => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={formData.events.includes(option.id)}
                  onCheckedChange={(checked) => handleEventChange(option.id, !!checked)}
                />
                <Label htmlFor={option.id} className="text-warm-text dark:text-warm-text">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* Question 7: Message */}
        <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
          <h3 className="text-lg font-medium mb-4 text-warm-text dark:text-warm-text">
            Message *
          </h3>
          <Textarea
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="What's on your heart today?"
            className="bg-white/50 dark:bg-white/10 border-warm-text/20 text-warm-text dark:text-warm-text placeholder:text-warm-text/50 min-h-24"
          />
        </Card>

        {/* Question 8: Response Type */}
        <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
          <h3 className="text-lg font-medium mb-4 text-warm-text dark:text-warm-text">
            If you want me to respond in a certain way, let me know here:
          </h3>
          <RadioGroup
            value={formData.responseType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, responseType: value }))}
            className="space-y-2"
          >
            {responseOptions.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-warm-text dark:text-warm-text">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-4 text-lg font-medium transition-all duration-300 ${
            isSubmitting ? 'gentle-bounce' : ''
          } bg-soft-pink hover:bg-soft-pink/90 text-warm-text border-0 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? 'Sending to Vaibhav...' : 'Send to Vaibhav ♥'}
        </Button>
      </form>
    </div>
  );
};

export default ThoughtDropForm;
