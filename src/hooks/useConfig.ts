import { useState, useEffect } from 'react';
import { loadConfig } from '@/lib/config';
import { updateDocumentMeta } from '@/lib/documentMeta';

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
      missYou: {
        label: string;
        min: number;
        max: number;
        default: number;
      };
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

export const useConfig = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfigData = async () => {
      try {
        setLoading(true);
        setError(null);
        const configData = await loadConfig();
        setConfig(configData);
        
        // Update document meta tags and title
        updateDocumentMeta(configData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load configuration';
        setError(errorMessage);
        console.error('Config loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadConfigData();
  }, []);

  return { config, loading, error };
};
