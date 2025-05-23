
import React, { useState, useEffect } from 'react';
import ThoughtDropForm from '@/components/ThoughtDropForm';
import ConfirmationScreen from '@/components/ConfirmationScreen';

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    
    // TODO: In a real app, this would send data to a backend
    // For now, we'll just log it and show success
    
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
