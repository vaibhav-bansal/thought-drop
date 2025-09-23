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
    title: string;
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

// Default configuration (fallback)
const defaultConfig: AppConfig = {
  app: {
    author: 'Your Name',
    name: 'thought-drop',
    title: 'Thought Drop',
    displayName: 'Thought Drop',
    subtitle: 'Made by Shiva, for Parvati',
    description: 'A safe space for your thoughts'
  },
  personalization: {
    nameOptions: ['Pari', 'Chhota Bachcha', 'Chhota bachcha', 'Baby girl', 'Princess', 'Parvati', 'Goddess', 'Strong independent woman', 'Daddy\'s girl', 'Little demon', 'Man-hater'],
    emotionEmojis: ['😢', '😔', '😕', '😠', '😐', '😊', '😄', '😍', '🥰', '😈'],
    emotionLabels: ['Very Sad', 'Sad', 'Down', 'Angry', 'Neutral', 'Happy', 'Joyful', 'Loving', 'Adoring', 'Naughty'],
      meters: {
        missYou: { label: 'Miss You Meter', min: 0, max: 10, default: 5 }
      },
    eventOptions: ['Small win 🌟', 'Tough moment 💭', 'Need a hug 🤗', 'Proud of myself ✨', 'Other'],
    responseOptions: ['Listen only', 'Advice welcome', 'Hype me up', 'Check on me later']
  },
  emailjs: {
    publicKey: '',
    serviceId: '',
    templateId: '',
    testTemplateId: '',
    appEnv: 'production'
  }
};

// Configuration validation function
function validateConfig(configData: unknown): AppConfig {
  try {
    // Deep merge with defaults to ensure all required fields exist
    const mergedConfig = deepMerge(defaultConfig, configData as Record<string, unknown>);
    
    // Validate required fields
    if (!mergedConfig.app?.author) {
      console.warn('Missing app.author, using default');
      mergedConfig.app.author = defaultConfig.app.author;
    }
    
    if (!mergedConfig.personalization?.nameOptions?.length) {
      console.warn('Missing or empty personalization.nameOptions, using default');
      mergedConfig.personalization.nameOptions = defaultConfig.personalization.nameOptions;
    }
    
    if (!mergedConfig.personalization?.emotionEmojis?.length) {
      console.warn('Missing or empty personalization.emotionEmojis, using default');
      mergedConfig.personalization.emotionEmojis = defaultConfig.personalization.emotionEmojis;
    }
    
    if (!mergedConfig.personalization?.emotionLabels?.length) {
      console.warn('Missing or empty personalization.emotionLabels, using default');
      mergedConfig.personalization.emotionLabels = defaultConfig.personalization.emotionLabels;
    }
    
    // Validate meters
    if (!mergedConfig.personalization?.meters) {
      console.warn('Missing personalization.meters, using default');
      mergedConfig.personalization.meters = defaultConfig.personalization.meters;
    } else {
      // Validate each meter
      ['missYou'].forEach(meterKey => {
        if (!mergedConfig.personalization.meters[meterKey as keyof typeof mergedConfig.personalization.meters]) {
          console.warn(`Missing meter ${meterKey}, using default`);
          mergedConfig.personalization.meters[meterKey as keyof typeof mergedConfig.personalization.meters] = defaultConfig.personalization.meters[meterKey as keyof typeof defaultConfig.personalization.meters];
        }
      });
    }
    
    return mergedConfig;
  } catch (error) {
    console.error('Config validation failed, using default configuration:', error);
    return defaultConfig;
  }
}

// Deep merge utility function
function deepMerge(target: AppConfig, source: Record<string, unknown>): AppConfig {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (key === 'app' && result.app) {
        result.app = { ...result.app, ...(source[key] as Record<string, unknown>) } as AppConfig['app'];
      } else if (key === 'personalization' && result.personalization) {
        result.personalization = { ...result.personalization, ...(source[key] as Record<string, unknown>) } as AppConfig['personalization'];
      } else if (key === 'emailjs' && result.emailjs) {
        result.emailjs = { ...result.emailjs, ...(source[key] as Record<string, unknown>) } as AppConfig['emailjs'];
      }
    } else {
      // Handle primitive values
      if (key === 'app' && typeof source[key] === 'object') {
        result.app = { ...result.app, ...(source[key] as Record<string, unknown>) } as AppConfig['app'];
      } else if (key === 'personalization' && typeof source[key] === 'object') {
        result.personalization = { ...result.personalization, ...(source[key] as Record<string, unknown>) } as AppConfig['personalization'];
      } else if (key === 'emailjs' && typeof source[key] === 'object') {
        result.emailjs = { ...result.emailjs, ...(source[key] as Record<string, unknown>) } as AppConfig['emailjs'];
      }
    }
  }
  
  return result;
}

// Configuration state
let config: AppConfig = defaultConfig;
let configLoaded = false;

// Configuration loader function
async function loadConfig(): Promise<AppConfig> {
  if (configLoaded) {
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
