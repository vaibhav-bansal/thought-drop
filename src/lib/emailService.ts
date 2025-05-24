import emailjs from '@emailjs/browser';

// Re-export the FormData interface to maintain consistency
export interface FormData {
  feeling: number;
  name: string;
  missYou: number;
  horny: number;
  angry: number;
  events: string[];
  message: string;
  responseType: string;
}

// Environment configuration
const isTestEnv = import.meta.env.VITE_APP_ENV === 'test';

// Get template ID based on environment
const getTemplateId = () => {
  if (isTestEnv) {
    return import.meta.env.VITE_EMAILJS_TEST_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  }
  return import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
};

// Log environment configuration on initialization
console.log('EmailJS Environment:', {
  environment: isTestEnv ? 'TEST' : 'PRODUCTION',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: getTemplateId(),
  hasTestTemplate: !!import.meta.env.VITE_EMAILJS_TEST_TEMPLATE_ID,
  appEnv: import.meta.env.VITE_APP_ENV
});

// Emoji and label mappings
const emojis = ['😢', '😔', '😕', '😠', '😐', '😊', '😄', '😍', '🥰', '😈'];
const labels = ['Very Sad', 'Sad', 'Down', 'Angry', 'Neutral', 'Happy', 'Joyful', 'Loving', 'Adoring', 'Naughty'];


// Event type mappings
const eventMappings: Record<string, string> = {
  'small-win': 'Small win 🌟',
  'tough-moment': 'Tough moment 💭',
  'need-hug': 'Need a hug 🤗',
  'proud': 'Proud of myself ✨',
  'other': 'Other'
};

// Initialize EmailJS with public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

/**
 * Sends a thought drop email using EmailJS
 * @param formData The form data to send
 * @returns Promise that resolves when the email is sent successfully
 * @throws Error if email sending fails
 */
export const sendThoughtDrop = async (formData: FormData): Promise<void> => {
  try {
    // Validate required fields
    if (!formData.message.trim()) {
      throw new Error('Message is required');
    }

    // Prepare template parameters
    const templateParams = {
      feeling_emoji: emojis[formData.feeling],
      feeling_label: labels[formData.feeling],
      name: formData.name,
      miss_you_meter: formData.missYou,
      horny_meter: formData.horny,
      angry_meter: formData.angry,
      events: formData.events.map(eventId => eventMappings[eventId] || eventId).join(', '),
      message: formData.message,
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
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      getTemplateId(),
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