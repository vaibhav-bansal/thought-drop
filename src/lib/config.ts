// Configuration service for Thought Drop
// Handles essential customizations for open-source deployment

interface AppConfig {
  // Essential customizations
  appAuthor: string;
  nameOptions: string[];
  
  // EmailJS (required)
  emailjs: {
    publicKey: string;
    serviceId: string;
    templateId: string;
    testTemplateId?: string;
    appEnv: string;
  };
  
  // Advanced customizations (optional)
  advanced?: {
    appName?: string;
    appTitle?: string;
    appDisplayName?: string;
    appSubtitle?: string;
    appDescription?: string;
    emotionEmojis?: string[];
    emotionLabels?: string[];
    eventOptions?: string[];
    responseOptions?: string[];
  };
}

export const config: AppConfig = {
  // Essential
  appAuthor: import.meta.env.VITE_APP_AUTHOR || 'Your Name',
  nameOptions: (import.meta.env.VITE_NAME_OPTIONS || 'Princess,Baby,Good girl,Sweetheart,Love').split(','),
  
  // EmailJS
  emailjs: {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    testTemplateId: import.meta.env.VITE_EMAILJS_TEST_TEMPLATE_ID,
    appEnv: import.meta.env.VITE_APP_ENV || 'production'
  },
  
  // Advanced (optional)
  advanced: {
    appName: import.meta.env.VITE_APP_NAME,
    appTitle: import.meta.env.VITE_APP_TITLE,
    appDisplayName: import.meta.env.VITE_APP_DISPLAY_NAME,
    appSubtitle: import.meta.env.VITE_APP_SUBTITLE,
    appDescription: import.meta.env.VITE_APP_DESCRIPTION,
    emotionEmojis: import.meta.env.VITE_EMOTION_EMOJIS?.split(','),
    emotionLabels: import.meta.env.VITE_EMOTION_LABELS?.split(','),
    eventOptions: import.meta.env.VITE_EVENT_OPTIONS?.split(','),
    responseOptions: import.meta.env.VITE_RESPONSE_OPTIONS?.split(',')
  }
};

// Helper function to get EmailJS template ID based on environment
export const getEmailJSTemplateId = (): string => {
  const isTestEnv = config.emailjs.appEnv === 'test';
  if (isTestEnv && config.emailjs.testTemplateId) {
    return config.emailjs.testTemplateId;
  }
  return config.emailjs.templateId;
};

// Helper function to check if EmailJS is properly configured
export const isEmailJSConfigured = (): boolean => {
  return !!(
    config.emailjs.publicKey &&
    config.emailjs.serviceId &&
    config.emailjs.templateId
  );
};

export default config;
