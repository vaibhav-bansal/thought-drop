import React, { useState, useRef } from 'react';
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
import { config } from '@/lib/config';

interface ThoughtDropFormProps {
  onSubmit: (data: FormData) => void;
}

const ThoughtDropForm: React.FC<ThoughtDropFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    defaultValues: {
      feeling: 5,
      name: undefined,
      missYou: config.personalization.meters.missYou.default,
      events: [],
      message: undefined,
      responseType: undefined
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for form fields to enable scroll-to-error
  const fieldRefs = {
    feeling: useRef<HTMLDivElement>(null),
    name: useRef<HTMLDivElement>(null),
    missYou: useRef<HTMLDivElement>(null),
    events: useRef<HTMLDivElement>(null),
    message: useRef<HTMLDivElement>(null),
    responseType: useRef<HTMLDivElement>(null)
  };

  const nameOptions = config.personalization.nameOptions;

  const eventOptions = config.personalization.eventOptions.map((option, index) => ({
    id: `event-${index}`,
    label: option
  }));

  const responseOptions = config.personalization.responseOptions;

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
      
      // Check if it's a configuration error
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      let title = "Failed to send thought drop";
      let description = "Please try again later. If the problem persists, check your internet connection.";
      
      if (errorMessage.includes('Configuration file not found') || errorMessage.includes('app.json')) {
        title = "Configuration Error";
        description = "Configuration file is missing. Please ensure /config/app.json exists and is properly configured.";
      } else if (errorMessage.includes('EmailJS not properly configured')) {
        title = "Email Service Not Configured";
        description = "Please check your EmailJS configuration in /config/app.json.";
      }
      
      toast({
        variant: "destructive",
        title,
        description,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trigger validation
    form.trigger().then((isValid) => {
      if (!isValid) {
        // Get form errors
        const errors = form.formState.errors;
        
        // Find the first field with an error and scroll to it
        const fieldOrder = ['feeling', 'name', 'missYou', 'events', 'message', 'responseType'];
        
        for (const fieldName of fieldOrder) {
          if (errors[fieldName as keyof typeof errors]) {
            const fieldRef = fieldRefs[fieldName as keyof typeof fieldRefs];
            if (fieldRef?.current) {
              fieldRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
              // Focus the field for better UX
              const input = fieldRef.current.querySelector('input, select, textarea, button') as HTMLElement;
              if (input) {
                input.focus();
              }
              break;
            }
          }
        }
      } else {
        // If valid, proceed with form submission
        form.handleSubmit(onSubmitForm)();
      }
    });
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
        <form onSubmit={handleFormSubmit} className="flex-1 space-y-8 max-w-md mx-auto w-full mb-8">
          {/* Question 1: How do you feel? */}
          <Card ref={fieldRefs.feeling} className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
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
          <Card ref={fieldRefs.name} className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
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

          {/* Question 3: Miss You Meter */}
          <Card ref={fieldRefs.missYou} className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10 space-y-6">
            <FormField
              control={form.control}
              name="missYou"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{config.personalization.meters.missYou.label}</FormLabel>
                  <FormControl>
                    <RangeSlider
                      label={config.personalization.meters.missYou.label}
                      value={field.value}
                      onChange={field.onChange}
                      min={config.personalization.meters.missYou.min}
                      max={config.personalization.meters.missYou.max}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Card>

          {/* Question 4: Events */}
          <Card ref={fieldRefs.events} className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
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

          {/* Question 5: Message */}
          <Card ref={fieldRefs.message} className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
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

          {/* Question 6: Response Type */}
          <Card ref={fieldRefs.responseType} className="p-6 bg-white/30 dark:bg-white/5 border-warm-text/10">
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
            {isSubmitting ? 'Sending...' : 'Submit ♥'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ThoughtDropForm;
