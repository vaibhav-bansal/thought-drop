import emailjs from '@emailjs/browser';
import { config, getEmailJSTemplateId, isEmailJSConfigured } from './config';

// Re-export the FormData interface to maintain consistency
export interface FormData {
  feeling: number;
  name: string;
  missYou: number;
  events: string[];
  message?: string;
  responseType: string;
}

// Environment configuration
const isTestEnv = config.emailjs.appEnv === 'test';

// Log environment configuration on initialization
console.log('EmailJS Environment:', {
  environment: isTestEnv ? 'TEST' : 'PRODUCTION',
  serviceId: config.emailjs.serviceId,
  templateId: getEmailJSTemplateId(),
  hasTestTemplate: !!config.emailjs.testTemplateId,
  appEnv: config.emailjs.appEnv,
  isConfigured: isEmailJSConfigured()
});

// Emoji and label mappings (using config)
const emojis = config.personalization.emotionEmojis;
const labels = config.personalization.emotionLabels;

// Event type mappings (using config)
const eventMappings: Record<string, string> = {};
config.personalization.eventOptions.forEach((option, index) => {
  eventMappings[`event-${index}`] = option;
});

// Initialize EmailJS with public key
if (isEmailJSConfigured()) {
  emailjs.init(config.emailjs.publicKey);
} else {
  console.warn('EmailJS not properly configured. Please check your configuration in /config/app.json.');
}

/**
 * Sends a thought drop email using EmailJS
 * @param formData The form data to send
 * @returns Promise that resolves when the email is sent successfully
 * @throws Error if email sending fails
 */
export const sendThoughtDrop = async (formData: FormData): Promise<void> => {
  try {
    // Prepare template parameters
    const templateParams = {
      feeling_emoji: emojis[formData.feeling],
      feeling_label: labels[formData.feeling],
      name: formData.name,
      miss_you_meter: formData.missYou,
      events: formData.events.map(eventId => eventMappings[eventId] || eventId).join(', '),
      message: formData.message || 'No message provided',
      response_type: formData.responseType,
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

    // Send the email
    const response = await emailjs.send(
      config.emailjs.serviceId,
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