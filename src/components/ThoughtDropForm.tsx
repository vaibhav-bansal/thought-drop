import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RequiredFormLabel } from '@/components/ui/required-form-label';
import EmojiSlider from './EmojiSlider';
import RangeSlider from './RangeSlider';
import { Heart } from 'lucide-react';
import { sendThoughtDrop, FormData } from '@/lib/emailService';
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface ThoughtDropFormProps {
  onSubmit: (data: FormData) => void;
}

const ThoughtDropForm: React.FC<ThoughtDropFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    defaultValues: {
      feeling: 5,
      name: undefined,
      missYou: 5,
      horny: 2,
      angry: 0,
      events: [],
      message: undefined,
      responseType: undefined
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameOptions = [
    'Pari',
    'Chhota Bachcha',
    'Baby girl',
    'Princess',
    "Parvati",
    "Goddess",
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
    const currentEvents = form.getValues('events');
    form.setValue('events', checked
      ? [...currentEvents, eventId]
      : currentEvents.filter(e => e !== eventId)
    );
  };

  const onSubmitForm = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      await sendThoughtDrop(data);
      onSubmit(data);
    } catch (error) {
      console.error('Failed to send thought drop:', error);
      toast({
        variant: "destructive",
        title: "Failed to send thought drop",
        description: "Please try again later. If the problem persists, check your internet connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 pb-8 flex flex-col">
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="flex-1 space-y-8 max-w-md mx-auto w-full mb-8">
          {/* Question 1: How do you feel? */}
          <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
            <FormField
              control={form.control}
              name="feeling"
              rules={{ required: "Please select how you feel" }}
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel>How do you feel right now?</RequiredFormLabel>
                  <FormControl>
                    <EmojiSlider
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          {/* Question 2: Pick your name */}
          <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Please select a name" }}
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel>Your Name</RequiredFormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/50 dark:bg-white/10 border-warm-text/20">
                        <SelectValue placeholder="Select a name" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-gray-800">
                      {nameOptions.map(name => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          {/* Question 3-5: Meters */}
          <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10 space-y-6">
            <FormField
              control={form.control}
              name="missYou"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miss You Meter</FormLabel>
                  <FormControl>
                    <RangeSlider
                      label="Miss You Meter"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="horny"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horny Meter</FormLabel>
                  <FormControl>
                    <RangeSlider
                      label="Horny Meter"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="angry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Angry Meter</FormLabel>
                  <FormControl>
                    <RangeSlider
                      label="Angry Meter"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Card>

          {/* Question 6: Events */}
          <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
            <FormField
              control={form.control}
              name="events"
              render={() => (
                <FormItem>
                  <FormLabel>Any bumps or wins you'd like to note?</FormLabel>
                  <div className="space-y-3">
                    {eventOptions.map(option => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={form.watch('events').includes(option.id)}
                          onCheckedChange={(checked) => handleEventChange(option.id, !!checked)}
                        />
                        <Label htmlFor={option.id} className="text-warm-text dark:text-warm-text">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </Card>

          {/* Question 7: Message */}
          <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
            <FormField
              control={form.control}
              name="message"
              rules={{ required: "Please enter a message" }}
              render={({ field }) => (
                <FormItem>
                  <RequiredFormLabel>Message</RequiredFormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="What's on your heart today?"
                      className="bg-white/50 dark:bg-white/10 border-warm-text/20 text-warm-text dark:text-warm-text placeholder:text-warm-text/50 min-h-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          {/* Question 8: Response Type */}
          <Card className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
            <FormField
              control={form.control}
              name="responseType"
              render={({ field }) => (
                <FormItem>
                  <Label>If you want me to respond in a certain way, let me know here</Label>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
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
                  </FormControl>
                </FormItem>
              )}
            />
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 text-lg font-medium transition-all duration-300 ${isSubmitting ? 'gentle-bounce' : ''
              } bg-soft-pink hover:bg-soft-pink/90 text-warm-text border-0 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? 'Sending to Vaibhav...' : 'Send to Vaibhav ♥'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ThoughtDropForm;
