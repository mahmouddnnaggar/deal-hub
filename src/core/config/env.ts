/**
 * Type-safe environment configuration
 * All environment variables are validated and typed here
 */

const getEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  // API Configuration
  apiBaseUrl: getEnvVar('NEXT_PUBLIC_API_BASE_URL', 'https://ecommerce.routemisr.com'),
  
  // Auth Configuration
  authSecret: getEnvVar('AUTH_SECRET', 'development-secret'),
  authUrl: getEnvVar('AUTH_URL', 'http://localhost:3000'),
  
  // App Configuration
  appUrl: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  appName: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Deal Hub'),
  
  // Runtime checks
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
} as const;

export type Env = typeof env;
