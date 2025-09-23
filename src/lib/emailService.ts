import emailjs from '@emailjs/browser';
import { config, loadConfig, getEmailJSTemplateId, isEmailJSConfigured } from './config';

// Re-export the FormData interface to maintain consistency
export interface FormData {
  feeling: number;
  name: string;
  missYou: number;
  events: string[];
  message?: string;
  responseType: string;
}

// Helper function to get config safely
const getConfig = () => {
  if (!config) {
    throw new Error('Configuration not loaded. Please ensure config is properly initialized.');
  }
  return config;
};

// Helper function to get emoji and label mappings
const getEmojiAndLabelMappings = () => {
  const currentConfig = getConfig();
  return {
    emojis: currentConfig.personalization.emotionEmojis,
    labels: currentConfig.personalization.emotionLabels
  };
};

// Helper function to get event mappings
const getEventMappings = () => {
  const currentConfig = getConfig();
  const eventMappings: Record<string, string> = {};
  currentConfig.personalization.eventOptions.forEach((option, index) => {
    eventMappings[`event-${index}`] = option;
  });
  return eventMappings;
};

// Initialize EmailJS with public key after config is loaded
const initializeEmailJS = async () => {
  try {
    await loadConfig(); // Wait for config to load
    
    if (isEmailJSConfigured()) {
      const currentConfig = getConfig();
      emailjs.init(currentConfig.emailjs.publicKey);
      console.log('EmailJS initialized successfully');
      
      // Log environment configuration after initialization
      const isTestEnv = currentConfig.emailjs.appEnv === 'test';
      console.log('EmailJS Environment:', {
        environment: isTestEnv ? 'TEST' : 'PRODUCTION',
        serviceId: currentConfig.emailjs.serviceId,
        templateId: getEmailJSTemplateId(),
        hasTestTemplate: !!currentConfig.emailjs.testTemplateId,
        appEnv: currentConfig.emailjs.appEnv,
        isConfigured: isEmailJSConfigured()
      });
    } else {
      console.warn('EmailJS not properly configured. Please check your configuration in /config/app.json.');
    }
  } catch (error) {
    console.error('Failed to initialize EmailJS due to configuration error:', error);
    // The error will be handled by the UI when users try to submit the form
  }
};

initializeEmailJS();

/**
 * Sends a thought drop email using EmailJS
 * @param formData The form data to send
 * @returns Promise that resolves when the email is sent successfully
 * @throws Error if email sending fails
 */
export const sendThoughtDrop = async (formData: FormData): Promise<void> => {
  try {
    // Ensure config is loaded before proceeding
    await loadConfig();
    
    // Get current config and mappings
    const currentConfig = getConfig();
    const { emojis, labels } = getEmojiAndLabelMappings();
    const eventMappings = getEventMappings();
    const isTestEnv = currentConfig.emailjs.appEnv === 'test';
    
    // Prepare template parameters
    const templateParams = {
      feeling_emoji: emojis[formData.feeling],
      feeling_label: labels[formData.feeling],
      name: formData.name,
      miss_you_meter: formData.missYou,
      events: formData.events.length > 0 
        ? formData.events.map(eventId => eventMappings[eventId] || eventId).join(', ')
        : 'No specific events mentioned',
      message: formData.message || 'No message provided',
      response_type: formData.responseType || 'No specific response requested',
      timestamp: new Date().toLocaleString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }),
      environment: isTestEnv ? '[TEST] ' : '' // Add environment indicator in test mode
    };

    // Log the data being sent (for debugging)
    console.log(`Sending email in ${isTestEnv ? 'TEST' : 'PRODUCTION'} mode:`, templateParams);

    // Handle test mode - simulate successful email sending
    if (isTestEnv) {
      console.log('🧪 TEST MODE: Simulating successful email send');
      console.log('📧 Email would contain:', templateParams);
      
      // Simulate a delay like a real email service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('✅ TEST: Email "sent" successfully!');
      return;
    }

    // Production mode - actually send the email
    if (!isEmailJSConfigured()) {
      throw new Error('EmailJS not properly configured. Please check your configuration in /config/app.json.');
    }

    const response = await emailjs.send(
      currentConfig.emailjs.serviceId,
      getEmailJSTemplateId(),
      templateParams
    );

    // Log success
    console.log('Email sent successfully:', response);

    // Return void on success
    return;
  } catch (error) {
    // Log the error
    console.error('Failed to send email:', error);

    // Re-throw the error for handling by the caller
    throw error;
  }
}; 