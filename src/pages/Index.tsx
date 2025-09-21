
import React, { useState, useEffect } from 'react';
import ThoughtDropForm from '@/components/ThoughtDropForm';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import { FormData } from '@/lib/emailService';

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const handleFormSubmit = (formData: FormData) => {
    console.log('Form submitted:', formData);
    
    // Form submission handled by ThoughtDropForm component
    // The actual email sending is done via EmailJS in the form component
    
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <ConfirmationScreen onReset={handleReset} />;
  }

  return (
    <ThoughtDropForm 
      onSubmit={handleFormSubmit}
    />
  );
};

export default Index;
