// Configuration service for Thought Drop
// Handles essential customizations for open-source deployment

interface MeterConfig {
  label: string;
  min: number;
  max: number;
  default: number;
}

interface AppConfig {
  app: {
    author: string;
    name: string;
    displayName: string;
    subtitle: string;
    description: string;
  };
  
  personalization: {
    nameOptions: string[];
    emotionEmojis: string[];
    emotionLabels: string[];
    meters: {
      missYou: MeterConfig;
    };
    eventOptions: string[];
    responseOptions: string[];
  };
  
  emailjs: {
    publicKey: string;
    serviceId: string;
    templateId: string;
    testTemplateId?: string;
    appEnv: string;
  };
}

// No default configuration - fail-fast approach

// Configuration validation function
function validateConfig(configData: unknown): AppConfig {
  try {
    const config = configData as AppConfig;
    
    // Validate required fields - throw errors instead of using defaults
    if (!config.app?.author) {
      throw new Error('Missing required field: app.author');
    }
    
    if (!config.personalization?.nameOptions?.length) {
      throw new Error('Missing or empty required field: personalization.nameOptions');
    }
    
    if (!config.personalization?.emotionEmojis?.length) {
      throw new Error('Missing or empty required field: personalization.emotionEmojis');
    }
    
    if (!config.personalization?.emotionLabels?.length) {
      throw new Error('Missing or empty required field: personalization.emotionLabels');
    }
    
    if (!config.personalization?.meters?.missYou) {
      throw new Error('Missing required field: personalization.meters.missYou');
    }
    
    if (!config.emailjs?.publicKey || !config.emailjs?.serviceId || !config.emailjs?.templateId) {
      throw new Error('Missing required EmailJS configuration fields');
    }
    
    return config;
  } catch (error) {
    console.error('Configuration validation failed:', error);
    throw new Error(`Invalid configuration: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Configuration state
let config: AppConfig | null = null;
let configLoaded = false;

// Configuration loader function
async function loadConfig(): Promise<AppConfig> {
  if (configLoaded && config) {
    return config;
  }

  try {
    // Try to load config from public folder
    const response = await fetch('/config/app.json');
    if (response.ok) {
      const configData = await response.json();
      config = validateConfig(configData);
      configLoaded = true;
      console.log('Configuration loaded and validated from /config/app.json');
      return config;
    } else {
      throw new Error(`Failed to load /config/app.json: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ CRITICAL: Configuration file missing or invalid:', error);
    throw new Error(
      'Configuration file not found. Please ensure /config/app.json exists. ' +
      'Copy app.example.json to app.json and customize it with your settings.'
    );
  }
}

// Initialize config loading
loadConfig();

export { config, loadConfig };

// Helper function to get EmailJS template ID based on environment
export const getEmailJSTemplateId = (): string => {
  if (!config) {
    throw new Error('Configuration not loaded');
  }
  const isTestEnv = config.emailjs.appEnv === 'test';
  if (isTestEnv && config.emailjs.testTemplateId) {
    return config.emailjs.testTemplateId;
  }
  return config.emailjs.templateId;
};

// Helper function to check if EmailJS is properly configured
export const isEmailJSConfigured = (): boolean => {
  if (!config) {
    return false;
  }
  return !!(
    config.emailjs.publicKey &&
    config.emailjs.serviceId &&
    config.emailjs.templateId
  );
};

export default config;
