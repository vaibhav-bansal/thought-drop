// React hook for accessing configuration
import { config } from '@/lib/config';

/**
 * Hook to access application configuration
 * @returns The application configuration object
 */
export const useConfig = () => {
  return config;
};

export default useConfig;
